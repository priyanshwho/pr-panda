"use client";

import { cn } from "@/lib/utils";

type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
};

export function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={cn("flex gap-3 px-4 py-3", isUser ? "flex-row-reverse" : "flex-row")}>
      {/* Avatar */}
      <div
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border"
        )}
      >
        {isUser ? "You" : "🐼"}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-sidebar-accent text-sidebar-accent-foreground rounded-tl-sm"
        )}
      >
        {/* Render markdown-ish content */}
        <MessageContent content={content} />
        {isStreaming && (
          <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-current opacity-70 rounded-full" />
        )}
      </div>
    </div>
  );
}

/** Renders plain text with basic markdown: code blocks, bold, inline code */
function MessageContent({ content }: { content: string }) {
  // Split on code blocks first
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2">
      {parts.map((part, i) => {
        if (part.startsWith("```")) {
          const lines = part.split("\n");
          const lang = lines[0].replace("```", "").trim();
          const code = lines.slice(1, -1).join("\n");
          return (
            <pre
              key={i}
              className="overflow-x-auto rounded-lg bg-background/50 p-3 text-xs font-mono whitespace-pre-wrap border border-current/10"
            >
              {lang && <span className="block text-xs opacity-50 mb-1">{lang}</span>}
              {code}
            </pre>
          );
        }

        // Inline formatting: **bold**, `code`
        return (
          <span key={i} className="block whitespace-pre-wrap">
            {renderInline(part)}
          </span>
        );
      })}
    </div>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-background/40 px-1 py-0.5 text-xs font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
