import {
  Exception,
  // ExceptionsClient,
  KillProcessException,
  ProcessException,
  ProcessSigIntException,
  ProcessSigTermException,
  UnmanagedException,
  expressExceptionMiddleware,
} from '@srclaunch/exceptions';
import { Logger, expressLoggerMiddleware } from '@srclaunch/logger';
import { Environment } from '@srclaunch/types';
// import exitHook from 'async-exit-hook';
import compression from 'compression';
import cors from 'cors';
import express, {
  Express,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';
import multer from 'multer';
import http from 'node:http';
import { Endpoint } from './types/endpoint';
import { ServerOptions } from './types/server';
import { HealthcheckEndpoint, setupEndpoints } from './utils/endpoints.js';

export class HttpServer {
  readonly endpoints: Endpoint[] = [];
  readonly environment: Environment;
  // readonly exceptionsClient: ExceptionsClient;
  listener?: http.Server;
  readonly logger: Logger;
  name: string;
  private readonly express: Express;
  private server?: Express;
  readonly options: ServerOptions = {
    port: 8080,
  };

  public constructor({
    endpoints,
    environment,
    logger,
    name,
    options = {},
  }: {
    readonly endpoints: Endpoint[];
    readonly environment: Environment;
    readonly logger?: Logger;
    readonly name: string;
    readonly options?: ServerOptions;
  }) {
    this.environment = environment;
    this.logger =
      logger ??
      new Logger({
        environment,
      });
    this.express = express();
    this.name = name;
    this.endpoints = endpoints;
    this.options = { ...this.options, ...options };

    this.logger.info(
      `Starting server in "${this.environment.name}" environment...`,
    );

    // this.exceptionsClient = new ExceptionsClient({
    //   node: {
    //     exceptionsHandler: async err => await this.gracefulExit(err),
    //     interuptHandler: async err => await this.gracefulExit(err),
    //     terminationHandler: async err => await this.gracefulExit(err),
    //   },
    // });

    this.logger.info('Configuring server...');
    this.configure();
  }

  public async listen(portArg?: number): Promise<http.Server> {
    const port = portArg ?? this.options?.port ?? 8080;

    this.logger.info('Setting up HTTP endpoints');
    this.server = await setupEndpoints({
      basePath: `/${this.name}`,
      endpoints: this.endpoints,
      express: this.express,
    });

    this.listener = await this.server.listen(port, () => {
      this.logger.info(
        `❤️ Healthcheck endpoint listening at '${HealthcheckEndpoint.route}'`,
      );

      this.logger.info(`🚀 Server listening on port ${port}`);
    });

    return this.listener;
  }

  private configure(): void {
    this.configureLogging();
    this.configureExceptionHandling();

    this.logger.info('Enabling file uploads');
    this.enableFileUplaods();

    this.logger.info('Configuring content types');
    this.setAcceptableContentTypes();

    this.logger.info('Configuring server optimizations');
    this.configureOptimizations();

    this.logger.info('Securing server');
    this.secure();

    this.logger.info('Server configured successfully');
  }

  private configureLogging(): void {
    this.logger.info('Enabling HTTP request tracing "X-Request-Id" header');
    this.express.use((req: Request, res: Response, next: NextFunction) => {
      const requestId = req.headers['X-Request-Id'];

      if (requestId) {
        res.append('X-Request-Id', requestId);
      }

      next();
    });

    this.logger.info('Adding HTTP request logging middleware');
    this.express.use((req, res, next) =>
      expressLoggerMiddleware(this.logger, req, res, next),
    );
  }

  private configureExceptionHandling(): void {
    this.logger.info('Adding exception handling middleware');
    const exceptionMiddleware: ErrorRequestHandler = (err, req, res, next) =>
      expressExceptionMiddleware(err, this.logger, req, res, next);
    this.express.use(exceptionMiddleware);

    this.logger.info('Adding server process exception handler');

    this.express.on('error', (err: any) => {
      console.error('ERROR:', err);
      const isManaged = err instanceof Exception;
      const exception = isManaged
        ? err
        : new UnmanagedException(err.name, { cause: err });

      this.logger.exception(exception.toJSON());

      console.error('ERROR:', exception.toJSON());
    });

    // exitHook(error => {
    //   console.log('exitHook');
    //   console.log('error', error);
    //   listener.close(err => {
    //     if (err) {
    //       const isManaged = err instanceof Exception;
    //       const exception = isManaged
    //         ? new Exception(err.message, { cause: err })
    //         : new UnmanagedException(err.name, { cause: err });

    //       logger.exception(exception.toJSON());
    //     } else {
    //       logger.info('HTTP server successfully closed');
    //     }
    //   });
    // });
  }

  private configureOptimizations(): void {
    this.logger.info('Enabling compression');
    this.express.use(compression());
  }

  private enableFileUplaods(): void {
    // TODO: Convert this to use file storage instead of memory
    this.logger.info('Enabling file uploads to memory storage');
    const multerStorage = multer.memoryStorage();
    const upload = multer({ storage: multerStorage }).any();
    this.express.use(upload);
  }

  private setAcceptableContentTypes(): void {
    this.logger.info('Setting acceptable Content-Type to application/json');
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
  }

  private secure() {
    this.logger.info('Disabling insecure HTTP headers');
    this.express.disable('x-powered-by');
    this.express.disable('etag');

    // server.use(helmet());
    // this.logger.info('Initialized Helmet.');

    this.logger.info('Configuring CORS headers');

    this.express.use((req: Request, res: Response, next: NextFunction) => {
      let corsOptions = {};

      if (this.options.trustedOrigins && this.environment?.id) {
        const origins =
          this.options.trustedOrigins?.[this.environment?.id] ?? [];
        this.logger.info(`Allowed origins: [${origins.join(', ')}]`);

        const origin = origins.find(o => o === req.get('origin'));

        this.logger.info(`Whitelisted origin: ${origin}`);

        if (origin) {
          this.logger.info(`Allowing access from origin '${origin}'...`);
          res.setHeader('Access-Control-Allow-Origin', origin);

          corsOptions = {
            credentials: true,
            origin,
            methods: '*',
            allowedHeaders: '*',
          };
        }
      } else {
        corsOptions = {};
      }

      return cors(corsOptions);
    });

    // server.use(allowCrossDomain);
  }

  public async close(
    error?: ProcessException | ProcessSigIntException | ProcessSigTermException,
  ): Promise<void> {
    this.logger.info('💤 Gracefully shutting down server');

    if (error) {
      console.error('UHOHOH', error);
    }

    if (this.listener) {
      await this.listener.close(err => {
        if (err) {
          const exception = new ProcessException(
            `Error shutting down server ${err.name}`,
            {
              cause: err,
              origin: {
                file: 'index.ts',
                function: 'HttpServer.close()',
              },
            },
          );

          this.logger.exception(exception.toJSON());
        }

        try {
          throw new KillProcessException('Shutting down gracefully', {
            origin: {
              file: 'index.ts',
              function: 'HttpServer.close()()',
            },
          });
        } catch (err) {}
      });
    }
  }
}
