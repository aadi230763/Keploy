import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  language: string;
  code: string;
}

export function CodeBlock({ language, code }: CodeBlockProps) {
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
            {language}
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
          {code}
        </code>
      </pre>
    </div>
  );
}
