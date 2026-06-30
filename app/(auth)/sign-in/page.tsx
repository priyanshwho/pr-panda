import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import { GithubSignInForm } from '@/features/auth/components/github-sign-in-form';
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to PR PANDA Code Reviewer with your GitHub account.",
};

type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

const SignInPage = async({searchParams}:SignInPageProps) => {
    const {callbackUrl} = await searchParams;
  return (
    <>
      <Link 
        href="/" 
        className={cn(
          buttonVariants({ variant: "ghost" }), 
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <ChevronLeft className="mr-2 size-4" />
        Back
      </Link>
      <Card className="border-border/80 shadow-sm">
        <CardHeader className="items-center text-center">
          <div className="mb-6 flex justify-center pt-2">
            <Image
              src="/logo2.png"
              alt="PR PANDA Code Reviewer"
              width={172}
              height={172}
              priority
              className="text-foreground"
            />
          </div>
          <CardTitle className="text-base">Welcome back</CardTitle>
          <CardDescription>
            Sign in with GitHub to review and manage your code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldSet>
            <FieldGroup>
              <Field>
                <GithubSignInForm callbackUrl={callbackUrl} />
                <FieldDescription className="text-center">
                  We only request the permissions needed to identify your
                  account. You can revoke access anytime from GitHub settings.
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldSet>
        </CardContent>
      </Card>
    </>
  )
}

export default SignInPage