import { forwardRef, type TextareaHTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const textareaVariants = tv({
  base: "font-mono w-full border border-border-primary bg-bg-input text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus-visible:border-accent-green disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    size: {
      sm: "min-h-24 px-3 py-2 text-xs",
      default: "min-h-28 px-4 py-3 text-[13px]",
      lg: "min-h-32 px-4 py-3 text-sm",
    },
    hasError: {
      true: "border-accent-red",
      false: "",
    },
    resize: {
      none: "resize-none",
      vertical: "resize-y",
      both: "resize",
    },
  },
  defaultVariants: {
    size: "default",
    hasError: false,
    resize: "vertical",
  },
});

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariants>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, resize, size, ...props }, ref) => {
    return (
      <textarea
        className={textareaVariants({ className, hasError, resize, size })}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
