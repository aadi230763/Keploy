import type { MDXComponents } from "mdx/types";
import type { DetailedHTMLProps, HTMLAttributes, BlockquoteHTMLAttributes } from "react";
import { CodeBlock } from "@/app/components/CodeBlock";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function Heading({
  level,
  children,
  ...props
}: { level: 1 | 2 | 3 | 4 | 5 | 6 } & DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) {
  const Tag = `h${level}` as const;
  const text =
    typeof children === "string"
      ? children
      : Array.isArray(children)
        ? children
            .map((c) => (typeof c === "string" ? c : ""))
            .join("")
        : "";
  const id = slugify(text);

  return (
    <Tag id={id} {...props}>
      {children}
    </Tag>
  );
}

export function useMDXComponents(
  components: MDXComponents
): MDXComponents {
  return {
    ...components,

    h1: (props) => <Heading level={1} {...props} />,
    h2: (props) => <Heading level={2} {...props} />,
    h3: (props) => <Heading level={3} {...props} />,
    h4: (props) => <Heading level={4} {...props} />,

    pre: (
      props: DetailedHTMLProps<
        HTMLAttributes<HTMLPreElement>,
        HTMLPreElement
      >
    ) => {
      const child = props.children as React.ReactElement<{
        className?: string;
        children?: string;
      }> | undefined;

      if (child && typeof child === "object" && "props" in child) {
        const className = child.props.className || "";
        const lang = className.replace(/^language-/, "") || "text";
        const code =
          typeof child.props.children === "string"
            ? child.props.children.trimEnd()
            : "";
        return <CodeBlock language={lang} code={code} />;
      }

      return <pre {...props} />;
    },

    blockquote: (
      props: DetailedHTMLProps<
        BlockquoteHTMLAttributes<HTMLQuoteElement>,
        HTMLQuoteElement
      >
    ) => {
      return <blockquote {...props} />;
    },
  };
}
