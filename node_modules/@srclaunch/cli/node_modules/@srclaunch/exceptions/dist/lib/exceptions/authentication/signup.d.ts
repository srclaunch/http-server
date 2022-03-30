import { ExceptionCode } from '../../../types/index.js';
import { ExceptionRemediation } from '../../../types/remediation';
import { Exception } from '../../../lib/exception.js';
import { AuthenticationException } from './index.js';
export declare class AuthenticationSignupException extends AuthenticationException {
    code: ExceptionCode;
    description: string;
    friendlyMessage: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
//# sourceMappingURL=signup.d.ts.map