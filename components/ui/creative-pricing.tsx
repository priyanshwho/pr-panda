"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingTier {
  name: string;
  icon: React.ReactNode;
  price: number | string;
  description: string;
  color: string;
  features: string[];
  popular?: boolean;
}

interface CreativePricingProps {
  tiers: PricingTier[];
}

export const CreativePricing: React.FC<CreativePricingProps> = ({ tiers }) => {
  // Neo-brutalist theme colors mapping
  const getColorClasses = (color: string, popular?: boolean) => {
    switch (color) {
      case "amber":
        return {
          iconColor: "text-amber-500",
          buttonBg: "bg-white hover:bg-amber-50 text-black",
          badgeBg: "bg-amber-400",
          shadowColor: "shadow-black",
        };
      case "blue":
        return {
          iconColor: "text-blue-500",
          buttonBg: popular ? "bg-[#ffbe1a] hover:bg-[#e0a612] text-black" : "bg-white hover:bg-blue-50 text-black",
          badgeBg: "bg-blue-400",
          shadowColor: "shadow-black",
        };
      case "purple":
        return {
          iconColor: "text-purple-500",
          buttonBg: "bg-white hover:bg-purple-50 text-black",
          badgeBg: "bg-purple-400",
          shadowColor: "shadow-black",
        };
      default:
        return {
          iconColor: "text-zinc-900 dark:text-white",
          buttonBg: "bg-white hover:bg-zinc-50 text-black",
          badgeBg: "bg-zinc-400",
          shadowColor: "shadow-black",
        };
    }
  };

  // Rotations to give the hand-drawn/creative look to the cards
  const rotations = ["rotate-[-1deg]", "rotate-[0.8deg]", "rotate-[-0.6deg]"];

  return (
    <div className="relative w-full py-16 px-4 md:px-8 bg-white dark:bg-zinc-950 overflow-hidden min-h-screen flex flex-col justify-center items-center">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none -z-10" />

      {/* Floating Decorators */}
      {/* 3D Glossy Star on the Left */}
      <div className="hidden lg:block absolute left-[10%] top-[25%] pointer-events-none select-none animate-bounce" style={{ animationDuration: "3s" }}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L14.85 8.76L22 9.24L16.5 13.97L18.18 21L12 17.27L5.82 21L7.5 13.97L2 9.24L9.15 8.76L12 2Z"
            fill="#FFD700"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M12 4L13.8 8.5L18.5 8.8L15 12.1L16 16.8L12 14.5V4Z" fill="#FFF275" />
        </svg>
      </div>

      {/* Sparkle on the Right */}
      <div className="hidden lg:block absolute right-[10%] top-[22%] pointer-events-none select-none animate-pulse" style={{ animationDuration: "2s" }}>
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z"
            fill="#FFAE00"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M12 4L13.1 10.9L20 12L13.1 13.1L12 20V4Z" fill="#FFD000" />
        </svg>
      </div>

      {/* Headers */}
      <div className="text-center max-w-3xl mb-12 relative z-10">
        <span className="text-sm font-black tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3 block">
          Simple Pricing
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tight leading-none inline-block relative px-2">
          Code Reviews{" "}
          <span className="relative inline-block text-black dark:text-white">
            On Autopilot
            {/* Hand-drawn Underline SVG */}
            <svg
              className="absolute -bottom-3 left-0 w-full h-4 text-blue-400 dark:text-blue-500 pointer-events-none -z-10"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M 1,6 Q 35,1 70,5 T 99,6"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>
        <p className="mt-6 text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-semibold max-w-xl mx-auto">
          Secure, context-aware audits posted directly to your GitHub pull requests
        </p>
      </div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mx-auto relative z-10 px-2 md:px-0">
        {tiers.map((tier, idx) => {
          const colors = getColorClasses(tier.color, tier.popular);
          const rotationClass = rotations[idx % rotations.length];

          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={cn(
                "relative bg-white dark:bg-zinc-900 border-[3px] border-black dark:border-white p-6 flex flex-col justify-between rounded-[20px] transition-shadow duration-200",
                "shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)]",
                "min-h-[420px]",
                rotationClass
              )}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 right-6 rotate-[8deg] bg-[#ffbe1a] border-2 border-black px-3.5 py-1 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-20">
                  <span className="text-xs font-black tracking-wider text-black uppercase">
                    Popular!
                  </span>
                </div>
              )}

              {/* Card Top Details */}
              <div>
                {/* Wobbly Icon Container */}
                <div className="w-10 h-10 rounded-full border-2 border-black dark:border-white flex items-center justify-center bg-white dark:bg-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] mb-4">
                  <div className={cn("w-5 h-5 flex items-center justify-center", colors.iconColor)}>
                    {tier.icon}
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-xl font-black text-black dark:text-white uppercase tracking-tight">
                  {tier.name}
                </h3>

                {/* Description */}
                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1 max-w-[200px] leading-tight">
                  {tier.description}
                </p>

                {/* Price */}
                <div className="mt-4 flex items-baseline text-black dark:text-white">
                  {typeof tier.price === "number" ? (
                    <>
                      <span className="text-2xl font-black mr-0.5">₹</span>
                      <span className="text-4xl font-black tracking-tighter">
                        {tier.price.toLocaleString("en-IN")}
                      </span>
                      {tier.price > 0 && (
                        <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 ml-1">
                          /month
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-3xl font-black tracking-tight uppercase">
                      {tier.price}
                    </span>
                  )}
                </div>

                {/* Features List */}
                <ul className="mt-6 space-y-2.5">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2.5">
                      {/* Check Icon Circular Border */}
                      <div className="w-4.5 h-4.5 rounded-full border-[1.5px] border-black dark:border-white flex items-center justify-center flex-shrink-0 bg-zinc-50 dark:bg-zinc-800">
                        <Check className="w-3 h-3 text-black dark:text-white" strokeWidth={3.5} />
                      </div>
                      <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <button
                  className={cn(
                    "w-full py-2.5 px-4 rounded-xl border-[2.5px] border-black dark:border-white font-black text-xs uppercase tracking-wider transition-all duration-150",
                    "shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]",
                    "hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]",
                    colors.buttonBg
                  )}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
