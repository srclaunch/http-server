import { Environment, Platform } from '@srclaunch/types';
import { ProcessException, ProcessSigIntException, ProcessSigTermException } from './exceptions/environments/server/process';
export declare type ExceptionsClientOptions = {
    readonly environment?: Environment;
    readonly platform?: Platform;
    readonly node?: {
        readonly exceptionsHandler?: (exception: ProcessException) => void;
        readonly interuptHandler?: (exception: ProcessSigIntException) => void;
        readonly terminationHandler?: (exception: ProcessSigTermException) => void;
    };
};
export declare class ExceptionsClient {
    private readonly environment?;
    private readonly platform?;
    private readonly node?;
    constructor({ environment, platform, node }: ExceptionsClientOptions);
}
//# sourceMappingURL=client.d.ts.map