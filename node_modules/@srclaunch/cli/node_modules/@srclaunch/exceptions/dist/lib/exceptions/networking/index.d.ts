import { Exception } from '../../exception.js';
import { ExceptionCode } from '../../../types/index.js';
/*********************************/
/*********************************/
export declare class NetworkException extends Exception {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
}
//# sourceMappingURL=index.d.ts.map