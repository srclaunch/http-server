import { Exception, ExceptionRemediator } from '@srclaunch/exceptions';
import { Logger } from '@srclaunch/logger';
import { HttpRequestMethod } from '@srclaunch/types';
import { Express, NextFunction, Request, Response } from 'express';

import { Endpoint } from '../types/endpoint';

const logger = new Logger();

const remediator = new ExceptionRemediator();

export const HealthcheckEndpoint: Endpoint = {
  handler: (req: Request, res: Response) => {
    return res.sendStatus(200);
  },
  method: HttpRequestMethod.Get,
  route: '/healthcheck',
};

const exceptionWrapper = async (
  req: Request,
  res: Response,
  cb: (q: Request, s: Response) => Endpoint['handler'],
) => {
  try {
    return await cb(req, res);
  } catch (err: any) {
    const exception = new Exception(`Caught Exception ${err.name}`, {
      cause: err,
      tags: {
        file: 'utils/endpoints.js',
        func: 'exceptionWrapper()',
        type: 'CaughtException',
      },
    });

    console.log('exception in exceptionWrapper', exception.toJSON());

    logger.exception(exception.toJSON());

    return remediator.handleException(err, { res });
  }
};

export async function setupEndpoints({
  basePath,
  server,
  endpoints,
}: {
  basePath?: string;
  server: Express;
  endpoints: Endpoint[];
}): Promise<Express> {
  for (const endpoint of endpoints) {
    server[endpoint.method](
      `${basePath}${endpoint.route}`,
      async (req: Request, res: Response) =>
        await exceptionWrapper(req, res, endpoint.handler),
    );
  }

  server[HttpRequestMethod.Get](
    '/healthcheck',
    async (req: Request, res: Response) =>
      await exceptionWrapper(req, res, HealthcheckEndpoint.handler),
  );

  return server;
}
