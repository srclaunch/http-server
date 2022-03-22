import { ProcessException, ProcessSigIntException, ProcessSigTermException } from './exceptions/environments/server/process';
export declare class ExceptionsClient {
    readonly browser?: boolean;
    readonly process?: boolean;
    constructor({ browser, process, processExceptionsHandler, processInteruptHandler, processTerminationHandler, }: {
        readonly browser?: boolean;
        readonly process?: boolean;
        readonly processExceptionsHandler?: (exception: ProcessException) => void;
        readonly processInteruptHandler?: (exception: ProcessSigIntException) => void;
        readonly processTerminationHandler?: (exception: ProcessSigTermException) => void;
    });
}
//# sourceMappingURL=client.d.ts.map