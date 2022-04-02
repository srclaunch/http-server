/// <reference types="node" />
import { ExceptionsClient, ProcessException, ProcessSigIntException, ProcessSigTermException } from '@srclaunch/exceptions';
import { Logger } from '@srclaunch/logger';
import { Environment } from '@srclaunch/types';
import { Express } from 'express';
import http from 'node:http';
import { Endpoint } from './types/endpoint';
import { ServerOptions } from './types/server';
export declare class HttpServer {
    readonly endpoints: readonly Endpoint[];
    readonly environment: Environment;
    readonly exceptionsClient: ExceptionsClient;
    listener?: http.Server;
    readonly logger: Logger;
    name: string;
    server: Express;
    readonly options: ServerOptions;
    constructor({ endpoints, environment, name, options, }: {
        readonly endpoints: readonly Endpoint[];
        readonly environment: Environment;
        readonly name: string;
        readonly options?: ServerOptions;
    });
    private configure;
    listen(portArg?: number): Promise<void>;
    private secure;
    gracefulExit(error: ProcessException | ProcessSigIntException | ProcessSigTermException): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map