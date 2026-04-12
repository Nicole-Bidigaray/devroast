"use client";

import { Switch } from "@base-ui/react/switch";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  useId,
} from "react";
import { tv } from "tailwind-variants";

const toggleStyles = tv({
  slots: {
    container: "inline-flex items-center gap-3",
    root: "peer group inline-flex h-5.5 w-10 items-center rounded-full p-0.75 transition-colors data-[checked]:justify-end data-[checked]:bg-accent-green data-[unchecked]:justify-start data-[unchecked]:bg-border-primary",
    thumb:
      "size-4 rounded-full bg-black transition-colors group-data-[unchecked]:bg-text-secondary",
    label:
      "font-mono text-xs transition-colors peer-data-[checked]:text-accent-green peer-data-[unchecked]:text-text-secondary",
  },
});

export type ToggleProps = Omit<
  ComponentPropsWithoutRef<typeof Switch.Root>,
  "children" | "className"
> & {
  className?: string;
  label?: string;
};

export const Toggle = forwardRef<ElementRef<typeof Switch.Root>, ToggleProps>(
  (
    {
      checked,
      className,
      defaultChecked = true,
      id,
      label,
      nativeButton = true,
      render,
      ...props
    },
    ref,
  ) => {
    const styles = toggleStyles();
    const generatedId = useId();
    const resolvedId = id ?? generatedId;
    const resolvedRender = nativeButton
      ? (render ?? <button type="button" />)
      : render;

    return (
      <div className={styles.container()}>
        <Switch.Root
          checked={checked}
          className={styles.root({ className })}
          defaultChecked={defaultChecked}
          id={resolvedId}
          nativeButton={nativeButton}
          render={resolvedRender}
          ref={ref}
          {...props}
        >
          <Switch.Thumb className={styles.thumb()} />
        </Switch.Root>

        {label ? <span className={styles.label()}>{label}</span> : null}
      </div>
    );
  },
);

Toggle.displayName = "Toggle";
