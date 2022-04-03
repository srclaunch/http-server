import { Environment } from '@srclaunch/types';
import { LoggerConfig } from '@srclaunch/logger';

export interface ServerOptions {
  port?: number;
  trustedOrigins?: {
    [environment: Environment['id']]: string[];
  };
}
