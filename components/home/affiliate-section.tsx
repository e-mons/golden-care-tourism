"use client";

import { motion } from "framer-motion";
import { Handshake, DollarSign, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    icon: DollarSign,
    title: "High Commissions",
    description: "Earn up to 15% on every tour and visa service booked through your unique link.",
  },
  {
    icon: TrendingUp,
    title: "Real-time Tracking",
    description: "Monitor your performance and earnings with our advanced affiliate dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Dedicated Support",
    description: "Get personalized assistance from our partnership managers to maximize your growth.",
  },
];

export default function AffiliateSection() {
  return (
    <section className="py-24 relative">
      <div className="container px-6 md:px-12 mx-auto">
        <div className="bg-primary rounded-[3rem] p-8 md:p-16 overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
              <pattern id="affiliate-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="white" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#affiliate-pattern)" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8"
              >
                <Handshake className="w-4 h-4" />
                PARTNERSHIP PROGRAM
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight"
              >
                Grow Your Business <br /> <span className="text-white/70 italic">With Us</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/80 text-lg mb-12 leading-relaxed"
              >
                Join the Golden Care Tourism affiliate network and start earning from the booming UAE travel market today. Perfect for travel bloggers, agencies, and influencers.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/affiliate"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-primary font-bold text-lg hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-xl shadow-black/10"
                >
                  Join the Program
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 flex gap-6 group hover:bg-white/20 transition-all duration-300"
                >
                  <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-white/70 leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
