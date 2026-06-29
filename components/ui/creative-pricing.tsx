"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Pencil, Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingTier {
  name: string;
  icon: React.ReactNode;
  price: number | string;
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
}

interface CreativePricingProps {
  tag?: string;
  title?: string;
  description?: string;
  tiers: PricingTier[];
}

export function CreativePricing({
  tag = "Flexible Pricing",
  title = "Review your codebase on autopilot",
  description = "Get context-aware pull request audits in seconds",
  tiers,
}: CreativePricingProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 relative">
      <div className="text-center space-y-6 mb-16 relative z-10">
        <div className="text-xl text-primary font-mono tracking-widest uppercase">
          {tag}
        </div>
        <div className="relative">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground">
            {title}
          </h2>
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-44 h-3 bg-primary/20 
            rotate-[-1deg] rounded-full blur-sm"
          />
        </div>
        <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto font-sans leading-relaxed">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {tiers.map((tier, index) => (
          <div
            key={tier.name}
            className={cn(
              "relative group",
              "transition-all duration-300"
            )}
          >
            {/* Neo-brutalist border and offset shadow */}
            <div
              className={cn(
                "absolute inset-0 bg-card",
                "border-2 border-foreground",
                "rounded-2xl shadow-[4px_4px_0px_0px] shadow-foreground",
                "transition-all duration-300",
                "group-hover:shadow-[8px_8px_0px_0px] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]"
              )}
            />

            <div className="relative p-6 flex flex-col justify-between h-full min-h-[460px]">
              {tier.popular && (
                <div
                  className="absolute -top-3.5 right-6 bg-primary text-white 
                  font-mono text-xs uppercase font-black px-3 py-1 rounded-md border-2 border-foreground rotate-[4deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                >
                  Popular!
                </div>
              )}

              <div>
                <div
                  className={cn(
                    "w-12 h-12 rounded-full mb-4",
                    "flex items-center justify-center",
                    "border-2 border-foreground bg-muted",
                    tier.color === "amber" && "text-amber-500",
                    tier.color === "blue" && "text-blue-500",
                    tier.color === "purple" && "text-purple-500"
                  )}
                >
                  {tier.icon}
                </div>
                <h3 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">
                  {tier.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {tier.description}
                </p>

                {/* Price */}
                <div className="my-6">
                  <span className="text-4xl font-black tracking-tight text-foreground">
                    {typeof tier.price === 'number' ? `$${tier.price}` : tier.price}
                  </span>
                  {typeof tier.price === 'number' && (
                    <span className="text-xs text-muted-foreground font-mono uppercase ml-1">
                      /month
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {tier.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-4.5 h-4.5 rounded-full border-2 border-foreground 
                        flex items-center justify-center bg-muted shrink-0"
                      >
                        <Check className="w-2.5 h-2.5 text-foreground stroke-[3px]" />
                      </div>
                      <span className="text-xs font-semibold text-foreground dark:text-zinc-100">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={cn(
                  "w-full py-3 font-mono font-black text-xs uppercase tracking-wider relative rounded-xl",
                  "border-2 border-foreground",
                  "transition-all duration-150 cursor-pointer",
                  "shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]",
                  "hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]",
                  tier.popular
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                )}
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
