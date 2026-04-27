"use client";

import { motion } from "framer-motion";
import { FileCheck, Sparkles, Clock, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const steps = [
  {
    icon: FileCheck,
    title: "AI-Powered Upload",
    description: "Our intelligent system validates your documents instantly, reducing errors by 98%."
  },
  {
    icon: Sparkles,
    title: "Expert Review",
    description: "Once AI validates, our human experts perform a final check for 100% compliance."
  },
  {
    icon: Clock,
    title: "Fast-Track Processing",
    description: "Get your UAE visit or residency visa in record time with our optimized workflow."
  }
];

export default function VisaHighlight() {
  return (
    <section className="py-32 bg-primary overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] -ml-64 -mb-64" />

      <div className="max-w-7xl px-8 md:px-16 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <span className="px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
              Simplified Documentation
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight">
              UAE Visa Processing <br /> Reimagined
            </h2>
            <p className="text-base md:text-lg text-white/80 mb-10 font-light max-w-lg leading-relaxed">
              Skip the complexity. Whether it&apos;s a 30-day visit or a long-term residency, our AI-assisted platform handles everything from validation to submission.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-secondary/30 flex items-center justify-center border border-white/20">
                  <Shield className="h-5 w-5 text-secondary" />
                </div>
                <span className="text-lg font-medium">Secure & Encrypted Data Handling</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-secondary/30 flex items-center justify-center border border-white/20">
                  <Sparkles className="h-5 w-5 text-secondary" />
                </div>
                <span className="text-lg font-medium">99.9% Application Success Rate</span>
              </div>
            </div>

            <Link href="/visas">
              <Button className="h-16 px-10 rounded-2xl bg-white text-primary hover:bg-white/90 font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-white/10 transition-all duration-500 hover:gap-6 group/btn">
                Start My Application
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6"
          >
            {steps.map((step, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] flex gap-6 hover:bg-white/15 transition-colors cursor-default group"
              >
                <div className="h-16 w-16 shrink-0 rounded-2xl bg-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <step.icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
