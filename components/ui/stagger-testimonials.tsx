"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "My favorite AI reviewer in the market. We review PRs 5x faster with PR Panda.",
    by: "Alex, Lead Architect at TechCorp",
    imgSrc: "https://i.pravatar.cc/150?img=1"
  },
  {
    tempId: 1,
    testimonial: "I'm confident our code credentials are safe with PR Panda. The security scans caught an exposed Stripe key in a draft PR.",
    by: "Dan, Security Lead at SecureNet",
    imgSrc: "https://i.pravatar.cc/150?img=2"
  },
  {
    tempId: 2,
    testimonial: "PR Panda's vector search is amazing. It reads the local repository context to understand custom helper utilities before suggesting edits.",
    by: "Stephanie, CTO at InnovateCo",
    imgSrc: "https://i.pravatar.cc/150?img=3"
  },
  {
    tempId: 3,
    testimonial: "Integrating with GitHub Webhooks and Inngest makes planning our release schedules seamless. Highly recommend it!",
    by: "Marie, Director of Engineering at FuturePlanning",
    imgSrc: "https://i.pravatar.cc/150?img=4"
  },
  {
    tempId: 4,
    testimonial: "If I could give 11 stars to PR Panda, I'd give 12. The Claude-3.5 suggestions match our styling presets perfectly.",
    by: "Andre, Tech Lead at CreativeSolutions",
    imgSrc: "https://i.pravatar.cc/150?img=5"
  },
  {
    tempId: 5,
    testimonial: "SO SO SO HAPPY WE FOUND PR PANDA!!!! It has saved our dev team over 100 review hours so far.",
    by: "Jeremy, Product Manager at TimeWise",
    imgSrc: "https://i.pravatar.cc/150?img=6"
  },
  {
    tempId: 6,
    testimonial: "Took some convincing for the security team, but now that we're on PR Panda, we're never going back to manual reviews.",
    by: "Pam, Engineering Director at BrandBuilders",
    imgSrc: "https://i.pravatar.cc/150?img=7"
  },
  {
    tempId: 7,
    testimonial: "I would be lost without PR Panda's in-depth code health metrics. The code score tracking is easily worth it for us.",
    by: "Daniel, DevOps Engineer at AnalyticsPro",
    imgSrc: "https://i.pravatar.cc/150?img=8"
  },
  {
    tempId: 8,
    testimonial: "It's just the best AI code auditor. Period.",
    by: "Fernando, Senior Developer at UserFirst",
    imgSrc: "https://i.pravatar.cc/150?img=9"
  },
  {
    tempId: 9,
    testimonial: "I switched to PR Panda's automated reviews 3 months ago and never looked back.",
    by: "Andy, Core Engineer at CloudMasters",
    imgSrc: "https://i.pravatar.cc/150?img=10"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 border-foreground p-8 transition-all duration-500 ease-in-out select-none shadow-[4px_4px_0px_0px] shadow-foreground",
        isCenter 
          ? "z-10 bg-primary text-primary-foreground" 
          : "z-0 bg-card text-card-foreground hover:shadow-[6px_6px_0px_0px]"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-4 h-14 w-12 bg-muted object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))"
        }}
      />
      <h3 className={cn(
        "text-sm sm:text-base md:text-lg font-bold leading-normal",
        isCenter ? "text-primary-foreground" : "text-foreground"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-xs italic font-medium uppercase font-mono tracking-wide",
        isCenter ? "text-primary-foreground/80" : "text-muted-foreground"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-muted/20 border border-border/40 rounded-3xl"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <button
        onClick={() => handleMove(-1)}
        className={cn(
          "absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20",
          "flex h-12 w-12 items-center justify-center text-xl transition-all duration-200 cursor-pointer rounded-xl border border-border/60 shadow-sm",
          "bg-white text-black hover:bg-primary hover:text-white"
        )}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => handleMove(1)}
        className={cn(
          "absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20",
          "flex h-12 w-12 items-center justify-center text-xl transition-all duration-200 cursor-pointer rounded-xl border border-border/60 shadow-sm",
          "bg-white text-black hover:bg-primary hover:text-white"
        )}
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
