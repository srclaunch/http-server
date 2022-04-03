import { Environment } from '@srclaunch/types';
import { AnalyticsEventProps, CriticalEventProps, DebugEventProps, LogEvent, ExceptionEventProps, HttpEventProps, InfoEventProps, WarningEventProps } from '../types/events';
import { LoggerConfig } from '../types/index';
export declare class Logger {
    private level;
    readonly environment?: Environment;
    constructor(config?: LoggerConfig);
    analytics(props: AnalyticsEventProps): LogEvent;
    critical({ cause, id, message, ...eventArgs }: CriticalEventProps): LogEvent;
    debug({ data, message, ...eventArgs }: DebugEventProps): LogEvent;
    exception({ message, cause, id, ...eventArgs }: ExceptionEventProps): LogEvent;
    http({ request, response, ...eventArgs }: HttpEventProps): LogEvent;
    info(message: InfoEventProps): LogEvent;
    warning({ cause, id, message, ...eventArgs }: WarningEventProps): LogEvent;
    private getCommonProps;
}
//# sourceMappingURL=logger.d.ts.map