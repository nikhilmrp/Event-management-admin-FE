import type React from "react";

export interface ToggleButtonProps {
  /** Current on/off value reported via `onChange`. */
  checked: boolean;
  /** Called with `true` when turned on, `false` when turned off. */
  onChange: (checked: boolean) => void;
  /** Text (or node) shown beside the switch. */
  label?: React.ReactNode;
  className?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  labelClassName?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  checked,
  onChange,
  label,
  className = "",
  id,
  name,
  disabled = false,
  labelClassName = "",
}) => {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer select-none items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-400 ${
        disabled ? "cursor-not-allowed opacity-60" : ""
      } ${className}`}
    >
      <div className="relative shrink-0">
        <input
          id={id}
          name={name}
          type="checkbox"
          className="sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`block h-6 w-11 rounded-full transition duration-150 ease-linear ${
            checked ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"
          }`}
          aria-hidden
        />
        <div
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-theme-sm transition duration-150 ease-linear ${
            checked ? "translate-x-full" : "translate-x-0"
          }`}
          aria-hidden
        />
      </div>
      {label != null && label !== "" && <span className={labelClassName}>{label}</span>}
    </label>
  );
};

export default ToggleButton;
