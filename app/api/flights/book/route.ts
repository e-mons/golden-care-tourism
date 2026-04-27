import { NextResponse } from "next/server";
import duffel, { applyMarkup } from "@/lib/duffel";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { offerId, passengers } = body;

    if (!offerId || !passengers || passengers.length === 0) {
      return NextResponse.json(
        { error: "Offer ID and passenger details are required." },
        { status: 400 }
      );
    }

    if (!process.env.DUFFEL_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: "Flight booking service not configured." },
        { status: 503 }
      );
    }

    // Get the offer details first to extract info for our DB
    const offerData = await duffel.offers.get(offerId);
    const offer = offerData.data as any;

    // Map passenger IDs from offer to provided details
    const mappedPassengers = offer.passengers?.map((p: any, index: number) => ({
      id: p.id,
      given_name: passengers[index]?.givenName || passengers[0]?.givenName,
      family_name: passengers[index]?.familyName || passengers[0]?.familyName,
      born_on: passengers[index]?.bornOn || passengers[0]?.bornOn,
      email: passengers[index]?.email || passengers[0]?.email,
      phone_number: passengers[index]?.phone || passengers[0]?.phone,
      gender: passengers[index]?.gender || "m",
      title: passengers[index]?.title || "mr",
    }));

    // Create the order with Duffel (using Duffel's payment)
    const order = await duffel.orders.create({
      type: "instant",
      selected_offers: [offerId],
      passengers: mappedPassengers,
      payments: [
        {
          type: "balance",
          amount: offer.total_amount,
          currency: offer.total_currency,
        },
      ],
    });

    const orderData = order.data as any;

    // Extract flight info for our database
    const firstSlice = offer.slices?.[0];
    const lastSlice = offer.slices?.[offer.slices.length - 1];
    const originSeg = firstSlice?.segments?.[0];
    const destSeg = firstSlice?.segments?.[firstSlice.segments.length - 1];

    // Save to Supabase
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const bookingData = {
      user_id: user?.id || null,
      duffel_order_id: orderData.id,
      booking_reference: orderData.booking_reference || orderData.id.slice(0, 8).toUpperCase(),
      status: "confirmed",
      origin_city: firstSlice?.origin?.city_name || originSeg?.origin?.city_name || "",
      origin_iata: firstSlice?.origin?.iata_code || originSeg?.origin?.iata_code || "",
      destination_city: firstSlice?.destination?.city_name || destSeg?.destination?.city_name || "",
      destination_iata: firstSlice?.destination?.iata_code || destSeg?.destination?.iata_code || "",
      departure_date: originSeg?.departing_at || "",
      return_date: offer.slices?.length > 1 ? offer.slices[1]?.segments?.[0]?.departing_at : null,
      trip_type: offer.slices?.length > 1 ? "round_trip" : "one_way",
      passengers_count: passengers.length,
      cabin_class: originSeg?.passengers?.[0]?.cabin_class_marketing_name || "economy",
      airline_name: offer.owner?.name || "",
      airline_logo: offer.owner?.logo_symbol_url || "",
      total_amount: parseFloat(applyMarkup(offer.total_amount)),
      currency: offer.total_currency || "USD",
      passenger_details: passengers,
      raw_order_data: orderData,
    };

    const { data: booking, error: dbError } = await supabase
      .from("flight_bookings")
      .insert(bookingData)
      .select()
      .single();

    if (dbError) {
      console.error("DB save error:", dbError);
      // Still return success since the Duffel order was created
    }

    return NextResponse.json({
      success: true,
      bookingReference: bookingData.booking_reference,
      orderId: orderData.id,
      bookingId: booking?.id,
      totalAmount: bookingData.total_amount,
      currency: bookingData.currency,
      airline: bookingData.airline_name,
      route: `${bookingData.origin_iata} → ${bookingData.destination_iata}`,
    });
  } catch (error: any) {
    console.error("Flight booking error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create booking." },
      { status: 500 }
    );
  }
}
