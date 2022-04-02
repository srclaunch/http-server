import { ExceptionCode } from '../../../../types/index';
import { ExceptionRemediation } from '../../../../types/remediation';
import { Exception } from '../../../exception';
import { ServiceProviderException } from '../index';
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