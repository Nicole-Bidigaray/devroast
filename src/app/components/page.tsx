import { Navbar } from "@/components/layout/navbar";
import {
  AnalysisCardContent,
  AnalysisCardDescription,
  AnalysisCardRoot,
  AnalysisCardTitle,
  Button,
  CodeBlock,
  DiffLines,
  LeaderboardRowCode,
  LeaderboardRowLang,
  LeaderboardRowRank,
  LeaderboardRowRoot,
  LeaderboardRowScore,
  ScoreRing,
  SectionTitle,
  StatusBadge,
  Toggle,
} from "@/components/ui";

export default function ComponentsPage() {
  return (
    <main className="mx-auto flex w-full max-w-360 flex-col gap-15 px-20 py-15">
      <div className="flex items-center gap-2">
        <span className="font-mono text-2xl font-bold text-accent-green">
          {"//"}
        </span>
        <h1 className="font-mono text-2xl font-bold text-text-primary">
          component_library
        </h1>
      </div>

      <section className="space-y-6">
        <SectionTitle>typography</SectionTitle>

        <div className="space-y-5">
          <p className="font-mono text-4xl font-bold text-text-primary">
            paste your code. get roasted.
          </p>

          <SectionTitle>detailed_analysis</SectionTitle>

          <p className="font-sans text-sm text-text-secondary">
            description text sample
          </p>

          <p className="font-mono text-xs text-text-tertiary">
            lang: javascript · 7 lines
          </p>

          <p className="font-mono text-[13px] text-syn-function">
            function calculateTotal()
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <SectionTitle>buttons</SectionTitle>
        <div className="flex items-center gap-4">
          <Button variant="primary">$ roast_my_code</Button>
          <Button variant="secondary">$ share_roast</Button>
          <Button variant="link">$ view_all {">>"}</Button>
        </div>
      </section>

      <section className="space-y-6">
        <SectionTitle>toggle</SectionTitle>
        <div className="flex items-center gap-8">
          <Toggle defaultChecked label="roast mode" />
          <Toggle defaultChecked={false} label="roast mode" />
        </div>
      </section>

      <section className="space-y-6">
        <SectionTitle>badge_status</SectionTitle>
        <div className="flex flex-wrap items-center gap-6">
          <StatusBadge label="critical" size="sm" tone="critical" />
          <StatusBadge label="warning" size="sm" tone="warning" />
          <StatusBadge label="good" size="sm" tone="good" />
          <StatusBadge label="needs_serious_help" size="md" tone="critical" />
        </div>
      </section>

      <section className="space-y-6">
        <SectionTitle>cards</SectionTitle>
        <div className="w-120">
          <AnalysisCardRoot>
            <AnalysisCardContent>
              <StatusBadge label="critical" size="sm" tone="critical" />
              <AnalysisCardTitle>
                using var instead of const/let
              </AnalysisCardTitle>
              <AnalysisCardDescription>
                the var keyword is function-scoped rather than block-scoped,
                which can lead to unexpected behavior and bugs. modern
                javascript uses const for immutable bindings and let for mutable
                ones.
              </AnalysisCardDescription>
            </AnalysisCardContent>
          </AnalysisCardRoot>
        </div>
      </section>

      <section className="space-y-6">
        <SectionTitle>code_block</SectionTitle>
        <CodeBlock
          code={[
            "function calculateTotal(items) {",
            "  var total = 0;",
            "  for (var i = 0; ...) {",
            "    total = total + items[i].price;",
            "  }",
          ].join("\n")}
          fileName="calculate.js"
          language="javascript"
        />
      </section>

      <section className="space-y-6">
        <SectionTitle>diff_line</SectionTitle>
        <DiffLines
          added="const total = 0;"
          context={"for (let i = 0; i < items.length; i++) {"}
          removed="var total = 0;"
        />
      </section>

      <section className="space-y-6">
        <SectionTitle>table_row</SectionTitle>
        <div className="border border-border-primary">
          <LeaderboardRowRoot>
            <LeaderboardRowRank>#1</LeaderboardRowRank>
            <LeaderboardRowScore>2.1</LeaderboardRowScore>
            <LeaderboardRowCode>
              function calculateTotal(items) {`{`} var total = 0; ...
            </LeaderboardRowCode>
            <LeaderboardRowLang>javascript</LeaderboardRowLang>
          </LeaderboardRowRoot>
        </div>
      </section>

      <section className="space-y-6">
        <SectionTitle>navbar</SectionTitle>
        <Navbar />
      </section>

      <section className="space-y-6">
        <SectionTitle>score_ring</SectionTitle>
        <ScoreRing score="3.5" />
      </section>
    </main>
  );
}
