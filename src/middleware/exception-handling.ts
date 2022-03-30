import { Exception } from '@srclaunch/exceptions';
import Logger from '@srclaunch/logger';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

// const ExceptionResponseHandler = () => {};

export const exceptionHandlingMiddleware: ErrorRequestHandler = async (
  err: Exception | Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // const logger = new Logger();
  // const exception = new Exception(err.message, { cause: err });
  // logger.exception(exception.toJSON());
  // console.log(err.stack);

  // logException(err, {
  //   data: err.data,
  //   level: LogLevel.Error,
  //   message: err.message,
  //   tags: err.tags,
  //   // @ts-expect-error - it's there just gotta fix this
  //   user_id: req.user.id,
  // });

  // if (err) {
  // switch (err.name) {
  //   case MissingRequestBodyPropertyException.name:
  //   case CognitoNotAuthorizedException.name:
  //   case CognitoExpiredCodeException.name:
  //     return res.status(err.responseCode).json({
  //       exception_code: err.code,
  //       field: err.message,
  //     });
  //   default:
  //     console.log(err);
  //     console.log({
  //       context: err.context,
  //       data: err.data,
  //       level: LogLevel.Error,
  //       message: err.message,
  //       tags: err.tags,
  //       // @ts-expect-error - it's there just gotta fix this
  //       user_id: req.user?.id,
  //     });

  //     return res.status(500).json();
  // }
  // }

  next();
};
