import { Exception } from '../../exception.js';
import { ExceptionCode } from '../../../types/index.js';
import { ExceptionRemediation } from '../../../types/remediation';
/*************************/
/*************************/
export declare class ValidationException extends Exception {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class InvalidTypeException extends Exception {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class MissingArgumentException extends Exception {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class MissingPropertyException extends Exception {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class InvalidArgumentException extends Exception {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class InvalidPropertyException extends Exception {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
//# sourceMappingURL=index.d.ts.map