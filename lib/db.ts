import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import pg from "pg";
import { execSync } from "child_process";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

function resolveIPv4Sync(host: string): string | null {
    try {
        const output = execSync(`host -t A ${host}`, { timeout: 2000 }).toString();
        const match = output.match(/has address\s+(\d+\.\d+\.\d+\.\d+)/);
        if (match) {
            return match[1];
        }
    } catch (err) {
        console.warn("Failed to resolve host synchronously, falling back to original hostname:", err);
    }
    return null;
}

function createPrismaClient() {
    const url = process.env.DATABASE_URL;
    if (!url) {
        throw new Error("DATABASE_URL is not defined");
    }

    let hostOverride: string | undefined = undefined;
    let originalHost: string | undefined = undefined;

    try {
        const parsedUrl = new URL(url);
        originalHost = parsedUrl.hostname;
        if (originalHost) {
            const ip = resolveIPv4Sync(originalHost);
            if (ip) {
                hostOverride = ip;
            }
        }
    } catch (e) {
        console.warn("Error parsing DATABASE_URL for DNS workaround:", e);
    }

    const poolConfig: pg.PoolConfig = {
        connectionString: url,
        keepAlive: true,
        idleTimeoutMillis: 3 * 60 * 1000,   // 3 minutes
        connectionTimeoutMillis: 10_000,      // 10 seconds
        max: 5,
    };

    if (hostOverride && originalHost) {
        poolConfig.host = hostOverride;
        poolConfig.ssl = {
            rejectUnauthorized: true,
            servername: originalHost,
        };
    }

    const pool = new pg.Pool(poolConfig);

    pool.on("error", (err) => {
        console.error("Database pg pool error:", err);
    });

    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}