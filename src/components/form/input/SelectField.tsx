import React, { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface SelectFieldProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  error?: boolean;
  success?: boolean;
  hint?: string;
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  {
    options,
    placeholder,
    id,
    name,
    className = "",
    disabled = false,
    error = false,
    success = false,
    hint,
    ...rest
  },
  ref
) {
  let selectClasses = `h-11 w-full appearance-none rounded-lg border px-4 py-2.5 pr-10 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 ${className}`;

  if (disabled) {
    selectClasses += ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error) {
    selectClasses += ` text-error-800 border-error-500 focus:ring-error-500/10 dark:text-error-400 dark:border-error-500`;
  } else if (success) {
    selectClasses += ` text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300 dark:text-success-400 dark:border-success-500`;
  } else {
    selectClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90`;
  }

  return (
    <div className="relative">
      <select ref={ref} id={id} name={name} disabled={disabled} className={selectClasses} {...rest}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
        <ChevronDown className="size-4" />
      </span>

      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error ? "text-error-500" : success ? "text-success-500" : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
});

interface FormSelectProps<T extends FieldValues> extends Omit<
  SelectFieldProps,
  "name" | "defaultValue" | "value" | "onChange" | "onBlur" | "ref"
> {
  name: FieldPath<T>;
  control: Control<T>;
}

function FormSelect<T extends FieldValues>({ name, control, ...selectProps }: FormSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur, name: fieldName, ref } }) => (
        <SelectField
          {...selectProps}
          name={fieldName}
          ref={ref}
          onBlur={onBlur}
          value={value ?? ""}
          onChange={(e) => {
            const selected = e.target.value;
            onChange(selected === "" ? null : selected);
          }}
        />
      )}
    />
  );
}

export default SelectField;
export { FormSelect };
