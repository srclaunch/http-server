/// <reference types="node" />
import { ExceptionsClient } from '@srclaunch/exceptions';
import Logger from '@srclaunch/logger';
import { Environment } from '@srclaunch/types';
import { Express } from 'express';
import http from 'http';
import { Endpoint } from './types/endpoint';
import { ServerOptions } from './types/server';
export declare class HttpServer {
    endpoints: Endpoint[];
    environment: Environment;
    exceptionsClient: ExceptionsClient;
    listener?: http.Server;
    logger: Logger;
    name: string;
    server: Express;
    options: ServerOptions;
    constructor({ endpoints, name, options, }: {
        endpoints: Endpoint[];
        name: string;
        options?: ServerOptions;
    });
    private configure;
    listen(portArg?: number): void;
    private getSecureOrigins;
    private secure;
    gracefulExit(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map