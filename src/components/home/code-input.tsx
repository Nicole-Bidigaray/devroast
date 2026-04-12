"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import {
  EDITOR_LANGUAGES,
  type EditorLanguageId,
  FALLBACK_LANGUAGE,
  getEditorLanguageLabel,
  type LanguageMode,
} from "@/lib/code-languages";
import { detectLanguageFromCode } from "@/lib/detect-language";
import { highlightCodeToHtml } from "@/lib/shiki-client";

type CodeInputProps = {
  characterLimit: number;
  code: string;
  onCodeChange: (nextCode: string) => void;
};

export function CodeInput({
  characterLimit,
  code,
  onCodeChange,
}: CodeInputProps) {
  const MIN_EDITOR_HEIGHT = 320;
  const MAX_EDITOR_HEIGHT = 512;
  const LINE_HEIGHT = 20;
  const VERTICAL_PADDING = 32;

  const [highlightedCode, setHighlightedCode] = useState("");
  const [isHighlightPending, setIsHighlightPending] = useState(false);
  const [languageMode, setLanguageMode] = useState<LanguageMode>("auto");
  const [detectedLanguage, setDetectedLanguage] =
    useState<EditorLanguageId>(FALLBACK_LANGUAGE);
  const [manualLanguage, setManualLanguage] =
    useState<EditorLanguageId>("typescript");

  const gutterRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightedLayerRef = useRef<HTMLDivElement>(null);
  const detectTimeoutRef = useRef<number | null>(null);
  const highlightTimeoutRef = useRef<number | null>(null);

  const activeLanguage =
    languageMode === "manual" ? manualLanguage : detectedLanguage;

  const languageSelectValue = languageMode === "auto" ? "auto" : manualLanguage;

  const activeLanguageLabel =
    languageMode === "manual"
      ? getEditorLanguageLabel(activeLanguage)
      : `${getEditorLanguageLabel(activeLanguage)} (auto)`;

  const totalLines = useMemo(() => {
    const lineCount = code.split(/\r\n|\r|\n/).length;
    return Math.max(16, lineCount);
  }, [code]);

  const editorHeight = useMemo(() => {
    const contentHeight = totalLines * LINE_HEIGHT + VERTICAL_PADDING;

    return Math.min(
      MAX_EDITOR_HEIGHT,
      Math.max(MIN_EDITOR_HEIGHT, contentHeight),
    );
  }, [totalLines]);

  const isOverCharacterLimit = code.length > characterLimit;

  useEffect(() => {
    if (languageMode !== "auto") {
      return;
    }

    if (detectTimeoutRef.current) {
      window.clearTimeout(detectTimeoutRef.current);
    }

    detectTimeoutRef.current = window.setTimeout(() => {
      setDetectedLanguage((currentLanguage) =>
        detectLanguageFromCode({
          code,
          previousLanguage: currentLanguage,
        }),
      );
    }, 300);

    return () => {
      if (detectTimeoutRef.current) {
        window.clearTimeout(detectTimeoutRef.current);
      }
    };
  }, [code, languageMode]);

  useEffect(() => {
    let isMounted = true;

    setIsHighlightPending(true);

    if (highlightTimeoutRef.current) {
      window.clearTimeout(highlightTimeoutRef.current);
    }

    highlightTimeoutRef.current = window.setTimeout(async () => {
      const nextHighlightedCode = await highlightCodeToHtml(
        code || " ",
        activeLanguage,
      );

      if (isMounted) {
        setHighlightedCode(nextHighlightedCode);
        setIsHighlightPending(false);
      }
    }, 40);

    return () => {
      isMounted = false;
      if (highlightTimeoutRef.current) {
        window.clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, [activeLanguage, code]);

  function syncScrollPositions(scrollTop: number, scrollLeft: number) {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = scrollTop;
    }

    if (highlightedLayerRef.current) {
      highlightedLayerRef.current.scrollTop = scrollTop;
      highlightedLayerRef.current.scrollLeft = scrollLeft;
    }
  }

  function handleLanguageChange(nextValue: string) {
    if (nextValue === "auto") {
      setLanguageMode("auto");
      setDetectedLanguage((currentLanguage) =>
        detectLanguageFromCode({
          code,
          previousLanguage: currentLanguage,
        }),
      );
      return;
    }

    const selectedLanguage = EDITOR_LANGUAGES.find(
      (language) => language.id === nextValue,
    );

    if (!selectedLanguage) {
      return;
    }

    setManualLanguage(selectedLanguage.id);
    setLanguageMode("manual");
  }

  return (
    <section className="w-full max-w-195 overflow-hidden border border-border-primary bg-bg-input">
      <div className="flex h-10 items-center justify-between border-b border-border-primary px-4">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#EF4444]" />
          <span className="size-3 rounded-full bg-[#F59E0B]" />
          <span className="size-3 rounded-full bg-[#10B981]" />
        </div>

        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="language-select">
            selecionar linguagem
          </label>
          <div className="relative">
            <select
              className="appearance-none border border-border-primary bg-bg-surface py-1 pl-2 pr-6 font-mono text-[11px] text-text-secondary outline-none transition-colors focus-visible:border-accent-green"
              id="language-select"
              onChange={(event) => {
                handleLanguageChange(event.target.value);
              }}
              value={languageSelectValue}
            >
              <option value="auto">{`auto detect (${getEditorLanguageLabel(detectedLanguage)})`}</option>
              {EDITOR_LANGUAGES.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-1.5 top-1/2 size-3 -translate-y-1/2 text-text-tertiary"
            />
          </div>

          <span className="font-mono text-[11px] text-text-tertiary">
            {activeLanguageLabel}
          </span>
        </div>
      </div>

      <div className="flex" style={{ height: editorHeight }}>
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

        <div className="relative flex-1">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-auto px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&_code]:font-mono [&_code]:text-xs [&_code]:leading-5 [&_pre]:m-0! [&_pre]:bg-transparent! [&_pre]:p-0!"
            data-visible={!isHighlightPending}
            ref={highlightedLayerRef}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML generated by Shiki
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            style={{ opacity: isHighlightPending ? 0 : 1 }}
          />

          {code.length === 0 ? (
            <span className="pointer-events-none absolute left-4 top-4 font-mono text-xs text-text-tertiary">
              {"// cole seu codigo aqui"}
            </span>
          ) : null}

          <Textarea
            aria-label="editor de codigo"
            className="relative h-full min-h-0 border-0 bg-transparent px-4 py-4 text-xs leading-5 caret-text-primary selection:bg-accent-green/25 focus-visible:border-0"
            onChange={(event) => {
              const nextCode = event.target.value.slice(0, characterLimit);
              onCodeChange(nextCode);
            }}
            onScroll={(event) => {
              syncScrollPositions(
                event.currentTarget.scrollTop,
                event.currentTarget.scrollLeft,
              );
            }}
            placeholder=""
            ref={textareaRef}
            resize="none"
            spellCheck={false}
            maxLength={characterLimit}
            style={{
              color: isHighlightPending
                ? "var(--color-text-primary)"
                : "transparent",
            }}
            value={code}
          />
        </div>
      </div>

      <div className="flex h-8 items-center justify-end border-t border-border-primary px-3">
        <span
          className={`font-mono text-[11px] ${isOverCharacterLimit ? "text-accent-red" : "text-text-tertiary"}`}
        >
          {code.length}/{characterLimit} chars
        </span>
      </div>
    </section>
  );
}
