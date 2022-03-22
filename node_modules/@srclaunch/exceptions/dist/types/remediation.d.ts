import { HttpResponseCode } from '@srclaunch/types';
export declare enum RetryStrategy {
    Simple = "simple",
    ExponentialBackoff = "exponential",
    CircuitBreaker = "circuit_breaker"
}
export declare type ExceptionRemediation = {
    response?: {
        code?: HttpResponseCode;
    };
    retry?: boolean | {
        limit?: number;
        strategy?: RetryStrategy;
    };
};
//# sourceMappingURL=remediation.d.ts.map