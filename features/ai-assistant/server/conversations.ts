import { prisma } from "@/lib/db";

/**
 * Returns the last N conversations for a user, newest first,
 * including their most recent message for the sidebar preview.
 */
export async function getRecentConversations(userId: string, limit = 8) {
  const conversations = await prisma.aiConversation.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: {
      id: true,
      title: true,
      updatedAt: true,
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { content: true, role: true },
      },
    },
  });

  return conversations.map((c) => ({
    id: c.id,
    title: c.title,
    updatedAt: c.updatedAt.toISOString(),
    preview: c.messages[0]?.content.slice(0, 80) ?? "",
  }));
}

/**
 * Returns a full conversation with all its messages.
 */
export async function getConversation(conversationId: string, userId: string) {
  return prisma.aiConversation.findFirst({
    where: { id: conversationId, userId },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

/**
 * Creates a new conversation with an optional title.
 */
export async function createConversation(userId: string, title?: string) {
  return prisma.aiConversation.create({
    data: {
      userId,
      title: title ?? "New conversation",
    },
  });
}

/**
 * Saves a message to a conversation and updates the conversation's updatedAt.
 */
export async function saveMessage(
  conversationId: string,
  role: "user" | "assistant",
  content: string
) {
  return prisma.aiMessage.create({
    data: { conversationId, role, content },
  });
}

/**
 * Updates the title of a conversation (e.g. after the first user message).
 */
export async function updateConversationTitle(conversationId: string, title: string) {
  return prisma.aiConversation.update({
    where: { id: conversationId },
    data: { title },
  });
}
