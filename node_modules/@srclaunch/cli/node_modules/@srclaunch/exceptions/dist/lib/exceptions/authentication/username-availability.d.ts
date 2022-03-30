import { ExceptionCode } from '../../../types/index.js';
import { ExceptionRemediation } from '../../../types/remediation';
import { Exception } from '../../exception.js';
import { AuthenticationException } from './index.js';
export declare class AuthenticationUsernameAvailabilityCheckException extends AuthenticationException {
    code: ExceptionCode;
    description: string;
    friendlyMessage: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class AuthenticationUsernameExistsException extends AuthenticationUsernameAvailabilityCheckException {
    code: ExceptionCode;
    description: string;
    friendlyMessage: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class AuthenticationAliasExistException extends AuthenticationUsernameAvailabilityCheckException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
//# sourceMappingURL=username-availability.d.ts.map