"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { Toggle } from "@/components/ui/toggle";
import { CODE_SNIPPET_CHARACTER_LIMIT } from "@/lib/code-snippet";

import { CodeInput } from "./code-input";
import { HomeMetrics } from "./home-metrics";

export function HomePageClient() {
  const [code, setCode] = useState("");

  const isSnippetOverLimit = useMemo(() => {
    return code.length > CODE_SNIPPET_CHARACTER_LIMIT;
  }, [code]);

  return (
    <main className="mx-auto flex w-full max-w-[1120px] flex-col items-center gap-8 px-4 py-20 md:px-10">
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

      <section className="mt-8 flex w-full max-w-5xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <SectionTitle>shame_leaderboard</SectionTitle>
          <Button variant="link">$ view_all {">>"}</Button>
        </div>

        <p className="font-sans text-[13px] text-text-tertiary">
          {"// the worst code on the internet, ranked by shame"}
        </p>

        <div className="overflow-hidden border border-border-primary">
          <div className="flex h-10 items-center border-b border-border-primary bg-bg-surface px-5 font-mono text-xs text-text-tertiary">
            <div className="w-12">#</div>
            <div className="w-18">score</div>
            <div className="flex-1">code</div>
            <div className="w-24">lang</div>
          </div>

          <div className="flex gap-6 border-b border-border-primary px-5 py-4">
            <div className="w-12 font-mono text-xs text-accent-amber">1</div>
            <div className="w-18 font-mono text-xs font-bold text-accent-red">
              1.2
            </div>
            <div className="flex-1 space-y-1 font-mono text-xs text-text-primary">
              <p>{'eval(prompt("enter code"))'}</p>
              <p>document.write(response)</p>
              <p className="text-text-tertiary">{"// trust the user lol"}</p>
            </div>
            <div className="w-24 font-mono text-xs text-text-secondary">
              javascript
            </div>
          </div>

          <div className="flex gap-6 border-b border-border-primary px-5 py-4">
            <div className="w-12 font-mono text-xs text-text-secondary">2</div>
            <div className="w-18 font-mono text-xs font-bold text-accent-red">
              1.8
            </div>
            <div className="flex-1 space-y-1 font-mono text-xs text-text-primary">
              <p>if (x == true) {`{ return true; }`}</p>
              <p>else if (x == false) {`{ return false; }`}</p>
              <p>else {`{ return !false; }`}</p>
            </div>
            <div className="w-24 font-mono text-xs text-text-secondary">
              typescript
            </div>
          </div>

          <div className="flex gap-6 px-5 py-4">
            <div className="w-12 font-mono text-xs text-text-secondary">3</div>
            <div className="w-18 font-mono text-xs font-bold text-accent-red">
              2.1
            </div>
            <div className="flex-1 space-y-1 font-mono text-xs text-text-primary">
              <p>SELECT * FROM users WHERE 1=1</p>
              <p className="text-text-tertiary">
                {"-- TODO: add authentication"}
              </p>
            </div>
            <div className="w-24 font-mono text-xs text-text-secondary">
              sql
            </div>
          </div>
        </div>

        <div className="flex justify-center px-4 py-2">
          <p className="font-sans text-xs text-text-tertiary">
            showing top 3 of 2,847 ·{" "}
            <Link
              className="underline underline-offset-4 hover:text-text-secondary"
              href="/leaderboard"
            >
              view full leaderboard {">>"}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
