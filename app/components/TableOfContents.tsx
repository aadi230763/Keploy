"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";

interface TocItem {
  id: string;
  text: string;
}

// External store for the list of headings discovered in the DOM.
let headingItems: TocItem[] = [];
const headingListeners = new Set<() => void>();

function subscribeHeadings(cb: () => void) {
  headingListeners.add(cb);
  return () => headingListeners.delete(cb);
}

function getHeadings() {
  return headingItems;
}

function discoverHeadings() {
  // Only collect h2 headings — skip the h1 title and h3 subsections
  const headings = document.querySelectorAll<HTMLHeadingElement>(
    ".doc-content h2"
  );
  const next: TocItem[] = [];
  headings.forEach((h) => {
    if (h.id) {
      next.push({
        id: h.id,
        text: h.textContent || "",
      });
    }
  });
  headingItems = next;
  headingListeners.forEach((cb) => cb());
}

// External store for the active heading ID.
let currentActiveId = "";
const activeListeners = new Set<() => void>();

function subscribeActive(cb: () => void) {
  activeListeners.add(cb);
  return () => activeListeners.delete(cb);
}

function getActiveId() {
  return currentActiveId;
}

function setActiveIdExternal(id: string) {
  if (currentActiveId !== id) {
    currentActiveId = id;
    activeListeners.forEach((cb) => cb());
  }
}

const EMPTY_ITEMS: TocItem[] = [];

export function TableOfContents() {
  const items = useSyncExternalStore(subscribeHeadings, getHeadings, () => EMPTY_ITEMS);
  const activeId = useSyncExternalStore(subscribeActive, getActiveId, () => "");
  const discoveredRef = useRef(false);

  // Discover headings once after mount
  useEffect(() => {
    if (discoveredRef.current) return;
    discoveredRef.current = true;
    discoverHeadings();
  }, []);

  // Observe headings for scroll-based active tracking
  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveIdExternal(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  // Shorten long step labels for the compact TOC display
  const displayItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        shortText: item.text
          .replace(/^Step \d+:\s*/i, "")
          .replace(/\?$/, ""),
      })),
    [items]
  );

  if (displayItems.length === 0) return null;

  return (
    <nav aria-label="On this page">
      <div className="toc-title">On This Page</div>
      {displayItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`toc-item${activeId === item.id ? " active" : ""}`}
        >
          {item.shortText}
        </a>
      ))}
    </nav>
  );
}
