import { NextResponse } from "next/server";
import duffel, { applyMarkup } from "@/lib/duffel";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!process.env.DUFFEL_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: "Flight service not configured." },
        { status: 503 }
      );
    }

    const offer = await duffel.offers.get(id);
    const o = offer.data as any;

    return NextResponse.json({
      id: o.id,
      totalAmount: applyMarkup(o.total_amount),
      totalCurrency: o.total_currency,
      owner: {
        name: o.owner?.name || "Airline",
        logoUrl: o.owner?.logo_symbol_url || o.owner?.logo_lockup_url || null,
        iataCode: o.owner?.iata_code || "",
      },
      slices: o.slices?.map((slice: any) => ({
        origin: {
          name: slice.origin?.name || "",
          iataCode: slice.origin?.iata_code || "",
          city: slice.origin?.city_name || "",
        },
        destination: {
          name: slice.destination?.name || "",
          iataCode: slice.destination?.iata_code || "",
          city: slice.destination?.city_name || "",
        },
        departureTime: slice.segments?.[0]?.departing_at || "",
        arrivalTime: slice.segments?.[slice.segments.length - 1]?.arriving_at || "",
        duration: slice.duration || "",
        stops: (slice.segments?.length || 1) - 1,
        segments: slice.segments?.map((seg: any) => ({
          airline: seg.marketing_carrier?.name || "",
          airlineLogo: seg.marketing_carrier?.logo_symbol_url || "",
          flightNumber: `${seg.marketing_carrier?.iata_code || ""}${seg.marketing_carrier_flight_number || ""}`,
          origin: seg.origin?.iata_code || "",
          destination: seg.destination?.iata_code || "",
          departureTime: seg.departing_at || "",
          arrivalTime: seg.arriving_at || "",
          duration: seg.duration || "",
          cabinClass: seg.passengers?.[0]?.cabin_class_marketing_name || "",
        })),
      })),
      passengers: o.passengers?.map((p: any) => ({
        id: p.id,
        type: p.type,
      })),
      conditions: {
        refundable: o.conditions?.refund_before_departure?.allowed || false,
        changeable: o.conditions?.change_before_departure?.allowed || false,
      },
      expiresAt: o.expires_at,
      paymentRequirements: o.payment_requirements,
    });
  } catch (error: any) {
    console.error("Offer fetch error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch offer details." },
      { status: 500 }
    );
  }
}
