"use client";

import { useState, useTransition, useEffect } from "react";
import { resetPassword } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Loader2, Plane, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(null);
    formData.append("origin", origin);
    
    startTransition(async () => {
      const result = await resetPassword(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(result.success);
      }
    });
  }

  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden">
      {/* Abstract Background Shapes */}
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
            <Link href="/login" className="flex items-center gap-2 mb-8 hover:text-primary transition-colors group w-fit bg-card/50 px-4 py-2 rounded-full border border-border/50 backdrop-blur-md">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-bold">Back to Sign In</span>
            </Link>

            <div className="bg-card/70 backdrop-blur-2xl border border-border/50 shadow-2xl shadow-primary/5 rounded-[2.5rem] p-8 sm:p-10">
              <div className="mb-10 text-center">
                <div className="mx-auto h-16 w-16 bg-primary/10 text-primary rounded-[1.5rem] flex items-center justify-center mb-6 shadow-xl shadow-primary/10 border border-primary/20">
                  <KeyRound className="h-8 w-8" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Forgot Password?</h1>
                <p className="text-muted-foreground text-base font-light leading-relaxed">
                  Enter your email to receive a password reset link.
                </p>
              </div>

              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-2xl mb-8 font-medium border border-destructive/20 flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-destructive shrink-0" />
                  {error}
                </div>
              )}

              {success ? (
                <div className="bg-emerald-500/10 text-emerald-500 text-sm p-6 rounded-2xl mb-8 font-medium border border-emerald-500/20 text-center space-y-4">
                  <div className="mx-auto h-12 w-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <p>{success}</p>
                  <Link 
                    href="/login"
                    className="flex items-center justify-center w-full h-10 rounded-full border border-emerald-500/20 hover:bg-emerald-500/10 hover:text-emerald-500 text-sm font-medium transition-colors"
                  >
                    Return to Sign In
                  </Link>
                </div>
              ) : (
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

                  <Button type="submit" className="w-full h-14 text-lg font-bold rounded-full shadow-lg shadow-primary/25 mt-6" disabled={isPending}>
                    {isPending ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</> : "Send Reset Link"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="hidden lg:block w-1/2 relative p-6">
          <div className="w-full h-full relative overflow-hidden rounded-[3rem] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000" 
              alt="Dubai Sunset" 
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
                  &quot;The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.&quot;
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
