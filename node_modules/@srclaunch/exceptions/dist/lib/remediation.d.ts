import { Response } from 'express';
import { Exception } from './exception';
export declare type ExceptionResponse = {
    readonly code: number;
    readonly description?: string;
    readonly friendlyMessage?: string;
};
export declare class ExceptionRemediator {
    private exception?;
    handleException(err: Exception | Error, { res }: {
        readonly res: Response;
    }): Response<ExceptionResponse>;
    getExceptionResponse(): {
        readonly body: ExceptionResponse;
        readonly code: number;
    } | null;
}
//# sourceMappingURL=remediation.d.ts.map