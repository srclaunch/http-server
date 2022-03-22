import { Model, Primitives } from '@srclaunch/types';
export declare function getTypescriptTypeFromPrimitive(type: Primitives): "string" | "boolean" | "number" | "Date" | "Image[]" | "Record<string, any>" | "Menu" | "string[]" | "unknown";
export declare function constructTypesStr(model: Model): string;
export declare function constructTypePropsFromFields(fields: Model['fields']): string;
//# sourceMappingURL=types.d.ts.map