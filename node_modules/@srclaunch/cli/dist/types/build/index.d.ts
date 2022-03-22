export declare type BuildConfig = {
    buildDir?: string;
    buildFile?: string;
    buildPath?: string;
    buildTypes?: boolean;
    bundle?: boolean;
    bundleCSS?: boolean;
    codeSplitting?: boolean;
    color?: boolean;
    define?: Record<string, string>;
    excludeLibs?: string[];
    emptyBuildDir?: boolean;
    format?: 'iife' | 'cjs' | 'esm';
    inputScripts?: string[];
    minify?: boolean;
    platform?: 'browser' | 'node';
    showWarnings?: boolean;
    sourceMap?: boolean;
    target?: 'es5' | 'es6' | 'es2015' | 'es2017' | 'es2019' | 'es2020' | 'esnext';
    treeShaking?: boolean;
};
//# sourceMappingURL=index.d.ts.map