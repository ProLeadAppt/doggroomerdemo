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
  "w-full rounded-xl border border-pw-border bg-white px-4 py-3 text-sm text-pw-charcoal placeholder:text-pw-subtle transition-[color,border-color,box-shadow] duration-200 focus:outline-none focus:ring-2 focus:ring-pw-sage/60 focus:border-pw-sage";

const errorInput = "border-red-400 focus:ring-red-300/40 focus:border-red-400";

export function FormInput(props: FormInputProps) {
  const { label, error } = props;

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-pw-charcoal">
        {label}
      </label>

      {props.as === "textarea" ? (
        <textarea
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={`${baseInput} min-h-[100px] resize-none ${error ? errorInput : ""}`}
        />
      ) : props.as === "select" ? (
        <select
          {...(props as SelectHTMLAttributes<HTMLSelectElement>)}
          className={`${baseInput} ${error ? errorInput : ""}`}
        >
          <option value="">Select...</option>
          {(props as SelectProps).options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
          className={`${baseInput} ${error ? errorInput : ""}`}
        />
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
