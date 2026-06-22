"use client";

import React from "react";

type AiReviewMarkdownProps = {
  content: string;
};

export function AiReviewMarkdown({ content }: AiReviewMarkdownProps) {
  if (!content) return null;

  const blocks: React.ReactNode[] = [];
  const lines = content.split("\n");

  let currentBlockType: "paragraph" | "code" | "list" | null = null;
  let codeBlockLines: string[] = [];
  let codeBlockLang = "";
  let listItems: string[] = [];

  const flushBlock = (index: number) => {
    if (currentBlockType === "code") {
      blocks.push(
        <div key={`code-${index}`} className="my-4 rounded-xl border border-foreground/10 bg-slate-950 p-4 font-mono text-sm text-slate-50 overflow-x-auto shadow-inner">
          {codeBlockLang && (
            <div className="text-xs text-muted-foreground uppercase border-b border-foreground/10 pb-2 mb-2 select-none">
              {codeBlockLang}
            </div>
          )}
          <pre className="whitespace-pre">
            {codeBlockLines.join("\n")}
          </pre>
        </div>
      );
      codeBlockLines = [];
      codeBlockLang = "";
    } else if (currentBlockType === "list") {
      blocks.push(
        <ul key={`list-${index}`} className="my-4 list-disc pl-6 space-y-2 text-sm text-foreground/80">
          {listItems.map((item, idx) => (
            <li key={idx}>{parseInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
    currentBlockType = null;
  };

  const parseInlineMarkdown = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let i = 0;
    let keyIdx = 0;

    while (i < text.length) {
      // Bold check: **text**
      if (text.startsWith("**", i)) {
        const end = text.indexOf("**", i + 2);
        if (end !== -1) {
          parts.push(<strong key={keyIdx++} className="font-bold text-foreground">{text.slice(i + 2, end)}</strong>);
          i = end + 2;
          continue;
        }
      }
      
      // Inline code check: `text`
      if (text.startsWith("`", i)) {
        const end = text.indexOf("`", i + 1);
        if (end !== -1) {
          parts.push(
            <code key={keyIdx++} className="px-1.5 py-0.5 rounded bg-muted/70 text-amber-500 dark:text-amber-400 font-mono text-xs border border-foreground/5">
              {text.slice(i + 1, end)}
            </code>
          );
          i = end + 1;
          continue;
        }
      }

      // Plain character
      parts.push(text[i]);
      i++;
    }

    return parts;
  };

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];

    // Fenced Code Block
    if (line.trim().startsWith("```")) {
      if (currentBlockType === "code") {
        flushBlock(idx);
      } else {
        flushBlock(idx);
        currentBlockType = "code";
        codeBlockLang = line.trim().slice(3).trim();
      }
      continue;
    }

    if (currentBlockType === "code") {
      codeBlockLines.push(line);
      continue;
    }

    // Headings
    if (line.startsWith("# ")) {
      flushBlock(idx);
      blocks.push(
        <h1 key={`h1-${idx}`} className="text-2xl font-bold tracking-tight text-foreground mt-8 mb-4 border-b pb-2">
          {parseInlineMarkdown(line.slice(2))}
        </h1>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      flushBlock(idx);
      blocks.push(
        <h2 key={`h2-${idx}`} className="text-xl font-semibold tracking-tight text-foreground mt-6 mb-3 border-b border-foreground/5 pb-1">
          {parseInlineMarkdown(line.slice(3))}
        </h2>
      );
      continue;
    }

    if (line.startsWith("### ")) {
      flushBlock(idx);
      blocks.push(
        <h3 key={`h3-${idx}`} className="text-lg font-medium tracking-tight text-foreground mt-4 mb-2">
          {parseInlineMarkdown(line.slice(4))}
        </h3>
      );
      continue;
    }

    // Unordered List Items
    const listMatch = line.match(/^(\s*)[-*+]\s+(.*)$/);
    if (listMatch) {
      if (currentBlockType !== "list") {
        flushBlock(idx);
        currentBlockType = "list";
      }
      listItems.push(listMatch[2]);
      continue;
    }

    // Empty lines
    if (line.trim() === "") {
      flushBlock(idx);
      continue;
    }

    // Paragraph
    flushBlock(idx);
    
    blocks.push(
      <p key={`p-${idx}`} className="my-3 text-sm text-foreground/80 leading-relaxed">
        {parseInlineMarkdown(line)}
      </p>
    );
  }

  // Final flush
  flushBlock(lines.length);

  return <div className="space-y-1 font-sans">{blocks}</div>;
}
