import { streamText } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { openrouter } from "@/features/ai";
import { requireAuth } from "@/features/auth/actions";
import { getUserInstallationId } from "@/features/github/server/installation";
import { prisma } from "@/lib/db";
import { getPineconeIndex } from "@/features/pinecone/client";
import { buildAssistantContext } from "@/features/ai-assistant/server/build-context";
import {
  createConversation,
  saveMessage,
  updateConversationTitle,
} from "@/features/ai-assistant/server/conversations";

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
  try {
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

    // 1. Fetch user installation and perform codebase semantic RAG search
    const installationId = await getUserInstallationId(userId);
    let codebaseSnippets: string[] = [];

    if (installationId) {
      // 2. Fetch synced repositories
      const syncedRepos = await prisma.repoSync.findMany({
        where: {
          installationId,
          status: "synced",
        },
      });

      if (syncedRepos.length > 0) {
        // 3. Search matched snippets in Pinecone
        const searchPromises = syncedRepos.map(async (repo) => {
          const namespace = `${repo.repoFullName.replace("/", "--")}--codebase`;
          try {
            const index = getPineconeIndex();
            const response = await index.namespace(namespace).searchRecords({
              query: { topK: 3, inputs: { text: lastUserMessage.content } },
            });

            const snippets: string[] = [];
            for (const hit of response.result.hits) {
              const fields = hit.fields as { text?: string; filePath?: string };
              if (fields.text) {
                snippets.push(`Repository: ${repo.repoFullName}\nFile: ${fields.filePath}\n${fields.text}`);
              }
            }
            return snippets;
          } catch (err) {
            console.error(`Failed to search namespace ${namespace}:`, err);
            return [];
          }
        });

        const allResults = await Promise.all(searchPromises);
        codebaseSnippets = allResults.flat();
      }
    }

    // Build context from live DB data
    const context = await buildAssistantContext(userId);
    
    let finalContext = context;
    if (codebaseSnippets.length > 0) {
      finalContext += `\n\n### Synced Codebase Context (Semantic Search results for user's query: "${lastUserMessage.content}")\n${codebaseSnippets.join("\n\n")}`;
    }

    const systemPrompt = ASSISTANT_SYSTEM_PROMPT.replace("{CONTEXT}", finalContext) +
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

    // Model selection: Fallback to OpenRouter if Groq is not configured
    const hasGroq = !!process.env.GROQ_API_KEY;
    const hasOpenRouter = !!process.env.YOUR_OPENROUTER_API_KEY;

    if (!hasGroq && !hasOpenRouter) {
      return Response.json({ error: "No LLM API keys set (GROQ_API_KEY or YOUR_OPENROUTER_API_KEY)." }, { status: 500 });
    }

    const model = hasGroq
      ? createGroq({ apiKey: process.env.GROQ_API_KEY })("llama-3.3-70b-versatile")
      : openrouter("google/gemini-2.5-flash");

    // Stream the response
    const result = streamText({
      model: model as any,
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
  } catch (err: any) {
    console.error("Chat API route error:", err);
    return Response.json({ error: err.message, stack: err.stack }, { status: 500 });
  }
}
