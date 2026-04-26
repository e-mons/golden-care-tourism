"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, Heart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Best Price Guarantee",
    description: "We provide the most competitive rates for luxury travel experiences in the UAE.",
    stat: "30%",
    statLabel: "Avg. Savings",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-600",
    borderColor: "group-hover:border-emerald-500/30",
  },
  {
    icon: Zap,
    title: "Instant Confirmation",
    description: "No more waiting. Book your tours and visas with real-time processing and status updates.",
    stat: "<2min",
    statLabel: "Booking Time",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-600",
    borderColor: "group-hover:border-amber-500/30",
  },
  {
    icon: Globe,
    title: "Multi-lingual Support",
    description: "Our team and AI assistants speak your language, ensuring a smooth communication flow.",
    stat: "12+",
    statLabel: "Languages",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-600",
    borderColor: "group-hover:border-blue-500/30",
  },
  {
    icon: Heart,
    title: "Personalized Service",
    description: "Every itinerary is curated to match your specific luxury travel preferences.",
    stat: "100%",
    statLabel: "Tailored",
    gradient: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-600",
    borderColor: "group-hover:border-rose-500/30",
  }
];

export default function ServicesSection() {
  return (
    <section className="pt-32 pb-32 bg-background relative">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="max-w-7xl px-8 md:px-16 mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
            >
              Why Golden Care?
            </motion.span>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Seamless <span className="text-primary italic">Excellence</span> In Every Detail
            </h2>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
            We don't just plan trips — we engineer unforgettable moments backed by technology, trust, and precision.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Link key={index} href="/tours">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={cn(
                  "group relative bg-white rounded-[2.5rem] p-8 border border-primary/5 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2 cursor-pointer h-full",
                  benefit.borderColor
                )}
              >
                {/* Icon */}
                <div className={cn(
                  "h-16 w-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                  benefit.gradient
                )}>
                  <benefit.icon className={cn("h-8 w-8", benefit.iconColor)} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm mb-8">
                  {benefit.description}
                </p>

                {/* Stat Footer */}
                <div className="pt-6 border-t border-primary/5 flex items-end justify-between">
                  <div>
                    <span className="text-3xl font-black text-foreground tracking-tight">{benefit.stat}</span>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-[0.2em] mt-1">{benefit.statLabel}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Gallery Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-24">
          <Link href="/tours?category=yacht" className="col-span-1 md:col-span-5 block min-h-[500px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-[3rem] overflow-hidden relative group shadow-2xl"
            >
              <img src="https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&q=80&w=1200" alt="Luxury Yacht Experience" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-white/70 text-xs font-bold uppercase tracking-widest">Featured</span>
                <h4 className="text-white text-3xl font-bold mt-1" style={{ fontFamily: "var(--font-playfair), serif" }}>Yacht & Marine</h4>
              </div>
            </motion.div>
          </Link>

          <div className="col-span-1 md:col-span-7 grid grid-rows-2 gap-6">
            <Link href="/tours?category=adventure" className="block min-h-[250px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="h-full rounded-[3rem] overflow-hidden relative group shadow-2xl"
              >
                <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200" alt="Open Road Travel" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="text-white/70 text-xs font-bold uppercase tracking-widest">Popular</span>
                  <h4 className="text-white text-3xl font-bold mt-1" style={{ fontFamily: "var(--font-playfair), serif" }}>Road Trips & Adventures</h4>
                </div>
              </motion.div>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/tours?category=city" className="block min-h-[250px]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="h-full rounded-[3rem] overflow-hidden relative group shadow-2xl"
                >
                  <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800" alt="Dubai Skyline" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h4 className="text-white text-xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>City Tours</h4>
                  </div>
                </motion.div>
              </Link>
              <Link href="/tours?category=beach" className="block min-h-[250px]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="h-full rounded-[3rem] overflow-hidden relative group shadow-2xl"
                >
                  <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800" alt="Beach Relaxation" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h4 className="text-white text-xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Beach & Resorts</h4>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
