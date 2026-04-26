"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Compass, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-32 lg:pt-36 lg:pb-40">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
        <div className="w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
        <div className="w-[30rem] h-[30rem] bg-secondary/30 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
            Premium UAE Tourism & Visa Services
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-foreground">
            Experience the Emirates with <span className="text-primary">Golden Care</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
            From exclusive desert safaris to seamless visa processing. We automate your travel so you can focus on the luxury experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/tours" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold shadow-lg shadow-primary/25">
                Explore Tours <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/visas" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold">
                Apply for Visa
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Quick Search/Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 mx-auto max-w-4xl bg-card border border-border/50 shadow-2xl shadow-black/5 rounded-2xl p-2 sm:p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="flex items-center gap-4 p-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-muted-foreground">Destinations</p>
                <p className="font-semibold text-foreground">Dubai, Abu Dhabi...</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-muted-foreground">Availability</p>
                <p className="font-semibold text-foreground">Daily Departures</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <Compass className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-muted-foreground">Experience</p>
                <p className="font-semibold text-foreground">VIP & Luxury</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
