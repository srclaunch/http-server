import { ExceptionRemediator } from '@srclaunch/exceptions';
import Logger from '@srclaunch/logger';
import { HttpRequestMethod } from '@srclaunch/types';
import { Express, Request, Response } from 'express';

import { Endpoint } from '../types/endpoint';

const logger = new Logger();

const remediator = new ExceptionRemediator();

export const HealthcheckEndpoint = {
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
    // logger.exception(`Caught Exception ${err.name}`, err, {
    //   tags: {
    //     file: 'utils/endpoints.js',
    //     func: 'exceptionWrapper()',
    //     type: 'CaughtException',
    //   },
    // });

    return remediator.handleException(err, { res });
  }
};

export function setupEndpoints({
  basePath,
  server,
  endpoints,
}: {
  basePath?: string;
  server: Express;
  endpoints: Endpoint[];
}): Express {
  logger.info('Attaching network endpoints...');

  for (const endpoint of endpoints) {
    server[endpoint.method](
      `${basePath}${endpoint.route}`,
      async (req: Request, res: Response) =>
        await exceptionWrapper(req, res, endpoint.handler),
    );
  }

  return server;
}
