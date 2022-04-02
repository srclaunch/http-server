import { ProcessSigIntException, ProcessSigTermException, ProcessWarningException } from './exceptions/environments/server/process';
import { UncaughtException, UnhandledPromiseRejectionException } from './exceptions/index';
export declare function handleProcessInterupt(cb?: (exception: ProcessSigIntException) => unknown): void;
export declare function handleProcessTermination(cb?: (exception: ProcessSigTermException) => unknown): void;
export declare function handleProcessExceptions(cb?: (err: UncaughtException | UnhandledPromiseRejectionException | ProcessWarningException) => unknown): void;
//# sourceMappingURL=process.d.ts.map