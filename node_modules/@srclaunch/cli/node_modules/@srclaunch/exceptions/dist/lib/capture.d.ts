import Logger from '@srclaunch/logger';
import { Exception } from './exception.js';
declare type CaptureOptions = {
    logger?: Logger;
};
declare type CaptureResult = {
    success: boolean;
};
export declare function captureError(error: Error | Exception, options?: CaptureOptions): Promise<CaptureResult>;
export {};
//# sourceMappingURL=capture.d.ts.map