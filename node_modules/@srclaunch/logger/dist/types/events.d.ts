import { Model, ModelField, HttpRequest, HttpResponse, ISO8601String } from '@srclaunch/types';
declare type CommonEventProps = {
    created: ISO8601String;
    environment: string;
    id: string;
    pii?: boolean;
};
declare type UserProps = {
    country?: string;
    email?: string;
    id?: string;
    ip_address?: string;
    phone?: string;
    province?: string;
};
declare type CommonExceptionProps = {};
export declare type CriticalEventProps = CommonExceptionProps;
export declare type DataPointEventProps = CommonEventProps & {
    model: {
        name: Model['name'];
        field: ModelField['name'];
    };
    value: number;
};
export declare type DebugEventProps = {
    message: string;
    data?: unknown;
} | string;
export declare type ExceptionEventProps = CommonExceptionProps;
export declare type HttpEventProps = HttpRequest | HttpResponse;
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
    action?: {
        name: string;
    };
    browser?: {
        name?: string;
        version?: string;
    };
    device?: {
        type: DeviceType;
        resolution?: {
            height: number;
            width: number;
        };
    };
    type: AnalyticsEvent;
    referrer?: string;
    request: HttpRequest;
    user?: UserProps;
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
    interaction: SocialMediaInteraction;
    platform: SocialMediaPlatform;
};
export declare type SEOEventProps = CommonEventProps & {
    ranking?: {
        position?: number;
    };
};
export {};
//# sourceMappingURL=events.d.ts.map