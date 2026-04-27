import { motion } from "framer-motion";
import { Handshake, DollarSign, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    title: "Sign Up",
    description: "Fill out our simple application form to join the Golden Care network.",
  },
  {
    title: "Share",
    description: "Use your unique tracking link to promote our services on your platforms.",
  },
  {
    title: "Earn",
    description: "Get paid for every successful booking and visa application through your link.",
  },
];

export default function AffiliateLandingPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-primary">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <pattern id="affiliate-hero-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#affiliate-hero-pattern)" />
          </svg>
        </div>

        <div className="container px-6 md:px-12 mx-auto relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-black text-xs uppercase tracking-widest mb-10">
              <Handshake className="w-4 h-4" />
              Partnership Program
            </div>
            <h1 
              className="text-5xl md:text-8xl font-bold text-white mb-8 leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Partner With <br /> the <span className="italic text-white/70">Best</span>
            </h1>
            <p className="text-white/80 text-xl leading-relaxed max-w-2xl mx-auto mb-12">
              Join the UAE's most rewarding travel affiliate program. Earn up to 15% commission on every tour, hotel, and visa service.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-3 px-12 py-6 rounded-full bg-white text-primary font-black text-lg hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-2xl shadow-black/20"
            >
              Start Earning Now
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-32">
        <div className="container px-6 md:px-12 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Why Partner With Us?
            </h2>
            <p className="text-muted-foreground text-lg">
              We provide all the tools you need to monetize your travel audience effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: DollarSign, title: "Industry-Leading Rates", desc: "Our commission rates are the highest in the UAE travel sector, ensuring your traffic pays off." },
              { icon: TrendingUp, title: "High Conversion", desc: "Our premium brand and seamless booking experience mean more visitors turn into customers." },
              { icon: ShieldCheck, title: "Reliable Payments", desc: "Transparent tracking and monthly payouts directly to your preferred payment method." },
            ].map((item, i) => (
              <div key={i} className="space-y-6 text-center">
                <div className="h-20 w-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary mx-auto">
                  <item.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-32 bg-[#0a0f1a] text-white overflow-hidden relative">
        <div className="container px-6 md:px-12 mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 
                className="text-4xl md:text-6xl font-bold mb-12 leading-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Simple Steps to <br /> <span className="text-primary italic">Success</span>
              </h2>
              <div className="space-y-12">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="h-16 w-16 rounded-full border-2 border-primary flex items-center justify-center text-primary text-2xl font-black shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                      <p className="text-white/40 text-lg leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[4rem] bg-gradient-to-br from-primary/20 to-transparent border border-white/10 p-12 flex flex-col justify-center">
                <div className="space-y-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 px-6 opacity-40 hover:opacity-100 transition-opacity">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                      <div className="h-2 w-32 bg-white/20 rounded-full" />
                      <div className="ml-auto text-primary font-black">+AED 450.00</div>
                    </div>
                  ))}
                </div>
                <div className="mt-12 text-center">
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold animate-bounce shadow-xl">
                    <Star className="w-5 h-5 fill-white" />
                    Top Partner Performance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
