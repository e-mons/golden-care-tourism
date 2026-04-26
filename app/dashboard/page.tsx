import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, Download, ChevronRight, User, Settings, LogOut, LayoutDashboard, Ticket, Globe, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch recent bookings
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
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <div className="space-y-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, <span className="text-primary italic">Traveler</span></h1>
          <p className="text-muted-foreground mt-2">Manage your luxury experiences and visa applications.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/tours">
            <Button className="rounded-full px-6">Explore New Tours</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content: Recent Bookings */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Ticket className="w-6 h-6 text-primary" />
              Recent Experiences
            </h2>
            <Link href="/dashboard/bookings" className="text-sm font-bold text-primary flex items-center gap-1 group">
              View all bookings
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid gap-6">
            {bookings && bookings.length > 0 ? (
              bookings.map((booking: any) => (
                <div key={booking.id} className="group relative bg-card/70 backdrop-blur-2xl border border-border/50 rounded-[2.5rem] overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-48 h-48 md:h-auto overflow-hidden">
                      <img 
                        src={booking.tour_slots?.tours?.image_urls?.[0] || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400"} 
                        alt={booking.tour_slots?.tours?.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {booking.tour_slots?.tours?.title || 'Luxury Experience'}
                          </h3>
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
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Amount Paid:</span>
                          <span className="font-bold text-lg text-foreground">AED {booking.total_amount}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="rounded-full gap-2">
                          <Download className="w-4 h-4" />
                          Invoice
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-card/70 backdrop-blur-2xl border border-dashed border-border/50 rounded-[2.5rem] p-12 text-center shadow-xl shadow-primary/5">
                <p className="text-muted-foreground mb-6">You haven't booked any experiences yet.</p>
                <Link href="/tours">
                  <Button variant="outline" className="rounded-full">Start Your Journey</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Visa Status & Account */}
        <div className="space-y-8">
          <div className="bg-primary rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
            <Globe className="absolute -top-4 -right-4 w-32 h-32 text-white/10" />
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
              <Clock className="w-5 h-5" />
              Visa Services
            </h3>
            <div className="space-y-4 relative z-10">
              <p className="text-white/70 text-sm leading-relaxed">
                No active visa applications found. Our AI-powered system can help you get your UAE visa in 24 hours.
              </p>
              <Link href="/visas" className="block">
                <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-full font-bold">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-card/70 backdrop-blur-2xl border border-border/50 rounded-[2.5rem] p-8 space-y-6 shadow-2xl shadow-primary/5">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <nav className="space-y-2">
              {[
                { label: "My Profile", icon: User, href: "/dashboard/profile" },
                { label: "Settings", icon: Settings, href: "/dashboard/settings" },
                { label: "Support", icon: ShieldCheck, href: "/support" },
              ].map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href}
                  className="flex items-center justify-between p-4 rounded-2xl hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-sm">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
