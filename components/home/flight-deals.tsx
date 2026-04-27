"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plane, ArrowRight, Clock, Star } from "lucide-react";
import Link from "next/link";

const FLIGHT_DEALS = [
  {
    from: "Dubai",
    fromCode: "DXB",
    to: "London",
    toCode: "LHR",
    price: 1060,
    airline: "Emirates",
    duration: "7h 30m",
    gradient: "from-blue-600 via-indigo-600 to-purple-700",
    emoji: "🇬🇧",
  },
  {
    from: "Dubai",
    fromCode: "DXB",
    to: "Istanbul",
    toCode: "IST",
    price: 655,
    airline: "flydubai",
    duration: "4h 45m",
    gradient: "from-rose-500 via-pink-600 to-red-700",
    emoji: "🇹🇷",
  },
  {
    from: "Dubai",
    fromCode: "DXB",
    to: "Mumbai",
    toCode: "BOM",
    price: 585,
    airline: "Air India",
    duration: "3h 15m",
    gradient: "from-amber-500 via-orange-600 to-red-600",
    emoji: "🇮🇳",
  },
  {
    from: "Dubai",
    fromCode: "DXB",
    to: "Cairo",
    toCode: "CAI",
    price: 730,
    airline: "Egypt Air",
    duration: "4h 10m",
    gradient: "from-yellow-500 via-amber-600 to-orange-700",
    emoji: "🇪🇬",
  },
  {
    from: "Dubai",
    fromCode: "DXB",
    to: "Paris",
    toCode: "CDG",
    price: 1210,
    airline: "Emirates",
    duration: "7h 15m",
    gradient: "from-sky-500 via-blue-600 to-indigo-700",
    emoji: "🇫🇷",
  },
  {
    from: "Dubai",
    fromCode: "DXB",
    to: "Bangkok",
    toCode: "BKK",
    price: 915,
    airline: "Thai Airways",
    duration: "6h 20m",
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    emoji: "🇹🇭",
  },
];

export default function FlightDeals() {
  const [departureDate, setDepartureDate] = useState("");

  useEffect(() => {
    // Wrap in requestAnimationFrame to move to next tick and avoid React 19 cascading render warning
    requestAnimationFrame(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDepartureDate(new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0]);
    });
  }, []);

  return (
    <section className="pb-20 md:pb-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full mb-5">
            <Plane className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Popular Flight Routes</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Best Flight Deals From Dubai
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg">
            Discover amazing fares to popular destinations worldwide. Book now and save with our exclusive airline partnerships.
          </p>
        </motion.div>

        {/* Scrolling Cards */}
        <div className="relative">
          <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:-mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible">
            {FLIGHT_DEALS.map((deal, i) => (
              <motion.div
                key={deal.toCode}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="snap-start shrink-0 w-[300px] md:w-full"
              >
                <Link href={`/flights/search?origin=${deal.fromCode}&destination=${deal.toCode}&departureDate=${departureDate}&passengers=1&cabinClass=economy&tripType=round_trip`}>
                  <div className={`relative bg-gradient-to-br ${deal.gradient} rounded-[2rem] p-6 text-white overflow-hidden group hover:scale-[1.02] transition-all duration-500 shadow-xl hover:shadow-2xl cursor-pointer h-full`}>
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 opacity-10">
                      <Plane className="h-32 w-32 rotate-45 -mr-8 -mt-8" />
                    </div>

                    {/* Emoji Flag */}
                    <span className="text-4xl mb-4 block">{deal.emoji}</span>

                    {/* Route */}
                    <div className="flex items-center gap-3 mb-4">
                      <div>
                        <p className="text-xs font-bold text-white/70">{deal.fromCode}</p>
                        <p className="text-lg font-bold">{deal.from}</p>
                      </div>
                      <div className="flex-1 flex items-center">
                        <div className="h-px flex-1 bg-white/30" />
                        <Plane className="h-4 w-4 mx-2 text-white/80" />
                        <div className="h-px flex-1 bg-white/30" />
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-white/70">{deal.toCode}</p>
                        <p className="text-lg font-bold">{deal.to}</p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-white/70">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {deal.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-white/70" />
                          {deal.airline}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-white/60 uppercase font-bold">From</p>
                        <p className="text-2xl font-bold">AED {deal.price}</p>
                      </div>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/flights"
            className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all hover:scale-105 shadow-xl"
          >
            <Plane className="h-5 w-5" />
            View All Flight Deals
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
