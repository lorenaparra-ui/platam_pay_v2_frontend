import { FieldValues, Path } from "react-hook-form";
import {
  ConditionRule,
  ConditionOperator,
  ConditionValue,
  SingleCondition,
  isAndCondition,
  isOrCondition,
  isSingleCondition,
  isCustomCondition,
  LegacyCondition,
} from "@/interfaces/condition";

function getNestedValue<T extends FieldValues>(
  obj: Partial<T>,
  path: Path<T>
): unknown {
  const keys = (path as string).split(".");
  let result: unknown = obj;

  for (const key of keys) {
    if (result === null || result === undefined) {
      return undefined;
    }
    result = (result as Record<string, unknown>)[key];
  }

  return result;
}

function evaluateOperator(
  fieldValue: unknown,
  operator: ConditionOperator,
  conditionValue: ConditionValue
): boolean {
  switch (operator) {
    case "===":
      return fieldValue === conditionValue;

    case "!==":
      return fieldValue !== conditionValue;

    case ">":
      if (typeof fieldValue === "number" && typeof conditionValue === "number") {
        return fieldValue > conditionValue;
      }
      if (fieldValue instanceof Date && conditionValue instanceof Date) {
        return fieldValue.getTime() > conditionValue.getTime();
      }
      return false;

    case "<":
      if (typeof fieldValue === "number" && typeof conditionValue === "number") {
        return fieldValue < conditionValue;
      }
      if (fieldValue instanceof Date && conditionValue instanceof Date) {
        return fieldValue.getTime() < conditionValue.getTime();
      }
      return false;

    case ">=":
      if (typeof fieldValue === "number" && typeof conditionValue === "number") {
        return fieldValue >= conditionValue;
      }
      if (fieldValue instanceof Date && conditionValue instanceof Date) {
        return fieldValue.getTime() >= conditionValue.getTime();
      }
      return false;

    case "<=":
      if (typeof fieldValue === "number" && typeof conditionValue === "number") {
        return fieldValue <= conditionValue;
      }
      if (fieldValue instanceof Date && conditionValue instanceof Date) {
        return fieldValue.getTime() <= conditionValue.getTime();
      }
      return false;

    case "includes":
      if (Array.isArray(fieldValue)) {
        return fieldValue.includes(conditionValue);
      }
      if (typeof fieldValue === "string" && typeof conditionValue === "string") {
        return fieldValue.includes(conditionValue);
      }
      return false;

    default:
      return false;
  }
}

function evaluateSingleCondition<T extends FieldValues>(
  condition: SingleCondition<T>,
  values: Partial<T>
): boolean {
  const fieldValue = getNestedValue(values, condition.field);
  return evaluateOperator(fieldValue, condition.operator, condition.value);
}

export function evaluateCondition<T extends FieldValues>(
  rule: ConditionRule<T>,
  values: Partial<T>
): boolean {
  if (isCustomCondition(rule)) {
    return rule(values);
  }

  if (isSingleCondition(rule)) {
    return evaluateSingleCondition(rule, values);
  }

  if (isAndCondition(rule)) {
    return rule.and.every((subRule) => evaluateCondition(subRule, values));
  }

  if (isOrCondition(rule)) {
    return rule.or.some((subRule) => evaluateCondition(subRule, values));
  }

  return true;
}

export function convertLegacyToCondition<T extends FieldValues>(
  legacy: LegacyCondition<T>
): ConditionRule<T> | null {
  if (!legacy.dependency) {
    return null;
  }

  return {
    field: legacy.dependency,
    operator: "===",
    value: legacy.dependencyValue ?? null,
  };
}

export function extractWatchFields<T extends FieldValues>(
  rule: ConditionRule<T> | null | undefined
): Path<T>[] {
  if (!rule) {
    return [];
  }

  if (isCustomCondition(rule)) {
    return [];
  }

  if (isSingleCondition(rule)) {
    return [rule.field];
  }

  if (isAndCondition(rule)) {
    return rule.and.flatMap((subRule) => extractWatchFields(subRule));
  }

  if (isOrCondition(rule)) {
    return rule.or.flatMap((subRule) => extractWatchFields(subRule));
  }

  return [];
}
