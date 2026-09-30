import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "./components/ThemeToggle";
import { SidebarNav, MobileNavToggle } from "./components/SidebarNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Build Your First Keploy Test Suite for a Go API",
  description:
    "A beginner-friendly tutorial for recording and replaying Go API tests with Keploy.",
  openGraph: {
    title: "Build Your First Keploy Test Suite for a Go API",
    description:
      "A beginner-friendly tutorial for recording and replaying Go API tests with Keploy.",
    type: "article",
    locale: "en_US",
  },
};

const navGroups = [
  {
    title: "Introduction",
    items: [
      { id: "start-here", label: "Start here" },
      { id: "what-youll-build", label: "What you'll build" },
      { id: "what-is-keploy", label: "What is Keploy?" },
      { id: "the-mental-model", label: "The mental model" },
      { id: "before-you-start", label: "Before you start" },
      { id: "the-workflow", label: "The workflow" },
    ],
  },
  {
    title: "Setup",
    items: [
      { id: "step-1-get-the-sample-application", label: "Get the sample app", step: 1 },
      { id: "step-2-start-mysql", label: "Start MySQL", step: 2 },
      { id: "step-3-build-the-go-application", label: "Build the app", step: 3 },
    ],
  },
  {
    title: "Record",
    items: [
      { id: "step-4-start-keploy-in-record-mode", label: "Start record mode", step: 4 },
      { id: "step-5-exercise-the-api", label: "Exercise the API", step: 5 },
      { id: "step-6-stop-recording", label: "Stop recording", step: 6 },
      { id: "step-7-understand-what-keploy-created", label: "What Keploy created", step: 7 },
    ],
  },
  {
    title: "Replay",
    items: [
      { id: "step-8-replay-the-recorded-tests", label: "Replay the tests", step: 8 },
      { id: "step-9-verify-the-result", label: "Verify the result", step: 9 },
    ],
  },
  {
    title: "Wrap-up",
    items: [
      { id: "what-actually-happened", label: "What actually happened" },
      { id: "troubleshooting", label: "Troubleshooting" },
      { id: "what-i-learned-from-running-this", label: "What I learned" },
      { id: "final-takeaway", label: "Final takeaway" },
    ],
  },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light')}catch{}})()`,
          }}
        />
      </head>
      <body>
        {/* Skip link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Header */}
        <header className="site-header">
          <a href="#" className="site-logo" aria-label="Go to top">
            <span className="logo-mark" aria-hidden="true">
              <span />
            </span>
            <span className="logo-name">Keploy</span>
            <span className="logo-sep">/</span>
            <span className="logo-page">Go Tutorial</span>
          </a>

          <div className="header-actions">
            <a
              href="https://github.com/keploy/keploy"
              target="_blank"
              rel="noopener noreferrer"
              className="header-link"
              aria-label="View Keploy on GitHub (opens in new tab)"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>

            <ThemeToggle />
            <MobileNavToggle />
          </div>
        </header>

        {/* Main layout */}
        <div className="doc-layout" style={{ flex: 1 }}>
          {/* Left Sidebar */}
          <SidebarNav groups={navGroups} />
          
          {/* Main content */}
          <main className="doc-main" id="main-content">
            <article className="doc-content">{children}</article>
          </main>
        </div>

        {/* Footer */}
        <footer className="site-footer">
          Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>{" "}
          + MDX · Tutorial by Aditya Chawla ·{" "}
          <a
            href="https://keploy.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            Keploy
          </a>
        </footer>
      </body>
    </html>
  );
}
