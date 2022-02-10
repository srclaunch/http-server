import { HttpRequestMethod } from '@srclaunch/types';
import { Request, Response } from 'express';

// interface EndpointHandlerCallbackParams {
//   req: Request;
//   res: Response;
// }
export type Endpoint = {
  handler: (req: Request, res: Response) => any;
  method: HttpRequestMethod;
  route: string;
};
