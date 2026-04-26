import { createClient } from "@/lib/supabase/server";
import { Settings, Bell, Lock, Globe, CreditCard, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const settingsGroups = [
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { label: "Email Notifications", desc: "Receive updates about your bookings and visa status.", checked: true },
        { label: "Marketing Emails", desc: "Get special offers and luxury travel inspiration.", checked: false },
        { label: "Security Alerts", desc: "Get notified about new logins and account changes.", checked: true },
      ]
    },
    {
      title: "Privacy & Security",
      icon: Lock,
      items: [
        { label: "Public Profile", desc: "Allow others to see your travel reviews and photos.", checked: false },
        { label: "Data Sharing", desc: "Share your preferences with our premium tour partners.", checked: true },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account <span className="text-primary italic">Settings</span></h1>
        <p className="text-muted-foreground mt-2">Customize your experience and manage your preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Settings Navigation */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-[2rem] p-4">
            {[
              { label: "General", icon: Settings, active: true },
              { label: "Billing", icon: CreditCard, active: false },
              { label: "Language", icon: Globe, active: false },
              { label: "Safety", icon: ShieldCheck, active: false },
            ].map((item) => (
              <button 
                key={item.label}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  item.active ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-primary/5 text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-bold text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-8">
          {settingsGroups.map((group, idx) => (
            <div key={idx} className="bg-card/50 backdrop-blur-md border border-border/50 rounded-[2rem] p-8 space-y-8">
              <div className="flex items-center gap-3 pb-6 border-b border-border/50">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <group.icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold">{group.title}</h2>
              </div>
              
              <div className="space-y-6">
                {group.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-6">
                    <div className="space-y-1">
                      <Label className="text-sm font-bold">{item.label}</Label>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.checked} className="data-[state=checked]:bg-primary" />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-red-500/5 border border-red-500/20 rounded-[2rem] p-8 flex items-center justify-between group cursor-pointer hover:bg-red-500/10 transition-colors">
            <div>
              <h3 className="text-lg font-bold text-red-500">Delete Account</h3>
              <p className="text-sm text-red-500/70">Permanently remove your account and all associated data.</p>
            </div>
            <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-transparent p-0">
              <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
