import { HttpRequest, HttpResponse, ISO8601String, Model, ModelField } from '@srclaunch/types';
declare type CommonEventProps = {
    readonly created: ISO8601String;
    readonly environment: string;
    readonly id: string;
    readonly pii?: boolean;
};
declare type UserProps = {
    readonly country?: string;
    readonly email?: string;
    readonly id?: string;
    readonly ip_address?: string;
    readonly phone?: string;
    readonly province?: string;
};
declare type CommonExceptionProps = {};
export declare type CriticalEventProps = CommonExceptionProps;
export declare type DataPointEventProps = CommonEventProps & {
    readonly model: {
        readonly name: Model['name'];
        readonly field: ModelField['name'];
    };
    readonly value: number;
};
export declare type DebugEventProps = {
    readonly message: string;
    readonly data?: unknown;
};
export declare type ExceptionEventProps = CommonExceptionProps;
export declare type HttpEventProps = {
    readonly request?: HttpRequest;
    readonly response?: HttpResponse;
};
export declare type InfoEventProps = string;
export declare type WarningEventProps = CommonExceptionProps;
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
    readonly user?: UserProps;
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
export {};
//# sourceMappingURL=events.d.ts.map