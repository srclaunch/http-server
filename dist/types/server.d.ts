import { Environment } from '@srclaunch/types';
import { LoggerConfig } from '@srclaunch/logger';
export interface ServerOptions {
    loggerConfig?: LoggerConfig;
    port?: number;
    trustedOrigins?: {
        [environment: Environment['id']]: string[];
    };
}
//# sourceMappingURL=server.d.ts.map