"use client";

import { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Ticket, Calendar, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full bg-card/50 backdrop-blur-xl border border-border/50 rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl shadow-primary/10"
      >
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, delay: 0.2 }}
          className="h-24 w-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/20"
        >
          <CheckCircle2 className="w-12 h-12 text-white" />
        </motion.div>

        <h1 className="text-4xl font-bold tracking-tight mb-4">Payment Successful!</h1>
        <p className="text-muted-foreground text-lg mb-12">
          Your luxury experience is now secured. We've sent the confirmation and details to your email.
        </p>

        <div className="bg-muted/30 border border-border/50 rounded-3xl p-8 mb-12 text-left space-y-6">
          <div className="flex items-center justify-between pb-6 border-b border-border/50">
            <div className="flex items-center gap-3 text-muted-foreground font-bold text-xs uppercase tracking-widest">
              <Ticket className="w-4 h-4 text-primary" />
              Booking Reference
            </div>
            <span className="font-bold text-primary font-mono">{bookingId?.split('-')[0].toUpperCase() || "PENDING"}</span>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Status</p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-bold">Confirmed</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Receipt</p>
              <Button variant="link" className="p-0 h-auto font-bold text-primary flex items-center gap-1">
                <Download className="w-3 h-3" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/dashboard" className="w-full">
            <Button className="w-full h-14 rounded-full font-bold text-lg">
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/tours" className="w-full">
            <Button variant="outline" className="w-full h-14 rounded-full font-bold text-lg border-2">
              Explore More
            </Button>
          </Link>
        </div>

        <p className="mt-12 text-sm text-muted-foreground">
          Need help? <Link href="/support" className="text-primary font-bold hover:underline">Contact our 24/7 Concierge</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
