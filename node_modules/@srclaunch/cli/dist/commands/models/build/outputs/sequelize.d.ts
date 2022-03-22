import { Model, Primitives, Relationship } from '@srclaunch/types';
export declare function getSequelizeTypeFromPrimitive(type: Primitives): "DataTypes.BOOLEAN" | "DataTypes.INTEGER" | "DataTypes.STRING" | "DataTypes.FLOAT" | "DataTypes.DATE" | "DataTypes.JSONB" | "DataTypes.TEXT" | "DataTypes.ENUM" | "DataTypes.ARRAY(DataTypes.STRING)" | "DataTypes.UUID";
export declare function constructSequelizeModelClassStr(model: Model): string;
export declare function constructTypePropsFromFields(fields: Model['fields'], sequelize?: boolean): string;
export declare function constructSequelizeModelRelationships(modelName: string, relationships?: Relationship): string;
export declare function constructSequelizeModelDependencies(modelName: string, relationships?: Relationship): string[];
export declare function constructSequelizeModelFromModel(model: Model): string;
export declare function buildSequelizeModels({ path: projectPath, }: {
    path: string;
}): Promise<void>;
//# sourceMappingURL=sequelize.d.ts.map