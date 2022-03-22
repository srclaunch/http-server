import { ExceptionCode } from '../../../../../types/index.js';
import { ExceptionRemediation } from '../../../../../types/remediation';
import { Exception } from '../../../../exception.js';
import { AWSException } from '../index.js';
export declare class CognitoException extends AWSException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class CognitoInternalErrorException extends CognitoException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class CognitoInvalidUserPoolConfigurationException extends CognitoException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class CognitoInvalidEmailRoleAccessPolicyException extends CognitoException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class CognitoInvalidSmsRoleAccessPolicyException extends CognitoException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class CognitoInvalidSmsRoleTrustRelationshipException extends CognitoException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class CognitoMissingUserPoolClientIdException extends CognitoException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
}
export declare class CognitoMissingUserPoolIdException extends CognitoException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
}
export declare class CognitoUnexpectedLambdaException extends CognitoException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class CognitoInvalidParameterException extends CognitoException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class CognitoInvalidLambdaResponseException extends CognitoException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class CognitoResourceNotFoundException extends CognitoException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class CognitoUserLambdaValidationException extends CognitoException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
//# sourceMappingURL=index.d.ts.map