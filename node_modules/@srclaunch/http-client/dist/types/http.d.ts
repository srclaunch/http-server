import { HttpResponseCode } from '@srclaunch/types';
export declare type HttpResponseCodeDetailsType = {
    [key in HttpResponseCode]: {
        failure: boolean;
        retryable: boolean;
    };
};
/**
 * Hypertext Transfer Protocol (HTTP) response status codes.
 * @see {@link https://en.wikipedia.org/wiki/List_of_HTTP_status_codes}
 */
export declare const HttpResponseCodeDetails: HttpResponseCodeDetailsType;
//# sourceMappingURL=http.d.ts.map