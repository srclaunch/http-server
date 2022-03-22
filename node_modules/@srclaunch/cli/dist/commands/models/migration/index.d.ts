import { DefaultValue, MenuField, Model, Primitives } from '@srclaunch/types';
import { DateTime } from 'luxon';
export declare enum ChangeStatus {
    Added = "added",
    Removed = "removed",
    Modified = "modified",
    Unchanged = "unchanged"
}
export declare enum ModelProperty {
    Description = "description",
    Fields = "fields",
    Name = "name",
    Relationships = "relationships"
}
export declare enum FieldProperty {
    AutoIncrement = "auto-increment",
    DefaultValue = "default-value",
    Description = "description",
    Label = "label",
    Menu = "menu",
    Name = "name",
    Required = "required",
    Rules = "rules",
    Type = "type",
    Unique = "unique"
}
export declare enum RelationshipProperty {
    HasMany = "has-many",
    HasOne = "has-one",
    BelongsTo = "belongs-to"
}
export declare type StringValueChangeSet = {
    status: ChangeStatus;
    oldValue?: string;
    newValue?: string;
};
export declare type BooleanValueChangeSet = {
    status: ChangeStatus;
    oldValue?: boolean;
    newValue?: boolean;
};
export declare type DefaultValueChangeSet = {
    status: ChangeStatus;
    oldValue?: DefaultValue.DateTime | DefaultValue.True | DefaultValue.False | string | number | Record<string, unknown>;
    newValue?: DefaultValue.DateTime | DefaultValue.True | DefaultValue.False | string | number | Record<string, unknown>;
};
export declare type MenuValueChangeSet = {
    status: ChangeStatus;
    oldValue?: MenuField[];
    newValue?: MenuField[];
};
export declare type ModelChangeSet = {
    [ModelProperty.Description]?: StringValueChangeSet;
    [ModelProperty.Fields]?: FieldChangeSet;
    [ModelProperty.Name]?: StringValueChangeSet;
    [ModelProperty.Relationships]?: RelationshipChangeSet;
};
export declare type FieldChangeSet = {
    [fieldName: string]: {
        [FieldProperty.AutoIncrement]?: BooleanValueChangeSet;
        [FieldProperty.DefaultValue]?: DefaultValueChangeSet;
        [FieldProperty.Description]?: StringValueChangeSet;
        [FieldProperty.Label]?: StringValueChangeSet;
        [FieldProperty.Menu]?: MenuValueChangeSet;
        [FieldProperty.Name]?: StringValueChangeSet;
        [FieldProperty.Required]?: BooleanValueChangeSet;
        [FieldProperty.Type]?: Primitives;
        [FieldProperty.Unique]?: BooleanValueChangeSet;
    };
};
export declare type RelationshipChangeSet = {
    [key in RelationshipProperty]?: {
        status: ChangeStatus;
        oldValue?: any;
        newValue?: any;
    };
};
export declare type ModelMigration = {
    changeset: ModelChangeSet;
    created?: DateTime;
    executed?: DateTime;
    version: number;
};
export declare function getModelDiff(oldModel: Model, newModel: Model): void;
export declare function getDatabaseDiff(oldModels: Model[], newModels: Model[]): void;
//# sourceMappingURL=index.d.ts.map