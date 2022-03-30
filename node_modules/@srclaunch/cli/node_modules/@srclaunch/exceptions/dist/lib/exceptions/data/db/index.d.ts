import { Exception } from '../../../exception.js';
import { ExceptionCode } from '../../../../types/index.js';
/*******************************/
/*******************************/
export declare class DatabaseException extends Exception {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
}
//# sourceMappingURL=index.d.ts.map