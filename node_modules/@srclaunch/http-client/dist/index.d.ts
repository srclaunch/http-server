import { Logger } from '@srclaunch/logger';
import { HttpRequestBody, HttpRequestHeaders, HttpRequestHost, HttpRequestResource, HttpResponse, HttpResponseBody } from '@srclaunch/types';
import { AxiosError } from 'axios';
export type { HttpResponseCodeDetailsType } from './types/http';
export { HttpResponseCodeDetails } from './types/http';
export declare type HttpClientRetryOptions = {
    readonly count?: number;
    readonly delay?: number;
    readonly condition?: (err: AxiosError) => boolean;
};
export interface HttpClientRequestBaseArgs {
    readonly resource: HttpRequestResource;
}
export declare type HttpClientDeleteMethodRequestArgs = HttpClientRequestBaseArgs;
export declare type HttpClientGetMethodRequestArgs = HttpClientRequestBaseArgs;
export declare type HttpClientHeadMethodRequestArgs = HttpClientRequestBaseArgs;
export interface HttpClientPostMethodRequestArgs extends HttpClientRequestBaseArgs {
    readonly body?: HttpRequestBody;
}
export interface HttpClientPutMethodRequestArgs extends HttpClientRequestBaseArgs {
    readonly body?: HttpRequestBody;
}
export declare type HttpClientRequestMethodArgs = HttpClientDeleteMethodRequestArgs | HttpClientGetMethodRequestArgs | HttpClientHeadMethodRequestArgs | HttpClientPostMethodRequestArgs | HttpClientPutMethodRequestArgs;
export declare type HttpClientRequest<T> = (resource: HttpRequestResource, args: HttpClientRequestMethodArgs) => Promise<HttpResponse<T>>;
export declare type HttpClientOptions = {
    readonly basePath?: string;
    readonly host?: HttpRequestHost;
    readonly headers?: HttpRequestHeaders;
    readonly logger?: Logger;
    readonly preAuthResourceIncludes?: string;
    readonly responseType?: 'json' | 'text';
    readonly retry?: HttpClientRetryOptions;
    readonly withCredentials?: boolean;
};
export declare class HttpClient {
    private readonly axiosClient;
    private readonly basePath?;
    private readonly host?;
    private readonly headers?;
    private readonly logger;
    private readonly retry?;
    constructor(options: HttpClientOptions);
    delete<T>(resource: HttpRequestResource, options?: {
        readonly headers?: HttpRequestHeaders;
        readonly retry?: HttpClientRetryOptions;
    }): Promise<HttpResponse<HttpResponseBody<T>>>;
    head(resource: HttpRequestResource, options?: {
        readonly headers?: HttpRequestHeaders;
        readonly retry?: HttpClientRetryOptions;
    }): Promise<HttpResponse<null> | null>;
    get<T>(resource: HttpRequestResource, options?: {
        readonly headers?: HttpRequestHeaders;
        readonly retry?: HttpClientRetryOptions;
    }): Promise<HttpResponse<HttpResponseBody<T>>>;
    patch<T>(resource: HttpRequestResource, options?: {
        readonly headers?: HttpRequestHeaders;
        readonly retry?: HttpClientRetryOptions;
    }): Promise<HttpResponse<HttpResponseBody<T>>>;
    post<T>(resource: HttpRequestResource, body?: HttpRequestBody, options?: {
        readonly headers?: HttpRequestHeaders;
        readonly retry?: HttpClientRetryOptions;
    }): Promise<HttpResponse<HttpResponseBody<T>>>;
    put<T>(resource: HttpRequestResource, body?: HttpRequestBody, options?: {
        readonly headers?: HttpRequestHeaders;
        readonly retry?: HttpClientRetryOptions;
    }): Promise<HttpResponse<HttpResponseBody<T>>>;
    private request;
    private getResponse;
}
//# sourceMappingURL=index.d.ts.map