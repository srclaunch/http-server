import { HttpRequestMethod } from '@srclaunch/types';
import { Request, Response } from 'express';
export declare type Endpoint = {
    handler: (req: Request, res: Response) => any;
    method: HttpRequestMethod;
    route: string;
};
//# sourceMappingURL=endpoint.d.ts.map