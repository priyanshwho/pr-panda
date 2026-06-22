"use client";

import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Services } from "@/components/landing/services";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQs } from "@/components/landing/faqs";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20">
      {/* Background Decorative Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10" />
        <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-[100px] dark:bg-violet-500/10" />
      </div>

      <Header />
      <Hero />
      <Features />
      <Services />
      <Testimonials />
      <FAQs />
      <Footer />
    </div>
  );
}
