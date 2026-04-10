import type { ComponentPropsWithoutRef } from "react";

export function AnalysisCardRoot({
  className,
  ...props
}: ComponentPropsWithoutRef<"article">) {
  return (
    <article
      className={className ?? "w-full border border-border-primary p-5"}
      {...props}
    />
  );
}

export function AnalysisCardContent({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={className ?? "space-y-3"} {...props} />;
}

export function AnalysisCardTitle({
  className,
  ...props
}: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className={className ?? "font-mono text-[13px] text-text-primary"}
      {...props}
    />
  );
}

export function AnalysisCardDescription({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={
        className ?? "font-sans text-xs leading-normal text-text-secondary"
      }
      {...props}
    />
  );
}
