import { createClient } from "@/lib/supabase/server";
import { Ticket, MapPin, Calendar, ChevronRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default async function BookingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      id, 
      status, 
      total_amount, 
      created_at,
      tour_slots ( start_time, tours ( title, location, image_urls ) )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My <span className="text-primary italic">Bookings</span></h1>
        <p className="text-muted-foreground mt-2">Manage and track all your scheduled luxury experiences.</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search bookings..." className="pl-12 rounded-2xl h-14 bg-card/70 backdrop-blur-xl border-border/50 shadow-inner" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {["All", "Confirmed", "Pending", "Cancelled"].map((status) => (
            <Button key={status} variant={status === "All" ? "default" : "outline"} className="rounded-2xl px-6 h-14 font-bold whitespace-nowrap">
              {status}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {bookings && bookings.length > 0 ? (
          bookings.map((booking: any) => (
            <div key={booking.id} className="group bg-card/70 backdrop-blur-2xl border border-border/50 rounded-[2.5rem] overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden">
                  <img 
                    src={booking.tour_slots?.tours?.image_urls?.[0] || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600"} 
                    alt={booking.tour_slots?.tours?.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{booking.tour_slots?.tours?.title || 'Luxury Experience'}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" /> {booking.tour_slots?.tours?.location}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" /> {new Date(booking.tour_slots?.start_time).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Badge className={`rounded-full px-4 py-1 border-none font-bold uppercase tracking-widest text-[10px] ${
                      booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {booking.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-border/50">
                    <div>
                      <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest block mb-1">Booking ID:</span>
                      <span className="text-sm font-mono text-foreground">#{booking.id.split('-')[0].toUpperCase()}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest block mb-1">Price Paid:</span>
                      <span className="text-xl font-bold text-primary">AED {booking.total_amount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-card/70 backdrop-blur-2xl border border-dashed border-border/50 rounded-[2.5rem] p-20 text-center shadow-xl shadow-primary/5">
            <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-20" />
            <h3 className="text-xl font-bold mb-2">No bookings yet</h3>
            <p className="text-muted-foreground mb-8">Start exploring our luxury UAE tours and experiences.</p>
            <Link href="/tours">
              <Button className="rounded-2xl px-8 h-14 bg-primary text-white font-bold">Start Your Journey</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
