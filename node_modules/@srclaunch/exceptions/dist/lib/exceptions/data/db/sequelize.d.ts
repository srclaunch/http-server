import { DatabaseException } from './index.js';
import { ExceptionCode } from '../../../../types/index.js';
import { Exception } from '../../../exception.js';
export declare class SequelizeNotInitializedException extends DatabaseException {
    code: ExceptionCode;
    description: string;
    logLevel: Exception['logLevel'];
}
//# sourceMappingURL=sequelize.d.ts.map