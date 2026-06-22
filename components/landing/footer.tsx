"use client";

import Link from "next/link";
import { GithubLogo } from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/20 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🐼</span>
              <span className="font-bold text-foreground">PR Panda</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering dev teams with intelligent, context-aware AI pull request reviews.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-foreground">Product</h5>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-foreground">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-foreground">
                  How it Works
                </a>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-foreground">Resources</h5>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                  GitHub Integration
                </a>
              </li>
              <li>
                <a href="https://nextjs.org" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                  Next.js Docs
                </a>
              </li>
              <li>
                <a href="https://inngest.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                  Inngest Queue
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-foreground">Legal</h5>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">Privacy Policy</span>
              </li>
              <li>
                <span className="text-muted-foreground">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PR Panda Inc. All rights reserved.
            </p>
          <div className="mt-4 flex items-center gap-4 sm:mt-0">
            <a
              href={process.env.NEXT_PUBLIC_GITHUB_PBLIC_LINK || "https://github.com"}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <GithubLogo className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
