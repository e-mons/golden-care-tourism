import { NextResponse } from "next/server";
import duffel, { applyMarkup } from "@/lib/duffel";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      origin,
      destination,
      departureDate,
      returnDate,
      passengers = 1,
      cabinClass = "economy",
    } = body;

    if (!origin || !destination || !departureDate) {
      return NextResponse.json(
        { error: "Origin, destination, and departure date are required." },
        { status: 400 }
      );
    }

    if (!process.env.DUFFEL_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: "Flight search is not configured. Please add DUFFEL_ACCESS_TOKEN." },
        { status: 503 }
      );
    }

    // Build slices
    const slices: any[] = [
      {
        origin,
        destination,
        departure_date: departureDate,
      },
    ];

    // Add return slice for round trips
    if (returnDate) {
      slices.push({
        origin: destination,
        destination: origin,
        departure_date: returnDate,
      });
    }

    // Build passengers array
    const passengersList = Array.from({ length: passengers }, () => ({
      type: "adult" as const,
    }));

    // Create offer request (search)
    const offerRequest = await duffel.offerRequests.create({
      slices,
      passengers: passengersList,
      cabin_class: cabinClass,
      return_offers: false,
      selected_currency: "AED",
    });

    // List offers for this request
    const offersResponse = await duffel.offers.list({
      offer_request_id: offerRequest.data.id,
      sort: "total_amount",
      limit: 30,
    });

    // Transform offers for frontend consumption with markup
    const offers = offersResponse.data.map((offer: any) => ({
      id: offer.id,
      totalAmount: applyMarkup(offer.total_amount),
      totalCurrency: offer.total_currency,
      baseAmount: offer.base_amount,
      taxAmount: offer.tax_amount,
      owner: {
        name: offer.owner?.name || "Airline",
        logoUrl: offer.owner?.logo_symbol_url || offer.owner?.logo_lockup_url || null,
        iataCode: offer.owner?.iata_code || "",
      },
      slices: offer.slices?.map((slice: any) => ({
        origin: {
          name: slice.origin?.name || slice.origin?.city_name || origin,
          iataCode: slice.origin?.iata_code || origin,
          city: slice.origin?.city_name || "",
        },
        destination: {
          name: slice.destination?.name || slice.destination?.city_name || destination,
          iataCode: slice.destination?.iata_code || destination,
          city: slice.destination?.city_name || "",
        },
        departureTime: slice.segments?.[0]?.departing_at || "",
        arrivalTime: slice.segments?.[slice.segments.length - 1]?.arriving_at || "",
        duration: slice.duration || "",
        stops: (slice.segments?.length || 1) - 1,
        segments: slice.segments?.map((seg: any) => ({
          airline: seg.marketing_carrier?.name || seg.operating_carrier?.name || "",
          airlineLogo: seg.marketing_carrier?.logo_symbol_url || "",
          flightNumber: `${seg.marketing_carrier?.iata_code || ""}${seg.marketing_carrier_flight_number || ""}`,
          aircraft: seg.aircraft?.name || "",
          origin: seg.origin?.iata_code || "",
          destination: seg.destination?.iata_code || "",
          departureTime: seg.departing_at || "",
          arrivalTime: seg.arriving_at || "",
          duration: seg.duration || "",
          cabinClass: seg.passengers?.[0]?.cabin_class_marketing_name || cabinClass,
        })),
      })),
      conditions: {
        refundable: offer.conditions?.refund_before_departure?.allowed || false,
        changeable: offer.conditions?.change_before_departure?.allowed || false,
      },
      passengerCount: passengers,
      expiresAt: offer.expires_at,
    }));

    return NextResponse.json({
      offers,
      offerRequestId: offerRequest.data.id,
      totalOffers: offers.length,
    });
  } catch (error: any) {
    console.error("Flight search error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to search flights." },
      { status: 500 }
    );
  }
}
