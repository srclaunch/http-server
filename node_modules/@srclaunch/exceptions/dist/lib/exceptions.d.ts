import { ExceptionCode } from '../types/exception';
import { Exception } from './exception';
export declare const ExceptionMap: {
    readonly [code: number]: typeof Exception;
};
export declare function getExceptionInstance(code: ExceptionCode): typeof Exception | undefined;
//# sourceMappingURL=exceptions.d.ts.map