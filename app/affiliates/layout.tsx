import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Link2, DollarSign, Users, BarChart3, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { signout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export default async function AffiliateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Enforce affiliate role
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  
  if (profile?.role !== "affiliate" && profile?.role !== "admin") {
    redirect("/dashboard"); // Kick normal users out
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 min-h-[calc(100vh-80px)]">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0 space-y-6">
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold text-lg">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-sm truncate max-w-[150px]">{user.email}</p>
              <p className="text-xs text-muted-foreground font-bold text-primary">Partner Portal</p>
            </div>
          </div>
          <nav className="space-y-2">
            <Link href="/affiliates" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium">
              <BarChart3 className="h-4 w-4" /> Performance
            </Link>
            <Link href="/affiliates/links" className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
              <Link2 className="h-4 w-4" /> Tracking Links
            </Link>
            <Link href="/affiliates/referrals" className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
              <Users className="h-4 w-4" /> Referrals
            </Link>
            <Link href="/affiliates/payouts" className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
              <DollarSign className="h-4 w-4" /> Payouts
            </Link>
            <Link href="/affiliates/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
              <Settings className="h-4 w-4" /> Settings
            </Link>
          </nav>
        </div>

        <form action={signout}>
          <Button variant="outline" className="w-full border-border/50 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors">
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
