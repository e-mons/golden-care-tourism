"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Plane, MapPin, ArrowRightLeft, Calendar, Users, Search, Globe, Shield, CreditCard, Clock, ArrowRight, Star } from "lucide-react";
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
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const POPULAR_AIRPORTS = [
  { code: "DXB", city: "Dubai", country: "UAE" },
  { code: "AUH", city: "Abu Dhabi", country: "UAE" },
  { code: "SHJ", city: "Sharjah", country: "UAE" },
  { code: "LHR", city: "London", country: "UK" },
  { code: "JFK", city: "New York", country: "US" },
  { code: "CDG", city: "Paris", country: "France" },
  { code: "IST", city: "Istanbul", country: "Turkey" },
  { code: "BOM", city: "Mumbai", country: "India" },
  { code: "DEL", city: "Delhi", country: "India" },
  { code: "CAI", city: "Cairo", country: "Egypt" },
  { code: "RUH", city: "Riyadh", country: "Saudi Arabia" },
  { code: "JED", city: "Jeddah", country: "Saudi Arabia" },
  { code: "KHI", city: "Karachi", country: "Pakistan" },
  { code: "MNL", city: "Manila", country: "Philippines" },
  { code: "BKK", city: "Bangkok", country: "Thailand" },
  { code: "SIN", city: "Singapore", country: "Singapore" },
  { code: "FRA", city: "Frankfurt", country: "Germany" },
  { code: "NBO", city: "Nairobi", country: "Kenya" },
  { code: "ADD", city: "Addis Ababa", country: "Ethiopia" },
  { code: "LOS", city: "Lagos", country: "Nigeria" },
];

const POPULAR_ROUTES = [
  { from: "DXB", to: "LHR", fromCity: "Dubai", toCity: "London", price: 1060, emoji: "🇬🇧" },
  { from: "DXB", to: "IST", fromCity: "Dubai", toCity: "Istanbul", price: 655, emoji: "🇹🇷" },
  { from: "DXB", to: "BOM", fromCity: "Dubai", toCity: "Mumbai", price: 585, emoji: "🇮🇳" },
  { from: "DXB", to: "CDG", fromCity: "Dubai", toCity: "Paris", price: 1210, emoji: "🇫🇷" },
  { from: "DXB", to: "BKK", fromCity: "Dubai", toCity: "Bangkok", price: 915, emoji: "🇹🇭" },
  { from: "DXB", to: "CAI", fromCity: "Dubai", toCity: "Cairo", price: 730, emoji: "🇪🇬" },
  { from: "DXB", to: "SIN", fromCity: "Dubai", toCity: "Singapore", price: 1095, emoji: "🇸🇬" },
  { from: "DXB", to: "NBO", fromCity: "Dubai", toCity: "Nairobi", price: 1280, emoji: "🇰🇪" },
];

const WHY_US = [
  { icon: Globe, title: "300+ Airlines", desc: "Access flights from all major and budget airlines worldwide" },
  { icon: Shield, title: "Secure Payments", desc: "Every transaction is encrypted and your data is protected" },
  { icon: CreditCard, title: "Best Price Match", desc: "We guarantee the best fares or match any lower price" },
  { icon: Clock, title: "Instant E-Tickets", desc: "Receive your booking confirmation and e-tickets instantly" },
];

