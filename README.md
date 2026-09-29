# Keploy Go API Testing Tutorial

This is a single-page beginner-friendly documentation tutorial showing how to record and replay API tests for a Go + MySQL application using Keploy. It serves as an interactive, highly polished guide built to demonstrate the power of Keploy in a real-world workflow.

## What this project demonstrates
- Next.js (App Router)
- MDX for interactive documentation
- Keploy test recording
- Keploy test replay
- Go API testing
- Dependency mocks (MySQL)

## Features
- Beginner-friendly step-by-step tutorial
- MDX documentation with responsive styling
- Custom MDX components (styled Headings and Code Blocks)
- Dark/light mode support (via custom `ThemeToggle`)
- Scroll-spy Table of Contents
- Syntax-highlighted code blocks with copy-to-clipboard functionality
- Responsive navigation drawer for mobile
- Sleek, polished, UI inspired by modern design systems

## Tech Stack
- React
- Next.js 16
- MDX (`@next/mdx`)
- Tailwind CSS v4
- Geist Fonts
- HTML5 & CSS Variables

## Run locally

To run the documentation website locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for production

To create a static production build:

```bash
npm run build
```

## Project structure

- `app/page.mdx`: The core tutorial content written in Markdown with JSX.
- `app/components/`: Reusable React components (SidebarNav, TableOfContents, ThemeToggle, CodeBlock).
- `app/layout.tsx`: Main page layout, navigation, and structure.
- `app/globals.css`: Core design system, variables, styling, and dark mode logic.
- `next.config.ts`: Next.js configuration enabling MDX support.
- `mdx-components.tsx`: Maps standard Markdown elements to custom React components.

## Deployment

This static Next.js documentation site is ready to be deployed to Vercel. 

## Assignment context

This project was created for the Keploy DevRel Candidate Assignment. It focuses on high-quality content delivery, clear technical instruction, and exceptional UI/UX for developers reading the documentation.
