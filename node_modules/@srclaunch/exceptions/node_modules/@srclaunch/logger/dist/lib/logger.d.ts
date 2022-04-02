import { AnalyticsEventProps, CriticalEventProps, DebugEventProps, ExceptionEventProps, HttpEventProps, InfoEventProps, WarningEventProps } from '../types/events';
import { LoggerConfig } from '../types/index';
export declare class Logger {
    analytics(props: AnalyticsEventProps): void;
    critical(props: CriticalEventProps): void;
    debug(props: DebugEventProps): void;
    exception(props: ExceptionEventProps): Promise<void>;
    http(props: HttpEventProps): void;
    info(props: InfoEventProps): Promise<void>;
    warning(props: WarningEventProps): void;
    constructor(config?: LoggerConfig);
}
export default Logger;
//# sourceMappingURL=logger.d.ts.map