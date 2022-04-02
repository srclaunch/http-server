import { Environment } from '@srclaunch/types';
import { AnalyticsEventProps, CriticalEventProps, DebugEventProps, ExceptionEventProps, HttpEventProps, InfoEventProps, WarningEventProps } from '../types/events';
import { LoggerConfig } from '../types/index';
export declare class Logger {
    private readonly level;
    readonly environment?: Environment;
    analytics(props: AnalyticsEventProps): void;
    critical(props: CriticalEventProps): void;
    debug(props: DebugEventProps): void;
    exception(props: ExceptionEventProps): void;
    http(props: HttpEventProps): void;
    info(props: InfoEventProps): void;
    warning(props: WarningEventProps): void;
    private getCommonProps;
    constructor(config?: LoggerConfig);
}
//# sourceMappingURL=logger.d.ts.map