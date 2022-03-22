import { Exception } from '../../exception.js';
import { ExceptionRemediation } from '../../../types/remediation';
import { ExceptionCode } from '../../../types/index.js';
/*******************************/
/*******************************/
export declare class ServiceProviderException extends Exception {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
    remediation: ExceptionRemediation;
}
//# sourceMappingURL=index.d.ts.map