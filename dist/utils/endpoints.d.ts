import { Express } from 'express';
import { Endpoint } from '../types/endpoint';
export declare const HealthcheckEndpoint: Endpoint;
export declare function setupEndpoints({ basePath, express, endpoints, }: {
    basePath?: string;
    express: Express;
    endpoints: Endpoint[];
}): Promise<Express>;
//# sourceMappingURL=endpoints.d.ts.map