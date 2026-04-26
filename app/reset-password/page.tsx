"use client";

import { useState, useTransition } from "react";
import { updatePassword } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Loader2, Plane } from "lucide-react";

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    startTransition(async () => {
      const result = await updatePassword(formData);
      if (result?.error) {
        setError(result.error);
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
            <div className="bg-card/70 backdrop-blur-2xl border border-border/50 shadow-2xl shadow-primary/5 rounded-[2.5rem] p-8 sm:p-10">
              <div className="mb-10 text-center">
                <div className="mx-auto h-16 w-16 bg-primary/10 text-primary rounded-[1.5rem] flex items-center justify-center mb-6 shadow-xl shadow-primary/10 border border-primary/20">
                  <Lock className="h-8 w-8" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Reset Password</h1>
                <p className="text-muted-foreground text-base font-light leading-relaxed">
                  Enter your new password below.
                </p>
              </div>

              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-2xl mb-8 font-medium border border-destructive/20 flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-destructive shrink-0" />
                  {error}
                </div>
              )}

              <form action={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">New Password</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    required 
                    className="bg-background/50 h-14 rounded-2xl border-border/50 focus:bg-background transition-all shadow-inner" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">Confirm New Password</Label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type="password" 
                    required 
                    className="bg-background/50 h-14 rounded-2xl border-border/50 focus:bg-background transition-all shadow-inner" 
                  />
                </div>

                <Button type="submit" className="w-full h-14 text-lg font-bold rounded-full shadow-lg shadow-primary/25 mt-6" disabled={isPending}>
                  {isPending ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Updating...</> : "Update Password"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="hidden lg:block w-1/2 relative p-6">
          <div className="w-full h-full relative overflow-hidden rounded-[3rem] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000" 
              alt="Dubai Night" 
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
                  Your security is our priority. Discover the gold standard of travel.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
