"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from './hero';
import { Features } from './features';
import { Services } from './services';
import { Testimonials } from './testimonials';
import { FAQs } from './faqs';
import { Check, Star, ShieldCheck, Cpu, Database, Lightning } from '@phosphor-icons/react';

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
  
  // RENDER HOME PAGE
  if (activeSection === 'home') {
    return (
      <motion.div
        key="home"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full"
      >
        <Hero />
        <Features />
        <Services />
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
        <motion.div variants={childVariants} className="mb-12 border-b pb-6">
          <span className="text-primary font-sans tracking-widest uppercase text-xs font-semibold block mb-1">about us</span>
          <h2 className="font-sans font-black text-4xl md:text-5xl uppercase tracking-tighter">PR Panda</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div variants={childVariants} className="space-y-6">
            <h3 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-tight leading-tight">
              Instant, context-aware AI code reviews inside your pull requests.
            </h3>
            <p className="text-muted-foreground leading-relaxed font-sans">
              PR Panda is an AI-powered code review companion that fits right into your developer workflow. By indexing your repositories securely, we search and retrieve critical codebase context to offer line-by-line feedback in seconds.
            </p>
            <p className="text-muted-foreground leading-relaxed font-sans">
              Founded on the belief that code reviews shouldn't slow down shipping, we combine lightning-fast Inngest queues, Pinecone RAG databases, and top-tier LLMs via OpenRouter to catch bugs, styling quirks, and security vulnerabilities instantly.
            </p>
            
            <div className="grid grid-cols-3 gap-6 pt-6 border-t">
              <div>
                <span className="font-sans font-black text-3xl block text-primary">10k+</span>
                <span className="text-xs uppercase text-muted-foreground font-medium font-sans">reviews completed</span>
              </div>
              <div>
                <span className="font-sans font-black text-3xl block text-primary">40%+</span>
                <span className="text-xs uppercase text-muted-foreground font-medium font-sans">approval speedup</span>
              </div>
              <div>
                <span className="font-sans font-black text-3xl block text-primary">99.9%</span>
                <span className="text-xs uppercase text-muted-foreground font-medium font-sans">webhook uptime</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={childVariants} 
            className="bg-card/50 border rounded-2xl p-8 shadow-lg relative overflow-hidden group space-y-6"
          >
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
            
            <h4 className="font-sans font-black text-xl uppercase tracking-tight">Our Technology Stack</h4>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-primary/10 rounded-lg text-primary mt-1">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-foreground">Pinecone DB (Vector Search)</h5>
                  <p className="text-xs text-muted-foreground">Maintains context-aware embeddings of your codebase to retrieve patterns and functions.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 bg-primary/10 rounded-lg text-primary mt-1">
                  <Lightning className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-foreground">Inngest (Background Tasks)</h5>
                  <p className="text-xs text-muted-foreground">Manages webhook event triggers reliably without locking up server resources.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 bg-primary/10 rounded-lg text-primary mt-1">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-foreground">OpenRouter LLM Integration</h5>
                  <p className="text-xs text-muted-foreground">Queries state-of-the-art models like Claude 3.5 Sonnet and GPT-4o for accurate fixes.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 bg-primary/10 rounded-lg text-primary mt-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-foreground">Secure Credentials</h5>
                  <p className="text-xs text-muted-foreground">Integrates Better-Auth to keep access tokens encrypted, safe, and fully sandboxed.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // RENDER PRICING PAGE
  if (activeSection === 'pricing') {
    const plans = [
      {
        name: 'Developer',
        price: '0',
        desc: 'For individual developers and open-source contributors.',
        features: [
          '1 Active repository sync',
          '50 AI Reviews per month',
          'Standard processing queues',
          'Detailed line-by-line feedback',
        ],
        cta: 'Get Started',
        popular: false
      },
      {
        name: 'Pro',
        price: '29',
        desc: 'For active creators and fast-growing software teams.',
        features: [
          'Unlimited public repositories',
          '3 Private repositories',
          'Pinecone RAG indexing sync',
          'Priority processing queue',
          'Custom guidelines & prompt config',
        ],
        cta: 'Upgrade to Pro',
        popular: true
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        desc: 'For companies needing advanced security and dedicated workflows.',
        features: [
          'Unlimited private repositories',
          'Custom AI models & OpenRouter keys',
          'SSO / SAML authentication',
          'Dedicated support engineer',
          '99.9% Webhook SLA guarantees',
        ],
        cta: 'Contact Sales',
        popular: false
      }
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
        <motion.div variants={childVariants} className="mb-12 border-b pb-6 text-center max-w-2xl mx-auto">
          <span className="text-primary font-sans tracking-widest uppercase text-xs font-semibold block mb-1">pricing tiers</span>
          <h2 className="font-sans font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4">Flexible Pricing</h2>
          <p className="text-muted-foreground font-sans">
            Start completely free. Upgrade whenever your team needs private repositories or dedicated RAG index scanning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={childVariants}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring' as const, stiffness: 150, damping: 20 }}
              className={`bg-card border rounded-2xl p-8 relative flex flex-col justify-between shadow-xs ${
                plan.popular ? 'border-primary ring-2 ring-primary/20 shadow-lg' : ''
              }`}
            >
              {plan.popular && (
                <span className="absolute top-4 right-4 bg-primary text-primary-foreground font-sans font-bold text-[10px] uppercase px-3 py-1 rounded-full tracking-wider">
                  Popular
                </span>
              )}

              <div>
                <span className="text-muted-foreground font-sans font-bold text-xs uppercase tracking-widest">{plan.name}</span>
                <div className="mt-4 flex items-baseline gap-1">
                  {plan.price !== 'Custom' && <span className="text-3xl font-bold font-sans">$</span>}
                  <span className="text-5xl font-black font-sans tracking-tight">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-muted-foreground font-sans text-sm">/mo</span>}
                </div>
                <p className="mt-4 text-xs text-muted-foreground font-sans leading-relaxed">{plan.desc}</p>
                
                <ul className="mt-8 space-y-3.5 border-t pt-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex gap-2.5 items-start text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground font-sans">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full mt-8 font-sans font-bold uppercase tracking-widest text-xs py-4 rounded-xl shadow-md cursor-pointer transition-colors ${
                plan.popular 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/95' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // RENDER TESTIMONIALS PAGE
  if (activeSection === 'testimonials') {
    return (
      <motion.div
        key="testimonials"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full"
      >
        <Testimonials />
      </motion.div>
    );
  }

  // RENDER FAQS PAGE
  if (activeSection === 'faqs') {
    return (
      <motion.div
        key="faqs"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full"
      >
        <FAQs />
      </motion.div>
    );
  }

  return null;
};

export default PageContent;
