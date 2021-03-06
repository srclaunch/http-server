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
  express,
  endpoints,
}: {
  basePath?: string;
  express: Express;
  endpoints: Endpoint[];
}): Promise<Express> {
  for (const endpoint of endpoints) {
    express[endpoint.method](
      `${basePath}${endpoint.route}`,
      async (req: Request, res: Response) =>
        await exceptionWrapper(req, res, endpoint.handler),
    );
    express.options(
      `${basePath}${endpoint.route}`,
      async (req: Request, res: Response) => res.sendStatus(200),
    );
  }

  express[HttpRequestMethod.Get]('/healthcheck', HealthcheckEndpoint.handler);
  express.options('/healthcheck', (req, res) => res.sendStatus(200));

  return express;
}
