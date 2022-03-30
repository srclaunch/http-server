import { Response } from 'express';
import { Exception } from './exception.js';
export declare type ExceptionResponse = {
    code: number;
    description?: string;
    friendlyMessage?: string;
};
export declare class ExceptionRemediator {
    exception?: Exception;
    handleException(err: Exception | Error, { res }: {
        res: Response;
    }): Response<ExceptionResponse>;
    getExceptionResponse(): {
        body: ExceptionResponse;
        code: number;
    } | null;
}
//# sourceMappingURL=remediation.d.ts.map