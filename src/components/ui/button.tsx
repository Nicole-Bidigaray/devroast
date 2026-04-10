import { type ButtonHTMLAttributes, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: "font-mono inline-flex cursor-pointer items-center justify-center whitespace-nowrap transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    variant: {
      primary:
        "bg-accent-green px-6 py-2.5 text-[13px] font-medium text-[#0A0A0A] enabled:hover:brightness-110",
      secondary:
        "border border-border-primary px-4 py-2 text-xs font-normal text-text-primary enabled:hover:bg-bg-surface",
      link: "border border-border-primary px-3 py-1.5 text-xs font-normal text-text-secondary enabled:hover:bg-bg-surface",
    },
    size: {
      sm: "text-xs",
      default: "text-[13px]",
      lg: "text-sm",
    },
    fullWidth: {
      true: "w-full",
      false: "w-auto",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
    fullWidth: false,
  },
});

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, type = "button", ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, fullWidth, className })}
        ref={ref}
        type={type}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
