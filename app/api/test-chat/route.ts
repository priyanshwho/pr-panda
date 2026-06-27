import { requireAuth } from "@/features/auth/actions";
import { getUserInstallationId } from "@/features/github/server/installation";
import { getPineconeIndex } from "@/features/pinecone/client";
import { prisma } from "@/lib/db";
import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";

export async function GET() {
  try {
    const session = await requireAuth();
    const userId = session.user.id;
    
    console.log("Checking installation ID...");
    const installationId = await getUserInstallationId(userId);
    
    console.log("Checking Pinecone Client...");
    const index = getPineconeIndex();
    
    console.log("Checking Pinecone namespace search...");
    const searchRes = await index.namespace("test-namespace").searchRecords({
      query: { topK: 1, inputs: { text: "test" } },
    });

    console.log("Checking Groq Client...");
    const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });
    const result = await generateText({
      model: groq("llama-3.3-70b-versatile") as any,
      prompt: "Hello",
    });

    return Response.json({ 
      success: true, 
      installationId, 
      groqText: result.text,
      searchResHitsCount: searchRes.result.hits.length 
    });
  } catch (err: any) {
    console.error("Test chat error:", err);
    return Response.json({ 
      error: err.message, 
      stack: err.stack 
    }, { status: 500 });
  }
}
