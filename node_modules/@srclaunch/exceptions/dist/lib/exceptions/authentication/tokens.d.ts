import { ExceptionCode } from '../../../types/index.js';
import { ExceptionRemediation } from '../../../types/remediation';
import { Exception } from '../../exception.js';
import { AuthenticationException } from './index.js';
export declare class AuthenticationExpiredAccessTokenException extends AuthenticationException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
/**
 * This exception is thrown when the authentication server encounters an invalid access token.
 */
export declare class AuthenticationInvalidAccessTokenException extends AuthenticationException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class AuthenticationMissingAccessTokenException extends AuthenticationException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class AuthenticationExpiredRefreshTokenException extends AuthenticationException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
/**
 * This exception is thrown when the authentication server encounters an invalid refresh token.
 */
export declare class AuthenticationInvalidRefreshTokenException extends AuthenticationException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class AuthenticationMissingRefreshTokenException extends AuthenticationException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
//# sourceMappingURL=tokens.d.ts.map