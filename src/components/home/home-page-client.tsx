"use client";

import { type ReactNode, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { CODE_SNIPPET_CHARACTER_LIMIT } from "@/lib/code-snippet";

import { CodeInput } from "./code-input";
import { HomeMetrics } from "./home-metrics";

type HomePageClientProps = {
  leaderboardSection: ReactNode;
};

export function HomePageClient({ leaderboardSection }: HomePageClientProps) {
  const [code, setCode] = useState("");

  const isSnippetOverLimit = useMemo(() => {
    return code.length > CODE_SNIPPET_CHARACTER_LIMIT;
  }, [code]);

  return (
    <main className="mx-auto flex w-full max-w-280 flex-col items-center gap-8 px-4 py-20 md:px-10">
      <section className="space-y-3 text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="font-mono text-4xl font-bold text-accent-green">
            $
          </span>
          <h1 className="font-mono text-4xl font-bold text-text-primary">
            paste your code. get roasted.
          </h1>
        </div>
        <p className="font-sans text-sm text-text-secondary">
          {
            "// drop your code below and we'll rate it - brutally honest or full roast mode"
          }
        </p>
      </section>

      <CodeInput
        characterLimit={CODE_SNIPPET_CHARACTER_LIMIT}
        code={code}
        onCodeChange={setCode}
      />

      <section className="flex w-full max-w-3xl items-center justify-between">
        <div className="flex items-center gap-4">
          <Toggle
            defaultChecked
            id="home-roast-mode-toggle"
            label="roast mode"
          />
          <p className="font-sans text-xs text-text-tertiary">
            {"// maximum sarcasm enabled"}
          </p>
        </div>

        <Button disabled={isSnippetOverLimit}>$ roast_my_code</Button>
      </section>

      <HomeMetrics />

      {leaderboardSection}
    </main>
  );
}
