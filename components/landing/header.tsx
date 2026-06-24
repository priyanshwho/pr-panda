"use client";

import React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

interface HeaderProps {
  onLogoClick: () => void;
  currentSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick, currentSection }) => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="fixed top-0 left-0 w-full z-45 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference text-white">
      <button 
        onClick={onLogoClick}
        className="font-display font-black text-2xl tracking-tighter cursor-pointer hover:opacity-70 transition-opacity uppercase"
        aria-label="PR PANDA Home"
      >
        pr panda
      </button>
      
      <div className="flex items-center gap-6 text-sm font-sans tracking-widest uppercase font-bold">
        {currentSection !== 'home' && (
          <span className="hidden sm:inline-block font-medium tracking-normal text-xs bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full border border-white/10 uppercase">
            {currentSection}
          </span>
        )}
        
        {isPending ? (
          <span className="text-xs tracking-wider opacity-50">loading...</span>
        ) : session ? (
          <Link 
            href="/dashboard" 
            className="text-xs tracking-wider cursor-pointer hover:underline underline-offset-4 decoration-2"
          >
            dashboard
          </Link>
        ) : (
          <Link 
            href="/sign-in" 
            className="text-xs tracking-wider cursor-pointer hover:underline underline-offset-4 decoration-2"
          >
            get started
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
