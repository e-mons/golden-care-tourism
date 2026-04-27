"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Plane, Download, LayoutDashboard, ArrowRight, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function ConfirmationContent() {
  const params = useSearchParams();
  const ref = params.get("ref") || "—";
  const amount = params.get("amount") || "0";
  const currency = params.get("currency") || "USD";
  const airline = params.get("airline") || "Airline";
  const route = params.get("route") || "";

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 flex items-start justify-center">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          {/* Success Card */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-primary/5 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary via-cyan-500 to-blue-600 p-8 md:p-10 text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="h-20 w-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-white/30"
              >
                <CheckCircle className="h-10 w-10 text-white" />
              </motion.div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Booking Confirmed!
              </h1>
              <p className="text-white/80 text-sm">Your flight has been successfully booked</p>
            </div>

            {/* Details */}
            <div className="p-8 md:p-10">
              {/* Booking Reference */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-center">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Booking Reference</p>
                <p className="text-3xl font-bold text-gray-900 tracking-wider font-mono">{ref}</p>
              </div>

              {/* Flight Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <Plane className="h-4 w-4" /> Airline
                  </span>
                  <span className="text-sm font-bold text-gray-800">{airline}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" /> Route
                  </span>
                  <span className="text-sm font-bold text-gray-800">{route}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-gray-500">Total Paid</span>
                  <span className="text-xl font-bold text-primary">{currency} {parseFloat(amount).toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link href="/dashboard/flights" className="block">
                  <Button className="w-full h-14 rounded-2xl text-base font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                    <LayoutDashboard className="h-5 w-5 mr-2" />
                    View in Dashboard
                  </Button>
                </Link>
                <Link href="/flights" className="block">
                  <Button variant="outline" className="w-full h-14 rounded-2xl text-base font-bold border-gray-200">
                    <Plane className="h-5 w-5 mr-2" />
                    Book Another Flight
                  </Button>
                </Link>
              </div>

              {/* Support Info */}
              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400 mb-3">A confirmation email has been sent to your registered email</p>
                <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> support@goldencare.ae</span>
                  <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> +971 4 123 4567</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function FlightConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-24">
        <div className="text-center">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-bold">Loading confirmation...</p>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
