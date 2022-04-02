import {
  // AuthenticationExpiredAccessTokenException,
  Exception,
  UnmanagedException,
} from '@srclaunch/exceptions';
import { Logger } from '@srclaunch/logger';
// import { getEnvironmentVariable } from '@srclaunch/environment';
import { NextFunction, Request, Response } from 'express';

// import jwt, { JwtHeader, Secret, SigningKeyCallback } from 'jsonwebtoken';
// import jwksClient, { SigningKey } from 'jwks-rsa';

const logger = new Logger();

export default function (req: Request, res: Response, next: NextFunction) {
  // const awsRegion = import.meta.env.AWS_REGION?.toString();
  // const cognitoUserPoolId = import.meta.env.COGNITO_USER_POOL_ID?.toString();

  // const client = jwksClient({
  //   // Default value
  //   jwksUri: `https://cognito-idp.${awsRegion}.amazonaws.com/${cognitoUserPoolId}/.well-known/jwks.json`,
  // });

  // function getKey(header: JwtHeader, callback: SigningKeyCallback) {
  //   client.getSigningKey(header.kid, (err: Error | null, key: SigningKey) => {
  //     if (err) {
  //       callback(err);

  //       return null;
  //     }

  //     if (!key) {
  //       return res.status(403).send({
  //         error: true,
  //         errorType: 'TOKEN_EXPIRATION',
  //       });
  //     }

  //     const signingKey: Secret = key.getPublicKey();

  //     callback(null, signingKey);

  //     return null;
  //   });
  // }

  try {
    //   // look for an authorization header or auth_token in the cookies
    //   const accessToken = req.headers?.authorization; // Express headers are auto converted to lowercase

    //   if (accessToken && accessToken.startsWith('Bearer ')) {
    //     // Remove Bearer from string
    //     const userToken = accessToken.slice(7, accessToken.length);
    //     // const decodedUserToken = jwt.decode(userToken, { complete: true });

    //     jwt.verify(userToken, getKey, {}, async err => {
    //       if (!err) {
    //         // const cognitoUserId = decodedUserToken.payload.username;
    //         // const userObj = await getUserByCognitoId(cognitoUserId);
    //         // if (userObj) {
    //         //   req.user = userObj;
    //         // }
    //         return 'test';
    //       }

    //       switch (err.name) {
    //         case 'TokenExpiredError':
    //           throw new AuthenticationExpiredAccessTokenException(
    //             'Access token has expired.',
    //             {
    //               cause: err,
    //               tags: {
    //                 file: 'middleware/auth-middleware.ts',
    //               },
    //             },
    //           );
    //         default:
    //           throw err;
    //       }
    //     });
    //   }

    return next();
  } catch (err: any) {
    const isManaged = err instanceof Exception;
    const exception = isManaged
      ? err
      : new UnmanagedException(err.name, { cause: err });

    logger.exception(exception.toJSON());
  }

  return next();
}
