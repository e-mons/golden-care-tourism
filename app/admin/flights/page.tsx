import { createClient } from "@/lib/supabase/server";
import { Plane, ArrowRight, Calendar, CheckCircle, XCircle, Clock, DollarSign, Users, TrendingUp } from "lucide-react";
import { updateFlightBookingStatus, cancelFlightBooking } from "@/app/actions/flights";

const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
  confirmed: { color: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle, label: "Confirmed" },
  completed: { color: "bg-blue-50 text-blue-700 border-blue-200", icon: CheckCircle, label: "Completed" },
  cancelled: { color: "bg-red-50 text-red-700 border-red-200", icon: XCircle, label: "Cancelled" },
  pending: { color: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock, label: "Pending" },
};

export default async function AdminFlightsPage() {
  const supabase = await createClient();

  const { data: flights } = await supabase
    .from("flight_bookings")
    .select("*, profiles:user_id(email)")
    .order("created_at", { ascending: false });

  const totalRevenue = flights?.reduce((sum: number, f: any) => f.status !== "cancelled" ? sum + parseFloat(f.total_amount || 0) : sum, 0) || 0;
  const confirmedCount = flights?.filter((f: any) => f.status === "confirmed").length || 0;
  const totalPassengers = flights?.reduce((sum: number, f: any) => sum + (f.passengers_count || 0), 0) || 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900" style={{ fontFamily: "var(--font-playfair), serif" }}>
          Flight Bookings
        </h1>
        <p className="text-gray-500 text-sm mt-1">Manage all customer flight bookings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Plane className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{flights?.length || 0}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Confirmed</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{confirmedCount}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Passengers</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalPassengers}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Revenue</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(0)}</p>
        </div>
      </div>

      {/* Bookings List */}
      {!flights || flights.length === 0 ? (
        <div className="bg-white rounded-[2rem] border border-gray-100 p-12 text-center shadow-sm">
          <Plane className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-bold text-gray-600 mb-2">No Flight Bookings Yet</h3>
          <p className="text-gray-400 text-sm">Flight bookings will appear here when customers book flights.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Ref</th>
                  <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Customer</th>
                  <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Route</th>
                  <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Date</th>
                  <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Airline</th>
                  <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Amount</th>
                  <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Status</th>
                  <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight: any) => {
                  const status = statusConfig[flight.status] || statusConfig.pending;
                  const StatusIcon = status.icon;
                  const profile = flight.profiles as any;
                  return (
                    <tr key={flight.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-xs text-primary">{flight.booking_reference || "—"}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-xs">{profile?.email || "—"}</td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-800">{flight.origin_iata}</span>
                        <ArrowRight className="h-3 w-3 text-gray-400 inline mx-1" />
                        <span className="font-bold text-gray-800">{flight.destination_iata}</span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        {new Date(flight.departure_date).toLocaleDateString("en-US", { day: "numeric", month: "short" })}
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-600">{flight.airline_name || "—"}</td>
                      <td className="px-6 py-4 font-bold text-gray-800">${parseFloat(flight.total_amount).toFixed(0)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${status.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {flight.status !== "completed" && flight.status !== "cancelled" && (
                            <form action={async () => {
                              "use server";
                              await updateFlightBookingStatus(flight.id, "completed");
                            }}>
                              <button type="submit" className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
                                Complete
                              </button>
                            </form>
                          )}
                          {flight.status !== "cancelled" && (
                            <form action={async () => {
                              "use server";
                              await cancelFlightBooking(flight.id);
                            }}>
                              <button type="submit" className="text-[10px] font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full hover:bg-red-100 transition-colors">
                                Cancel
                              </button>
                            </form>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-50">
            {flights.map((flight: any) => {
              const status = statusConfig[flight.status] || statusConfig.pending;
              const StatusIcon = status.icon;
              return (
                <div key={flight.id} className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{flight.origin_iata}</span>
                      <ArrowRight className="h-3 w-3 text-gray-400" />
                      <span className="font-bold text-gray-900">{flight.destination_iata}</span>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${status.color}`}>
                      <StatusIcon className="h-3 w-3" /> {status.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <span>{flight.airline_name}</span>
                    <span className="font-mono text-primary font-bold">{flight.booking_reference}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{new Date(flight.departure_date).toLocaleDateString()}</span>
                    <span className="text-lg font-bold text-gray-900">${parseFloat(flight.total_amount).toFixed(0)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
