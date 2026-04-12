export type EditorLanguageId =
  | "plaintext"
  | "javascript"
  | "typescript"
  | "tsx"
  | "jsx"
  | "json"
  | "html"
  | "css"
  | "sql"
  | "bash"
  | "python"
  | "java"
  | "go"
  | "csharp"
  | "php"
  | "ruby"
  | "rust";

export type LanguageMode = "auto" | "manual";

type EditorLanguage = {
  id: EditorLanguageId;
  label: string;
  shikiLanguage?: string;
  highlightJsLanguage?: string;
};

export const FALLBACK_LANGUAGE: EditorLanguageId = "plaintext";

const editorLanguages: EditorLanguage[] = [
  { id: "plaintext", label: "Plain Text" },
  {
    id: "bash",
    label: "Bash",
    shikiLanguage: "bash",
    highlightJsLanguage: "bash",
  },
  {
    id: "csharp",
    label: "C#",
    shikiLanguage: "csharp",
    highlightJsLanguage: "csharp",
  },
  {
    id: "css",
    label: "CSS",
    shikiLanguage: "css",
    highlightJsLanguage: "css",
  },
  {
    id: "go",
    label: "Go",
    shikiLanguage: "go",
    highlightJsLanguage: "go",
  },
  {
    id: "html",
    label: "HTML",
    shikiLanguage: "html",
    highlightJsLanguage: "xml",
  },
  {
    id: "java",
    label: "Java",
    shikiLanguage: "java",
    highlightJsLanguage: "java",
  },
  {
    id: "javascript",
    label: "JavaScript",
    shikiLanguage: "javascript",
    highlightJsLanguage: "javascript",
  },
  {
    id: "json",
    label: "JSON",
    shikiLanguage: "json",
    highlightJsLanguage: "json",
  },
  {
    id: "jsx",
    label: "JSX",
    shikiLanguage: "jsx",
    highlightJsLanguage: "jsx",
  },
  {
    id: "php",
    label: "PHP",
    shikiLanguage: "php",
    highlightJsLanguage: "php",
  },
  {
    id: "python",
    label: "Python",
    shikiLanguage: "python",
    highlightJsLanguage: "python",
  },
  {
    id: "ruby",
    label: "Ruby",
    shikiLanguage: "ruby",
    highlightJsLanguage: "ruby",
  },
  {
    id: "rust",
    label: "Rust",
    shikiLanguage: "rust",
    highlightJsLanguage: "rust",
  },
  {
    id: "sql",
    label: "SQL",
    shikiLanguage: "sql",
    highlightJsLanguage: "sql",
  },
  {
    id: "tsx",
    label: "TSX",
    shikiLanguage: "tsx",
    highlightJsLanguage: "tsx",
  },
  {
    id: "typescript",
    label: "TypeScript",
    shikiLanguage: "typescript",
    highlightJsLanguage: "typescript",
  },
];

export const EDITOR_LANGUAGES = [...editorLanguages].sort((first, second) => {
  if (first.id === FALLBACK_LANGUAGE) {
    return -1;
  }

  if (second.id === FALLBACK_LANGUAGE) {
    return 1;
  }

  return first.label.localeCompare(second.label);
});

export const AUTO_DETECT_LABEL = "Auto detect";

export const PRELOADED_SHIKI_LANGUAGES = [
  "typescript",
  "javascript",
  "tsx",
  "python",
  "sql",
] as const;

export const DETECTABLE_HIGHLIGHT_JS_LANGUAGES = EDITOR_LANGUAGES.map(
  (language) => language.highlightJsLanguage,
).filter((language): language is string => Boolean(language));

export const EDITOR_LANGUAGE_BY_ID = Object.fromEntries(
  EDITOR_LANGUAGES.map((language) => [language.id, language]),
) as Record<EditorLanguageId, EditorLanguage>;

export const SHIKI_LANGUAGE_BY_EDITOR_LANGUAGE = Object.fromEntries(
  EDITOR_LANGUAGES.filter((language) => language.shikiLanguage).map(
    (language) => [language.id, language.shikiLanguage],
  ),
) as Partial<Record<EditorLanguageId, string>>;

export function isSupportedLanguageId(
  value: string,
): value is EditorLanguageId {
  return value in EDITOR_LANGUAGE_BY_ID;
}

export function getEditorLanguageLabel(languageId: EditorLanguageId) {
  return EDITOR_LANGUAGE_BY_ID[languageId]?.label ?? "Plain Text";
}
