"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/landing/header";
import { PageContent } from "@/components/landing/PageContent";
import { ConcentricMenu } from "@/components/landing/ConcentricMenu";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div className="panda-theme relative min-h-screen bg-[#f2f2f2] text-black overflow-x-hidden selection:bg-black selection:text-white flex flex-col font-sans">
      {/* Visual background grid pattern for premium aesthetics */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-5 z-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
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
          <PageContent key={activeSection} activeSection={activeSection} />
        </AnimatePresence>
      </main>

      {/* Interactive Concentric Ring Menu container - zero height to allow background clicks */}
      <div className="fixed bottom-0 left-0 w-full h-0 z-30 overflow-visible">
        <ConcentricMenu 
          onNavigate={(section) => setActiveSection(section)} 
          currentSection={activeSection} 
        />
      </div>

      {/* Modern minimal footer branding */}
      <footer className="fixed bottom-4 left-6 md:left-12 pointer-events-none select-none z-10 text-[10px] font-sans text-black/30 uppercase tracking-widest">
        © 2026 pr panda. all rights reserved.
      </footer>
    </div>
  );
}
