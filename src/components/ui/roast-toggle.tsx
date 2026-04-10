"use client";

import { type ElementRef, forwardRef } from "react";

import { Toggle, type ToggleProps } from "./toggle";

export type RoastToggleProps = Omit<ToggleProps, "label"> & {
  label?: string;
};

export const RoastToggle = forwardRef<
  ElementRef<typeof Toggle>,
  RoastToggleProps
>(({ label = "roast mode", ...props }, ref) => {
  return <Toggle label={label} ref={ref} {...props} />;
});

RoastToggle.displayName = "RoastToggle";
