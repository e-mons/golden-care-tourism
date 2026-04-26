import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LayoutDashboard, Ticket, FileText, User, LogOut } from "lucide-react";
import Link from "next/link";
import { signout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

import { DashboardNav } from "@/components/dashboard-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check if they are admin, maybe redirect to admin dashboard instead?
  // Let's check role in profile
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role === "admin") {
    redirect("/admin");
  }

  return (
    <div className="container mx-auto px-4 md:px-12 py-6 md:py-8 flex flex-col md:flex-row gap-8 min-h-[calc(100vh-80px)]">
      {/* Client-side Navigation */}
      <DashboardNav user={{ email: user.email || undefined }} />

      {/* Main Content */}
      <main className="flex-1 pb-24 md:pb-0">
        {children}
      </main>
    </div>
  );
}
