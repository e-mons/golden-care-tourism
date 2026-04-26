import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, DollarSign, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AffiliateDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Mocked stats since we are scaffolding
  const stats = [
    { title: "Total Earnings", value: "AED 1,245.00", icon: DollarSign, color: "text-green-500" },
    { title: "Referral Clicks", value: "342", icon: TrendingUp, color: "text-blue-500" },
    { title: "Conversions", value: "18", icon: Users, color: "text-orange-500" },
    { title: "Conversion Rate", value: "5.2%", icon: Link2, color: "text-primary" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Partner Performance</h1>
        <p className="text-muted-foreground">Track your referral links, conversions, and earnings in real-time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-border/50 shadow-sm bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50 shadow-sm bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Share this unique link on your website or social media to start earning 10% commission on all completed bookings.</p>
            <div className="flex gap-2">
              <code className="flex-1 bg-muted/50 p-3 rounded-lg text-sm font-mono border border-border/50 truncate">
                https://goldencare.ae/?ref=partner_{user.id.substring(0,8)}
              </code>
              <Button>Copy Link</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Recent Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No recent conversions to display.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
