import { createClient } from "@/lib/supabase/server";
import { Plane, ArrowRight, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import Link from "next/link";

const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
  confirmed: { color: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle, label: "Confirmed" },
  completed: { color: "bg-blue-50 text-blue-700 border-blue-200", icon: CheckCircle, label: "Completed" },
  cancelled: { color: "bg-red-50 text-red-700 border-red-200", icon: XCircle, label: "Cancelled" },
  pending: { color: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock, label: "Pending" },
};

export default async function DashboardFlightsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: flights } = await supabase
    .from("flight_bookings")
    .select("*")
    .eq("user_id", user?.id || "")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900" style={{ fontFamily: "var(--font-playfair), serif" }}>
            My Flights
          </h1>
          <p className="text-gray-500 text-sm mt-1">View and manage your flight bookings</p>
        </div>
        <Link href="/flights" className="hidden sm:inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <Plane className="h-4 w-4" /> Book Flight
        </Link>
      </div>

      {!flights || flights.length === 0 ? (
        <div className="bg-white rounded-[2rem] border border-gray-100 p-12 text-center shadow-sm">
          <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plane className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="font-bold text-gray-700 mb-2">No Flights Yet</h3>
          <p className="text-gray-400 text-sm mb-6">Book your first flight and it will appear here</p>
          <Link href="/flights" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold text-sm">
            <Plane className="h-4 w-4" /> Search Flights
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {flights.map((flight: any) => {
            const status = statusConfig[flight.status] || statusConfig.pending;
            const StatusIcon = status.icon;
            return (
              <div key={flight.id} className="bg-white rounded-[1.5rem] border border-gray-100 p-5 md:p-6 shadow-sm hover:shadow-lg transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {flight.airline_logo ? (
                      <img src={flight.airline_logo} alt="" className="h-10 w-10 rounded-xl object-contain bg-gray-50 p-1" />
                    ) : (
                      <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Plane className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">{flight.origin_iata}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <span className="font-bold text-gray-900">{flight.destination_iata}</span>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${status.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="font-medium">{flight.airline_name || "Airline"}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(flight.departure_date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                        <span>•</span>
                        <span>{flight.passengers_count} pax</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right sm:text-right">
                    <p className="text-xl font-bold text-gray-900">${parseFloat(flight.total_amount).toFixed(0)}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">{flight.currency}</p>
                    {flight.booking_reference && (
                      <p className="text-[10px] text-primary font-mono font-bold mt-1">Ref: {flight.booking_reference}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mobile FAB */}
      <Link href="/flights" className="sm:hidden fixed bottom-20 right-4 z-40 bg-primary text-white h-14 w-14 rounded-full flex items-center justify-center shadow-xl shadow-primary/30">
        <Plane className="h-6 w-6" />
      </Link>
    </div>
  );
}
