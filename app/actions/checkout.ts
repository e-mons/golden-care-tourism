"use server";

import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

export async function createCheckoutSession({ tourId, slotId, guestsCount, addonIds, totalAmount }: any) {
  const supabase = await createClient();
  
  // Create a pending booking in DB
  const { data: user } = await supabase.auth.getUser();
  
  const { data: booking, error } = await supabase
    .from("bookings")
    .insert({
      user_id: user?.user?.id || null, // Allow guest checkout initially
      tour_slot_id: slotId,
      total_amount: totalAmount,
      status: "pending",
      guests_count: guestsCount
    })
    .select()
    .single();

  if (error || !booking) {
    throw new Error("Failed to create booking");
  }

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd", // Modify to AED if required, assuming USD for now
          product_data: {
            name: `Tour Booking #${booking.id.split('-')[0]}`,
          },
          unit_amount: Math.round(totalAmount * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&booking_id=${booking.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tours/${tourId}?canceled=true`,
    metadata: {
      booking_id: booking.id,
      tour_id: tourId,
    }
  });

  // Update booking with stripe session ID
  await supabase
    .from("bookings")
    .update({ stripe_session_id: session.id })
    .eq("id", booking.id);

  return session.url;
}
