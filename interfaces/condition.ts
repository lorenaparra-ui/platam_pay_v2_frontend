import { FieldValues, Path } from "react-hook-form";

export type ConditionOperator = 
  | "===" 
  | "!==" 
  | ">" 
  | "<" 
  | ">=" 
  | "<=" 
  | "includes";

export type ConditionValue = string | number | boolean | Date | null | undefined;

export interface SingleCondition<T extends FieldValues> {
  field: Path<T>;
  operator: ConditionOperator;
  value: ConditionValue;
}

export type CustomConditionFn<T extends FieldValues> = (values: Partial<T>) => boolean;

export type ConditionRule<T extends FieldValues> =
  | SingleCondition<T>
  | CustomConditionFn<T>
  | AndCondition<T>
  | OrCondition<T>;

export interface AndCondition<T extends FieldValues> {
  and: ConditionRule<T>[];
}

export interface OrCondition<T extends FieldValues> {
  or: ConditionRule<T>[];
}

export type FieldCondition<T extends FieldValues> = ConditionRule<T>;

export interface LegacyCondition<T extends FieldValues> {
  dependency?: Path<T>;
  dependencyValue?: ConditionValue;
}

export function isSingleCondition<T extends FieldValues>(
  rule: ConditionRule<T>
): rule is SingleCondition<T> {
  return (
    typeof rule === "object" &&
    rule !== null &&
    "field" in rule &&
    "operator" in rule &&
    "value" in rule
  );
}

export function isAndCondition<T extends FieldValues>(
  rule: ConditionRule<T>
): rule is AndCondition<T> {
  return typeof rule === "object" && rule !== null && "and" in rule;
}

export function isOrCondition<T extends FieldValues>(
  rule: ConditionRule<T>
): rule is OrCondition<T> {
  return typeof rule === "object" && rule !== null && "or" in rule;
}

export function isCustomCondition<T extends FieldValues>(
  rule: ConditionRule<T>
): rule is CustomConditionFn<T> {
  return typeof rule === "function";
}
