"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Star, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const destinations = [
  {
    id: 1,
    name: "Downtown Dubai",
    type: "Modern City",
    rating: "4.9",
    price: "From AED 120",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200",
    size: "large",
  },
  {
    id: 2,
    name: "Liwa Desert",
    type: "Adventure",
    rating: "4.8",
    price: "From AED 85",
    image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=800",
    size: "small",
  },
  {
    id: 3,
    name: "Sheikh Zayed Mosque",
    type: "Cultural",
    rating: "5.0",
    price: "Free Entry",
    image: "https://images.unsplash.com/photo-1544971587-b842c27f8e14?auto=format&fit=crop&q=80&w=800",
    size: "small",
  },
  {
    id: 4,
    name: "Downtown Dubai",
    type: "Modern City",
    rating: "4.9",
    price: "From AED 120",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200",
    size: "large",
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="py-32 bg-background overflow-hidden">
      <div className="max-w-7xl px-8 md:px-16 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block"
            >
              Exclusively Curated
            </motion.span>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Hidden Gems of the <span className="text-primary italic">Emirates</span>
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/tours" className="group/btn">
              <Button className="h-14 px-8 rounded-2xl bg-primary text-white hover:bg-primary/90 font-bold text-sm shadow-xl shadow-primary/20 transition-all duration-500 flex items-center gap-3">
                Explore All Destinations
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[650px]">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={cn(
                "group relative overflow-hidden rounded-[3rem] cursor-pointer shadow-2xl transition-all duration-700 hover:-translate-y-2 h-[400px] md:h-full",
                dest.size === "large" ? "md:col-span-7" : "md:col-span-5"
              )}
            >
              {/* Image with Parallax-like effect */}
              <div className="absolute inset-0 z-0">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
              </div>

              {/* Top Badge */}
              <div className="absolute top-8 left-8 z-20">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 flex items-center gap-2">
                  <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-bold tracking-wide">{dest.rating}</span>
                </div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-primary-foreground/70 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">{dest.type}</span>
                    </div>
                    <h3
                      className="text-3xl md:text-4xl text-white font-bold leading-tight group-hover:text-primary transition-colors duration-300"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {dest.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="text-white font-bold text-lg">{dest.price}</span>
                    <Link href={`/tours?location=${dest.name}`}>
                      <Button className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 p-0 hover:bg-primary hover:border-primary transition-all duration-500 group/btn">
                        <ArrowUpRight className="h-5 w-5 text-white group-hover/btn:rotate-45 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Decorative Border on Hover */}
              <div className="absolute inset-4 border border-white/20 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none scale-105 group-hover:scale-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
