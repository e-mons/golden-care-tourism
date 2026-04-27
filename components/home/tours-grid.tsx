"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, MapPin, ArrowRight, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const tours = [
  {
    id: 1,
    title: "Premium Desert Safari with Private Dinner",
    location: "Al Marmoom, Dubai",
    price: 450,
    rating: 4.9,
    reviews: 128,
    duration: "6 Hours",
    image: "https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&q=80&w=800",
    category: "Desert Safari"
  },
  {
    id: 2,
    title: "Abu Dhabi Full Day Sightseeing Tour",
    location: "Abu Dhabi",
    price: 120,
    rating: 4.8,
    reviews: 254,
    duration: "10 Hours",
    image: "https://images.unsplash.com/photo-1544971587-b842c27f8e14?auto=format&fit=crop&q=80&w=800",
    category: "City Tours"
  },
  {
    id: 3,
    title: "Luxury Yacht Cruise at Dubai Marina",
    location: "Dubai Marina",
    price: 850,
    rating: 5.0,
    reviews: 86,
    duration: "3 Hours",
    image: "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?auto=format&fit=crop&q=80&w=800",
    category: "Luxury Cruises"
  },
  {
    id: 4,
    title: "Dune Buggy Adventure & Desert Sunset",
    location: "Lahbab Desert, Dubai",
    price: 380,
    rating: 4.9,
    reviews: 215,
    duration: "4 Hours",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=800",
    category: "Desert Safari"
  },
  {
    id: 5,
    title: "Old Dubai Heritage & Food Tour",
    location: "Al Fahidi, Dubai",
    price: 95,
    rating: 4.7,
    reviews: 312,
    duration: "4 Hours",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=800",
    category: "Cultural"
  },
  {
    id: 6,
    title: "VVIP Helicopter City Tour",
    location: "Palm Jumeirah",
    price: 1250,
    rating: 5.0,
    reviews: 42,
    duration: "25 Minutes",
    image: "https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=800",
    category: "Luxury Cruises"
  }
];

const categories = ["All Tours", "Desert Safari", "City Tours", "Luxury Cruises", "Cultural"];

export default function ToursShowcase() {
  const [activeTab, setActiveTab] = useState("All Tours");

  const filteredTours = activeTab === "All Tours" 
    ? tours 
    : tours.filter(tour => tour.category === activeTab);

  return (
    <section className="py-32 bg-secondary/30 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-7xl px-8 md:px-16 mx-auto relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px]">
              Signature Collections
            </span>
          </motion.div>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Experience the <span className="text-primary italic">Extraordinary</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed font-light">
            From adrenaline-pumping adventures to serene luxury escapes, discover tours designed to leave a lasting impression.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {categories.map((cat, idx) => (
              <motion.button 
                key={cat} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-8 py-3 rounded-full text-xs font-bold transition-all duration-300 border uppercase tracking-widest",
                  activeTab === cat 
                    ? "bg-primary text-white border-primary shadow-xl shadow-primary/20" 
                    : "bg-white/50 backdrop-blur-sm border-primary/10 text-foreground/70 hover:border-primary/40 hover:text-primary"
                )}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredTours.map((tour) => (
              <motion.div
                key={tour.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-[3rem] overflow-hidden group hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] transition-all duration-700 flex flex-col h-full border border-primary/5 shadow-sm"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image 
                    src={tour.image} 
                    alt={tour.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                    <div className="px-4 py-1.5 bg-primary/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg">
                      {tour.category}
                    </div>
                  </div>
                  
                  <button className="absolute top-6 right-6 z-10 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all duration-300 shadow-xl">
                    <Heart className="h-5 w-5" />
                  </button>

                  <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 via-black/20 to-transparent pt-24">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center text-yellow-400">
                        <Star className="h-3 w-3 fill-current" />
                      </div>
                      <span className="text-white font-bold text-xs">{tour.rating}</span>
                      <span className="text-white/60 text-[10px] font-medium uppercase tracking-widest">({tour.reviews} Reviews)</span>
                    </div>
                    <h3 
                      className="text-2xl text-white font-bold leading-tight line-clamp-2"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {tour.title}
                    </h3>
                  </div>
                </div>
                
                {/* Info Section */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-secondary/50 flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{tour.location.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-secondary/50 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{tour.duration}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-8 border-t border-primary/5 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] uppercase font-black text-primary tracking-[0.2em] mb-1">Starting From</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-foreground tracking-tight">AED {tour.price}</span>
                        <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">/ pax</span>
                      </div>
                    </div>
                    
                    <Link href={`/tours/${tour.id}`}>
                      <Button className="h-14 w-14 rounded-full p-0 group-hover:w-40 transition-all duration-500 bg-primary hover:bg-primary shadow-xl shadow-primary/20 relative overflow-hidden group/btn">
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-0 transition-all duration-300">
                          <ArrowRight className="h-6 w-6 text-white" />
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap px-6 font-bold text-white text-xs uppercase tracking-widest">
                          Book Now
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-24 text-center">
          <Link href="/tours" className="inline-flex items-center gap-6 group">
            <div className="h-px w-16 bg-primary/20 group-hover:w-24 group-hover:bg-primary transition-all duration-700" />
            <span className="text-sm font-black uppercase tracking-[0.3em] text-foreground hover:text-primary transition-colors">View All Signature Experiences</span>
            <div className="h-px w-16 bg-primary/20 group-hover:w-24 group-hover:bg-primary transition-all duration-700" />
          </Link>
        </div>
      </div>
    </section>
  );
}
