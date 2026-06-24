"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PageContentProps {
  activeSection: string;
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

export const PageContent: React.FC<PageContentProps> = ({ activeSection }) => {
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
        className="w-full max-w-6xl mx-auto px-6 pt-32 pb-44 flex flex-col min-h-screen"
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
            the power of <br />
            <span className="text-foreground inline-block relative">
              automation
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: '102%' }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                className="absolute left-0 bottom-2 h-2 bg-primary/20 -z-10" 
              />
            </span>
          </motion.h1>
        </div>

        {/* Theme-Aware Hero Image Container */}
        <motion.div 
          variants={childVariants}
          className="mt-12 rounded-2xl overflow-hidden border border-border shadow-2xl relative group aspect-[16/9] w-full max-w-5xl bg-muted"
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

        {/* 3-Column Core Highlights */}
        <motion.div 
          variants={childVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 border-t border-border pt-8"
        >
          <div>
            <span className="font-display font-bold text-lg block mb-2 text-foreground">analysis</span>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              We translate complex pull request diffs into clean, line-specific comments, identifying styling quirks and bugs instantly.
            </p>
          </div>
          <div>
            <span className="font-display font-bold text-lg block mb-2 text-foreground">context</span>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              Secure vector codebase indexing. PR Panda queries local files to understand custom API patterns and semantic intent.
            </p>
          </div>
          <div>
            <span className="font-display font-bold text-lg block mb-2 text-foreground">security</span>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              Automatic scanning for exposed API keys, credential leaks, or database vulnerabilities directly on push triggers.
            </p>
          </div>
        </motion.div>

        {/* Continuous Review Loop Details (Expanded Content) */}
        <motion.div 
          variants={childVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-24 border-t border-border pt-16 items-center"
        >
          <div className="lg:col-span-7 space-y-6">
            <span className="text-muted-foreground font-sans tracking-widest uppercase text-[10px] font-semibold block">how it operates</span>
            <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tighter text-foreground">
              continuous review loops on every commit
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              Every time you commit updates or push code changes to a GitHub Pull Request, a webhook event is instantly dispatched to the PR Panda server. Our background queue handlers, powered by Inngest, coordinate review generation asynchronously.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              We query a Pinecone vector database index populated with your project embeddings to retrieve contextually matching files. The target code diffs are analyzed along with relevant abstractions using LLM endpoints via OpenRouter, posting detailed, line-specific corrections in under five seconds.
            </p>
          </div>

          {/* Workflow Status Mockup Card */}
          <div className="lg:col-span-5 bg-card border border-border rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="font-display font-black uppercase text-xs text-foreground">active review engine</span>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground uppercase">PR #12</span>
            </div>
            
            <div className="space-y-3 font-mono text-[11px] text-muted-foreground">
              <div className="flex justify-between">
                <span>Webhook Triggered:</span>
                <span className="text-foreground font-bold">SUCCESS</span>
              </div>
              <div className="flex justify-between">
                <span>RAG Retrieval:</span>
                <span className="text-foreground">12 contexts</span>
              </div>
              <div className="flex justify-between">
                <span>Queue latency:</span>
                <span className="text-foreground font-semibold">142ms (Inngest)</span>
              </div>
              <div className="flex justify-between">
                <span>Suggestions:</span>
                <span className="text-foreground font-semibold">4 posted</span>
              </div>
            </div>

            <div className="bg-muted p-3 rounded-lg border border-border text-[10px] font-mono leading-relaxed text-muted-foreground">
              <span className="text-foreground font-bold block mb-1">🐼 PR PANDA Suggestion:</span>
              "Refactored apiRouter initialization to use local environment variables instead of hardcoded strings."
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
            <div className="border border-border p-6 rounded-xl bg-card/50 backdrop-blur-xs">
              <span className="font-display font-bold text-base block mb-2 text-foreground">Contextual Embeddings</span>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                Builds a multi-dimensional semantic vector index of your directories, retrieving related files and utilities before reviewing.
              </p>
            </div>
            <div className="border border-border p-6 rounded-xl bg-card/50 backdrop-blur-xs">
              <span className="font-display font-bold text-base block mb-2 text-foreground">Credential Scanning</span>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                Flags exposed secret keys, API tokens, database passwords, or SQL query construction leaks before merges occur.
              </p>
            </div>
            <div className="border border-border p-6 rounded-xl bg-card/50 backdrop-blur-xs">
              <span className="font-display font-bold text-base block mb-2 text-foreground">Direct Suggestions</span>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                Generates fully functional code blocks directly into the GitHub PR conversation, allowing single-click application.
              </p>
            </div>
            <div className="border border-border p-6 rounded-xl bg-card/50 backdrop-blur-xs">
              <span className="font-display font-bold text-base block mb-2 text-foreground">Guideline Presets</span>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                Set custom styling and design rules (e.g. enforcing camelCase, test files coverage, or import patterns) for consistent audits.
              </p>
            </div>
            <div className="border border-border p-6 rounded-xl bg-card/50 backdrop-blur-xs">
              <span className="font-display font-bold text-base block mb-2 text-foreground">Developer Analytics</span>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                Beautiful timeline charts depicting review frequency, code health increases, and commit latencies over time.
              </p>
            </div>
            <div className="border border-border p-6 rounded-xl bg-card/50 backdrop-blur-xs">
              <span className="font-display font-bold text-base block mb-2 text-foreground">Webhook Integrations</span>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                Runs automatically on GitHub event dispatches. No manual compilation triggers or local CLI installations required.
              </p>
            </div>
          </div>
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
        className="w-full max-w-6xl mx-auto px-6 pt-32 pb-44"
      >
        <motion.div variants={childVariants} className="mb-12 border-b border-border pb-6">
          <span className="text-muted-foreground font-sans tracking-widest uppercase text-xs font-semibold block mb-1">agent profile</span>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter text-foreground">about us</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div variants={childVariants} className="space-y-6">
            <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight leading-tight text-foreground">
              we build intelligent review agents that understand your codebase.
            </h3>
            <p className="text-muted-foreground leading-relaxed font-sans">
              PR Panda is an AI-powered code review companion that fits right into your developer workflow. By indexing your repositories securely, we query relevant context files to write precise feedback.
            </p>
            <p className="text-muted-foreground leading-relaxed font-sans">
              Created on a philosophy of playful rigor, we search for core codebase structures and translate them into direct suggestions. Our reviews feature security audits, RAG-context lookups, and webhook queues.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
              <div>
                <span className="font-display font-bold text-3xl block text-primary">10k+</span>
                <span className="text-xs uppercase text-muted-foreground font-medium font-sans">reviews completed</span>
              </div>
              <div>
                <span className="font-display font-bold text-3xl block text-primary">40%+</span>
                <span className="text-xs uppercase text-muted-foreground font-medium font-sans">approval speedup</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={childVariants} 
            className="bg-card rounded-2xl overflow-hidden border border-border shadow-lg relative group aspect-square md:aspect-video lg:aspect-square"
          >
            <img 
              src="/poster_architecture.png" 
              alt="PR Panda Review Agent Setup" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-card/90 backdrop-blur-md p-4 rounded-xl border border-border shadow-md">
              <span className="font-display font-bold text-xs uppercase tracking-wider block mb-1 text-foreground">pr panda technology</span>
              <p className="text-[11px] text-muted-foreground font-sans leading-normal">
                Our custom serverless tasks dashboard, managing background queues, Pinecone DB indexes, and OpenRouter LLM queries.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // RENDER PRICING PAGE (using work grid cards layout)
  if (activeSection === 'pricing') {
    const plans = [
      { id: 'p1', title: 'developer plan', category: 'free tier', price: '$0', desc: '1 active repository, 50 AI reviews per month, standard speed.' },
      { id: 'p2', title: 'pro plan', category: 'growing teams', price: '$29', desc: 'Unlimited public repos, 3 private repos, priority queue.' },
      { id: 'p3', title: 'enterprise plan', category: 'organizations', price: 'custom', desc: 'Unlimited private repos, custom AI models, SSO & SLA.' },
    ];

    return (
      <motion.div
        key="pricing"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-6xl mx-auto px-6 pt-32 pb-44"
      >
        <motion.div variants={childVariants} className="mb-12 border-b border-border pb-6 flex justify-between items-end">
          <div>
            <span className="text-muted-foreground font-sans tracking-widest uppercase text-xs font-semibold block mb-1">flexible pricing</span>
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter text-foreground">plans</h2>
          </div>
          <span className="text-sm font-sans font-medium text-muted-foreground hidden sm:inline-block">
            [3 items shown]
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={childVariants}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring' as const, stiffness: 150, damping: 20 }}
              className="group cursor-pointer bg-card border border-border rounded-2xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div className="aspect-4/3 overflow-hidden bg-muted relative flex flex-col justify-center items-center p-6 text-center border-b border-border select-none">
                <span className="font-display font-black text-6xl tracking-tighter mb-2 text-foreground">{plan.price}</span>
                {plan.price !== 'custom' && <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold font-sans">per month</span>}
                <p className="text-xs text-muted-foreground max-w-[200px] mt-4 font-sans leading-normal">{plan.desc}</p>
              </div>
              <div className="p-6 flex justify-between items-center bg-card flex-1">
                <div>
                  <h3 className="font-display font-black text-xl group-hover:text-primary transition-colors uppercase tracking-tight text-foreground">
                    {plan.title}
                  </h3>
                  <span className="text-xs text-muted-foreground font-sans uppercase font-medium">{plan.category}</span>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-primary-foreground text-sm font-bold">
                  →
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // RENDER TESTIMONIALS PAGE (using stories vertical list layout)
  if (activeSection === 'testimonials') {
    const reviews = [
      { num: '01', title: '"pr panda has cut down our pull request latency by 40%. the context retrieval is amazingly precise."', author: 'john doe • senior dev, cloudscale' },
      { num: '02', title: '"the security scans alone are worth it. caught an exposed stripe development key in a draft pr."', author: 'sarah lim • cto, devflow inc' },
      { num: '03', title: '"very impressed by the rag feature. it retrieves previous code patterns from the repository via pinecone."', author: 'marcus wright • full stack eng, octave' },
      { num: '04', title: '"integration with inngest and openrouter makes our automated developer loop run without any glitch."', author: 'elena rostova • lead architect, apex' }
    ];

    return (
      <motion.div
        key="testimonials"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-4xl mx-auto px-6 pt-32 pb-44"
      >
        <motion.div variants={childVariants} className="mb-12 border-b border-border pb-6">
          <span className="text-muted-foreground font-sans tracking-widest uppercase text-xs font-semibold block mb-1">customer journals</span>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter text-foreground">testimonials</h2>
        </motion.div>

        <div className="flex flex-col">
          {reviews.map((review) => (
            <motion.div
              key={review.num}
              variants={childVariants}
              whileHover={{ x: 8 }}
              className="group border-b border-border py-8 flex gap-6 md:gap-12 items-start cursor-pointer hover:border-foreground/40 transition-colors"
            >
              <span className="font-display font-black text-xl md:text-2xl text-muted-foreground/40 group-hover:text-foreground transition-colors">
                {review.num}
              </span>
              <div className="flex-1">
                <h3 className="font-display font-black text-lg md:text-xl group-hover:text-primary transition-colors uppercase tracking-tight leading-tight mb-2 text-foreground">
                  {review.title}
                </h3>
                <div className="flex gap-4 text-xs font-sans text-muted-foreground uppercase font-medium">
                  <span>{review.author}</span>
                </div>
              </div>
              <span className="font-display font-black text-2xl opacity-0 group-hover:opacity-100 transition-opacity self-center text-foreground">
                →
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // RENDER FAQS PAGE (using contact page layout)
  if (activeSection === 'faqs') {
    const faqList = [
      { q: "how does pr panda work?", a: "When you push commits to GitHub, a webhook triggers an Inngest function. We fetch file diffs, query our Pinecone database vector index for codebase context, and use OpenRouter models to evaluate the code and write reviews." },
      { q: "does pr panda store my private code?", a: "No. Code diffs are processed in-memory during review generation and are not stored. Pinecone embeddings are strictly sandboxed for retrieval on your own repository." },
      { q: "what ai models does pr panda support?", a: "Through our OpenRouter integration, we leverage state-of-the-art models like Claude 3.5 Sonnet and GPT-4o, providing highly accurate suggestions." },
      { q: "can i configure customized review prompts?", a: "Yes. You can manage guidelines and prompt templates in the dashboard workspace, allowing you to tailor comments to fit specific styling rules." }
    ];

    return (
      <motion.div
        key="faqs"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-4xl mx-auto px-6 pt-32 pb-44"
      >
        <motion.div variants={childVariants} className="mb-12 border-b border-border pb-6">
          <span className="text-muted-foreground font-sans tracking-widest uppercase text-xs font-semibold block mb-1">frequently asked questions</span>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter text-foreground">faqs</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* FAQ Accordions */}
          <motion.div variants={childVariants} className="space-y-4">
            {faqList.map((faq, index) => (
              <div 
                key={index} 
                className="border-b border-border py-4 cursor-pointer select-none"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="flex justify-between items-center gap-4">
                  <span className="font-display font-bold text-base uppercase tracking-tight text-foreground">
                    {faq.q}
                  </span>
                  <span className="font-display font-bold text-lg text-muted-foreground/50">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans pt-3">
                    {faq.a}
                  </p>
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* Electronic Details */}
          <motion.div variants={childVariants} className="space-y-8 md:pl-6 text-foreground">
            <div>
              <span className="block text-xs uppercase tracking-wider text-muted-foreground font-bold mb-2">electronic support</span>
              <a href="mailto:support@prpanda.com" className="font-display font-black text-xl hover:text-primary transition-colors uppercase">
                support@prpanda.com
              </a>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-wider text-muted-foreground font-bold mb-2">github integration</span>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="font-display font-black text-xl hover:text-primary transition-colors uppercase">
                github.com/apps/pr-panda
              </a>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-wider text-muted-foreground font-bold mb-2">developer community</span>
              <a href="https://discord.gg" target="_blank" rel="noreferrer" className="font-display font-black text-xl hover:text-primary transition-colors uppercase">
                discord.gg/prpanda
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return null;
};

export default PageContent;
