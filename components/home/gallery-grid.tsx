"use client";

import { motion } from "framer-motion";
import { Camera, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const images = [
  {
    url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200",
    title: "Burj Khalifa Majesty",
    category: "Architecture",
    className: "md:col-span-6 md:row-span-2"
  },
  {
    url: "https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?auto=format&fit=crop&q=80&w=800",
    title: "Sheikh Zayed Mosque",
    category: "Heritage",
    className: "md:col-span-3 md:row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=800",
    title: "Arabian Desert Sands",
    category: "Nature",
    className: "md:col-span-3 md:row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800",
    title: "Luxury Yacht Marina",
    category: "Lifestyle",
    className: "md:col-span-3 md:row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&q=80&w=800",
    title: "Historic Al Fahidi District",
    category: "Culture",
    className: "md:col-span-3 md:row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&q=80&w=800",
    title: "Luxury Yacht Experience",
    category: "Lifestyle",
    className: "md:col-span-4 md:row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=800",
    title: "Dubai Marina Skyline",
    category: "Modernity",
    className: "md:col-span-4 md:row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    title: "Luxury Resort Life",
    category: "Resorts",
    className: "md:col-span-4 md:row-span-1"
  }
];

export default function GalleryGrid() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/pinstripe-light.png')" }} />
      
      <div className="max-w-7xl px-8 md:px-16 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Visual Stories</span>
            </motion.div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              A Glimpse Into The <br />
              <span className="text-primary italic">Emirates Experience</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Every photograph tells a story of tradition meeting modernity. Immerse yourself in the breathtaking landscapes of the UAE.
            </p>
            <Link href="/tours">
              <Button variant="ghost" className="group p-0 h-auto hover:bg-transparent text-primary font-bold tracking-wide">
                Explore all tours
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[280px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.8 }}
              className={`relative group overflow-hidden rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-700 ${img.className}`}
            >
              <Link href={`/tours?category=${img.category === "Nature" ? "Desert Safari" : img.category === "Architecture" ? "City Tours" : img.category === "Resorts" ? "City Tours" : img.category}`} className="block h-full w-full">
                {/* Image */}
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest">
                      {img.category}
                    </span>
                  </div>
                  <h3 className="text-white text-2xl font-bold leading-tight" style={{ fontFamily: "var(--font-playfair), serif" }}>
                    {img.title}
                  </h3>
                  
                  <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    <span className="text-white/60 text-sm font-medium flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Shot by GC Team
                    </span>
                    <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
