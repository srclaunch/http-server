import { Exception } from '../exception.js';
import { ExceptionCode } from '../../types/index.js';
import { ExceptionRemediation } from '../../types/remediation';
export declare class Warning extends Exception {
    code: ExceptionCode;
    description: string;
    friendlyMessage: string;
    remediation: ExceptionRemediation;
}
export declare class UnmanagedException extends Exception {
    code: ExceptionCode;
    description: string;
    friendlyMessage: string;
    remediation: ExceptionRemediation;
}
export declare class CaughtException extends Exception {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class UncaughtException extends Exception {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class UnhandledPromiseRejectionException extends Exception {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
//# sourceMappingURL=index.d.ts.map