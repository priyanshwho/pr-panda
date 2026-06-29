"use client";

import React from "react";

interface SimpleFooterProps {
  onNavigate: (section: string) => void;
}

export function SimpleFooter({ onNavigate }: SimpleFooterProps) {
  const navLinks = [
    { label: "Home", section: "home" },
    { label: "Features", section: "about" },
    { label: "Pricing", section: "pricing" },
    { label: "Testimonials", section: "testimonials" },
    { label: "FAQs", section: "faqs" },
  ];

  return (
    <footer className="w-full mt-12 border-t border-border/30 bg-background/5 backdrop-blur-[4px] pt-8 pb-6 px-6 rounded-2xl border-x border-b border-border/10 font-sans select-none">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* Left Side: Brand Info */}
        <div className="flex items-center gap-3">
          <img src="/logo2.png" className="w-8 h-8 object-contain" alt="PR Panda Logo" />
          <div>
            <span className="font-display font-black text-lg tracking-tight text-foreground uppercase block">
              PR Panda
            </span>
            <span className="text-[10px] text-muted-foreground font-semibold leading-none">
              AI-powered reviews on autopilot
            </span>
          </div>
        </div>

        {/* Right Side: Links */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-muted-foreground">
          {navLinks.map((link) => (
            <button
              key={link.section}
              onClick={() => onNavigate(link.section)}
              className="hover:text-foreground transition-colors uppercase tracking-wider duration-150 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>
        
      </div>

      {/* Bottom section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8 pt-6 border-t border-border/10 text-[10px] text-muted-foreground uppercase font-mono tracking-widest gap-4">
        <span>© {new Date().getFullYear()} PR Panda. All rights reserved.</span>
        <div className="flex items-center gap-6">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
            GitHub
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
            Twitter
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
