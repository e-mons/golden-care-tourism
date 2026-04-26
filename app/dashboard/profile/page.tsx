import { createClient } from "@/lib/supabase/server";
import { User, Mail, Phone, MapPin, Shield, Calendar, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile <span className="text-primary italic">Details</span></h1>
          <p className="text-muted-foreground mt-2">Manage your personal information and preferences.</p>
        </div>
        <Button className="rounded-2xl px-6 h-12 gap-2 font-bold shadow-lg shadow-primary/20">
          <Edit2 className="h-4 w-4" /> Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-card/70 backdrop-blur-2xl border border-border/50 rounded-[2.5rem] p-8 text-center relative overflow-hidden shadow-2xl shadow-primary/5">
            <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
            <div className="h-24 w-24 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-bold mb-1">{profile?.full_name || 'Valued Traveler'}</h2>
            <p className="text-sm text-muted-foreground mb-6">{user.email}</p>
            
            <div className="flex justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">Verified</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">VIP Member</span>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border/50 text-left space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Joined {new Date(user.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Level 1 Security</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Info */}
        <div className="lg:col-span-2">
          <div className="bg-card/70 backdrop-blur-2xl border border-border/50 rounded-[2.5rem] p-8 space-y-8 shadow-2xl shadow-primary/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Full Name</Label>
                <div className="p-4 rounded-2xl bg-background/50 border border-border/50 font-medium">
                  {profile?.full_name || 'Not provided'}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Email Address</Label>
                <div className="p-4 rounded-2xl bg-background/50 border border-border/50 font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  {user.email}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Phone Number</Label>
                <div className="p-4 rounded-2xl bg-background/50 border border-border/50 font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  {profile?.phone || 'Not provided'}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Location</Label>
                <div className="p-4 rounded-2xl bg-background/50 border border-border/50 font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {profile?.location || 'Not provided'}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border/50">
              <h3 className="text-lg font-bold mb-4">Account Security</h3>
              <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                  </div>
                </div>
                <Button variant="outline" className="rounded-2xl font-bold w-full sm:w-auto h-12">Enable</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
