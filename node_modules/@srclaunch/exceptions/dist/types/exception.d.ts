import { FormValidationProblem, HttpRequest, LogLevel, Model, ModelField, ModelValidationProblem, Task } from '@srclaunch/types';
import { Exception } from '../lib/exception';
import { ExceptionRemediation } from './remediation';
export declare enum ExceptionCode {
    Warning = 999,
    Exception = 1000,
    UnmanagedException = 1001,
    CaughtException = 1002,
    UncaughtException = 1003,
    UnhandledPromiseRejectionException = 1004,
    AuthenticationException = 2000,
    AuthenticationExpiredAccessTokenException = 2001,
    AuthenticationInvalidAccessTokenException = 2002,
    AuthenticationMissingAccessTokenException = 2003,
    AuthenticationExpiredRefreshTokenException = 2004,
    AuthenticationInvalidRefreshTokenException = 2005,
    AuthenticationMissingRefreshTokenException = 2006,
    AuthenticationMissingDeviceKeyException = 2007,
    AuthenticationUnAuthorizedAccessException = 2008,
    AuthenticationCodeMismatchException = 2009,
    AuthenticationExpiredCodeException = 2010,
    AuthenticationLoginException = 2011,
    AuthenticationLoginInvalidCredentialsException = 2012,
    AuthenticationLoginTooManyFailedAttemptsException = 2013,
    AuthenticationLimitExceededException = 2014,
    AuthenticationUnauthorizedAccessException = 2015,
    AuthenticationTooManyRequestsException = 2016,
    AuthenticationUserNotFoundException = 2017,
    AuthenticationSignupException = 2018,
    AuthenticationUsernameAvailabilityCheckException = 2019,
    AuthenticationUsernameExistsException = 2020,
    AuthenticationAliasExistException = 2021,
    AuthenticationCodeDeliveryFailureException = 2022,
    AuthenticationMFAMethodNotFoundException = 2023,
    AuthenticationNotAuthorizedException = 2024,
    AuthenticationPasswordResetRequiredException = 2025,
    AuthenticationUserNotConfirmedException = 2026,
    DatabaseException = 3000,
    SequelizeNotInitializedException = 3001,
    ProcessException = 4000,
    ProcessWarningException = 4001,
    KillProcessException = 4002,
    FatalException = 4003,
    ProcessSigTermException = 4004,
    ProcessSigIntException = 4005,
    MissingEnvironmentVariable = 4006,
    NetworkException = 5000,
    HttpException = 5001,
    HttpRequestException = 5002,
    HttpRequestResourceNotFoundException = 5003,
    HttpResponseException = 5004,
    ServiceProviderException = 6000,
    AWSException = 6001,
    AWSMissingAccessKeyException = 6002,
    AWSMissingSecretKeyException = 6003,
    CognitoException = 6004,
    CognitoInternalErrorException = 6005,
    CognitoInvalidEmailRoleAccessPolicyException = 6006,
    CognitoInvalidLambdaResponseException = 6007,
    CognitoUserLambdaValidationException = 6008,
    CognitoInvalidParameterException = 6009,
    CognitoInvalidSmsRoleAccessPolicyException = 6010,
    CognitoInvalidSmsRoleTrustRelationshipException = 6011,
    CognitoInvalidUserPoolConfigurationException = 6012,
    CognitoResourceNotFoundException = 6013,
    CognitoMissingUserPoolClientIdException = 6014,
    CognitoMissingUserPoolIdException = 6015,
    CognitoUnexpectedLambdaException = 6016,
    StripeException = 6017,
    StripeMissingSecretKeyException = 6018,
    StripeSubscriptionCreationFailedException = 6019,
    StripePaymentMethodRequiredException = 6020,
    UserException = 7000,
    NullUserException = 7001,
    UserStateConflictException = 7002,
    NullAccountException = 7003,
    ValidationException = 8000,
    InvalidTypeException = 8001,
    MissingArgumentException = 8002,
    MissingPropertyException = 8003,
    InvalidArgumentException = 8004,
    InvalidPropertyException = 8005,
    MissingRequestBodyPropertyException = 8006,
    MissingRequestUrlParameterException = 8007,
    MissingCookieException = 8008
}
/**
 *
 * Base exception and inherited classes constructor arguments
 * @constructor
 * @arg {Record<string, unknown>} context - Contextual data related to the exception that can be used for debugging
 * @arg {string} file - The file the exception originated in. Useful for debugging.
 * @arg {string} func - The function or method the exception originated in. Useful for debugging.
 * @arg {string} description - A developer friendly description of the exception.
 * @arg {Model['id']} model.id - The unique id of the model associated with the exception.
 * @arg {Model['type']} model.type - The type of model associated with the exception.
 * @arg {Record<string,string>} request.headers - The request headers.
 * @arg {string} field - The name of the field as passed in the request if a validation error occurs.
 * @arg {string} request.id - A unique ID associated with the request used for tracing the exception.
 * @arg {any} request.body - The body payload of the request.
 * @arg {Record<string,string>} request.headers - The request headers.
 * @arg {string} request.host - The HTTP host the requested resource is accessible from.
 * @arg {string} request.method - The request's HTTP method.
 * @arg {string} request.resource - The HTTP resource being requested.
 * @arg {any} response.body - The response body payload.
 * @arg {HttpResponseCode} response.code - The HTTP response status code.
 * @arg {HttpResponseCodeDetails} response.details - The headers returned from the response.
 * @arg {Record<string,string>} response.headers - The headers returned from the response.
 * @arg {string} request.method - The request's HTTP method.
 * @arg {string} request.resource - The HTTP resource being requested.
 * @arg {string} scope - Higher-level scope of the exception.
 * @arg {ExceptionRemediation} remediation - Recommended remediation details.
 * @arg {Record<string, unknown>} tags - Key/value tags associated with an exception.
 * @arg {Task['id']} task.id - The unique id of a Task associated with the exception.
 * @arg {string} user.email - The user's email address.
 * @arg {string} user.phone - The user's telephone number.
 */
export declare type ExceptionConstructorArgs = {
    cause?: Exception | Error;
    context?: Record<string, unknown>;
    data?: unknown;
    description?: string;
    model?: {
        name: Model['name'];
        field?: ModelField['name'];
        problem?: ModelValidationProblem;
    };
    form?: {
        field?: string;
        problem?: FormValidationProblem;
    };
    friendlyMessage?: string;
    logLevel?: LogLevel.Critical | LogLevel.Exception | LogLevel.Warning;
    origin?: {
        block?: string;
        file?: string;
        function?: string;
    };
    pii?: boolean;
    request?: HttpRequest;
    response?: {
        status?: {
            code: number;
        };
    };
    scope?: string;
    remediation?: ExceptionRemediation;
    tags?: Record<string, unknown>;
    task?: {
        id: Task['id'];
    };
    user?: {
        id?: string;
        email?: string;
        phone?: string;
    };
};
export declare type ExceptionObject = ExceptionConstructorArgs & {
    created: string;
    id?: string;
    name?: string;
    stack?: string;
    message?: string;
    code?: string;
};
//# sourceMappingURL=exception.d.ts.map