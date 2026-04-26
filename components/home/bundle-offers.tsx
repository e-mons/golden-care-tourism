"use client";

import { motion } from "framer-motion";
import { Plane, Hotel, Ticket, ArrowRight, Zap, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const bundles = [
  {
    title: "The Ultimate Dubai Experience",
    description: "Flight + 5★ Hotel + Visa + Private Desert Safari",
    price: "4,999",
    originalPrice: "6,650",
    savings: "25%",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
    tag: "Best Seller",
    includes: ["Return Flights", "5-Night 5★ Hotel", "UAE Visa", "Desert Safari"],
    accent: "from-amber-500 to-orange-600",
  },
  {
    title: "Adventure Seeker Pack",
    description: "Visa + Skydive Dubai + Yacht Party + VIP Club Access",
    price: "3,200",
    originalPrice: "3,760",
    savings: "15%",
    image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=800",
    tag: "Trending",
    includes: ["UAE Visa", "Skydive Dubai", "Yacht Party", "VIP Nightlife"],
    accent: "from-primary to-teal-600",
  },
  {
    title: "Family Getaway",
    description: "Visa + Atlantis Hotel + Theme Park Passes for the whole family",
    price: "6,500",
    originalPrice: "8,125",
    savings: "20%",
    image: "https://images.unsplash.com/photo-1574950578143-858c6fc58922?auto=format&fit=crop&q=80&w=800",
    tag: "Family Pick",
    includes: ["UAE Visa x4", "Atlantis Suite", "Theme Parks", "Airport Transfer"],
    accent: "from-violet-500 to-purple-600",
  },
];

export default function BundleOffers() {
  return (
    <section className="py-32 bg-[#0a0f1a] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)" }} />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl px-8 md:px-16 mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Smart Bundles
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Everything You Need in{" "}
              <span className="text-primary italic">One Click</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/50 text-lg leading-relaxed mt-6 max-w-lg"
            >
              Save time and money by booking our curated travel bundles — flights, hotels, and experiences, all in one.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/bundles" 
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 border border-white/20 text-white hover:bg-white hover:text-[#0a0f1a] font-bold transition-all duration-300 backdrop-blur-sm text-sm"
            >
              View All Bundles
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Bundle Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {bundles.map((bundle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className="group relative bg-white/5 backdrop-blur-sm rounded-[3rem] overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-700 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-[260px] overflow-hidden">
                <img
                  src={bundle.image}
                  alt={bundle.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/40 to-transparent" />

                {/* Tag + Savings Badge */}
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <span className={cn(
                    "px-4 py-1.5 rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-lg bg-gradient-to-r",
                    bundle.accent
                  )}>
                    {bundle.tag}
                  </span>
                </div>
                <div className="absolute top-6 right-6">
                  <div className="bg-white text-foreground px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    Save {bundle.savings}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <h3
                  className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {bundle.title}
                </h3>
                <p className="text-white/40 text-sm mb-8 leading-relaxed">
                  {bundle.description}
                </p>

                {/* Includes List */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {bundle.includes.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-white/60 text-xs font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-white/30 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">Starting From</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-black text-white tracking-tight">AED {bundle.price}</span>
                      <span className="text-white/30 text-sm line-through font-medium">AED {bundle.originalPrice}</span>
                    </div>
                  </div>
                  <Link
                    href={`/tours?type=bundle&title=${encodeURIComponent(bundle.title)}`}
                    className={cn(
                      "h-14 w-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-500 group-hover:w-36 overflow-hidden relative bg-gradient-to-r",
                      bundle.accent
                    )}
                  >
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-0 transition-all duration-300">
                      <ArrowRight className="w-6 h-6" />
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap px-6 font-bold text-sm">
                      Book Now
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-white/30 text-sm font-medium"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span>Instant Booking</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            <span>Free Cancellation</span>
          </div>
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-primary" />
            <span>All-Inclusive Packages</span>
          </div>
          <div className="flex items-center gap-2">
            <Hotel className="w-4 h-4 text-primary" />
            <span>5★ Accommodations</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
}
