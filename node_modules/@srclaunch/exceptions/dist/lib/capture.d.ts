import { Logger } from '@srclaunch/logger';
import { Exception } from './exception';
declare type CaptureOptions = {
    readonly logger?: Logger;
};
declare type CaptureResult = {
    readonly success: boolean;
};
export declare function captureError(error: Error | Exception, options?: CaptureOptions): Promise<CaptureResult>;
export {};
//# sourceMappingURL=capture.d.ts.map