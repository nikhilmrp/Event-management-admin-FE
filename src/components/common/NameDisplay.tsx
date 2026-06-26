import React from "react";

type NameDisplayProps<T> = {
  data: readonly T[];
  fieldKey: keyof T;
  value: string | number;
  keyName: keyof T;
};

function NameDisplay<T>({ data, fieldKey, value, keyName }: NameDisplayProps<T>) {
  const displayValue = data.find((item) => item[fieldKey] === value)?.[keyName];
  return <div>{displayValue != null ? String(displayValue) : ""}</div>;
}

export default NameDisplay;
