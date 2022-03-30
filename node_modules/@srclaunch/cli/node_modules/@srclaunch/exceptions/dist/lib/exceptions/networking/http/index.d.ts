import { ExceptionCode } from '../../../../types/index.js';
import { ExceptionRemediation } from '../../../../types/remediation';
import { Exception } from '../../../exception.js';
import { NetworkException } from '../index.js';
export declare class HttpException extends NetworkException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class HttpRequestException extends HttpException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class HttpRequestResourceNotFoundException extends HttpRequestException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
/**
 * @class Class used when a request's body is missing an object property.
 */
export declare class MissingRequestBodyPropertyException extends HttpRequestException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class MissingRequestUrlParameterException extends HttpRequestException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class MissingCookieException extends HttpRequestException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
export declare class HttpResponseException extends HttpException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
//# sourceMappingURL=index.d.ts.map