"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        className="w-full max-w-6xl mx-auto px-6 pt-32 pb-44 flex flex-col justify-between min-h-[80vh]"
      >
        <div className="flex-1 flex flex-col justify-center max-w-4xl">
          <motion.div variants={childVariants} className="text-stone-500 font-sans tracking-widest uppercase text-xs mb-6 font-semibold">
            creative research & review engine
          </motion.div>
          <motion.h1 
            variants={childVariants} 
            className="font-display font-black text-6xl md:text-8xl tracking-tighter leading-none text-black select-none"
          >
            the power of <br />
            <span className="text-black inline-block relative">
              automation
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: '102%' }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                className="absolute left-0 bottom-2 h-2 bg-yellow-400 -z-10" 
              />
            </span>
          </motion.h1>
        </div>

        <motion.div 
          variants={childVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 border-t border-black/10 pt-8"
        >
          <div>
            <span className="font-display font-bold text-lg block mb-2">analysis</span>
            <p className="text-sm text-stone-600 leading-relaxed font-sans">
              We translate complex pull request diffs into clean, line-specific comments, identifying styling quirks and bugs instantly.
            </p>
          </div>
          <div>
            <span className="font-display font-bold text-lg block mb-2">context</span>
            <p className="text-sm text-stone-600 leading-relaxed font-sans">
              Secure vector codebase indexing. PR Panda queries local files to understand custom API patterns and semantic intent.
            </p>
          </div>
          <div>
            <span className="font-display font-bold text-lg block mb-2">security</span>
            <p className="text-sm text-stone-600 leading-relaxed font-sans">
              Automatic scanning for exposed API keys, credential leaks, or database vulnerabilities directly on push triggers.
            </p>
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
        <motion.div variants={childVariants} className="mb-12 border-b border-black/10 pb-6">
          <span className="text-stone-500 font-sans tracking-widest uppercase text-xs font-semibold block mb-1">agent profile</span>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter text-black">about us</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div variants={childVariants} className="space-y-6">
            <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight leading-tight">
              we build intelligent review agents that understand your codebase.
            </h3>
            <p className="text-stone-600 leading-relaxed font-sans">
              PR Panda is an AI-powered code review companion that fits right into your developer workflow. By indexing your repositories securely, we query relevant context files to write precise feedback.
            </p>
            <p className="text-stone-600 leading-relaxed font-sans">
              Created on a philosophy of playful rigor, we search for core codebase structures and translate them into direct suggestions. Our reviews feature security audits, RAG-context lookups, and webhook queues.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-black/10">
              <div>
                <span className="font-display font-bold text-3xl block text-amber-500">10k+</span>
                <span className="text-xs uppercase text-stone-500 font-medium font-sans">reviews completed</span>
              </div>
              <div>
                <span className="font-display font-bold text-3xl block text-amber-500">40%+</span>
                <span className="text-xs uppercase text-stone-500 font-medium font-sans">approval speedup</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={childVariants} 
            className="bg-white rounded-2xl overflow-hidden border border-black/10 shadow-lg relative group aspect-square md:aspect-video lg:aspect-square"
          >
            <img 
              src="/poster_architecture.png" 
              alt="PR Panda Review Agent Setup" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-black/15 shadow-md">
              <span className="font-display font-bold text-xs uppercase tracking-wider block mb-1">pr panda technology</span>
              <p className="text-[11px] text-stone-500 font-sans leading-normal">
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
        <motion.div variants={childVariants} className="mb-12 border-b border-black/10 pb-6 flex justify-between items-end">
          <div>
            <span className="text-stone-500 font-sans tracking-widest uppercase text-xs font-semibold block mb-1">flexible pricing</span>
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter text-black">plans</h2>
          </div>
          <span className="text-sm font-sans font-medium text-stone-500 hidden sm:inline-block">
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
              className="group cursor-pointer bg-white border border-black/10 rounded-2xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div className="aspect-4/3 overflow-hidden bg-stone-900 relative flex flex-col justify-center items-center p-6 text-center text-white border-b border-black/10 select-none">
                <span className="font-display font-black text-6xl tracking-tighter mb-2">{plan.price}</span>
                {plan.price !== 'custom' && <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold font-sans">per month</span>}
                <p className="text-xs text-white/70 max-w-[200px] mt-4 font-sans leading-normal">{plan.desc}</p>
              </div>
              <div className="p-6 flex justify-between items-center bg-white flex-1">
                <div>
                  <h3 className="font-display font-black text-xl group-hover:text-amber-500 transition-colors uppercase tracking-tight">
                    {plan.title}
                  </h3>
                  <span className="text-xs text-stone-500 font-sans uppercase font-medium">{plan.category}</span>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black text-white text-sm font-bold">
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
        <motion.div variants={childVariants} className="mb-12 border-b border-black/10 pb-6">
          <span className="text-stone-500 font-sans tracking-widest uppercase text-xs font-semibold block mb-1">customer journals</span>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter text-black">testimonials</h2>
        </motion.div>

        <div className="flex flex-col">
          {reviews.map((review) => (
            <motion.div
              key={review.num}
              variants={childVariants}
              whileHover={{ x: 8 }}
              className="group border-b border-black/10 py-8 flex gap-6 md:gap-12 items-start cursor-pointer hover:border-black transition-colors"
            >
              <span className="font-display font-black text-xl md:text-2xl text-stone-300 group-hover:text-black transition-colors">
                {review.num}
              </span>
              <div className="flex-1">
                <h3 className="font-display font-black text-lg md:text-xl group-hover:text-amber-500 transition-colors uppercase tracking-tight leading-tight mb-2">
                  {review.title}
                </h3>
                <div className="flex gap-4 text-xs font-sans text-stone-500 uppercase font-medium">
                  <span>{review.author}</span>
                </div>
              </div>
              <span className="font-display font-black text-2xl opacity-0 group-hover:opacity-100 transition-opacity self-center">
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
        <motion.div variants={childVariants} className="mb-12 border-b border-black/10 pb-6">
          <span className="text-stone-500 font-sans tracking-widest uppercase text-xs font-semibold block mb-1">frequently asked questions</span>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter text-black">faqs</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* FAQ Accordions */}
          <motion.div variants={childVariants} className="space-y-4">
            {faqList.map((faq, index) => (
              <div 
                key={index} 
                className="border-b border-black/10 py-4 cursor-pointer select-none"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="flex justify-between items-center gap-4">
                  <span className="font-display font-bold text-base uppercase tracking-tight text-black">
                    {faq.q}
                  </span>
                  <span className="font-display font-bold text-lg text-stone-400">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="text-xs text-stone-600 leading-relaxed font-sans pt-3">
                    {faq.a}
                  </p>
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* Electronic Details */}
          <motion.div variants={childVariants} className="space-y-8 md:pl-6">
            <div>
              <span className="block text-xs uppercase tracking-wider text-stone-500 font-bold mb-2">electronic support</span>
              <a href="mailto:support@prpanda.com" className="font-display font-black text-xl hover:text-amber-500 transition-colors uppercase">
                support@prpanda.com
              </a>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-wider text-stone-500 font-bold mb-2">github integration</span>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="font-display font-black text-xl hover:text-amber-500 transition-colors uppercase">
                github.com/apps/pr-panda
              </a>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-wider text-stone-500 font-bold mb-2">developer community</span>
              <a href="https://discord.gg" target="_blank" rel="noreferrer" className="font-display font-black text-xl hover:text-amber-500 transition-colors uppercase">
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
