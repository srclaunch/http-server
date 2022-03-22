import { ExceptionCode } from '../../../types/exception.js';
import { Exception } from '../../exception.js';
import { ExceptionRemediation } from '../../../types/remediation';
import { AuthenticationException } from './index.js';
export declare class AuthenticationPasswordResetRequiredException extends AuthenticationException {
    code: ExceptionCode;
    description: string;
    friendlyMessage: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
//# sourceMappingURL=challenges.d.ts.map