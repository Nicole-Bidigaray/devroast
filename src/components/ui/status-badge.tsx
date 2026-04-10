import { tv, type VariantProps } from "tailwind-variants";

const statusBadgeVariants = tv({
  base: "font-mono inline-flex items-center gap-2",
  variants: {
    tone: {
      critical: "text-accent-red",
      warning: "text-accent-amber",
      good: "text-accent-green",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
    },
  },
  defaultVariants: {
    tone: "critical",
    size: "sm",
  },
});

type StatusBadgeProps = VariantProps<typeof statusBadgeVariants> & {
  label: string;
};

export function StatusBadge({ label, size, tone }: StatusBadgeProps) {
  return (
    <div className={statusBadgeVariants({ size, tone })}>
      <span className="size-2 rounded-full bg-current" />
      <span>{label}</span>
    </div>
  );
}
