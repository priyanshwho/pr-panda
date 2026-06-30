import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

async function main() {
  const { prisma } = await import("./lib/db");
  try {
    const syncs = await prisma.repoSync.findMany();
    console.log("RepoSync records:", JSON.stringify(syncs, null, 2));
  } catch (error) {
    console.error("Error querying db:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
