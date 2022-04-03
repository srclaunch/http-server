import { HttpRequest, HttpResponse, ISO8601String, Model, ModelField } from '@srclaunch/types';
import { ExceptionObject } from '@srclaunch/exceptions';
export declare type LogEvent = {
    readonly context?: Record<string, unknown>;
    readonly created: ISO8601String;
    readonly environment?: string;
    readonly id: string;
    readonly message?: string;
    readonly pii?: boolean;
    readonly source?: string;
};
export declare type CommonEventProps = Omit<LogEvent, 'id' | 'created'>;
export declare type CriticalEventProps = CommonEventProps & ExceptionObject;
export declare type DataPointEventProps = CommonEventProps & {
    readonly model: {
        readonly name: Model['name'];
        readonly field: ModelField['name'];
    };
    readonly value: number;
};
export declare type ExceptionEventProps = CommonEventProps & ExceptionObject;
export declare type DebugEventProps = CommonEventProps & {
    readonly message: string;
    readonly data?: unknown;
};
export declare type HttpEventProps = CommonEventProps & {
    readonly request?: HttpRequest;
    readonly response?: HttpResponse;
};
export declare type InfoEventProps = string;
export declare type WarningEventProps = CommonEventProps & ExceptionObject;
export declare enum AnalyticsEvent {
    Action = "action",
    PageEvent = "page-event",
    PageLeave = "page-leave",
    PageView = "page-view",
    UserIdentified = "user-identified"
}
export declare enum DeviceType {
    Desktop = "desktop",
    Mobile = "mobile",
    Web = "web"
}
export declare type AnalyticsEventProps = {
    readonly action?: {
        readonly name: string;
    };
    readonly browser?: {
        readonly name?: string;
        readonly version?: string;
    };
    readonly device?: {
        readonly type: DeviceType;
        readonly resolution?: {
            readonly height: number;
            readonly width: number;
        };
    };
    readonly type: AnalyticsEvent;
    readonly referrer?: string;
    readonly request: HttpRequest;
};
export declare enum SocialMediaPlatform {
    Facebook = "facebook",
    Instagram = "instagram",
    LinkedIn = "linked-in",
    TikTok = "tik-tok",
    Twitter = "twitter"
}
export declare enum SocialMediaInteraction {
    Follow = "follow",
    Like = "like"
}
export declare type SocialMediaAnalyticsEventProps = CommonEventProps & {
    readonly interaction: SocialMediaInteraction;
    readonly platform: SocialMediaPlatform;
};
export declare type SEOEventProps = CommonEventProps & {
    readonly ranking?: {
        readonly position?: number;
    };
};
//# sourceMappingURL=events.d.ts.map