"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQs() {
  return (
    <section id="faqs" className="py-20 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Got questions about setup, safety, or models? We have answers.
          </p>
        </div>

        <div className="mt-16">
          <Accordion className="w-full space-y-4">
            <AccordionItem value="faq-1" className="border rounded-lg bg-card px-4">
              <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold">
                How does PR Panda work?
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                When you open or push commits to a GitHub Pull Request, a webhook event is sent to PR Panda. We use Inngest functions to fetch the file diffs, query our Pinecone database vector index for codebase context, and use OpenRouter models to evaluate the code and write detailed comments.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-2" className="border rounded-lg bg-card px-4">
              <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold">
                Does PR Panda store or train on my private code?
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                No. We value your privacy. Code diffs are processed in-memory during review generation and are not stored. Code embeddings stored in Pinecone are solely used for context retrieval for your own workspace and are never shared or used for model training.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-3" className="border rounded-lg bg-card px-4">
              <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold">
                What AI models does PR Panda support?
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                Through our OpenRouter integration, we leverage state-of-the-art models like Claude 3.5 Sonnet and GPT-4o, providing highly accurate, intelligent, and human-like suggestions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-4" className="border rounded-lg bg-card px-4">
              <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold">
                Can I configure customized review prompts?
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                Yes. You can manage guidelines and prompt templates in the dashboard workspace, allowing you to tailor the reviews to fit specific styling rules, test frameworks, or repository conventions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
