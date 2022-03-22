import { Model, ModelField } from '@srclaunch/types';
export declare function getPrimitiveImports(fields: Record<string, ModelField>): string;
export declare function constructModelTypeFromModel(model: Model): string;
export declare function getModelExports(model: Model): string;
export declare function buildModelTypes({ path: projectPath }: {
    path: string;
}): Promise<void>;
//# sourceMappingURL=types.d.ts.map