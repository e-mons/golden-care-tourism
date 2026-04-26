"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, Wallet, Users, ChevronDown, Banknote, Gem } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function HeroVideo() {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [budget, setBudget] = useState<string>("");
  const [guests, setGuests] = useState<string>("1");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (date) params.append("date", date.toISOString());
    if (budget) params.append("budget", budget);
    if (guests) params.append("guests", guests);
    
    router.push(`/tours?${params.toString()}`);
  };

  return (
    <section className="relative h-screen min-h-[800px] w-full overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-poster.png"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source
          src="/videos/v1.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10" />

      {/* Content */}
      <div className="container mx-auto relative z-20 px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl mx-auto px-8 md:px-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight tracking-tight drop-shadow-2xl" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Explore The World
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-10 max-w-xl mx-auto font-medium drop-shadow-lg leading-relaxed">
            What we offer is an unforgettable journey and experience.
          </p>

          {/* Functional High-Fidelity Search Pill */}
          <div className="w-full max-w-5xl mx-auto">
            <div className="bg-white/95 backdrop-blur-xl p-3 md:p-2 rounded-[2.5rem] md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-center gap-2 md:gap-0">

              {/* Date Segment */}
              <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-gray-100/50">
                <Popover>
                  <PopoverTrigger nativeButton={false} render={
                    <div className="flex items-center px-6 md:px-8 py-4 gap-4 hover:bg-gray-50/50 transition-colors rounded-[2rem] md:rounded-none md:rounded-l-full group cursor-pointer w-full">
                      <Calendar className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                      <div className="text-left flex-1">
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Date</p>
                        <p className="text-sm font-bold text-gray-800 whitespace-nowrap">
                          {date ? format(date, "PPP") : "Pick a date"}
                        </p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  } />
                  <PopoverContent className="w-auto p-0 rounded-[2rem] border-primary/10 shadow-2xl" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="p-4"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Budget Segment */}
              <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-gray-100/50">
                <Select onValueChange={(val: string | null) => setBudget(val || "")}>
                  <SelectTrigger nativeButton={false} render={
                    <div className="flex items-center px-6 md:px-8 py-4 gap-4 hover:bg-gray-50/50 transition-colors rounded-[2rem] md:rounded-none group cursor-pointer w-full">
                      <Wallet className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                      <div className="text-left flex-1">
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Budget</p>
                        <p className="text-sm font-bold text-gray-800 whitespace-nowrap">
                          {budget ? (budget === "budget" ? "Budget (AED 0-500)" : budget === "mid" ? "Mid (AED 500-1500)" : "Luxury (AED 1500+)") : "Select Range"}
                        </p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  } />
                  <SelectContent className="rounded-[2rem] border-primary/10 shadow-2xl min-w-[16rem]">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Select Budget Range</p>
                    </div>
                    <SelectItem value="budget">
                      <Wallet className="h-4 w-4 text-primary/60" />
                      <span>Budget (AED 0 - 500)</span>
                    </SelectItem>
                    <SelectItem value="mid">
                      <Banknote className="h-4 w-4 text-primary/60" />
                      <span>Mid-Range (AED 500 - 1500)</span>
                    </SelectItem>
                    <SelectItem value="luxury">
                      <Gem className="h-4 w-4 text-primary/60" />
                      <span>Luxury (AED 1500+)</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Guest Segment */}
              <div className="flex-1 w-full md:border-0">
                <Select onValueChange={(val: string | null) => setGuests(val || "1")} defaultValue="1">
                  <SelectTrigger nativeButton={false} render={
                    <div className="flex items-center px-6 md:px-8 py-4 gap-4 hover:bg-gray-50/50 transition-colors rounded-[2rem] md:rounded-none md:rounded-r-full group cursor-pointer w-full">
                      <Users className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                      <div className="text-left flex-1">
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Guests</p>
                        <p className="text-sm font-bold text-gray-800 whitespace-nowrap">
                          {guests} {parseInt(guests) > 1 ? "Persons" : "Person"}
                        </p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  } />
                  <SelectContent className="rounded-[2rem] border-primary/10 shadow-2xl min-w-[12rem]">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Number of Guests</p>
                    </div>
                    {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                      <SelectItem key={n} value={n.toString()}>
                        <Users className="h-4 w-4 text-primary/60" />
                        <span>{n} {n > 1 ? "Persons" : "Person"}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <Button 
                onClick={handleSearch}
                className="w-full md:w-auto h-16 md:h-14 px-12 rounded-[2rem] md:rounded-full text-lg font-bold bg-[#00AEEF] hover:bg-[#0096ce] text-white shadow-xl transition-all hover:scale-[1.02] md:hover:scale-105 active:scale-95 mt-2 md:mt-0 md:ml-2"
              >
                Search
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
