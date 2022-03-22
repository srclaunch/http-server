import { Exception } from '../../exception.js';
import { ExceptionCode } from '../../../types/index.js';
/******************************************************/
/******************************************************/
export declare class UserException extends Exception {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
}
export declare class NullUserException extends UserException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
}
export declare class UserStateConflictException extends UserException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
}
//# sourceMappingURL=index.d.ts.map