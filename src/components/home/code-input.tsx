"use client";

import { useMemo, useRef, useState } from "react";

import { Textarea } from "@/components/ui/textarea";

export function CodeInput() {
  const [code, setCode] = useState("");
  const gutterRef = useRef<HTMLDivElement>(null);

  const totalLines = useMemo(() => {
    const lineCount = code.split(/\r\n|\r|\n/).length;
    return Math.max(16, lineCount);
  }, [code]);

  return (
    <section className="w-full max-w-[780px] overflow-hidden border border-border-primary bg-bg-input">
      <div className="flex h-10 items-center border-b border-border-primary px-4">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#EF4444]" />
          <span className="size-3 rounded-full bg-[#F59E0B]" />
          <span className="size-3 rounded-full bg-[#10B981]" />
        </div>
      </div>

      <div className="flex h-80">
        <div className="w-12 border-r border-border-primary bg-bg-surface">
          <div
            className="h-full overflow-y-auto px-3 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            ref={gutterRef}
          >
            <div className="flex flex-col gap-2">
              {Array.from({ length: totalLines }, (_, index) => index + 1).map(
                (lineNumber) => (
                  <span
                    className="font-mono text-xs text-text-tertiary"
                    key={lineNumber}
                  >
                    {lineNumber}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Textarea
            className="h-full min-h-0 border-0 bg-transparent px-4 py-4 text-xs leading-5 text-text-primary focus-visible:border-0"
            onChange={(event) => {
              setCode(event.target.value);
            }}
            onScroll={(event) => {
              if (gutterRef.current) {
                gutterRef.current.scrollTop = event.currentTarget.scrollTop;
              }
            }}
            placeholder="// cole seu codigo aqui"
            resize="none"
            spellCheck={false}
            value={code}
          />
        </div>
      </div>
    </section>
  );
}
