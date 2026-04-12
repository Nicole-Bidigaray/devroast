import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import csharp from "highlight.js/lib/languages/csharp";
import css from "highlight.js/lib/languages/css";
import go from "highlight.js/lib/languages/go";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import php from "highlight.js/lib/languages/php";
import python from "highlight.js/lib/languages/python";
import ruby from "highlight.js/lib/languages/ruby";
import rust from "highlight.js/lib/languages/rust";
import scss from "highlight.js/lib/languages/scss";
import sql from "highlight.js/lib/languages/sql";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";

import {
  DETECTABLE_HIGHLIGHT_JS_LANGUAGES,
  type EditorLanguageId,
  FALLBACK_LANGUAGE,
  isSupportedLanguageId,
} from "@/lib/code-languages";

const MINIMUM_DETECTABLE_CHARS = 20;
const MINIMUM_DETECTABLE_LINES = 2;
const MINIMUM_RELEVANCE_SCORE = 5;

let highlightJsInitialized = false;

const detectedLanguageAliases: Record<string, EditorLanguageId> = {
  cs: "csharp",
  csharp: "csharp",
  html: "html",
  js: "javascript",
  jsx: "jsx",
  sh: "bash",
  shell: "bash",
  shellscript: "bash",
  ts: "typescript",
  tsx: "tsx",
  xml: "html",
};

function initializeHighlightJs() {
  if (highlightJsInitialized) {
    return;
  }

  hljs.registerLanguage("bash", bash);
  hljs.registerLanguage("csharp", csharp);
  hljs.registerLanguage("css", css);
  hljs.registerLanguage("go", go);
  hljs.registerLanguage("java", java);
  hljs.registerLanguage("javascript", javascript);
  hljs.registerLanguage("json", json);
  hljs.registerLanguage("php", php);
  hljs.registerLanguage("python", python);
  hljs.registerLanguage("ruby", ruby);
  hljs.registerLanguage("rust", rust);
  hljs.registerLanguage("scss", scss);
  hljs.registerLanguage("sql", sql);
  hljs.registerLanguage("typescript", typescript);
  hljs.registerLanguage("tsx", typescript);
  hljs.registerLanguage("jsx", javascript);
  hljs.registerLanguage("xml", xml);
  hljs.registerLanguage("yaml", yaml);

  highlightJsInitialized = true;
}

function normalizeDetectedLanguage(language: string | undefined) {
  if (!language) {
    return FALLBACK_LANGUAGE;
  }

  const normalizedAlias = detectedLanguageAliases[language.toLowerCase()];
  if (normalizedAlias) {
    return normalizedAlias;
  }

  if (isSupportedLanguageId(language)) {
    return language;
  }

  return FALLBACK_LANGUAGE;
}

function shouldSkipDetection(code: string) {
  const trimmedCode = code.trim();
  if (!trimmedCode) {
    return true;
  }

  const totalLines = trimmedCode.split(/\r\n|\r|\n/).length;
  return (
    trimmedCode.length < MINIMUM_DETECTABLE_CHARS &&
    totalLines < MINIMUM_DETECTABLE_LINES
  );
}

type DetectLanguageOptions = {
  code: string;
  previousLanguage: EditorLanguageId;
};

export function detectLanguageFromCode({
  code,
  previousLanguage,
}: DetectLanguageOptions): EditorLanguageId {
  if (shouldSkipDetection(code)) {
    return previousLanguage;
  }

  initializeHighlightJs();

  const result = hljs.highlightAuto(code, [
    ...DETECTABLE_HIGHLIGHT_JS_LANGUAGES,
    "scss",
    "yaml",
  ]);
  const normalizedLanguage = normalizeDetectedLanguage(result.language);

  if (normalizedLanguage === FALLBACK_LANGUAGE) {
    return FALLBACK_LANGUAGE;
  }

  if (result.relevance < MINIMUM_RELEVANCE_SCORE) {
    return previousLanguage;
  }

  return normalizedLanguage;
}
