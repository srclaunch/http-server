import { FormValidationProblem, HttpRequest, ISO8601String, LogLevel, Model, ModelField, ModelValidationProblem, Task } from '@srclaunch/types';
import { ExceptionCode, ExceptionConstructorArgs, ExceptionObject } from '../types/exception';
import { ExceptionRemediation } from '../types/remediation';
/**
 * @class
 * This is the base class used for all exceptions caught and thrown in .
 *
 * @constructor
 * @param {string} message - Generally the entity ID associated with the failure
 * @param {Error} cause - The original thrown error, of which the stack trace will be used instead of `this`.
 * @param {ExceptionBaseConstructorArgs} ...rest
 *
 * @property {Date} created - Date and time the exception was thrown.
 * @property {string} block - asdf
 *
 */
export declare class Exception extends Error {
    readonly cause?: Exception | Error;
    readonly code: ExceptionCode;
    readonly context?: Record<string, unknown>;
    readonly created: ISO8601String;
    readonly data?: unknown;
    readonly description?: string;
    readonly model?: {
        readonly name: Model['name'];
        readonly field?: ModelField['name'];
        readonly problem?: ModelValidationProblem;
    };
    readonly form?: {
        readonly field?: ModelField['name'] | string;
        readonly problem?: FormValidationProblem;
    };
    readonly friendlyMessage?: string;
    readonly id?: string;
    readonly logLevel?: LogLevel;
    readonly origin?: {
        readonly block?: string;
        readonly file?: string;
        readonly function?: string;
    };
    readonly pii?: boolean;
    readonly request?: HttpRequest;
    readonly response?: {
        readonly status?: {
            readonly code: number;
        };
    };
    readonly scope?: string;
    readonly remediation?: ExceptionRemediation;
    readonly tags?: Record<string, unknown>;
    readonly task?: {
        readonly id: Task['id'];
    };
    readonly user?: {
        readonly id?: string;
        readonly email?: string;
        readonly phone?: string;
    };
    readonly __proto__: Error;
    constructor(message: string, details?: ExceptionConstructorArgs);
    toJSON(): ExceptionObject;
}
//# sourceMappingURL=exception.d.ts.map