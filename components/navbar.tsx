"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { Plane, Menu, UserCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Avoid hydration mismatch by using a stable value until mounted
  const safeIsScrolled = mounted ? isScrolled : false;
  
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tours", href: "/tours" },
    { name: "Visa Services", href: "/visas" },
    { name: "About Us", href: "/about" },
  ];

  // Pages that should always have a solid/white background navbar
  const isLightPage = pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password" || pathname === "/reset-password" || pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
  const showSolid = safeIsScrolled || isLightPage;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        showSolid ? "py-4 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5" : "py-4 md:py-8"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center group relative z-10">
          <div className="relative h-10 md:h-12 w-36 md:w-48 transition-all duration-500 ease-out group-hover:scale-[1.03] will-change-transform transform-gpu">
            <img 
              src="/images/logo.png" 
              alt="Golden Care Tourism" 
              className={cn(
                "w-full h-full object-contain transition-all duration-500",
                showSolid ? "brightness-100" : "brightness-0 invert opacity-90 group-hover:opacity-100"
              )}
            />
          </div>
        </Link>

        {/* Floating Pill Nav */}
        <nav className={cn(
          "hidden md:flex items-center backdrop-blur-xl border transition-all duration-300 rounded-full px-2 py-1.5 shadow-2xl",
          showSolid 
            ? "bg-white/80 border-primary/10 text-foreground" 
            : "bg-white/10 border-white/20 text-white"
        )}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-6 py-2 text-sm font-bold transition-all rounded-full",
                pathname === link.href 
                  ? (showSolid ? "bg-primary text-white" : "bg-white/20 text-white")
                  : (showSolid ? "text-foreground/70 hover:text-primary" : "text-white/80 hover:text-white")
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/bookings" className="hidden sm:block">
            <Button 
              variant="outline" 
              className={cn(
                "rounded-full px-6 font-bold backdrop-blur-md transition-all duration-300",
                showSolid 
                  ? "border-primary/20 text-primary hover:bg-primary hover:text-white" 
                  : "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
              )}
            >
              Already Booked?
            </Button>
          </Link>
          
          <Link href="/dashboard/bookings">
            <div className={cn(
              "h-10 w-10 rounded-full border flex items-center justify-center transition-all duration-300 backdrop-blur-md",
              showSolid 
                ? "border-primary/20 text-primary hover:bg-primary/10" 
                : "border-white/40 text-white hover:bg-white/10"
            )}>
              <UserCircle className="h-5 w-5" />
            </div>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger
              render={
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "md:hidden transition-colors duration-300 rounded-full h-10 w-10",
                    showSolid ? "text-foreground bg-primary/5 hover:bg-primary/10" : "text-white bg-white/10 hover:bg-white/20"
                  )} 
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              }
            />
            <SheetContent side="right" className="w-[320px] sm:w-[400px] rounded-l-[2.5rem] bg-card/95 backdrop-blur-3xl border-l border-border/50 shadow-2xl p-8 flex flex-col">
              <div className="flex items-center space-x-3 mb-10 mt-6">
                <div className="bg-primary/10 h-10 w-10 rounded-2xl flex items-center justify-center text-primary shadow-inner border border-primary/20">
                  <Plane className="h-5 w-5" />
                </div>
                <span className="font-bold text-xl tracking-tight text-foreground">Golden Care</span>
              </div>
              
              <div className="flex flex-col space-y-2 flex-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-lg font-bold transition-all px-4 py-4 rounded-2xl",
                        isActive 
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto pt-8 border-t border-border/50">
                <div className="flex flex-col gap-3">
                  <Link href="/login" className="w-full">
                    <Button variant="outline" className="w-full h-14 rounded-2xl text-base font-bold border-border/50 bg-background/50 backdrop-blur-sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/tours" className="w-full">
                    <Button className="w-full h-14 rounded-2xl text-base font-bold bg-primary text-white shadow-xl shadow-primary/20">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
