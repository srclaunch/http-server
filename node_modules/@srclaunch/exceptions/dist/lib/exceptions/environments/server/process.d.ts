import { Exception } from '../../../exception.js';
import { ExceptionCode } from '../../../../types/index.js';
export declare class ProcessException extends Exception {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
}
export declare class ProcessWarningException extends ProcessException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
}
export declare class KillProcessException extends ProcessException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
}
export declare class ProcessSigTermException extends ProcessException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
}
export declare class ProcessSigIntException extends ProcessException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
}
export declare class FatalException extends ProcessException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
}
export declare class MissingEnvironmentVariable extends ProcessException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
}
//# sourceMappingURL=process.d.ts.map