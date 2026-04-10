import type { ComponentPropsWithoutRef } from "react";

export function LeaderboardRowRoot({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={
        className ??
        "flex w-full items-center gap-6 border-b border-border-primary px-5 py-4"
      }
      {...props}
    />
  );
}

export function LeaderboardRowRank({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={className ?? "font-mono w-10 text-[13px] text-text-tertiary"}
      {...props}
    />
  );
}

export function LeaderboardRowScore({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={
        className ?? "font-mono w-15 text-[13px] font-bold text-accent-red"
      }
      {...props}
    />
  );
}

export function LeaderboardRowCode({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={
        className ?? "font-mono flex-1 truncate text-xs text-text-secondary"
      }
      {...props}
    />
  );
}

export function LeaderboardRowLang({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={className ?? "font-mono w-25 text-xs text-text-tertiary"}
      {...props}
    />
  );
}
