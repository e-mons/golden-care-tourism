"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Ticket, Plane, FileText, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface DashboardNavProps {
  user: {
    email?: string;
  };
}

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Bookings", href: "/dashboard/bookings", icon: Ticket },
    { name: "Flights", href: "/dashboard/flights", icon: Plane },
    { name: "Visas", href: "/dashboard/visas", icon: FileText },
    { name: "Profile", href: "/dashboard/profile", icon: User },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col space-y-6">
        <div className="bg-card/70 backdrop-blur-2xl border border-border/50 rounded-[2rem] p-6 shadow-2xl shadow-primary/5">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner border border-primary/20">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-sm truncate max-w-[140px]">{user.email}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-0.5">Traveler</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-300",
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-muted-foreground")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <form action="/api/auth/signout" method="POST">
          <Button variant="outline" className="w-full h-14 rounded-2xl border-border/50 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors font-bold shadow-sm">
            <LogOut className="h-5 w-5 mr-2" /> Sign Out
          </Button>
        </form>
      </aside>

      {/* Mobile Bottom Navigation Bar (PWA Style) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-background/80 backdrop-blur-2xl border-t border-border/50 z-50 pb-safe">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={cn(
                  "flex flex-col items-center justify-center w-full py-1 gap-1 transition-all",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className={cn(
                  "p-1.5 rounded-xl transition-all",
                  isActive && "bg-primary/10"
                )}>
                  <item.icon className={cn("h-5 w-5", isActive && "fill-primary/20")} />
                </div>
                <span className={cn(
                  "text-[10px] font-bold",
                  isActive ? "opacity-100" : "opacity-70"
                )}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
