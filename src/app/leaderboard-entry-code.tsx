"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import type { ReactNode } from "react";
import { useState } from "react";

type LeaderboardEntryCodeProps = {
  children: ReactNode;
  lineCount: number;
  previewSlot: ReactNode;
};

export function LeaderboardEntryCode({
  children,
  lineCount,
  previewSlot,
}: LeaderboardEntryCodeProps) {
  const [open, setOpen] = useState(false);
  const isExpandable = lineCount > 5;

  if (!isExpandable) {
    return <div className="bg-bg-input">{children}</div>;
  }

  return (
    <Collapsible.Root onOpenChange={setOpen} open={open}>
      {!open ? (
        <div className="relative max-h-[100px] overflow-hidden bg-bg-input">
          {previewSlot}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg-input to-transparent" />
        </div>
      ) : null}

      <Collapsible.Panel className="bg-bg-input">{children}</Collapsible.Panel>

      <div className="border-t border-border-primary px-4 py-2">
        <Collapsible.Trigger className="font-mono text-xs text-text-secondary transition-colors hover:text-text-primary">
          {open ? "show less ▴" : "show more ▾"}
        </Collapsible.Trigger>
      </div>
    </Collapsible.Root>
  );
}
