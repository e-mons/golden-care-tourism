import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Enforce admin role
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  
  if (profile?.role !== "admin") {
    redirect("/dashboard"); // Kick normal users out
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] overflow-hidden bg-muted/20">
      <div className="hidden md:block p-6">
        <AdminNav user={{ email: user.email }} />
      </div>

      {/* Mobile Nav (AdminNav will handle the hidden md:flex) */}
      <div className="md:hidden">
        <AdminNav user={{ email: user.email }} />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
