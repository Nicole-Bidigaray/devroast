import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CodeBlock } from "@/components/ui/code-block";
import { ScoreRing } from "@/components/ui/score-ring";
import { StatusBadge } from "@/components/ui/status-badge";

type ResultPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const ROAST_ID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const submittedCode = [
  "function calculateTotal(items) {",
  "  var total = 0;",
  "  for (var i = 0; i < items.length; i++) {",
  "    total = total + items[i].price;",
  "  }",
  "",
  "  if (total > 100) {",
  '    console.log("discount applied");',
  "    total = total * 0.9;",
  "  }",
  "",
  "  // TODO: handle tax calculation",
  "  // TODO: handle currency conversion",
  "",
  "  return total;",
  "}",
].join("\n");

const analysisItems = [
  {
    description:
      "use let/const instead and avoid hoisting bugs. var can leak scope and create hard-to-debug side effects.",
    title: "using var instead of const/let",
    tone: "critical" as const,
  },
  {
    description:
      "the loop can short-circuit using reduce/map style and avoid O(n) rework for simple accumulation.",
    title: "imperative loop pattern",
    tone: "warning" as const,
  },
  {
    description:
      "extract constants and keep business rules isolated so tax/discount logic can be validated independently.",
    title: "clear naming conventions",
    tone: "good" as const,
  },
  {
    description:
      "this function does one thing well - calculate a total. avoid side effects in mixed concerns via helper functions.",
    title: "single responsibility",
    tone: "good" as const,
  },
];

export const metadata: Metadata = {
  title: "Roast Result | Devroast",
  description: "Resultado estatico de roast por ID.",
};

export const dynamic = "force-dynamic";

export default async function ResultPage({ params }: ResultPageProps) {
  const { id } = await params;

  if (!ROAST_ID_REGEX.test(id)) {
    notFound();
  }

  return (
    <main className="flex w-full flex-col gap-10 px-4 py-10 md:px-20">
      <section className="flex w-full flex-col gap-8 md:flex-row md:items-center md:gap-12">
        <ScoreRing score="3.5" />

        <div className="flex w-full flex-col gap-4">
          <StatusBadge label="critical: spaghetti_logic" tone="critical" />

          <h1 className="font-mono text-xl leading-relaxed text-text-primary md:text-[20px]">
            "this code looks like it was written during a power outage... in
            2005."
          </h1>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-text-tertiary">
            <span>javascript</span>
            <span>·</span>
            <span>15 lines</span>
            <span>·</span>
            <span className="truncate">id: {id}</span>
          </div>

          <div>
            <Link
              className="font-mono inline-flex border border-border-primary px-3 py-1.5 text-xs text-text-secondary transition-colors hover:bg-bg-surface"
              href="/leaderboard"
            >
              $ share_roast
            </Link>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-border-primary" />

      <section className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold text-accent-green">
            {"//"}
          </span>
          <h2 className="font-mono text-sm font-bold text-text-primary">
            your_submission
          </h2>
        </div>

        <CodeBlock
          className="max-w-none"
          code={submittedCode}
          language="javascript"
        />
      </section>

      <div className="h-px w-full bg-border-primary" />

      <section className="flex w-full flex-col gap-6">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold text-accent-green">
            {"//"}
          </span>
          <h2 className="font-mono text-sm font-bold text-text-primary">
            detailed_analysis
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {analysisItems.map((item) => (
            <article
              className="w-full border border-border-primary p-5"
              key={item.title}
            >
              <div className="space-y-3">
                <StatusBadge label={item.tone} tone={item.tone} />
                <h3 className="font-mono text-[13px] text-text-primary">
                  {item.title}
                </h3>
                <p className="font-sans text-xs leading-normal text-text-secondary">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="h-px w-full bg-border-primary" />

      <section className="flex w-full flex-col gap-6">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold text-accent-green">
            {"//"}
          </span>
          <h2 className="font-mono text-sm font-bold text-text-primary">
            suggested_fix
          </h2>
        </div>

        <div className="w-full border border-border-primary bg-bg-input">
          <div className="flex h-10 items-center gap-2 border-b border-border-primary px-4 font-mono text-xs text-text-tertiary">
            <span>prev_code.ts</span>
            <span>{">>"}</span>
            <span>improved_code.ts</span>
          </div>

          <div className="divide-y divide-border-primary">
            <div className="space-y-1 bg-[#1A0A0A] px-4 py-2">
              <p className="font-mono text-[13px] text-accent-red">
                - function calculateTotal(items) {"{"}
              </p>
              <p className="font-mono text-[13px] text-accent-red">
                - var total = 0;
              </p>
              <p className="font-mono text-[13px] text-accent-red">
                - for (var i = 0; i &lt; items.length; i++) {"{"}
              </p>
              <p className="font-mono text-[13px] text-accent-red">
                - total = total + items[i].price;
              </p>
              <p className="font-mono text-[13px] text-accent-red">{"-   }"}</p>
              <p className="font-mono text-[13px] text-accent-red">
                - return total;
              </p>
              <p className="font-mono text-[13px] text-accent-red">{"- }"}</p>
            </div>

            <div className="space-y-1 bg-[#0A1A0F] px-4 py-2">
              <p className="font-mono text-[13px] text-accent-green">
                + function calculateTotal(items) {"{"}
              </p>
              <p className="font-mono text-[13px] text-accent-green">
                + const total = items.reduce((sum, item) =&gt; sum + item.price,
                0);
              </p>
              <p className="font-mono text-[13px] text-accent-green">
                + return total;
              </p>
              <p className="font-mono text-[13px] text-accent-green">{"+ }"}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
