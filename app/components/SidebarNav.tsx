"use client";

import { useSyncExternalStore } from "react";

let isNavOpen = false;
const navListeners = new Set<() => void>();

function subscribeNav(cb: () => void) {
  navListeners.add(cb);
  return () => navListeners.delete(cb);
}

function getNavSnapshot() {
  return isNavOpen;
}

export function setNavOpen(open: boolean) {
  isNavOpen = open;
  navListeners.forEach((cb) => cb());
}

export function MobileNavToggle() {
  const open = useSyncExternalStore(subscribeNav, getNavSnapshot, () => false);

  return (
    <button
      className="mobile-nav-btn"
      onClick={() => setNavOpen(!open)}
      aria-label={open ? "Close navigation" : "Open navigation"}
      aria-expanded={open}
    >
      {open ? "✕" : "☰"}
    </button>
  );
}

function getIconForSection(id: string) {
  const baseProps = {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (id.includes('mysql') || id.includes('database')) {
    return (
      <svg {...baseProps}>
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
      </svg>
    );
  }
  if (id.includes('build') || id.includes('app')) {
    return (
      <svg {...baseProps}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    );
  }
  if (id.includes('record')) {
    return (
      <svg {...baseProps}>
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    );
  }
  if (id.includes('replay') || id.includes('test')) {
    return (
      <svg {...baseProps}>
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
    );
  }
  if (id.includes('verify') || id.includes('result')) {
    return (
      <svg {...baseProps}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    );
  }
  if (id.includes('troubleshoot')) {
    return (
      <svg {...baseProps}>
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    );
  }
  // Default to a generic document/file icon
  return (
    <svg {...baseProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );
}

interface SidebarNavProps {
  sections: { id: string; label: string }[];
}

export function SidebarNav({ sections }: SidebarNavProps) {
  const open = useSyncExternalStore(subscribeNav, getNavSnapshot, () => false);

  const handleClick = () => {
    setNavOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`mobile-overlay${open ? " open" : ""}`}
        onClick={() => setNavOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`doc-sidebar${open ? " open" : ""}`}>
        <nav aria-label="Tutorial sections">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "24px",
              padding: "0 10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 24,
                height: 24,
                borderRadius: 6,
                background: "var(--accent-muted)",
                border: "1px solid rgba(249, 115, 22, 0.2)",
              }}
              aria-hidden="true"
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--accent)",
                }}
              />
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: "0.875rem",
                letterSpacing: "-0.01em",
                color: "var(--text-primary)",
              }}
            >
              Tutorial Steps
            </span>
          </div>
          <div className="sidebar-label">TUTORIAL CONTENT</div>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="nav-item"
              onClick={handleClick}
            >
              <span className="nav-icon">
                {getIconForSection(section.id)}
              </span>
              <span>{section.label}</span>
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
