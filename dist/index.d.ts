/// <reference types="node" />
import { ProcessException, ProcessSigIntException, ProcessSigTermException } from '@srclaunch/exceptions';
import { Logger } from '@srclaunch/logger';
import { Environment } from '@srclaunch/types';
import { Express } from 'express';
import http from 'node:http';
import { Endpoint } from './types/endpoint';
import { ServerOptions } from './types/server';
export declare class HttpServer {
    readonly endpoints: Endpoint[];
    readonly environment: Environment;
    listener?: http.Server;
    readonly logger: Logger;
    name: string;
    server: Express;
    readonly options: ServerOptions;
    constructor({ endpoints, environment, logger, name, options, }: {
        readonly endpoints: Endpoint[];
        readonly environment: Environment;
        readonly logger?: Logger;
        readonly name: string;
        readonly options?: ServerOptions;
    });
    listen(portArg?: number): Promise<http.Server>;
    private configure;
    private configureLogging;
    private configureExceptionHandling;
    private configureOptimizations;
    private enableFileUplaods;
    private setAcceptableContentTypes;
    private secure;
    close(error?: ProcessException | ProcessSigIntException | ProcessSigTermException): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map