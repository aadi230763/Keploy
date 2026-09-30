import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  language: string;
  code: string;
}

type BlockKind = "terminal" | "output" | "plain";

const TERMINAL_LANGS = new Set(["bash", "sh", "shell", "zsh"]);
const OUTPUT_LANGS = new Set(["text", "output", "console"]);

// Human-readable labels so readers can tell at a glance whether a block is
// something to run, something to expect, or something to read.
const LABELS: Record<string, string> = {
  bash: "Terminal",
  sh: "Terminal",
  shell: "Terminal",
  zsh: "Terminal",
  text: "Output",
  output: "Output",
  console: "Output",
  tree: "Project files",
  flow: "Flow",
};

function getKind(language: string): BlockKind {
  if (TERMINAL_LANGS.has(language)) return "terminal";
  if (OUTPUT_LANGS.has(language)) return "output";
  return "plain";
}

// Prefix the first line of each command with a prompt. Continuation lines
// (after a trailing backslash) and blank lines are left alone.
function renderTerminal(code: string) {
  const lines = code.split("\n");
  return lines.map((line, i) => {
    const isContinuation = i > 0 && lines[i - 1].trimEnd().endsWith("\\");
    const showPrompt = line.trim() !== "" && !isContinuation;
    return (
      <span key={i} style={{ display: "block" }}>
        {showPrompt && (
          <span
            aria-hidden="true"
            style={{ color: "var(--accent)", userSelect: "none" }}
          >
            ${" "}
          </span>
        )}
        {!showPrompt && line.trim() !== "" && (
          <span aria-hidden="true" style={{ userSelect: "none" }}>
            {"  "}
          </span>
        )}
        {line || "\u00a0"}
      </span>
    );
  });
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  const kind = getKind(language);
  const label = LABELS[language] ?? language;

  if (kind === "output") {
    return (
      <div className="output-block" role="region" aria-label="Expected output">
        <div className="output-label">{label}</div>
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div
      style={{
        margin: "20px 0",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border)",
        background: "var(--code-bg)",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
        transition:
          "background var(--transition-base), border-color var(--transition-base)",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 16px",
          borderBottom: "1px solid var(--border)",
          background: "rgba(0, 0, 0, 0.15)",
          transition: "border-color var(--transition-base)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Terminal dots */}
          <div style={{ display: "flex", gap: 5 }}>
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#ef4444",
                opacity: 0.7,
              }}
            />
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#eab308",
                opacity: 0.7,
              }}
            />
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#22c55e",
                opacity: 0.7,
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "0.6875rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              fontWeight: 600,
            }}
          >
            {label}
          </span>
          <CopyButton text={code} />
        </div>
      </div>
      {/* Code content */}
      <pre
        style={{
          margin: 0,
          border: 0,
          borderRadius: 0,
          background: "transparent",
          boxShadow: "none",
          overflowX: "auto",
        }}
      >
        <code
          style={{
            display: "block",
            padding: "16px 20px",
            border: 0,
            borderRadius: 0,
            background: "transparent",
            color: "var(--code-text)",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "0.8125rem",
            lineHeight: 1.7,
          }}
        >
          {kind === "terminal" ? renderTerminal(code) : code}
        </code>
      </pre>
    </div>
  );
}
