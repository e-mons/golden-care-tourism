"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Plane, Users, FileCheck, Map, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface AdminNavProps {
  user: {
    email?: string;
  };
}

export function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Flights", href: "/admin/flights", icon: Plane },
    { name: "Bookings", href: "/admin/bookings", icon: Map },
    { name: "Visas", href: "/admin/visas", icon: FileCheck },
    { name: "Customers", href: "/admin/users", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 shrink-0 flex-col space-y-6">
        <div className="bg-card/70 backdrop-blur-2xl border border-border/50 rounded-[2.5rem] p-6 shadow-2xl shadow-primary/5 h-full flex flex-col">
          <div className="flex items-center gap-4 mb-8 p-2">
            <div className="h-14 w-14 bg-primary text-primary-foreground rounded-[1.25rem] flex items-center justify-center font-bold text-2xl shadow-lg shadow-primary/20">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-base truncate max-w-[160px]">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Admin</p>
              </div>
            </div>
          </div>
          
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={cn(
                    "flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all duration-300",
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
          
          <div className="pt-6 border-t border-border/50 mt-auto">
            <form action="/api/auth/signout" method="POST">
              <Button variant="outline" className="w-full h-14 rounded-2xl border-border/50 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors font-bold shadow-sm">
                <LogOut className="h-5 w-5 mr-2" /> Exit Admin
              </Button>
            </form>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (PWA Style) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-background/90 backdrop-blur-3xl border-t border-border/50 z-50 pb-safe shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-around px-1 py-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={cn(
                  "flex flex-col items-center justify-center w-full py-1 gap-1.5 transition-all",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className={cn(
                  "p-2 rounded-xl transition-all duration-300",
                  isActive && "bg-primary/10 scale-110"
                )}>
                  <item.icon className={cn("h-5 w-5", isActive && "fill-primary/20")} />
                </div>
                <span className={cn(
                  "text-[10px] font-bold tracking-tight",
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
