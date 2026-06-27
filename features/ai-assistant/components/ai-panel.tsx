"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useChat, type UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { usePathname } from "next/navigation";
import { X, PaperPlaneTilt, ArrowCounterClockwise, Sparkle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { ChatMessage } from "./chat-message";

type Conversation = {
  id: string;
  title: string;
  updatedAt: string;
  preview: string;
};

type AiPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  recentConversations: Conversation[];
};

export function AiPanel({ isOpen, onClose, recentConversations }: AiPanelProps) {
  const pathname = usePathname();
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [input, setInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Setup transport with dynamic body and custom headers interceptor
  const transport = useMemo(() => {
    return new DefaultChatTransport({
      api: "/api/ai/chat",
      body: () => ({ conversationId, currentPage: pathname }),
      fetch: async (inputUrl, init) => {
        const response = await fetch(inputUrl, init);
        const id = response.headers.get("X-Conversation-Id");
        if (id) {
          setConversationId(id);
        }
        return response;
      },
    });
  }, [conversationId, pathname]);

  const { messages, sendMessage, status, setMessages } = useChat({
    transport,
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus textarea when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 150);
    }
  }, [isOpen]);

  function handleInputChange(
    e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>
  ) {
    setInput(e.target.value);
  }

  // Auto-resize textarea
  function handleTextareaInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    handleInputChange(e);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.closest("form");
      form?.requestSubmit();
    }
  }

  function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function startNewChat() {
    setMessages([]);
    setConversationId(undefined);
    setShowHistory(false);
    setInput("");
    setTimeout(() => textareaRef.current?.focus(), 50);
  }

  return (
    <>
      {/* Backdrop (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-[380px] max-w-[95vw] flex-col",
          "bg-sidebar border-l border-sidebar-border shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-sidebar-border px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <Sparkle className="h-4 w-4 text-primary" weight="fill" />
            </div>
            <span className="text-sm font-semibold">PR Panda AI</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={startNewChat}
              title="New conversation"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
            >
              <ArrowCounterClockwise className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              title="Close"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Recent conversations or chat */}
        {showHistory ? (
          <div className="flex flex-1 flex-col overflow-y-auto p-4 gap-2">
            <p className="text-xs font-medium text-muted-foreground px-1 mb-1">Recent chats</p>
            {recentConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => {
                  setConversationId(conv.id);
                  setShowHistory(false);
                }}
                className="w-full text-left rounded-xl border border-sidebar-border bg-sidebar-accent/40 hover:bg-sidebar-accent px-4 py-3 transition-colors"
              >
                <p className="text-sm font-medium truncate">{conv.title}</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.preview}</p>
              </button>
            ))}
            <button
              onClick={() => setShowHistory(false)}
              className="mt-2 text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
            >
              ← Back to chat
            </button>
          </div>
        ) : (
          <>
            {/* Messages */}
            <div className="flex flex-1 flex-col overflow-y-auto py-2">
              {messages.length === 0 ? (
                <WelcomeScreen onSuggestionClick={(text) => {
                  setInput(text);
                  setTimeout(() => textareaRef.current?.focus(), 50);
                }} />
              ) : (
                messages.map((msg: UIMessage) => (
                  <ChatMessage
                    key={msg.id}
                    role={msg.role as "user" | "assistant"}
                    content={getMessageText(msg)}
                    isStreaming={isLoading && msg === messages[messages.length - 1] && msg.role === "assistant"}
                  />
                ))
              )}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-3 px-4 py-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sidebar-accent border border-sidebar-border text-xs">
                    🐼
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-sidebar-accent px-4 py-2.5">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="shrink-0 border-t border-sidebar-border p-3">
              {recentConversations.length > 0 && messages.length === 0 && (
                <button
                  onClick={() => setShowHistory(true)}
                  className="mb-2 text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline w-full text-left px-1"
                >
                  View recent chats →
                </button>
              )}
              <form onSubmit={handleSubmit} className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleTextareaInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about your repos, PRs, or anything…"
                  rows={1}
                  disabled={isLoading}
                  className={cn(
                    "flex-1 resize-none rounded-xl border border-sidebar-border bg-background/60",
                    "px-3 py-2.5 text-sm placeholder:text-muted-foreground/60",
                    "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50",
                    "disabled:opacity-50 transition-all max-h-40 leading-relaxed"
                  )}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    "bg-primary text-primary-foreground shadow-sm",
                    "hover:opacity-90 disabled:opacity-40 transition-all",
                    "active:scale-95"
                  )}
                >
                  <PaperPlaneTilt className="h-4 w-4" weight="fill" />
                </button>
              </form>
              <p className="mt-2 text-center text-[10px] text-muted-foreground/60">
                Shift+Enter for new line · Enter to send
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

const SUGGESTIONS = [
  "Summarize my recent pull requests",
  "Which repos are not synced yet?",
  "Am I close to my review limit?",
  "What happened recently in my workspace?",
];

function WelcomeScreen({ onSuggestionClick }: { onSuggestionClick: (text: string) => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-8 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="text-4xl">🐼</div>
        <h3 className="text-sm font-semibold">PR Panda AI</h3>
        <p className="text-xs text-muted-foreground max-w-[240px]">
          I know your repos, PRs, and usage. Ask me anything about your workspace.
        </p>
      </div>
      <div className="grid gap-2 w-full">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSuggestionClick(s)}
            className="rounded-xl border border-sidebar-border bg-sidebar-accent/50 hover:bg-sidebar-accent px-4 py-2.5 text-xs text-left text-foreground/80 hover:text-foreground transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function getMessageText(msg: UIMessage): string {
  let text = "";
  if (!msg.parts) return "";
  for (const part of msg.parts) {
    if (part.type === "text") {
      text += part.text;
    }
  }
  return text;
}
