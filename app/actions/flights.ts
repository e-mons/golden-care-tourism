"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateFlightBookingStatus(
  bookingId: string,
  newStatus: string
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("flight_bookings")
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq("id", bookingId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/flights");
  revalidatePath("/dashboard/flights");
}

export async function cancelFlightBooking(bookingId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("flight_bookings")
    .update({ status: "cancelled", updated_at: new Date().toISOString() })
    .eq("id", bookingId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/flights");
  revalidatePath("/dashboard/flights");
}
