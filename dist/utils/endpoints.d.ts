import { HttpRequestMethod } from '@srclaunch/types';
import { Express, Request, Response } from 'express';
import { Endpoint } from '../types/endpoint';
export declare const HealthcheckEndpoint: {
    handler: (req: Request, res: Response) => Response<any, Record<string, any>>;
    method: HttpRequestMethod;
    route: string;
};
export declare function setupEndpoints({ basePath, server, endpoints, }: {
    basePath?: string;
    server: Express;
    endpoints: Endpoint[];
}): Express;
//# sourceMappingURL=endpoints.d.ts.map