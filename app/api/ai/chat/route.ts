import { streamText } from "ai";

import { createGroq } from "@ai-sdk/groq";
import { requireAuth } from "@/features/auth/actions";
import { buildAssistantContext } from "@/features/ai-assistant/server/build-context";
import {
  createConversation,
  saveMessage,
  updateConversationTitle,
} from "@/features/ai-assistant/server/conversations";

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

const ASSISTANT_SYSTEM_PROMPT = `You are PR Panda AI — a smart, friendly assistant built into the PR Panda dashboard.

PR Panda is an AI-powered code review tool that automatically reviews GitHub pull requests and helps developers ship better code faster.

You have been given a snapshot of the user's workspace data below. Use it to give accurate, personalized answers.

## Your Capabilities
- Answer questions about the user's repositories, pull requests, and sync status
- Explain what PR Panda does and how to use its features
- Help debug issues (e.g. "why isn't my PR being reviewed?")
- Give advice on improving code review workflows
- Answer general coding and software engineering questions

## Tone & Style
- Be concise and direct — developers hate fluff
- Use markdown formatting (bold, code blocks, lists) when it helps clarity
- Be friendly but professional — you're a senior dev helping a colleague
- If you don't know something or the data isn't available, say so clearly

## Important Rules
- Never hallucinate repository names, PR numbers, or status that isn't in the context
- If asked about something not in your context data, say "I don't have that information right now — try refreshing the page"
- You cannot take actions (you cannot trigger reviews, sync repos, etc.) — only provide information and advice

---

## Current User Workspace Data

{CONTEXT}`;

export async function POST(request: Request) {
  const session = await requireAuth();
  const userId = session.user.id;

  const body = await request.json();
  const { messages, conversationId: existingConversationId, currentPage } = body as {
    messages: Array<{ role: "user" | "assistant"; content: string }>;
    conversationId?: string;
    currentPage?: string;
  };

  const lastUserMessage = messages.findLast((m) => m.role === "user");
  if (!lastUserMessage) {
    return Response.json({ error: "No user message" }, { status: 400 });
  }

  // Build context from live DB data
  const context = await buildAssistantContext(userId);
  const systemPrompt = ASSISTANT_SYSTEM_PROMPT.replace("{CONTEXT}", context) +
    (currentPage ? `\n\n**User is currently viewing**: ${currentPage}` : "");

  // Get or create conversation
  let conversationId = existingConversationId;
  if (!conversationId) {
    const conversation = await createConversation(userId);
    conversationId = conversation.id;
  }

  // Save the user message
  await saveMessage(conversationId, "user", lastUserMessage.content);

  // Auto-title after first user message
  if (messages.filter((m) => m.role === "user").length === 1) {
    const title = lastUserMessage.content.slice(0, 60).trim();
    await updateConversationTitle(conversationId, title);
  }

  // Stream the response
  const result = streamText({
    model: groq("llama-3.3-70b-versatile") as any,
    system: systemPrompt,
    messages,
    temperature: 0.5,
    onFinish: async ({ text }) => {
      // Persist the assistant's full response
      await saveMessage(conversationId!, "assistant", text);
    },
  });

  const response = result.toTextStreamResponse();
  const headers = new Headers(response.headers);
  headers.set("X-Conversation-Id", conversationId);

  return new Response(response.body, {
    status: response.status,
    headers,
  });
}
