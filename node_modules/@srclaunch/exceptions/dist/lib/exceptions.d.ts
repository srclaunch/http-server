import { ExceptionCode } from '../types/exception.js';
import { Exception } from './exception.js';
export declare const ExceptionMap: {
    [code: number]: typeof Exception;
};
export declare function getExceptionInstance(code: ExceptionCode): typeof Exception | undefined;
//# sourceMappingURL=exceptions.d.ts.map