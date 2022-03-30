/// <reference types="node" />
import { ExceptionsClient } from '@srclaunch/exceptions';
import Logger from '@srclaunch/logger';
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
    constructor({ endpoints, name, options, }: {
        readonly endpoints: readonly Endpoint[];
        readonly name: string;
        readonly options?: ServerOptions;
    });
    private configure;
    listen(portArg?: number): void;
    private secure;
    gracefulExit(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map