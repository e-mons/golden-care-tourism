"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Calendar as CalendarIcon, Clock, ShieldCheck, ArrowRight, Zap } from "lucide-react";
import { createCheckoutSession } from "@/app/actions/checkout";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingWidget({ tour, slots, addons }: any) {
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");
  const [guestsCount, setGuestsCount] = useState<string>("1");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedSlot = useMemo(() => slots.find((s: any) => s.id === selectedSlotId), [selectedSlotId, slots]);
  
  const basePrice = Number(tour.base_price);
  const priceModifier = selectedSlot ? Number(selectedSlot.price_modifier) : 0;
  const currentTourPrice = basePrice + priceModifier;
  
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = addons.find((a: any) => a.id === addonId);
    return sum + (addon ? Number(addon.price) : 0);
  }, 0);

  const totalAmount = (currentTourPrice * Number(guestsCount)) + addonsTotal;

  const handleCheckout = async () => {
    if (!selectedSlotId) return;
    setIsSubmitting(true);
    
    try {
      const url = await createCheckoutSession({
        tourId: tour.id,
        slotId: selectedSlotId,
        guestsCount: Number(guestsCount),
        addonIds: selectedAddons,
        totalAmount
      });
      if (url) {
        window.location.href = url;
      }
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card/70 backdrop-blur-2xl border border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/5"
    >
      <div className="bg-primary p-8 text-white">
        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Total Price</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold">AED {totalAmount.toFixed(2)}</span>
          <span className="text-white/60 text-sm">All taxes included</span>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Slot Selection */}
        <div className="space-y-4">
          <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-primary" />
            Select Date & Time
          </Label>
          <Select value={selectedSlotId} onValueChange={(v) => setSelectedSlotId(v ?? "")}>
            <SelectTrigger className="h-14 bg-background/50 border-border/50 rounded-2xl focus:ring-primary">
              <SelectValue placeholder="Choose a timeslot" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-border/50">
              {slots.length === 0 && <SelectItem value="none" disabled>No availability</SelectItem>}
              {slots.map((slot: any) => {
                const date = new Date(slot.start_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                const time = new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const modifierText = slot.price_modifier > 0 ? ` (+AED ${slot.price_modifier})` : "";
                return (
                  <SelectItem key={slot.id} value={slot.id} className="py-3">
                    {date} at {time} {modifierText}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Guests Count */}
        <div className="space-y-4">
          <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Number of Guests
          </Label>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setGuestsCount(num.toString())}
                className={`h-12 rounded-xl border font-bold transition-all ${
                  guestsCount === num.toString() 
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                    : 'border-border/50 hover:border-primary/50 text-muted-foreground'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Addons */}
        {addons && addons.length > 0 && (
          <div className="space-y-4">
            <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Popular Add-ons
            </Label>
            <div className="space-y-3">
              {addons.map((addon: any) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all ${
                      isSelected 
                        ? 'border-primary bg-primary/5 shadow-inner' 
                        : 'border-border/50 hover:border-primary/30 bg-muted/20'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm">{addon.title}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight mt-0.5">AED {addon.price}</p>
                    </div>
                    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-primary border-primary text-white' : 'border-border'
                    }`}>
                      {isSelected && <ArrowRight className="w-3 h-3 rotate-[-45deg]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-border/50 space-y-4">
          <Button 
            className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/10 group overflow-hidden relative" 
            disabled={!selectedSlotId || isSubmitting}
            onClick={handleCheckout}
          >
            <span className="relative z-10 flex items-center gap-2">
              {isSubmitting ? "Processing..." : "Reserve Your Spot"}
              {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </span>
          </Button>
          
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Secure Payment
            </div>
            <div className="h-1 w-1 rounded-full bg-border" />
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Instant Booking
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
