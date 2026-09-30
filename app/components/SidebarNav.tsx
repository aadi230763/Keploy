"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

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

export interface NavItem {
  id: string;
  label: string;
  step?: number;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

interface SidebarNavProps {
  groups: NavGroup[];
}

// Tracks which section heading the reader is currently looking at, plus how
// far down the page they have scrolled (0–100).
function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const update = () => {
      // The active section is the last heading that has scrolled past a line
      // just below the sticky header.
      const offset = 120;
      let current = headings[0]?.id ?? null;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top - offset <= 0) {
          current = heading.id;
        } else {
          break;
        }
      }

      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;

      // At the very bottom, short final sections never reach the offset line.
      if (ratio >= 0.995 && headings.length > 0) {
        current = headings[headings.length - 1].id;
      }

      setActiveId(current);
      setProgress(Math.round(Math.min(1, Math.max(0, ratio)) * 100));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids]);

  return { activeId, progress };
}

const CheckIcon = (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export function SidebarNav({ groups }: SidebarNavProps) {
  const open = useSyncExternalStore(subscribeNav, getNavSnapshot, () => false);
  const [ids] = useState(() => groups.flatMap((g) => g.items.map((i) => i.id)));
  const { activeId, progress } = useScrollSpy(ids);
  const activeIndex = activeId ? ids.indexOf(activeId) : -1;

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
          <div className="sidebar-header">
            <div className="sidebar-eyebrow">Keploy + Go tutorial</div>
            <div className="sidebar-title">Your first test suite</div>
            <div
              className="sidebar-progress"
              role="progressbar"
              aria-label="Reading progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="sidebar-progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="sidebar-progress-label">{progress}% read</div>
          </div>

          {groups.map((group) => (
            <div className="nav-group" key={group.title}>
              <div className="sidebar-label">{group.title}</div>
              <ul className="nav-list">
                {group.items.map((item) => {
                  const index = ids.indexOf(item.id);
                  const isActive = item.id === activeId;
                  const isDone = activeIndex > -1 && index < activeIndex;
                  const className = [
                    "nav-item",
                    item.step ? "nav-item--step" : "",
                    isActive ? "active" : "",
                    isDone ? "done" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={className}
                        aria-current={isActive ? "location" : undefined}
                        onClick={() => setNavOpen(false)}
                      >
                        {item.step ? (
                          <span className="nav-step" aria-hidden="true">
                            {isDone ? CheckIcon : item.step}
                          </span>
                        ) : (
                          <span className="nav-dot" aria-hidden="true" />
                        )}
                        <span className="nav-label">
                          {item.step && (
                            <span className="sr-only">Step {item.step}: </span>
                          )}
                          {item.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