export default function FlightsPage() {
  const router = useRouter();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState("1");
  const [cabinClass, setCabinClass] = useState("economy");
  const [tripType, setTripType] = useState<"one_way" | "round_trip">("round_trip");
  const [originSearch, setOriginSearch] = useState("");
  const [destSearch, setDestSearch] = useState("");
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  const filteredOriginAirports = POPULAR_AIRPORTS.filter(
    (a) =>
      a.city.toLowerCase().includes(originSearch.toLowerCase()) ||
      a.code.toLowerCase().includes(originSearch.toLowerCase()) ||
      a.country.toLowerCase().includes(originSearch.toLowerCase())
  ).slice(0, 6);

  const filteredDestAirports = POPULAR_AIRPORTS.filter(
    (a) =>
      a.city.toLowerCase().includes(destSearch.toLowerCase()) ||
      a.code.toLowerCase().includes(destSearch.toLowerCase()) ||
      a.country.toLowerCase().includes(destSearch.toLowerCase())
  ).slice(0, 6);

  const handleSearch = () => {
    if (!origin || !destination || !departDate) return;
    const params = new URLSearchParams();
    params.append("origin", origin);
    params.append("destination", destination);
    params.append("departureDate", departDate.toISOString().split("T")[0]);
    if (returnDate && tripType === "round_trip") params.append("returnDate", returnDate.toISOString().split("T")[0]);
    params.append("passengers", passengers);
    params.append("cabinClass", cabinClass);
    params.append("tripType", tripType);
    router.push(`/flights/search?${params.toString()}`);
  };

  const swapAirports = () => {
    const tempO = origin;
    const tempOS = originSearch;
    setOrigin(destination);
    setOriginSearch(destSearch);
    setDestination(tempO);
    setDestSearch(tempOS);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[180px]" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-blue-500/15 rounded-full blur-[150px]" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2 rounded-full mb-5 border border-white/10">
              <Plane className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest">Flight Booking</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 leading-tight" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-blue-400 bg-clip-text text-transparent">Flight</span>
            </h1>
            <p className="text-white/60 max-w-xl mx-auto text-base md:text-lg">
              Search across 300+ airlines. Compare prices and book in seconds.
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-5xl mx-auto">
            {/* Trip Type */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/10">
                <button onClick={() => setTripType("round_trip")} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${tripType === "round_trip" ? "bg-white text-gray-900" : "text-white/80 hover:text-white"}`}>
                  Round Trip
                </button>
                <button onClick={() => setTripType("one_way")} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${tripType === "one_way" ? "bg-white text-gray-900" : "text-white/80 hover:text-white"}`}>
                  One Way
                </button>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-xl p-4 md:p-3 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Origin */}
                <div className="relative">
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">From</label>
                    <div className="flex items-center gap-2">
                      <Plane className="h-4 w-4 text-gray-400 rotate-[-45deg] shrink-0" />
                      <input type="text" placeholder="City or airport" value={originSearch}
                        onChange={(e) => { setOriginSearch(e.target.value); setShowOriginDropdown(true); }}
                        onFocus={() => setShowOriginDropdown(true)}
                        onBlur={() => setTimeout(() => setShowOriginDropdown(false), 200)}
                        className="text-sm font-bold text-gray-800 bg-transparent outline-none w-full placeholder:text-gray-400" />
                    </div>
                  </div>
                  {showOriginDropdown && originSearch && filteredOriginAirports.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                      {filteredOriginAirports.map((a) => (
                        <button key={a.code} onMouseDown={() => { setOrigin(a.code); setOriginSearch(`${a.city} (${a.code})`); setShowOriginDropdown(false); }}
                          className="w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors flex items-center justify-between text-sm">
                          <span className="text-gray-700">{a.city}, {a.country}</span>
                          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{a.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Swap + Destination */}
                <div className="relative">
                  <button onClick={swapAirports} className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 hidden lg:flex h-8 w-8 rounded-full bg-primary/10 items-center justify-center text-primary hover:bg-primary hover:text-white transition-all border-2 border-white">
                    <ArrowRightLeft className="h-3.5 w-3.5" />
                  </button>
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">To</label>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
                      <input type="text" placeholder="City or airport" value={destSearch}
                        onChange={(e) => { setDestSearch(e.target.value); setShowDestDropdown(true); }}
                        onFocus={() => setShowDestDropdown(true)}
                        onBlur={() => setTimeout(() => setShowDestDropdown(false), 200)}
                        className="text-sm font-bold text-gray-800 bg-transparent outline-none w-full placeholder:text-gray-400" />
                    </div>
                  </div>
                  {showDestDropdown && destSearch && filteredDestAirports.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                      {filteredDestAirports.map((a) => (
                        <button key={a.code} onMouseDown={() => { setDestination(a.code); setDestSearch(`${a.city} (${a.code})`); setShowDestDropdown(false); }}
                          className="w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors flex items-center justify-between text-sm">
                          <span className="text-gray-700">{a.city}, {a.country}</span>
                          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{a.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Depart</label>
                    <Popover>
                      <PopoverTrigger render={
                        <div className="flex items-center gap-2 cursor-pointer">
                          <Calendar className="h-4 w-4 text-gray-400 shrink-0" />
                          <span className="text-sm font-bold text-gray-800">{departDate ? format(departDate, "dd MMM") : "Date"}</span>
                        </div>
                      } />
                      <PopoverContent className="w-auto p-0 rounded-[2rem] shadow-2xl" align="start">
                        <CalendarComponent mode="single" selected={departDate} onSelect={setDepartDate} initialFocus className="p-4" />
                      </PopoverContent>
                    </Popover>
                  </div>
                  {tripType === "round_trip" ? (
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Return</label>
                      <Popover>
                        <PopoverTrigger render={
                          <div className="flex items-center gap-2 cursor-pointer">
                            <Calendar className="h-4 w-4 text-gray-400 shrink-0" />
                            <span className="text-sm font-bold text-gray-800">{returnDate ? format(returnDate, "dd MMM") : "Date"}</span>
                          </div>
                        } />
                        <PopoverContent className="w-auto p-0 rounded-[2rem] shadow-2xl" align="start">
                          <CalendarComponent mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus className="p-4" />
                        </PopoverContent>
                      </Popover>
                    </div>
                  ) : (
                    <div className="bg-gray-50/50 rounded-2xl p-4 flex items-center justify-center">
                      <span className="text-xs text-gray-300 font-bold">One Way</span>
                    </div>
                  )}
                </div>

                {/* Passengers & Cabin */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Passengers</label>
                    <Select onValueChange={(val) => val && setPassengers(val)} defaultValue="1">
                      <SelectTrigger render={
                        <div className="flex items-center gap-2 cursor-pointer">
                          <Users className="h-4 w-4 text-gray-400 shrink-0" />
                          <span className="text-sm font-bold text-gray-800">{passengers}</span>
                        </div>
                      } />
                      <SelectContent className="rounded-2xl shadow-2xl">
                        {[1,2,3,4,5,6,7,8,9].map(n => <SelectItem key={n} value={n.toString()}>{n} {n > 1 ? "Passengers" : "Passenger"}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Class</label>
                    <Select onValueChange={(val) => val && setCabinClass(val)} defaultValue="economy">
                      <SelectTrigger render={
                        <div className="flex items-center gap-2 cursor-pointer">
                          <Star className="h-4 w-4 text-gray-400 shrink-0" />
                          <span className="text-sm font-bold text-gray-800 capitalize">{cabinClass === "premium_economy" ? "Premium" : cabinClass}</span>
                        </div>
                      } />
                      <SelectContent className="rounded-2xl shadow-2xl">
                        <SelectItem value="economy">Economy</SelectItem>
                        <SelectItem value="premium_economy">Premium Economy</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="first">First Class</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <Button onClick={handleSearch} disabled={!origin || !destination || !departDate}
                className="w-full mt-4 h-14 rounded-2xl text-base font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all disabled:opacity-50">
                <Search className="h-5 w-5 mr-2" />
                Search Flights
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Popular Routes from Dubai
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">Trending destinations with the best fares this season</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {POPULAR_ROUTES.map((route, i) => (
              <motion.button
                key={route.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  setOrigin(route.from);
                  setOriginSearch(`${route.fromCity} (${route.from})`);
                  setDestination(route.to);
                  setDestSearch(`${route.toCity} (${route.to})`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-xl hover:border-primary/20 transition-all group text-left"
              >
                <span className="text-2xl mb-3 block">{route.emoji}</span>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-gray-900 text-sm">{route.fromCity}</span>
                  <ArrowRight className="h-3 w-3 text-gray-400" />
                  <span className="font-bold text-gray-900 text-sm">{route.toCity}</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">{route.from} → {route.to}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">From</span>
                  <span className="text-xl font-bold text-primary">AED {route.price}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Why Book Flights With Us
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">Your trusted partner for seamless air travel worldwide</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2rem] p-8 text-center shadow-sm hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
