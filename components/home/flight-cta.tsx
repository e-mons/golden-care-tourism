"use client";
import { motion } from "framer-motion";
import { Plane, Shield, Clock, CreditCard, Headphones, ArrowRight } from "lucide-react";
import Link from "next/link";

const FEATURES = [
  { icon: Shield, title: "Secure Booking", desc: "Your payment and personal data is always protected" },
  { icon: Clock, title: "Instant Confirmation", desc: "Get your e-ticket delivered instantly to your email" },
  { icon: CreditCard, title: "Best Price Guarantee", desc: "We match any lower fare you find within 24 hours" },
  { icon: Headphones, title: "24/7 Support", desc: "Our travel experts are available around the clock" },
];

export default function FlightCTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gray-950">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 rounded-full" />
      </div>

      {/* Animated Plane Path */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: ["-100%", "200%"],
            y: ["60%", "20%", "50%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute text-white/5"
        >
          <Plane className="h-20 w-20 rotate-[-30deg]" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2 rounded-full mb-6 border border-white/10">
              <Plane className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest">Flight Booking</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Book Your Flight in{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                60 Seconds
              </span>
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Search across 300+ airlines worldwide. Compare prices, find the best deals, and book your next adventure — all in one place. No hidden fees, no surprises.
            </p>

            <Link
              href="/flights"
              className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/20 text-base"
            >
              Search Flights Now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>

          {/* Right — Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[1.5rem] p-6 hover:bg-white/10 transition-all group"
              >
                <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <feat.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{feat.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
