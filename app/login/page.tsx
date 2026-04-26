"use client";

import { useState, useTransition, use } from "react";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Loader2, Plane, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const { message } = use(searchParams);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden">
      {/* Abstract Background Shapes for Mobile/Web */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 z-0">
        <div className="w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 z-0">
        <div className="w-[30rem] h-[30rem] bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="flex w-full z-10">
        {/* Form Side */}
        <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-12 md:p-24 justify-center items-center relative">
          <div className="w-full max-w-md">
            <Link href="/" className="flex items-center gap-2 mb-8 hover:text-primary transition-colors group w-fit bg-card/50 px-4 py-2 rounded-full border border-border/50 backdrop-blur-md">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-bold">Back to Home</span>
            </Link>

            <div className="bg-card/70 backdrop-blur-2xl border border-border/50 shadow-2xl shadow-primary/5 rounded-[2.5rem] p-8 sm:p-10">
              <div className="mb-10 text-center">
                <div className="mx-auto h-16 w-16 bg-primary/10 text-primary rounded-[1.5rem] flex items-center justify-center mb-6 shadow-xl shadow-primary/10 border border-primary/20">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
                <p className="text-muted-foreground text-base font-light leading-relaxed">
                  Sign in to manage your luxury itineraries.
                </p>
              </div>

              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-2xl mb-8 font-medium border border-destructive/20 flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-destructive shrink-0" />
                  {error}
                </div>
              )}

              {message && (
                <div className="bg-emerald-500/10 text-emerald-500 text-sm p-4 rounded-2xl mb-8 font-medium border border-emerald-500/20 flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                  {message}
                </div>
              )}

              <form action={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="you@example.com" 
                    required 
                    className="bg-background/50 h-14 rounded-2xl border-border/50 focus:bg-background transition-all shadow-inner" 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-2 mr-2">
                    <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Password</Label>
                    <Link href="/forgot-password" className="text-[10px] text-primary font-bold hover:underline uppercase tracking-wider">Forgot?</Link>
                  </div>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    required 
                    className="bg-background/50 h-14 rounded-2xl border-border/50 focus:bg-background transition-all shadow-inner" 
                  />
                </div>

                <Button type="submit" className="w-full h-14 text-lg font-bold rounded-full shadow-lg shadow-primary/25 mt-6" disabled={isPending}>
                  {isPending ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Authenticating...</> : "Sign In"}
                </Button>
              </form>

              <div className="mt-8 text-center text-sm text-muted-foreground">
                Don&apos;t have an account? <Link href="/signup" className="text-primary font-bold hover:underline">Create an account</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="hidden lg:block w-1/2 relative p-6">
          <div className="w-full h-full relative overflow-hidden rounded-[3rem] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=2000" 
              alt="Dubai Marina" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-16 text-white z-10">
              <div className="max-w-lg">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-10 w-10 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/30 shadow-lg">
                    <Plane className="h-6 w-6" />
                  </div>
                  <span className="font-bold tracking-tight text-2xl">Golden Care</span>
                </div>
                <h2 className="text-4xl font-extrabold mb-8 leading-tight tracking-tight">
                  &quot;The journey of a thousand miles begins with a single step.&quot;
                </h2>
                <div className="flex items-center gap-4 bg-black/20 backdrop-blur-md p-4 rounded-3xl w-fit border border-white/10">
                  <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Avatar" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Ahmed Hassan</p>
                    <p className="text-white/70 text-xs font-medium">Managing Director, GC Tourism</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
