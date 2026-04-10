import { forwardRef, type InputHTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const inputVariants = tv({
  base: "font-mono w-full border border-border-primary bg-bg-input text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus-visible:border-accent-green disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    size: {
      sm: "h-9 px-3 text-xs",
      default: "h-10 px-4 text-[13px]",
      lg: "h-11 px-4 text-sm",
    },
    hasError: {
      true: "border-accent-red",
      false: "",
    },
  },
  defaultVariants: {
    size: "default",
    hasError: false,
  },
});

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, size, type = "text", ...props }, ref) => {
    return (
      <input
        className={inputVariants({ className, hasError, size })}
        ref={ref}
        type={type}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
