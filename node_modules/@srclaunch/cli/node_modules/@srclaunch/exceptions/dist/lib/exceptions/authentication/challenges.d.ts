import { ExceptionCode } from '../../../types/exception.js';
import { ExceptionRemediation } from '../../../types/remediation';
import { Exception } from '../../exception.js';
import { AuthenticationException } from './index.js';
export declare class AuthenticationPasswordResetRequiredException extends AuthenticationException {
    readonly code = ExceptionCode.AuthenticationPasswordResetRequiredException;
    readonly description = "This exception is thrown when a password reset is required.";
    readonly friendlyMessage = "A password reset is required in order to login.";
    readonly logLevel: Exception['logLevel'];
    readonly remediation: ExceptionRemediation;
}
//# sourceMappingURL=challenges.d.ts.map