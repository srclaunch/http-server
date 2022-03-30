import {
  ExceptionsClient,
  KillProcessException,
  ProcessException,
} from '@srclaunch/exceptions';
import Logger from '@srclaunch/logger';
import { getEnvironment } from '@srclaunch/node-environment';
import { Environment } from '@srclaunch/types';
import compression from 'compression';
import cors from 'cors';
import express, { Express, NextFunction, Response } from 'express';
import multer from 'multer';
import http from 'node:http';

import authMiddleware from './middleware/auth-middleware';
import { Endpoint } from './types/endpoint';
import { ServerOptions } from './types/server';
import { HealthcheckEndpoint, setupEndpoints } from './utils/endpoints';
import { configureExceptionHandling } from './utils/exception-handling';

export class HttpServer {
  readonly endpoints: readonly Endpoint[] = [];
  readonly environment: Environment = getEnvironment();
  readonly exceptionsClient: ExceptionsClient;
  listener?: http.Server;
  readonly logger: Logger;
  name: string;
  server: Express;
  readonly options: ServerOptions = {
    port: 8080,
  };

  constructor({
    endpoints,
    name,
    options,
  }: {
    readonly endpoints: readonly Endpoint[];
    readonly name: string;
    readonly options?: ServerOptions;
  }) {
    this.logger = new Logger();
    this.server = express();
    this.name = name;
    this.endpoints = endpoints;
    this.options = { ...this.options, ...options };

    console.log('this.environment', this.environment);
    console.log('this.config', this.options);

    this.exceptionsClient = new ExceptionsClient({
      processExceptionsHandler: async () => await this.gracefulExit(),
      processInteruptHandler: async () => await this.gracefulExit(),
      processTerminationHandler: async () => await this.gracefulExit(),
    });
  }

  private async configure(): Promise<void> {
    this.logger.info('Configuring server...');

    this.server.use(express.urlencoded({ extended: false }));

    const multerStorage = multer.memoryStorage();
    const upload = multer({ storage: multerStorage }).any();

    this.server.use(upload);

    this.server.use(express.json());
    this.server.disable('etag');
    this.server.use(compression());

    // HTTP request Logging middleware
    // this.server.use(getLoggerMiddleware());

    this.logger.info('Added process listeners.');

    this.server.use((req, res, next) => authMiddleware(req, res, next));
    this.logger.info('Authentication middleware setup');

    this.server = setupEndpoints({
      basePath: `/${this.name}`,
      endpoints: [...this.endpoints, HealthcheckEndpoint],
      server: this.server,
    });
    this.logger.info('❤️  Healthcheck service started.');

    this.logger.info('Server configured successfully.');
  }

  public async listen(portArg?: number): Promise<void> {
    const port = portArg ?? this.options?.port ?? 8080;

    this.logger.info(
      `Starting server in "${this.environment.name}" environment...`,
    );

    this.secure();
    this.configure();

    this.listener = await this.server.listen(port, () => {
      this.logger.info(`⚡ Server listening on port ${port}!`);
    });

    configureExceptionHandling(this.server, this.listener);
  }

  private secure() {
    this.server.disable('x-powered-by');
    this.logger.info('Disabled Express x-powered-by header.');

    // server.use(helmet());
    // this.logger.info('Initialized Helmet.');

    this.server.use(
      cors({
        credentials: true,
        origin: this.options.trustedOrigins?.[this.environment.id],
      }),
    );

    this.server.use(
      (req: Express.Request, res: Response, next: NextFunction) => {
        if (this.options.trustedOrigins && this.environment?.id) {
          const origins =
            this.options.trustedOrigins?.[this.environment?.id] ?? [];

          for (const origin of origins) {
            this.logger.info(`Allowing access from origin ${origin}...`);
            res.setHeader('Access-Control-Allow-Origin', origin);
          }
        }

        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');

        next();
      },
    );

    // server.use(allowCrossDomain);

    this.logger.info('CORS enabled.');
  }

  public async gracefulExit(): Promise<void> {
    this.logger.info(`Gracefully shutting down server...'} `);

    if (this.listener) {
      this.listener.close(err => {
        if (err) {
          const exception = new ProcessException(
            `Error shutting down server ${err.name}`,
            {
              cause: err,
              origin: {
                file: 'index.ts',
                function: 'gracefulExit()',
              },
            },
          );

          this.logger.exception(exception.toJSON());
        } else {
          this.logger.info('HTTP server successfully closed');
        }

        this.logger.info(`Killing server process... Goodbye.'} `);

        throw new KillProcessException('Shutting down gracefully', {
          origin: {
            file: 'index.ts',
            function: 'gracefulExit()',
          },
        });
      });
    }
  }
}
