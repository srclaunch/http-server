import { Exception, UnmanagedException } from '@srclaunch/exceptions';
import Logger from '@srclaunch/logger';
import exitHook from 'async-exit-hook';
import { Express, NextFunction, Request, Response } from 'express';
import http from 'http';

import { exceptionHandlingMiddleware } from '../middleware/exception-handling';

const logger = new Logger();

export function configureExceptionHandling(
  server: Express,
  listener: http.Server,
): void {
  logger.info('Configuring error handling logic...');

  server.use((req: Request, res: Response, next: NextFunction) => {
    const requestId = req.headers['X-Request-Id'];

    if (requestId) {
      res.append('X-Request-Id', requestId);
    }

    next();
  });

  logger.info('Enabled HTTP request ID tracing.');

  server.use(exceptionHandlingMiddleware);
  logger.info('Error handling middleware initialized.');

  server.on('error', (err: any) => {
    console.error('ERROR:', err);
    const isManaged = err instanceof Exception;
    const exception = isManaged
      ? err
      : new UnmanagedException(err.name, { cause: err });

    logger.exception(exception.toJSON());

    console.error('ERROR:', exception.toJSON());
  });

  exitHook(error => {
    console.log('exitHook');
    console.log('error', error);
    listener.close(err => {
      if (err) {
        const isManaged = err instanceof Exception;
        const exception = isManaged
          ? new Exception(err.message, { cause: err })
          : new UnmanagedException(err.name, { cause: err });

        logger.exception(exception.toJSON());
      } else {
        logger.info('HTTP server successfully closed');
      }
    });
  });
}
