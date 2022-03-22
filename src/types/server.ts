import { Environment } from "@srclaunch/types";

export interface ServerOptions {
  port?: number;
  trustedOrigins?: {
    [environment: Environment['id']]: string[];
  };
}
