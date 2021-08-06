export type FilterPackType = {
  categoryName: string;
  sectionTitle?: string;
  filters: FilterType[];
};

export type Types = "text" | "select" | "boolean";

export type FilterType = {
  filterName: string;
  conditionTitle?: string;
  control: ControlType<Types>;
};

export type ControlType<T extends Types> = {
  type: T;
  options?: T extends "text"
    ? string
    : T extends "select"
    ? string[]
    : T extends "boolean"
    ? boolean
    : any;
};

export type ReferredFilterType = ReferedFilterType;

/**
 * @deprecated
 *
 * I'll delete it in the future.
 * Please use "ReferredFilterType".
 */
export type ReferedFilterType = {
  categoryName: string;
  filterName: string;
  filterType: Types;
  filterCondition: ControlType<Types>["options"];
};
