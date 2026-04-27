"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Wallet, Users, ChevronDown, Banknote, Gem, Plane, MapPin, ArrowRightLeft, Search } from "lucide-react";
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

export default function HeroVideo() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"flights" | "tours">("flights");

  // Flight state
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [flightPassengers] = useState("1");
  const [cabinClass] = useState("economy");
  const [tripType, setTripType] = useState<"one_way" | "round_trip">("round_trip");
  const [originSearch, setOriginSearch] = useState("");
  const [destSearch, setDestSearch] = useState("");
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  // Tour state
  const [tourDate, setTourDate] = useState<Date>();
  const [budget, setBudget] = useState<string>("");
  const [guests, setGuests] = useState<string>("1");

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

  const handleFlightSearch = () => {
    if (!origin || !destination || !departDate) return;
    const params = new URLSearchParams();
    params.append("origin", origin);
    params.append("destination", destination);
    params.append("departureDate", departDate.toISOString().split("T")[0]);
    if (returnDate && tripType === "round_trip") params.append("returnDate", returnDate.toISOString().split("T")[0]);
    params.append("passengers", flightPassengers);
    params.append("cabinClass", cabinClass);
    params.append("tripType", tripType);
    router.push(`/flights/search?${params.toString()}`);
  };

  const handleTourSearch = () => {
    const params = new URLSearchParams();
    if (tourDate) params.append("date", tourDate.toISOString());
    if (budget) params.append("budget", budget);
    if (guests) params.append("guests", guests);
    router.push(`/tours?${params.toString()}`);
  };

  const swapAirports = () => {
    const tempOrigin = origin;
    const tempOriginSearch = originSearch;
    setOrigin(destination);
    setOriginSearch(destSearch);
    setDestination(tempOrigin);
    setDestSearch(tempOriginSearch);
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
        <source src="/videos/v1.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10" />

      {/* Content */}
      <div className="container mx-auto relative z-20 px-4 sm:px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4 leading-tight tracking-tight drop-shadow-2xl" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Explore The World
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-8 max-w-xl mx-auto font-medium drop-shadow-lg leading-relaxed">
            Book flights, tours, and unforgettable experiences.
          </p>

          {/* Tabs + Search Container */}
          <div className="w-full max-w-5xl mx-auto">
            {/* Tab Toggles */}
            <div className="flex justify-center mb-3">
              <div className="inline-flex bg-white/15 backdrop-blur-xl rounded-full p-1 border border-white/20">
                <button
                  onClick={() => setActiveTab("flights")}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeTab === "flights"
                      ? "bg-white text-gray-900 shadow-lg"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Plane className="h-4 w-4" />
                  Flights
                </button>
                <button
                  onClick={() => setActiveTab("tours")}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeTab === "tours"
                      ? "bg-white text-gray-900 shadow-lg"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <MapPin className="h-4 w-4" />
                  Tours
                </button>
              </div>
            </div>

            {/* Search Pill */}
            <AnimatePresence mode="wait">
              {activeTab === "flights" ? (
                <motion.div
                  key="flights"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Trip Type Toggle */}
                  <div className="flex justify-center mb-3">
                    <div className="inline-flex bg-white/10 backdrop-blur-md rounded-full p-0.5 border border-white/10 text-xs">
                      <button
                        onClick={() => setTripType("round_trip")}
                        className={`px-4 py-1.5 rounded-full font-bold transition-all ${tripType === "round_trip" ? "bg-white/90 text-gray-800" : "text-white/80"}`}
                      >
                        Round Trip
                      </button>
                      <button
                        onClick={() => setTripType("one_way")}
                        className={`px-4 py-1.5 rounded-full font-bold transition-all ${tripType === "one_way" ? "bg-white/90 text-gray-800" : "text-white/80"}`}
                      >
                        One Way
                      </button>
                    </div>
                  </div>

                  <div className="bg-white/95 backdrop-blur-xl p-3 md:p-2 rounded-[2.5rem] md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-center gap-2 md:gap-0">
                    {/* Origin */}
                    <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-gray-100/50 relative">
                      <div className="flex items-center px-5 md:px-6 py-3 md:py-4 gap-3 hover:bg-gray-50/50 transition-colors rounded-[2rem] md:rounded-none md:rounded-l-full group cursor-pointer w-full">
                        <Plane className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors rotate-[-45deg]" />
                        <div className="text-left flex-1">
                          <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">From</p>
                          <input
                            type="text"
                            placeholder="City or airport"
                            value={originSearch}
                            onChange={(e) => {
                              setOriginSearch(e.target.value);
                              setShowOriginDropdown(true);
                            }}
                            onFocus={() => setShowOriginDropdown(true)}
                            onBlur={() => setTimeout(() => setShowOriginDropdown(false), 200)}
                            className="text-sm font-bold text-gray-800 bg-transparent outline-none w-full placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                      {showOriginDropdown && originSearch && filteredOriginAirports.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                          {filteredOriginAirports.map((a) => (
                            <button
                              key={a.code}
                              onMouseDown={() => {
                                setOrigin(a.code);
                                setOriginSearch(`${a.city} (${a.code})`);
                                setShowOriginDropdown(false);
                              }}
                              className="w-full text-left px-5 py-3 hover:bg-primary/5 transition-colors flex items-center justify-between"
                            >
                              <span className="text-sm font-medium text-gray-700">{a.city}, {a.country}</span>
                              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{a.code}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Swap Button */}
                    <button
                      onClick={swapAirports}
                      className="hidden md:flex h-8 w-8 rounded-full bg-primary/10 items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shrink-0 -mx-4 z-10 border-2 border-white"
                    >
                      <ArrowRightLeft className="h-3.5 w-3.5" />
                    </button>

                    {/* Destination */}
                    <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-gray-100/50 relative">
                      <div className="flex items-center px-5 md:px-6 py-3 md:py-4 gap-3 hover:bg-gray-50/50 transition-colors rounded-[2rem] md:rounded-none group cursor-pointer w-full">
                        <MapPin className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                        <div className="text-left flex-1">
                          <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">To</p>
                          <input
                            type="text"
                            placeholder="City or airport"
                            value={destSearch}
                            onChange={(e) => {
                              setDestSearch(e.target.value);
                              setShowDestDropdown(true);
                            }}
                            onFocus={() => setShowDestDropdown(true)}
                            onBlur={() => setTimeout(() => setShowDestDropdown(false), 200)}
                            className="text-sm font-bold text-gray-800 bg-transparent outline-none w-full placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                      {showDestDropdown && destSearch && filteredDestAirports.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                          {filteredDestAirports.map((a) => (
                            <button
                              key={a.code}
                              onMouseDown={() => {
                                setDestination(a.code);
                                setDestSearch(`${a.city} (${a.code})`);
                                setShowDestDropdown(false);
                              }}
                              className="w-full text-left px-5 py-3 hover:bg-primary/5 transition-colors flex items-center justify-between"
                            >
                              <span className="text-sm font-medium text-gray-700">{a.city}, {a.country}</span>
                              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{a.code}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Departure Date */}
                    <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-gray-100/50">
                      <Popover>
                        <PopoverTrigger render={
                          <div className="flex items-center px-5 md:px-6 py-3 md:py-4 gap-3 hover:bg-gray-50/50 transition-colors rounded-[2rem] md:rounded-none group cursor-pointer w-full">
                            <Calendar className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                            <div className="text-left flex-1">
                              <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Depart</p>
                              <p className="text-sm font-bold text-gray-800 whitespace-nowrap">
                                {departDate ? format(departDate, "dd MMM") : "Date"}
                              </p>
                            </div>
                          </div>
                        } />
                        <PopoverContent className="w-auto p-0 rounded-[2rem] border-primary/10 shadow-2xl" align="start">
                          <CalendarComponent mode="single" selected={departDate} onSelect={setDepartDate} initialFocus className="p-4" />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Return Date (only for round trip) */}
                    {tripType === "round_trip" && (
                      <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-gray-100/50">
                        <Popover>
                          <PopoverTrigger render={
                            <div className="flex items-center px-5 md:px-6 py-3 md:py-4 gap-3 hover:bg-gray-50/50 transition-colors rounded-[2rem] md:rounded-none group cursor-pointer w-full">
                              <Calendar className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                              <div className="text-left flex-1">
                                <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Return</p>
                                <p className="text-sm font-bold text-gray-800 whitespace-nowrap">
                                  {returnDate ? format(returnDate, "dd MMM") : "Date"}
                                </p>
                              </div>
                            </div>
                          } />
                          <PopoverContent className="w-auto p-0 rounded-[2rem] border-primary/10 shadow-2xl" align="start">
                            <CalendarComponent mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus className="p-4" />
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}

                    {/* Search Button */}
                    <Button
                      onClick={handleFlightSearch}
                      disabled={!origin || !destination || !departDate}
                      className="w-full md:w-auto h-14 md:h-12 px-8 rounded-[2rem] md:rounded-full text-base font-bold bg-[#00AEEF] hover:bg-[#0096ce] text-white shadow-xl transition-all hover:scale-[1.02] md:hover:scale-105 active:scale-95 mt-2 md:mt-0 md:ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Search className="h-5 w-5 md:mr-0" />
                      <span className="md:hidden ml-2">Search Flights</span>
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="tours"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white/95 backdrop-blur-xl p-3 md:p-2 rounded-[2.5rem] md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-center gap-2 md:gap-0">
                    {/* Date Segment */}
                    <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-gray-100/50">
                      <Popover>
                        <PopoverTrigger render={
                          <div className="flex items-center px-6 md:px-8 py-4 gap-4 hover:bg-gray-50/50 transition-colors rounded-[2rem] md:rounded-none md:rounded-l-full group cursor-pointer w-full">
                            <Calendar className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                            <div className="text-left flex-1">
                              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Date</p>
                              <p className="text-sm font-bold text-gray-800 whitespace-nowrap">
                                {tourDate ? format(tourDate, "PPP") : "Pick a date"}
                              </p>
                            </div>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          </div>
                        } />
                        <PopoverContent className="w-auto p-0 rounded-[2rem] border-primary/10 shadow-2xl" align="start">
                          <CalendarComponent mode="single" selected={tourDate} onSelect={setTourDate} initialFocus className="p-4" />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Budget Segment */}
                    <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-gray-100/50">
                      <Select onValueChange={(val: string | null) => setBudget(val || "")}>
                        <SelectTrigger render={
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
                        <SelectTrigger render={
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
                      onClick={handleTourSearch}
                      className="w-full md:w-auto h-16 md:h-14 px-12 rounded-[2rem] md:rounded-full text-lg font-bold bg-[#00AEEF] hover:bg-[#0096ce] text-white shadow-xl transition-all hover:scale-[1.02] md:hover:scale-105 active:scale-95 mt-2 md:mt-0 md:ml-2"
                    >
                      Search
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
