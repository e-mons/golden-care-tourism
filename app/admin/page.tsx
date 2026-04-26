import { createClient } from "@/lib/supabase/server";
import { Activity, CreditCard, Users, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Basic stats fetch
  const { count: bookingsCount } = await supabase.from("bookings").select("*", { count: "exact", head: true });
  const { count: visasCount } = await supabase.from("visa_applications").select("*", { count: "exact", head: true }).eq("status", "pending");
  const { count: usersCount } = await supabase.from("profiles").select("*", { count: "exact", head: true });

  const stats = [
    { title: "Total Bookings", value: bookingsCount || 0, icon: CreditCard, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Pending Visas", value: visasCount || 0, icon: FileText, color: "text-orange-500", bg: "bg-orange-500/10" },
    { title: "Registered Users", value: usersCount || 0, icon: Users, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "System Health", value: "99.9%", icon: Activity, color: "text-primary", bg: "bg-primary/10" },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">System Overview</h1>
          <p className="text-muted-foreground text-lg">Monitor daily operations and platform metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card/70 backdrop-blur-2xl border border-border/50 shadow-2xl shadow-primary/5 rounded-[2.5rem] p-6 hover:shadow-primary/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-muted-foreground">{stat.title}</h3>
              <div className={`h-10 w-10 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <div className="text-4xl font-black">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card/70 backdrop-blur-2xl border border-border/50 shadow-2xl shadow-primary/5 rounded-[2.5rem] p-8">
          <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
          <div className="h-40 flex items-center justify-center border-2 border-dashed border-border/50 rounded-[2rem] bg-muted/20">
            <p className="text-sm text-muted-foreground font-medium">Activity logs will populate here.</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 backdrop-blur-2xl border border-orange-500/20 shadow-2xl shadow-orange-500/5 rounded-[2.5rem] p-8">
          <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400 flex items-center mb-6">
            <FileText className="h-6 w-6 mr-3" /> Action Required
          </h3>
          <p className="text-muted-foreground mb-8 text-lg">
            There are <strong className="text-foreground text-xl mx-1">{visasCount}</strong> pending visa applications requiring manual review and processing.
          </p>
          <Link 
            href="/admin/visas" 
            className="inline-flex items-center justify-center h-14 px-8 rounded-2xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 w-full sm:w-auto"
          >
            Review Visas <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
