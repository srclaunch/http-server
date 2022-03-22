import { ExceptionCode } from '../../../types/index.js';
import { ExceptionRemediation } from '../../../types/remediation';
import { Exception } from '../../../lib/exception.js';
import { AuthenticationException } from './index.js';
export declare class AuthenticationMFAMethodNotFoundException extends AuthenticationException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
//# sourceMappingURL=mfa.d.ts.map