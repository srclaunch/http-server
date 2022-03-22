import { ExceptionCode } from '../../../types/index.js';
import { ExceptionRemediation } from '../../../types/remediation';
import { Exception } from '../../../lib/exception.js';
import { AuthenticationException } from './index.js';
export declare class AuthenticationCodeDeliveryFailureException extends AuthenticationException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class AuthenticationCodeMismatchException extends AuthenticationException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class AuthenticationExpiredCodeException extends AuthenticationException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class AuthenticationUserNotConfirmedException extends AuthenticationException {
    code: ExceptionCode;
    description: string;
    friendlyMessage: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
//# sourceMappingURL=verification.d.ts.map