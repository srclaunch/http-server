import { ServiceProviderException } from '../index.js';
import { ExceptionCode } from '../../../../types/index.js';
import { Exception } from '../../../exception.js';
import { ExceptionRemediation } from '../../../../types/remediation';
export declare class AWSException extends ServiceProviderException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class AWSMissingAccessKeyException extends AWSException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class AWSMissingSecretKeyException extends AWSException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
//# sourceMappingURL=index.d.ts.map