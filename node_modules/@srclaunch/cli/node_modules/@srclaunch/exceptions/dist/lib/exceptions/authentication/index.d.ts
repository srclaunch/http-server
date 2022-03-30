import { Exception } from '../../exception.js';
import { ExceptionCode } from '../../../types/index.js';
import { ExceptionRemediation } from '../../../types/remediation';
export declare class AuthenticationException extends Exception {
    code: ExceptionCode;
    description: string;
    friendlyMessage: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class AuthenticationUnauthorizedAccessException extends AuthenticationException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class AuthenticationLimitExceededException extends AuthenticationException {
    code: ExceptionCode;
    description: string;
    friendlyMessage: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class AuthenticationNotAuthorizedException extends AuthenticationException {
    code: ExceptionCode;
    description: string;
    friendlyMessage: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class AuthenticationTooManyRequestsException extends AuthenticationException {
    code: ExceptionCode;
    description: string;
    friendlyMessage: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class AuthenticationUserNotFoundException extends AuthenticationException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
//# sourceMappingURL=index.d.ts.map