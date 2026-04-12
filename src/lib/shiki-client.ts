import bash from "@shikijs/langs/bash";
import csharp from "@shikijs/langs/csharp";
import css from "@shikijs/langs/css";
import go from "@shikijs/langs/go";
import html from "@shikijs/langs/html";
import java from "@shikijs/langs/java";
import javascript from "@shikijs/langs/javascript";
import json from "@shikijs/langs/json";
import jsx from "@shikijs/langs/jsx";
import php from "@shikijs/langs/php";
import python from "@shikijs/langs/python";
import ruby from "@shikijs/langs/ruby";
import rust from "@shikijs/langs/rust";
import sql from "@shikijs/langs/sql";
import tsx from "@shikijs/langs/tsx";
import typescript from "@shikijs/langs/typescript";
import vesper from "@shikijs/themes/vesper";
import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

import {
  type EditorLanguageId,
  FALLBACK_LANGUAGE,
  SHIKI_LANGUAGE_BY_EDITOR_LANGUAGE,
} from "@/lib/code-languages";

const SHIKI_THEME = "vesper" as const;

const AVAILABLE_LANGUAGES = {
  bash,
  csharp,
  css,
  go,
  html,
  java,
  javascript,
  json,
  jsx,
  php,
  python,
  ruby,
  rust,
  sql,
  tsx,
  typescript,
} as const;

const highlighterPromise = createHighlighterCore({
  themes: [vesper],
  langs: [typescript, javascript, tsx, python, sql],
  engine: createJavaScriptRegexEngine(),
});

function escapeHtml(raw: string) {
  return raw
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function highlightCodeToHtml(
  code: string,
  language: EditorLanguageId,
) {
  if (language === FALLBACK_LANGUAGE) {
    return `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`;
  }

  const highlighter = await highlighterPromise;
  const shikiLanguageId = SHIKI_LANGUAGE_BY_EDITOR_LANGUAGE[language];

  if (!shikiLanguageId) {
    return `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`;
  }

  const shikiLanguage =
    AVAILABLE_LANGUAGES[shikiLanguageId as keyof typeof AVAILABLE_LANGUAGES];
  if (!shikiLanguage) {
    return `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`;
  }

  const loadedLanguages = highlighter.getLoadedLanguages();
  if (!loadedLanguages.includes(shikiLanguageId)) {
    await highlighter.loadLanguage(shikiLanguage);
  }

  return highlighter.codeToHtml(code, {
    lang: shikiLanguageId,
    theme: SHIKI_THEME,
  });
}
