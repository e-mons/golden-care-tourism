"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plane, Clock, ArrowRight, User, Mail, Phone, Calendar, Loader2, AlertCircle, Shield, CheckCircle } from "lucide-react";
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
  passengers: Array<{ id: string; type: string }>;
  conditions: { refundable: boolean; changeable: boolean };
}

interface PassengerForm {
  givenName: string;
  familyName: string;
  bornOn: string;
  email: string;
  phone: string;
  gender: string;
  title: string;
}

function formatTime(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function formatDuration(iso: string): string {
  const match = iso?.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return iso || "";
  return `${match[1] || "0"}h ${match[2] || "0"}m`;
}

export default function FlightBookPage() {
  const params = useParams();
  const router = useRouter();
  const offerId = params.offerId as string;

  const [offer, setOffer] = useState<FlightOffer | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passengers, setPassengers] = useState<PassengerForm[]>([{
    givenName: "", familyName: "", bornOn: "", email: "", phone: "", gender: "m", title: "mr",
  }]);

  const fetchOffer = useCallback(async () => {
    try {
      const res = await fetch(`/api/flights/offers/${offerId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setOffer(data);
      // Create passenger forms based on offer passengers count
      const pCount = data.passengers?.length || 1;
      setPassengers(Array.from({ length: pCount }, () => ({
        givenName: "", familyName: "", bornOn: "", email: "", phone: "", gender: "m", title: "mr",
      })));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [offerId]);

  useEffect(() => {
    fetchOffer();
  }, [fetchOffer]);

  const updatePassenger = (index: number, field: keyof PassengerForm, value: string) => {
    setPassengers(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
  };

  const isValid = passengers.every(p => p.givenName && p.familyName && p.bornOn && p.email);

  const handleBook = async () => {
    if (!isValid) return;
    setBooking(true);
    setError(null);
    try {
      const res = await fetch("/api/flights/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offerId, passengers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push(`/flights/confirmation?ref=${data.bookingReference}&amount=${data.totalAmount}&currency=${data.currency}&airline=${data.airline}&route=${data.route}`);
    } catch (err: any) {
      setError(err.message);
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-24">
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-bold">Loading flight details...</p>
        </div>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-24">
        <div className="text-center">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700 font-bold mb-2">Flight Not Found</p>
          <p className="text-gray-500 text-sm mb-4">{error || "This offer may have expired."}</p>
          <Button onClick={() => router.push("/flights")} className="rounded-full">
            Search Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Complete Your Booking
            </h1>
            <p className="text-gray-500">Fill in passenger details to confirm your flight</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left — Passenger Form */}
            <div className="lg:col-span-2 space-y-6">
              {passengers.map((p, pi) => (
                <div key={pi} className="bg-white rounded-[2rem] border border-gray-100 p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">Passenger {pi + 1}</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Title</label>
                      <select value={p.title} onChange={(e) => updatePassenger(pi, "title", e.target.value)}
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all">
                        <option value="mr">Mr</option>
                        <option value="ms">Ms</option>
                        <option value="mrs">Mrs</option>
                      </select>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Gender</label>
                      <select value={p.gender} onChange={(e) => updatePassenger(pi, "gender", e.target.value)}
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all">
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">First Name *</label>
                      <input type="text" value={p.givenName} onChange={(e) => updatePassenger(pi, "givenName", e.target.value)} placeholder="As on passport"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-400" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Last Name *</label>
                      <input type="text" value={p.familyName} onChange={(e) => updatePassenger(pi, "familyName", e.target.value)} placeholder="As on passport"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-400" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                        <Calendar className="h-3 w-3" /> Date of Birth *
                      </label>
                      <input type="date" value={p.bornOn} onChange={(e) => updatePassenger(pi, "bornOn", e.target.value)}
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                        <Mail className="h-3 w-3" /> Email *
                      </label>
                      <input type="email" value={p.email} onChange={(e) => updatePassenger(pi, "email", e.target.value)} placeholder="email@example.com"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-400" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                        <Phone className="h-3 w-3" /> Phone (optional)
                      </label>
                      <input type="tel" value={p.phone} onChange={(e) => updatePassenger(pi, "phone", e.target.value)} placeholder="+971 50 123 4567"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}

              {error && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}

              <Button onClick={handleBook} disabled={!isValid || booking}
                className="w-full h-16 rounded-2xl text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all disabled:opacity-50">
                {booking ? (
                  <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Processing Booking...</>
                ) : (
                  <><Shield className="h-5 w-5 mr-2" /> Confirm & Pay {offer.totalCurrency} {parseFloat(offer.totalAmount).toFixed(2)}</>
                )}
              </Button>

              <p className="text-center text-xs text-gray-400">
                <Shield className="h-3 w-3 inline mr-1" />
                Your payment is secure and encrypted. By booking you agree to our terms.
              </p>
            </div>

            {/* Right — Flight Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm sticky top-28">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Plane className="h-4 w-4 text-primary" /> Flight Summary
                </h3>

                {offer.slices?.map((slice, si) => (
                  <div key={si} className={`${si > 0 ? "mt-4 pt-4 border-t border-gray-100" : ""}`}>
                    <div className="flex items-center gap-2 mb-3">
                      {offer.owner.logoUrl ? (
                        <img src={offer.owner.logoUrl} alt="" className="h-6 w-6 rounded object-contain" />
                      ) : (
                        <div className="h-6 w-6 bg-primary/10 rounded flex items-center justify-center">
                          <Plane className="h-3 w-3 text-primary" />
                        </div>
                      )}
                      <span className="text-xs font-bold text-gray-600">{offer.owner.name}</span>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-lg font-bold text-gray-900">{formatTime(slice.departureTime)}</p>
                        <p className="text-xs text-gray-400 font-bold">{slice.origin.iataCode}</p>
                      </div>
                      <div className="flex-1 mx-4 text-center">
                        <p className="text-[10px] text-gray-400">{formatDuration(slice.duration)}</p>
                        <div className="h-px bg-gray-200 my-1" />
                        <p className="text-[10px] text-gray-400">{slice.stops === 0 ? "Non-stop" : `${slice.stops} stop`}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{formatTime(slice.arrivalTime)}</p>
                        <p className="text-xs text-gray-400 font-bold">{slice.destination.iataCode}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Passengers</span>
                    <span className="text-sm font-bold text-gray-700">{passengers.length}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Cabin</span>
                    <span className="text-sm font-bold text-gray-700 capitalize">
                      {offer.slices?.[0]?.segments?.[0]?.cabinClass?.replace(/_/g, " ") || "Economy"}
                    </span>
                  </div>
                  {offer.conditions.refundable && (
                    <div className="flex items-center gap-1 mb-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600 font-bold">Refundable</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-primary">{offer.totalCurrency} {parseFloat(offer.totalAmount).toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 text-right">{offer.totalCurrency} · Taxes included</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
