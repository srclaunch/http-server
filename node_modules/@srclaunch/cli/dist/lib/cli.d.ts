import { TypedFlags } from 'meow';
export declare function ensureCwdIsApplabProject(): Promise<void>;
export declare function run({ cliVersion, command, flags, }: {
    cliVersion?: string;
    command: string[];
    flags: TypedFlags<{}> & Record<string, unknown>;
}): Promise<void>;
//# sourceMappingURL=cli.d.ts.map