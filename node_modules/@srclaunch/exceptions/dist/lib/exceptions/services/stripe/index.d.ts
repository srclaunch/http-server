import { ExceptionCode } from '../../../../types/index.js';
import { ExceptionRemediation } from '../../../../types/remediation';
import { Exception } from '../../../exception.js';
import { ServiceProviderException } from '../index.js';
/*********************/
/*********************/
export declare class StripeException extends ServiceProviderException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class StripeMissingSecretKeyException extends StripeException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class StripeSubscriptionCreationFailedException extends StripeException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class StripePaymentMethodRequiredException extends StripeException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
//# sourceMappingURL=index.d.ts.map