"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CreativePricing } from "@/components/ui/creative-pricing";
import type { PricingTier } from "@/components/ui/creative-pricing";
import { SimpleFooter } from "@/components/ui/simple-footer";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { Pencil, Star, Sparkles, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageContentProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  },
  exit: { 
    opacity: 0, 
    y: -15,
    transition: { duration: 0.25 }
  }
};

const childVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 14 }
  }
};

export const PageContent: React.FC<PageContentProps> = ({ activeSection, onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);



  // RENDER HOME PAGE
  if (activeSection === 'home') {
    return (
      <motion.div
        key="home"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-6xl mx-auto px-6 pt-16 md:pt-20 pb-4 flex flex-col min-h-screen"
      >
        {/* Title Section */}
        <div className="max-w-4xl flex flex-col justify-center">
          <motion.div variants={childVariants} className="text-muted-foreground font-sans tracking-widest uppercase text-xs mb-6 font-semibold">
            creative research & review engine
          </motion.div>
          <motion.h1 
            variants={childVariants} 
            className="font-display font-black text-6xl md:text-8xl tracking-tighter leading-none text-foreground select-none"
          >
            code reviews on <br />
            <span className="text-foreground inline-block relative pr-2">
              autopilot
              <svg className="absolute left-0 -bottom-2.5 w-[105%] h-4 pointer-events-none" viewBox="0 0 100 10" preserveAspectRatio="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                  d="M 2,3 Q 50,8 98,3"
                  fill="transparent"
                  stroke="#ef4444"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>
          <motion.p 
            variants={childVariants}
            className="mt-6 text-sm md:text-base text-muted-foreground leading-relaxed font-sans max-w-2xl"
          >
            Context-aware scans, RAG codebase index lookups, security auditing, and line-by-line feedback posted directly to your GitHub pull requests in seconds.
          </motion.p>
        </div>

        <motion.div 
          variants={childVariants}
          className="mt-4 rounded-2xl overflow-hidden border border-border shadow-2xl relative group aspect-[16/9] w-full max-w-5xl bg-muted"
        >
          {/* Light Theme Image */}
          <img 
            src="/HERO/LIGHT-HERO.png" 
            alt="PR Panda Review Interface Light" 
            className="block dark:hidden w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700"
          />
          {/* Dark Theme Image */}
          <img 
            src="/HERO/DARK-HERO.png" 
            alt="PR Panda Review Interface Dark" 
            className="hidden dark:block w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.div>



        {/* Continuous Review Loop Details (Expanded Content) */}
        <motion.div 
          variants={childVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-24 border-t border-border pt-16 items-center"
        >
          <div className="lg:col-span-7 space-y-6">
            <span className="text-muted-foreground font-sans tracking-widest uppercase text-[10px] font-semibold block">how it operates</span>
            <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tighter text-foreground leading-tight">
              continuous review loops on every git commit
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              Every time you commit updates or push code changes to a GitHub Pull Request, a webhook event is instantly dispatched to the PR Panda server. Our background queue handlers, powered by Inngest, coordinate review generation asynchronously.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              We query a Pinecone vector database index populated with your project embeddings to retrieve contextually matching files. The target code diffs are analyzed along with relevant abstractions using LLM endpoints via OpenRouter, posting detailed, line-specific corrections in under five seconds.
            </p>
          </div>

          {/* Workflow Status Mockup Card */}
          <div className="lg:col-span-5 relative group transition-all duration-300 flex flex-col cursor-pointer">
            <div className="absolute inset-0 bg-card border-2 border-foreground rounded-3xl shadow-[4px_4px_0px_0px] shadow-foreground transition-all duration-300 group-hover:shadow-[8px_8px_0px_0px] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]" />
            <div className="relative p-6 flex-1 flex flex-col justify-between z-10 space-y-4">
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-display font-black uppercase text-xs text-foreground">active review engine</span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase">PR #12</span>
              </div>
              
              <div className="space-y-3 font-mono text-[11px] text-muted-foreground">
                <div className="flex justify-between items-center">
                  <span>Webhook Dispatch:</span>
                  <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">✓ SUCCESS</span>
                </div>
                <div className="flex justify-between">
                  <span>RAG Vector Lookups:</span>
                  <span className="text-foreground font-semibold">12 contexts retrieved</span>
                </div>
                <div className="flex justify-between">
                  <span>Inngest Worker Delay:</span>
                  <span className="text-foreground">142ms latency</span>
                </div>
                <div className="flex justify-between">
                  <span>Auditor Model:</span>
                  <span className="text-foreground font-mono">gpt-4o-mini via openrouter</span>
                </div>
              </div>

              <div className="bg-muted/50 p-3 rounded-lg border border-border/50 text-[10px] font-mono leading-relaxed text-muted-foreground">
                <span className="text-foreground font-bold block mb-1">🐼 PR PANDA Suggestion:</span>
                "Refactored apiRouter initialization to use local environment variables instead of hardcoded strings."
              </div>
            </div>
          </div>
        </motion.div>

        {/* Core Capabilities Grid (Expanded Content) */}
        <motion.div 
          variants={childVariants}
          className="mt-24 border-t border-border pt-16"
        >
          <div className="mb-12">
            <span className="text-muted-foreground font-sans tracking-widest uppercase text-[10px] font-semibold block mb-1">specifications</span>
            <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tighter text-foreground">core capabilities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Contextual Embeddings */}
            <div className="relative group transition-all duration-300 flex flex-col cursor-pointer">
              <div className="absolute inset-0 bg-card border-2 border-foreground rounded-2xl shadow-[4px_4px_0px_0px] shadow-foreground transition-all duration-300 group-hover:shadow-[8px_8px_0px_0px] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]" />
              <div className="relative p-6 flex-1 flex flex-col justify-between z-10">
                <span className="font-display font-bold text-base block mb-2 text-foreground">Contextual Embeddings</span>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  Builds a multi-dimensional semantic vector index of your directories, retrieving related files and utilities before reviewing.
                </p>
              </div>
            </div>

            {/* Card 2: Credential Scanning */}
            <div className="relative group transition-all duration-300 flex flex-col cursor-pointer">
              <div className="absolute inset-0 bg-card border-2 border-foreground rounded-2xl shadow-[4px_4px_0px_0px] shadow-foreground transition-all duration-300 group-hover:shadow-[8px_8px_0px_0px] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]" />
              <div className="relative p-6 flex-1 flex flex-col justify-between z-10">
                <span className="font-display font-bold text-base block mb-2 text-foreground">Credential Scanning</span>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  Flags exposed secret keys, API tokens, database passwords, or SQL query construction leaks before merges occur.
                </p>
              </div>
            </div>

            {/* Card 3: Direct Suggestions */}
            <div className="relative group transition-all duration-300 flex flex-col cursor-pointer">
              <div className="absolute inset-0 bg-card border-2 border-foreground rounded-2xl shadow-[4px_4px_0px_0px] shadow-foreground transition-all duration-300 group-hover:shadow-[8px_8px_0px_0px] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]" />
              <div className="relative p-6 flex-1 flex flex-col justify-between z-10">
                <span className="font-display font-bold text-base block mb-2 text-foreground">Direct Suggestions</span>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  Generates fully functional code blocks directly into the GitHub PR conversation, allowing single-click application.
                </p>
              </div>
            </div>

            {/* Card 4: Guideline Presets */}
            <div className="relative group transition-all duration-300 flex flex-col cursor-pointer">
              <div className="absolute inset-0 bg-card border-2 border-foreground rounded-2xl shadow-[4px_4px_0px_0px] shadow-foreground transition-all duration-300 group-hover:shadow-[8px_8px_0px_0px] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]" />
              <div className="relative p-6 flex-1 flex flex-col justify-between z-10">
                <span className="font-display font-bold text-base block mb-2 text-foreground">Guideline Presets</span>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  Set custom styling and design rules (e.g. enforcing camelCase, test files coverage, or import patterns) for consistent audits.
                </p>
              </div>
            </div>

            {/* Card 5: Developer Analytics */}
            <div className="relative group transition-all duration-300 flex flex-col cursor-pointer">
              <div className="absolute inset-0 bg-card border-2 border-foreground rounded-2xl shadow-[4px_4px_0px_0px] shadow-foreground transition-all duration-300 group-hover:shadow-[8px_8px_0px_0px] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]" />
              <div className="relative p-6 flex-1 flex flex-col justify-between z-10">
                <span className="font-display font-bold text-base block mb-2 text-foreground">Developer Analytics</span>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  Beautiful timeline charts depicting review frequency, code health increases, and commit latencies over time.
                </p>
              </div>
            </div>

            {/* Card 6: AI Chat Assistant */}
            <div className="relative group transition-all duration-300 flex flex-col cursor-pointer">
              <div className="absolute inset-0 bg-card border-2 border-foreground rounded-2xl shadow-[4px_4px_0px_0px] shadow-foreground transition-all duration-300 group-hover:shadow-[8px_8px_0px_0px] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]" />
              <div className="relative p-6 flex-1 flex flex-col justify-between z-10">
                <span className="font-display font-bold text-base block mb-2 text-foreground">AI Chat Assistant</span>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  Interact with PR Panda directly inside your GitHub pull request threads. Request alternative refactoring options, ask logic clarifying questions, and get safe revisions.
                </p>
              </div>
            </div>
          </div>
          <SimpleFooter onNavigate={onNavigate} />
        </motion.div>
      </motion.div>
    );
  }

  // RENDER ABOUT PAGE
  if (activeSection === 'about') {
    return (
      <motion.div
        key="about"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-6xl mx-auto px-6 pt-16 md:pt-20 pb-4"
      >
        {/* Header Section */}
        <motion.div 
          variants={childVariants} 
          className="text-center max-w-3xl mx-auto mb-16 space-y-6"
        >
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter text-foreground leading-tight">
            Turn your pull request updates into actionable code reviews
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-sans max-w-2xl mx-auto">
            See what drives your code quality with real-time automated reviews, codebase context search, and easy-to-understand metrics.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link href="/sign-in" className="bg-primary hover:bg-primary/95 text-white font-bold uppercase tracking-wider text-[11px] px-6 py-3.5 rounded-lg transition-all duration-300 shadow-md shadow-primary/10 hover:scale-[1.02] active:scale-[0.98]">
              Start your free trial
            </Link>
            <button 
              onClick={() => onNavigate('pricing')}
              className="bg-muted hover:bg-muted/80 text-foreground border border-border font-bold uppercase tracking-wider text-[11px] px-6 py-3.5 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              View Pricing →
            </button>
          </div>
        </motion.div>

        {/* Bento Grid Layout (Matches 3 Responsiveness Modes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* COLUMN 1 */}
          <div className="space-y-6 flex flex-col justify-between">
            {/* Card 1: PR Context Engine */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="relative group transition-all duration-300 flex-1 flex flex-col cursor-pointer"
            >
              {/* Neo-brutalist border & hover shadow layers */}
              <div className="absolute inset-0 bg-card border-2 border-foreground rounded-3xl shadow-[4px_4px_0px_0px] shadow-foreground transition-all duration-300 group-hover:shadow-[8px_8px_0px_0px] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]" />
              
              {/* Content Container */}
              <div className="relative p-6 flex-1 flex flex-col justify-between z-10">
                {/* import graph dependency network SVG */}
                <div className="relative w-full h-44 flex items-center justify-center bg-muted/20 rounded-2xl overflow-hidden mb-6 border border-border/20 select-none">
                  <svg className="w-44 h-32 text-foreground" viewBox="0 0 160 120" fill="none">
                    {/* Glowing background path connections */}
                    <path d="M20 40 L60 20 M20 40 L60 60 M20 40 L60 100 M60 20 L110 40 M60 60 L110 40 M60 100 L110 80 M110 40 L140 60 M110 80 L140 60" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.15" />
                    
                    {/* Glowing highlight paths */}
                    <path d="M20 40 L60 60 L110 40 L140 60" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    
                    {/* Nodes */}
                    {/* Root file */}
                    <circle cx="20" cy="40" r="6" className="fill-foreground text-background" stroke="currentColor" strokeWidth="2" />
                    
                    {/* Imports layer */}
                    <circle cx="60" cy="20" r="4.5" className="fill-muted-foreground" />
                    <circle cx="60" cy="60" r="5" className="fill-primary" />
                    <circle cx="60" cy="100" r="4.5" className="fill-muted-foreground" />
                    
                    {/* Dependencies layer */}
                    <circle cx="110" cy="40" r="5" className="fill-primary" />
                    <circle cx="110" cy="80" r="4.5" className="fill-muted-foreground" />
                    
                    {/* Output node */}
                    <circle cx="140" cy="60" r="6" className="fill-foreground text-background" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  
                  {/* Small floating tags */}
                  <span className="absolute text-[8px] font-mono uppercase bg-muted/50 border border-border/40 px-1.5 py-0.5 rounded left-2.5 top-3.5 text-muted-foreground">app.tsx</span>
                  <span className="text-[8px] absolute font-mono uppercase bg-muted/50 border border-border/40 px-1.5 py-0.5 rounded right-3 bottom-3 text-muted-foreground">import graph</span>
                </div>
                
                <div>
                  <h3 className="font-display font-black text-xl uppercase tracking-tight text-foreground mb-2">PR Context Engine</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                    PR Panda scans your entire pull request context. By mapping import graphs and indexing dependencies, we query the exact code blocks needed to generate correct suggestions.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Seamless Git Hooks */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="relative group transition-all duration-300 flex-1 flex flex-col cursor-pointer"
            >
              {/* Neo-brutalist border & hover shadow layers */}
              <div className="absolute inset-0 bg-card border-2 border-foreground rounded-3xl shadow-[4px_4px_0px_0px] shadow-foreground transition-all duration-300 group-hover:shadow-[8px_8px_0px_0px] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]" />
              
              {/* Content Container */}
              <div className="relative p-6 flex-1 flex flex-col justify-between z-10">
                {/* Badge Cloud */}
                <div className="relative w-full h-36 flex flex-wrap gap-2.5 items-center justify-center p-4 bg-muted/20 rounded-2xl border border-border/20 mb-6 overflow-hidden">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-background px-3 py-1.5 rounded-full border border-border/50 shadow-xs">GitHub</span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-background px-3 py-1.5 rounded-full border border-border/50 shadow-xs">GitLab</span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-background px-3 py-1.5 rounded-full border border-border/50 shadow-xs">Slack</span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-background px-3 py-1.5 rounded-full border border-border/50 shadow-xs">Discord</span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-background px-3 py-1.5 rounded-full border border-border/50 shadow-xs">Vercel</span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-background px-3 py-1.5 rounded-full border border-border/50 shadow-xs">Linear</span>
                </div>

                <div>
                  <h3 className="font-display font-black text-xl uppercase tracking-tight text-foreground mb-2">Seamless Git Hooks</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                    Integrate PR Panda with GitHub, GitLab, Slack, and Linear in seconds. Webhooks fire automatically, ensuring your pull requests are audited immediately on every push.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* COLUMN 2 */}
          {/* Card 2: Interactive AI Assistant */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative group transition-all duration-300 flex-1 flex flex-col cursor-pointer md:row-span-1"
          >
            {/* Neo-brutalist border & hover shadow layers */}
            <div className="absolute inset-0 bg-card border-2 border-foreground rounded-3xl shadow-[4px_4px_0px_0px] shadow-foreground transition-all duration-300 group-hover:shadow-[8px_8px_0px_0px] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]" />
            
            {/* Content Container */}
            <div className="relative p-6 flex-1 flex flex-col justify-between z-10">
              <div className="flex-1 flex flex-col">
                {/* Chat Mockup header */}
                <div className="border-b border-border/50 pb-4 mb-4 select-none">
                  <span className="font-display font-black text-sm uppercase text-foreground">Interactive AI Assistant</span>
                  <p className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest mt-1">active chat session</p>
                </div>

                {/* Chat bubbles */}
                <div className="space-y-4 mb-6 flex flex-col">
                  {/* User Bubble */}
                  <div className="flex flex-col gap-1 bg-muted p-3 rounded-2xl rounded-tr-none text-[10px] leading-relaxed max-w-[85%] self-end border border-border/40 select-none">
                    <span className="font-bold text-[8px] uppercase tracking-wider text-muted-foreground">You</span>
                    Can you refactor this to prevent sql injection?
                  </div>

                  {/* Panda Response Bubble */}
                  <div className="flex flex-col gap-1.5 bg-primary/10 p-3 rounded-2xl rounded-tl-none text-[10px] leading-relaxed max-w-[90%] self-start border border-primary/20 select-none">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[8px] uppercase tracking-wider text-primary">🐼 PR Panda</span>
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                    </div>
                    Updated! Replaced string concatenation with parameter queries:
                    <pre className="font-mono text-[9px] mt-1.5 bg-background border border-border/50 p-2 rounded-lg overflow-x-auto text-foreground">
                      {`db.Query("SELECT * FROM users WHERE id = ?", id)`}
                    </pre>
                  </div>
                </div>

                {/* Small indicator */}
                <div className="mt-auto bg-muted/40 border border-border/20 p-2.5 rounded-xl flex items-center justify-between text-[9px] text-muted-foreground font-mono select-none">
                  <span>Chat Queue Status:</span>
                  <span className="text-emerald-500 font-bold uppercase">Ready</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40">
                <h3 className="font-display font-black text-xl uppercase tracking-tight text-foreground mb-2">Interactive AI Assistant</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  Ask PR Panda's built-in conversational agent to refactor functions, clarify review suggestions, or apply customized compliance updates in real time.
                </p>
              </div>
            </div>
          </motion.div>

          {/* COLUMN 3 */}
          <div className="space-y-6 flex flex-col justify-between">
            {/* Card 3: Auto PR Comments */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="relative group transition-all duration-300 flex-1 flex flex-col cursor-pointer"
            >
              {/* Neo-brutalist border & hover shadow layers */}
              <div className="absolute inset-0 bg-card border-2 border-foreground rounded-3xl shadow-[4px_4px_0px_0px] shadow-foreground transition-all duration-300 group-hover:shadow-[8px_8px_0px_0px] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]" />
              
              {/* Content Container */}
              <div className="relative p-6 flex-1 flex flex-col justify-between z-10">
                {/* Connection traces */}
                <div className="relative w-full h-36 flex items-center justify-center bg-muted/20 border border-border/20 rounded-2xl mb-6 overflow-hidden select-none">
                  <svg className="w-56 h-28 text-muted-foreground/30" viewBox="0 0 200 100" fill="none">
                    {/* Connecting lines */}
                    <path d="M20 20 H80 V50 H100" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                    <path d="M20 50 H100" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                    <path d="M20 80 H80 V50 H100" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                    <path d="M180 20 H120 V50 H100" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                    <path d="M180 80 H120 V50 H100" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />

                    {/* Central Node */}
                    <circle cx="100" cy="50" r="10" className="fill-foreground text-background" />

                    {/* External endpoints */}
                    <circle cx="20" cy="20" r="5" className="fill-primary" />
                    <circle cx="20" cy="50" r="5" className="fill-muted-foreground" />
                    <circle cx="20" cy="80" r="5" className="fill-primary" />
                    <circle cx="180" cy="20" r="5" className="fill-muted-foreground" />
                    <circle cx="180" cy="80" r="5" className="fill-primary" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-display font-black text-xl uppercase tracking-tight text-foreground mb-2">Auto PR Comments</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                    Every review comment and ready-to-merge suggestion generated by PR Panda is posted directly inline inside your GitHub Pull Request timeline.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 5: Custom Review Guidelines */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="relative group transition-all duration-300 flex-1 flex flex-col cursor-pointer"
            >
              {/* Neo-brutalist border & hover shadow layers */}
              <div className="absolute inset-0 bg-card border-2 border-foreground rounded-3xl shadow-[4px_4px_0px_0px] shadow-foreground transition-all duration-300 group-hover:shadow-[8px_8px_0px_0px] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]" />
              
              {/* Content Container */}
              <div className="relative p-6 flex-1 flex flex-col justify-between z-10">
                {/* Rule checklist container */}
                <div className="w-full flex flex-col gap-2.5 p-4 bg-muted/20 border border-border/20 rounded-2xl mb-6 select-none font-mono text-[9px] text-muted-foreground">
                  <div className="flex justify-between items-center border-b border-border/20 pb-2">
                    <span className="font-bold uppercase tracking-wider text-foreground">Rule Guidelines</span>
                    <span className="text-[8px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">custom prompt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <span>Enforce import groupings</span>
                    <span className="text-emerald-500 ml-auto font-bold">✓</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <span>Check coverage limits</span>
                    <span className="text-emerald-500 ml-auto font-bold">✓</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <span>Require camelCase declarations</span>
                    <span className="text-emerald-500 ml-auto font-bold">✓</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-black text-xl uppercase tracking-tight text-foreground mb-2">Custom Review Guidelines</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                    Enforce company-specific styling, naming conventions, directory imports, or test thresholds by registering custom guideline templates.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <SimpleFooter onNavigate={onNavigate} />
      </motion.div>
    );
  }

  // RENDER PRICING PAGE (using creative pricing component)
  if (activeSection === 'pricing') {
    const pricingTiers: PricingTier[] = [
      {
        name: "Free",
        icon: <Pencil className="w-5 h-5" />,
        price: "Free",
        description: "Perfect to test drive automated audits",
        color: "amber",
        features: [
          "1 active repository",
          "15 automated reviews / mo",
          "Standard queue speed",
          "Inline GitHub suggestions",
        ],
      },
      {
        name: "Developer",
        icon: <Star className="w-5 h-5" />,
        price: "₹99",
        description: "For active developers & small projects",
        color: "blue",
        features: [
          "5 active repositories",
          "Unlimited reviews & scans",
          "Priority queue speed",
          "Custom guideline presets",
          "Slack & Discord alerts",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        icon: <Sparkles className="w-5 h-5" />,
        price: "₹199",
        description: "For large teams & production scale",
        color: "purple",
        features: [
          "Unlimited repositories",
          "Dedicated review engines",
          "SSO & SLA support",
          "Custom vector RAG indexing",
          "Self-hosted option",
        ],
      },
    ];

    return (
      <motion.div
        key="pricing"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-6xl mx-auto px-6 pt-16 md:pt-20 pb-4"
      >
        <CreativePricing 
          tag="PR Panda Pricing"
          title="Review your codebase on autopilot"
          description="Context-aware reviews and secure audits starting from free tiers."
          tiers={pricingTiers} 
        />
        <SimpleFooter onNavigate={onNavigate} />
      </motion.div>
    );
  }

  // RENDER TESTIMONIALS PAGE (using stagger testimonials component)
  if (activeSection === 'testimonials') {
    return (
      <motion.div
        key="testimonials"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-6xl mx-auto px-6 pt-16 md:pt-20 pb-4"
      >
        <motion.div variants={childVariants} className="mb-12 border-b border-border pb-6">
          {/* <span className="text-muted-foreground font-sans tracking-widest uppercase text-xs font-semibold block mb-1">customer journals</span> */}
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter text-foreground">testimonials</h2>
        </motion.div>

        <motion.div variants={childVariants} className="w-full py-4">
          <StaggerTestimonials />
        </motion.div>
        
        <SimpleFooter onNavigate={onNavigate} />
      </motion.div>
    );
  }

  // RENDER FAQS PAGE (using two-column design)
  if (activeSection === 'faqs') {
    const faqList = [
      { q: "how does pr panda work?", a: "When you push commits to GitHub, a webhook triggers an Inngest function. We fetch file diffs, query our Pinecone database vector index for codebase context, and use OpenRouter models to evaluate the code and write reviews." },
      { q: "does pr panda store my private code?", a: "No. Code diffs are processed in-memory during review generation and are not stored. Pinecone embeddings are strictly sandboxed for retrieval on your own repository." },
      { q: "what ai models does pr panda support?", a: "Through our OpenRouter integration, we leverage state-of-the-art models like Claude 3.5 Sonnet and GPT-4o, providing highly accurate suggestions." },
      { q: "can i configure customized review prompts?", a: "Yes. You can manage guidelines and prompt templates in the dashboard workspace, allowing you to tailor comments to fit specific styling rules." },
      { q: "is there a free trial available?", a: "Yes, we offer a 14-day free trial that gives you full access to all premium features. No credit card required to start your trial, and you can cancel anytime during the trial period." }
    ];

    return (
      <motion.div
        key="faqs"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-6xl mx-auto px-6 pt-16 md:pt-20 pb-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8 items-start">
          
          {/* Left Column: Title & CTA Card */}
          <motion.div 
            variants={childVariants} 
            className="lg:col-span-5 flex flex-col items-start"
          >
            {/* FAQ Pill */}
            <div className="inline-flex items-center gap-1.5 border border-border/60 bg-muted/40 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-foreground">
              <span className="text-primary text-[11px] font-bold">❋</span> FAQ
            </div>

            <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter text-foreground leading-tight mt-6">
              Have more questions?
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-sans max-w-sm mt-4">
              Our platform is designed to make auditing your pull requests easy and stress-free. With context-aware scans, you can track code quality and security sweeps effortlessly.
            </p>

            {/* Help Card */}
            <div className="bg-card border border-border/50 p-6 rounded-3xl mt-12 space-y-4 w-full max-w-sm shadow-sm select-none">
              <h3 className="font-display font-black text-lg text-foreground uppercase tracking-tight">Can't find answers?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                We're here to help you out whenever you need! Get in touch with our support team for personalized assistance anytime.
              </p>
              <a 
                href="mailto:support@prpanda.com" 
                className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/95 text-white font-mono text-[9px] font-bold uppercase tracking-wider px-5 py-3 rounded-full transition-all duration-300 shadow-md shadow-primary/15 hover:scale-[1.02] active:scale-[0.98]"
              >
                Contact us ↗
              </a>
            </div>
          </motion.div>

          {/* Right Column: Custom Accordions */}
          <motion.div 
            variants={childVariants} 
            className="lg:col-span-7 space-y-4 w-full"
          >
            {faqList.map((faq, index) => (
              <div 
                key={index} 
                className={cn(
                  "bg-card/40 border border-border/40 hover:border-foreground/20 p-5 rounded-2xl transition-all duration-200 cursor-pointer select-none",
                  openFaq === index && "border-foreground/20 bg-card/60"
                )}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="flex justify-between items-center gap-4">
                  <span className="font-display font-bold text-sm sm:text-base uppercase tracking-tight text-foreground leading-snug">
                    {faq.q}
                  </span>
                  <div className={cn(
                    "w-8 h-8 rounded-full border border-border/50 flex items-center justify-center transition-all duration-300 shrink-0",
                    openFaq === index ? "bg-foreground text-background" : "bg-muted text-foreground"
                  )}>
                    <span className="text-xs font-bold leading-none select-none">
                      {openFaq === index ? "↑" : "↓"}
                    </span>
                  </div>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans pt-4 border-t border-border/10 mt-4">
                    {faq.a}
                  </p>
                </motion.div>
              </div>
            ))}
          </motion.div>

        </div>
        <SimpleFooter onNavigate={onNavigate} />
      </motion.div>
    );
  }

  return null;
};

export default PageContent;
