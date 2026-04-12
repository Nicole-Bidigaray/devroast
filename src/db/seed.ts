import { faker } from "@faker-js/faker";

import { db } from "./index";
import { analysisItems, roasts } from "./schema";

const ROAST_COUNT = 100;

const LANGUAGES = [
  "javascript",
  "typescript",
  "tsx",
  "python",
  "java",
  "go",
  "php",
  "ruby",
  "rust",
  "sql",
  "html",
  "css",
];

const ANALYSIS_TITLES = {
  critical: [
    "mutable state sem controle",
    "tratamento de erro ausente",
    "complexidade excessiva",
  ],
  warning: [
    "nome de variavel pouco claro",
    "duplicacao de logica",
    "tipagem poderia ser mais explicita",
  ],
  good: [
    "funcao com responsabilidade unica",
    "codigo legivel",
    "boa separacao por blocos",
  ],
} as const;

type Verdict = (typeof roasts.$inferInsert)["verdict"];
type Severity = (typeof analysisItems.$inferInsert)["severity"];

function getVerdictByScore(score: number): Verdict {
  if (score <= 2) {
    return "needs_serious_help";
  }

  if (score <= 4) {
    return "rough_around_edges";
  }

  if (score <= 6) {
    return "decent_code";
  }

  if (score <= 8) {
    return "solid_work";
  }

  return "exceptional";
}

function buildFakeCode(language: string) {
  const variableName = faker.hacker.noun().replaceAll(" ", "_");
  const functionName = faker.hacker.verb().replaceAll(" ", "_");

  if (language === "python") {
    return `def ${functionName}(${variableName}):\n    if not ${variableName}:\n        return None\n    return len(${variableName})`;
  }

  if (language === "sql") {
    return `SELECT id, ${variableName}\nFROM users\nWHERE created_at > NOW() - INTERVAL '7 days'\nORDER BY id DESC;`;
  }

  return `function ${functionName}(${variableName}) {\n  if (!${variableName}) return null;\n  return ${variableName}.length;\n}`;
}

function buildAnalysisItem(severity: Severity, order: number) {
  const title = faker.helpers.arrayElement(ANALYSIS_TITLES[severity]);

  return {
    severity,
    title,
    description: faker.hacker.phrase(),
    order,
  };
}

async function runSeed() {
  faker.seed(20260412);

  const roastRows: Array<typeof roasts.$inferInsert> = Array.from(
    { length: ROAST_COUNT },
    () => {
      const language = faker.helpers.arrayElement(LANGUAGES);
      const code = buildFakeCode(language);
      const lineCount = code.split(/\r\n|\r|\n/).length;
      const score = faker.number.float({ min: 0, max: 10, fractionDigits: 1 });

      return {
        code,
        language,
        lineCount,
        roastMode: faker.datatype.boolean(),
        score,
        verdict: getVerdictByScore(score),
        roastQuote: faker.helpers.maybe(() => faker.hacker.phrase(), {
          probability: 0.8,
        }),
        suggestedFix: faker.helpers.maybe(
          () =>
            `// suggested fix\n${code.replace("return", "// improved return\n  return")}`,
          { probability: 0.65 },
        ),
      };
    },
  );

  await db.transaction(async (tx) => {
    await tx.delete(analysisItems);
    await tx.delete(roasts);

    const insertedRoasts = await tx
      .insert(roasts)
      .values(roastRows)
      .returning({ id: roasts.id, score: roasts.score });

    const analysisRows = insertedRoasts.flatMap((roast) => {
      const itemCount = faker.number.int({ min: 2, max: 5 });

      return Array.from({ length: itemCount }, (_, index) => {
        let severity: Severity = "warning";

        if (roast.score <= 4) {
          severity = faker.helpers.arrayElement(["critical", "warning"]);
        } else if (roast.score >= 7) {
          severity = faker.helpers.arrayElement(["good", "warning"]);
        } else {
          severity = faker.helpers.arrayElement([
            "critical",
            "warning",
            "good",
          ]);
        }

        return {
          roastId: roast.id,
          ...buildAnalysisItem(severity, index),
        };
      });
    });

    await tx.insert(analysisItems).values(analysisRows);
  });

  console.log(`Seed finalizado: ${ROAST_COUNT} roasts inseridos.`);
}

runSeed()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("Erro ao executar seed:", error);
    process.exit(1);
  });
