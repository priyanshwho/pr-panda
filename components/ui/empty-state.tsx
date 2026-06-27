import { Sparkle } from "@phosphor-icons/react";

export function EmptyStateIllustration() {
  return (
    <div className="relative flex items-center justify-center w-36 h-36 mx-auto select-none">
      <svg className="w-full h-full text-muted-foreground/20" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background dotted ring */}
        <circle cx="100" cy="100" r="75" className="stroke-muted-foreground/25" strokeWidth="1.5" strokeDasharray="6 6" />
        {/* Decorative background blobs */}
        <circle cx="70" cy="85" r="45" className="fill-muted/40" />
        <circle cx="130" cy="115" r="35" className="fill-muted/20" />
        
        {/* Cute panda ears */}
        <circle cx="65" cy="65" r="16" className="fill-muted-foreground/30 stroke-border/40" strokeWidth="1.5" />
        <circle cx="135" cy="65" r="16" className="fill-muted-foreground/30 stroke-border/40" strokeWidth="1.5" />
        <circle cx="65" cy="65" r="8" className="fill-muted/50" />
        <circle cx="135" cy="65" r="8" className="fill-muted/50" />

        {/* Panda head */}
        <rect x="50" y="60" width="100" height="80" rx="40" className="fill-card stroke-border/80" strokeWidth="2" />

        {/* Panda eyes (cute dark patches) */}
        <ellipse cx="80" cy="98" rx="14" ry="18" className="fill-muted-foreground/25" transform="rotate(-10 80 98)" />
        <ellipse cx="120" cy="98" rx="14" ry="18" className="fill-muted-foreground/25" transform="rotate(10 120 98)" />
        {/* Eye pupils */}
        <circle cx="82" cy="96" r="4" className="fill-card" />
        <circle cx="118" cy="96" r="4" className="fill-card" />

        {/* Panda nose */}
        <polygon points="94,112 106,112 100,118" className="fill-muted-foreground/45" />

        {/* Cute cheeks */}
        <ellipse cx="68" cy="110" rx="8" ry="4" className="fill-amber-500/15" />
        <ellipse cx="132" cy="110" rx="8" ry="4" className="fill-amber-500/15" />

        {/* Panda mouth */}
        <path d="M94 122 Q100 126 106 122" className="stroke-muted-foreground/50" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
      {/* Dynamic sparkle elements */}
      <Sparkle className="absolute top-2 right-4 text-amber-500/50 size-5 animate-pulse" weight="fill" />
      <Sparkle className="absolute bottom-6 left-2 text-amber-500/30 size-4 animate-bounce" weight="fill" />
    </div>
  );
}
