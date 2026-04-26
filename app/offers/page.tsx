import { motion } from "framer-motion";
import { Tag, Timer, Zap, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const offers = [
  {
    title: "Summer Solstice Special",
    discount: "30% OFF",
    desc: "Get exclusive discounts on all luxury desert safaris and city tours this summer.",
    code: "SUMMER30",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    deadline: "Ends in 12 days",
  },
  {
    title: "Family Adventure Bundle",
    discount: "KIDS GO FREE",
    desc: "Book any family tour package and children under 12 get complimentary access to theme parks.",
    code: "FAMILYFREE",
    image: "https://images.unsplash.com/photo-1574950578143-858c6fc58922?auto=format&fit=crop&q=80&w=800",
    deadline: "Limited Availability",
  },
  {
    title: "First Booking Bonus",
    discount: "AED 200 OFF",
    desc: "New to Golden Care? Get a flat discount on your first booking over AED 1000.",
    code: "WELCOME200",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
    deadline: "Ongoing",
  }
];

export default function OffersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-40 pb-20 overflow-hidden bg-[#0a0f1a]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)" }} />
        <div className="container px-6 md:px-12 mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Exclusive <span className="text-primary italic">Offers</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed">
              Unbeatable deals on luxury experiences. Your dream UAE vacation is now even more rewarding.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container px-6 md:px-12 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {offers.map((offer, i) => (
              <div key={i} className="group relative bg-white border border-border rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img src={offer.image} alt={offer.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute top-6 left-6">
                    <span className="px-5 py-2 rounded-full bg-primary text-white font-black text-xs uppercase tracking-widest shadow-xl">
                      {offer.discount}
                    </span>
                  </div>
                </div>
                <div className="p-10">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
                    <Timer className="w-4 h-4" />
                    {offer.deadline}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-playfair">{offer.title}</h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">{offer.desc}</p>
                  
                  <div className="p-6 rounded-2xl bg-muted/50 border-2 border-dashed border-border mb-8 flex items-center justify-between">
                    <div className="font-mono text-xl font-bold tracking-widest">{offer.code}</div>
                    <button className="text-primary font-black text-[10px] uppercase tracking-widest hover:underline">Copy Code</button>
                  </div>

                  <Link 
                    href="/tours"
                    className="w-full h-14 rounded-full bg-foreground text-background font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Redeem Offer
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
