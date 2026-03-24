"use client";

import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  error?: string;
};

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement> & { as?: "input" };
type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };
type SelectProps = BaseProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    as: "select";
    options: { value: string; label: string }[];
  };

type FormInputProps = InputProps | TextareaProps | SelectProps;

const baseInput =
  "peer w-full rounded-xl border border-pw-border bg-white px-4 pt-5 pb-2 text-sm text-pw-charcoal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pw-sage/40 focus:border-pw-sage";

const errorInput = "border-red-400 focus:ring-red-300/40 focus:border-red-400";

const floatingLabel =
  "absolute left-4 top-1/2 -translate-y-1/2 text-sm text-pw-subtle pointer-events-none transition-all duration-200 origin-left peer-focus:top-3 peer-focus:translate-y-0 peer-focus:scale-[0.75] peer-focus:text-pw-sage peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:scale-[0.75]";

const floatingLabelTextarea =
  "absolute left-4 top-4 text-sm text-pw-subtle pointer-events-none transition-all duration-200 origin-left peer-focus:top-1.5 peer-focus:scale-[0.75] peer-focus:text-pw-sage peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:scale-[0.75]";

export function FormInput(props: FormInputProps) {
  const { label, error } = props;

  if (props.as === "textarea") {
    const { as: _, label: _l, error: _e, ...rest } = props as TextareaProps;
    return (
      <div>
        <div className="relative">
          <textarea
            {...rest}
            placeholder={rest.placeholder || " "}
            className={`${baseInput} min-h-[100px] resize-none ${error ? errorInput : ""}`}
          />
          <span className={`${floatingLabelTextarea} ${error ? "text-red-400" : ""}`}>
            {label}
          </span>
        </div>
        <div className={`overflow-hidden transition-all duration-200 ${error ? "max-h-8 mt-1.5" : "max-h-0"}`}>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      </div>
    );
  }

  if (props.as === "select") {
    const { as: _, label: _l, error: _e, options, ...rest } = props as SelectProps;
    return (
      <div>
        <div className="relative">
          <select
            {...rest}
            className={`${baseInput} ${error ? errorInput : ""} ${!rest.value ? "text-transparent" : ""}`}
          >
            <option value="">Select...</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span
            className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm text-pw-subtle pointer-events-none transition-all duration-200 origin-left ${
              rest.value
                ? "top-3 translate-y-0 scale-[0.75]"
                : ""
            } ${error ? "text-red-400" : ""}`}
          >
            {label}
          </span>
        </div>
        <div className={`overflow-hidden transition-all duration-200 ${error ? "max-h-8 mt-1.5" : "max-h-0"}`}>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      </div>
    );
  }

  // Default: input
  const { as: _, label: _l, error: _e, ...rest } = props as InputProps;
  return (
    <div>
      <div className="relative">
        <input
          {...rest}
          placeholder={rest.placeholder || " "}
          className={`${baseInput} ${error ? errorInput : ""}`}
        />
        <span className={`${floatingLabel} ${error ? "text-red-400" : ""}`}>
          {label}
        </span>
      </div>
      <div className={`overflow-hidden transition-all duration-200 ${error ? "max-h-8 mt-1.5" : "max-h-0"}`}>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}
