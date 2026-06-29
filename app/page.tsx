"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/landing/header";
import { PageContent } from "@/components/landing/PageContent";
import { ConcentricMenu } from "@/components/landing/ConcentricMenu";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeSection]);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/20 flex flex-col overflow-x-hidden font-sans">
      {/* Background Decorative Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10" />
        <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-[100px] dark:bg-violet-500/10" />
      </div>

      {/* Visual background grid pattern for premium aesthetics, adapts dynamically via currentColor */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-10 dark:opacity-15 z-0 text-foreground" 
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Header component */}
      <Header 
        onLogoClick={() => setActiveSection('home')} 
        currentSection={activeSection} 
      />

      {/* Main page content container */}
      <main className="flex-1 relative z-10 w-full">
        <AnimatePresence mode="wait">
          <PageContent key={activeSection} activeSection={activeSection} onNavigate={setActiveSection} />
        </AnimatePresence>
      </main>

      {/* Interactive Concentric Ring Menu container - zero height to allow background clicks */}
      <div className="fixed top-0 left-0 w-full h-0 z-40 overflow-visible">
        <ConcentricMenu 
          onNavigate={(section) => setActiveSection(section)} 
          currentSection={activeSection} 
        />
      </div>

      {/* Modern minimal footer branding */}
      <footer className="fixed bottom-4 left-6 md:left-12 pointer-events-none select-none z-10 text-[10px] font-sans text-muted-foreground/30 uppercase tracking-widest">
        © 2026 pr panda. all rights reserved.
      </footer>
    </div>
  );
}
