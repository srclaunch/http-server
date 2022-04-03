import { NextFunction, Request, Response } from 'express';
import { Logger } from '@srclaunch/logger';
import { Exception } from '../../index';
export declare const expressExceptionMiddleware: (err: Exception | Error, logger: Logger, req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=express.d.ts.map