"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Clock, ArrowRight, Filter, SortAsc, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface FlightOffer {
  id: string;
  totalAmount: string;
  totalCurrency: string;
  owner: { name: string; logoUrl: string | null; iataCode: string };
  slices: Array<{
    origin: { name: string; iataCode: string; city: string };
    destination: { name: string; iataCode: string; city: string };
    departureTime: string;
    arrivalTime: string;
    duration: string;
    stops: number;
    segments: Array<{
      airline: string;
      flightNumber: string;
      origin: string;
      destination: string;
      departureTime: string;
      arrivalTime: string;
      duration: string;
      cabinClass: string;
    }>;
  }>;
  conditions: { refundable: boolean; changeable: boolean };
  passengerCount: number;
}

function formatDuration(iso: string): string {
  if (!iso) return "";
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return iso;
  const h = match[1] || "0";
  const m = match[2] || "0";
  return `${h}h ${m}m`;
}

function formatTime(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { day: "numeric", month: "short" });
}

function FlightSearchContent() {
  const searchParams = useSearchParams();
  const [offers, setOffers] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"price" | "duration" | "departure">("price");
  const [filterStops, setFilterStops] = useState<"all" | "0" | "1">("all");

  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const departureDate = searchParams.get("departureDate") || "";
  const returnDate = searchParams.get("returnDate") || "";
  const passengersCount = searchParams.get("passengers") || "1";
  const cabinClass = searchParams.get("cabinClass") || "economy";

  const searchFlights = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/flights/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin,
          destination,
          departureDate,
          returnDate: returnDate || undefined,
          passengers: parseInt(passengersCount),
          cabinClass,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed");
      setOffers(data.offers || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [origin, destination, departureDate, returnDate, passengersCount, cabinClass]);

  useEffect(() => {
    if (origin && destination && departureDate) {
      searchFlights();
    }
  }, [searchFlights, origin, destination, departureDate]);

  const filteredOffers = offers
    .filter((o) => {
      if (filterStops === "all") return true;
      const stops = o.slices?.[0]?.stops || 0;
      return filterStops === "0" ? stops === 0 : stops === 1;
    })
    .sort((a, b) => {
      if (sortBy === "price") return parseFloat(a.totalAmount) - parseFloat(b.totalAmount);
      if (sortBy === "departure") return new Date(a.slices?.[0]?.departureTime || 0).getTime() - new Date(b.slices?.[0]?.departureTime || 0).getTime();
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-950 pt-28 pb-8">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 text-white mb-1">
                <span className="text-xl font-bold">{origin}</span>
                <ArrowRight className="h-5 w-5 text-primary" />
                <span className="text-xl font-bold">{destination}</span>
                {returnDate && (
                  <>
                    <ArrowRight className="h-5 w-5 text-primary rotate-180" />
                    <span className="text-xl font-bold">{origin}</span>
                  </>
                )}
              </div>
              <p className="text-white/50 text-sm">
                {departureDate}{returnDate ? ` — ${returnDate}` : ""} · {passengersCount} passenger{parseInt(passengersCount) > 1 ? "s" : ""} · {cabinClass}
              </p>
            </div>
            <Link href="/flights">
              <Button variant="outline" className="rounded-full border-white/20 text-white bg-white/5 hover:bg-white/10 hover:text-white font-bold">
                Modify Search
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-8">
        {/* Filters & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-bold text-gray-500">Stops:</span>
            {(["all", "0", "1"] as const).map((val) => (
              <button
                key={val}
                onClick={() => setFilterStops(val)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filterStops === val
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-primary/30"
                }`}
              >
                {val === "all" ? "All" : val === "0" ? "Non-stop" : "1 Stop"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <SortAsc className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-bold text-gray-500">Sort:</span>
            {(["price", "departure"] as const).map((val) => (
              <button
                key={val}
                onClick={() => setSortBy(val)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                  sortBy === val
                    ? "bg-gray-900 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="text-gray-500 font-bold">Searching flights across 300+ airlines...</p>
            <p className="text-gray-400 text-sm mt-1">This may take a few seconds</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <p className="text-gray-700 font-bold mb-2">Search Failed</p>
            <p className="text-gray-500 text-sm mb-4 text-center max-w-md">{error}</p>
            <Button onClick={searchFlights} variant="outline" className="rounded-full">
              <RefreshCw className="h-4 w-4 mr-2" /> Try Again
            </Button>
          </div>
        ) : filteredOffers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Plane className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-700 font-bold mb-2">No Flights Found</p>
            <p className="text-gray-500 text-sm">Try different dates or airports</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 font-bold">{filteredOffers.length} flight{filteredOffers.length > 1 ? "s" : ""} found</p>
            <AnimatePresence>
              {filteredOffers.map((offer, i) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Flight Info */}
                    <div className="flex-1 p-6">
                      {offer.slices?.map((slice, si) => (
                        <div key={si} className={`${si > 0 ? "mt-6 pt-6 border-t border-gray-100" : ""}`}>
                          <div className="flex items-center gap-2 mb-4">
                            {offer.owner.logoUrl ? (
                              <img src={offer.owner.logoUrl} alt={offer.owner.name} className="h-8 w-8 rounded-lg object-contain" />
                            ) : (
                              <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Plane className="h-4 w-4 text-primary" />
                              </div>
                            )}
                            <span className="text-sm font-bold text-gray-700">{offer.owner.name}</span>
                            {slice.segments?.[0]?.flightNumber && (
                              <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{slice.segments[0].flightNumber}</span>
                            )}
                          </div>

                          <div className="flex items-center gap-4 md:gap-8">
                            {/* Departure */}
                            <div className="text-center md:text-left">
                              <p className="text-2xl font-bold text-gray-900">{formatTime(slice.departureTime)}</p>
                              <p className="text-xs text-gray-400 font-bold">{slice.origin.iataCode}</p>
                              <p className="text-[10px] text-gray-400">{formatDate(slice.departureTime)}</p>
                            </div>

                            {/* Duration Bar */}
                            <div className="flex-1 flex flex-col items-center">
                              <p className="text-[10px] text-gray-400 font-bold mb-1">{formatDuration(slice.duration)}</p>
                              <div className="w-full flex items-center">
                                <div className="h-0.5 flex-1 bg-gray-200" />
                                <div className="mx-1">
                                  {slice.stops === 0 ? (
                                    <Plane className="h-3 w-3 text-primary" />
                                  ) : (
                                    <div className="flex items-center gap-1">
                                      <div className="h-2 w-2 rounded-full bg-amber-400 border border-white" />
                                    </div>
                                  )}
                                </div>
                                <div className="h-0.5 flex-1 bg-gray-200" />
                              </div>
                              <p className="text-[10px] text-gray-400 mt-1">
                                {slice.stops === 0 ? "Non-stop" : `${slice.stops} stop${slice.stops > 1 ? "s" : ""}`}
                              </p>
                            </div>

                            {/* Arrival */}
                            <div className="text-center md:text-right">
                              <p className="text-2xl font-bold text-gray-900">{formatTime(slice.arrivalTime)}</p>
                              <p className="text-xs text-gray-400 font-bold">{slice.destination.iataCode}</p>
                              <p className="text-[10px] text-gray-400">{formatDate(slice.arrivalTime)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price & Action */}
                    <div className="lg:w-52 border-t lg:border-t-0 lg:border-l border-gray-100 p-6 flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-4 bg-gray-50/50">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gray-900">
                          {offer.totalCurrency} {parseFloat(offer.totalAmount).toFixed(0)}
                        </p>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                          {offer.totalCurrency} / {offer.passengerCount > 1 ? "total" : "person"}
                        </p>
                        <div className="flex items-center gap-2 justify-center mt-2">
                          {offer.conditions.refundable && (
                            <span className="text-[9px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-bold">Refundable</span>
                          )}
                          {offer.conditions.changeable && (
                            <span className="text-[9px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-bold">Changeable</span>
                          )}
                        </div>
                      </div>
                      <Link href={`/flights/book/${offer.id}`}>
                        <Button className="rounded-full px-8 font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:scale-105">
                          Select
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FlightSearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-gray-500 font-bold">Loading search results...</p>
      </div>
    }>
      <FlightSearchContent />
    </Suspense>
  );
}
