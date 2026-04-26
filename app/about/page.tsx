import { motion } from "framer-motion";
import { Award, Users, Globe, ShieldCheck, Heart, Sparkles } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for perfection in every detail, from luxury transport to bespoke itineraries.",
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    description: "A decade of experience and thousands of satisfied clients who trust our local expertise.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "We don't just show you the UAE; we share our love for its culture and hidden stories.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-[#0a0f1a]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)" }} />
        <div className="container px-6 md:px-12 mx-auto relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 
              className="text-5xl md:text-8xl font-bold text-white mb-8 leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Defining <span className="text-primary italic">Luxury</span> Travel
            </h1>
            <p className="text-white/60 text-xl leading-relaxed max-w-2xl mx-auto">
              Golden Care Tourism is more than a travel agency. We are your local partner in discovering the extraordinary, the authentic, and the unforgettable in the heart of the UAE.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32">
        <div className="container px-6 md:px-12 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800" 
                  alt="Dubai Skyline" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-primary p-12 rounded-[2rem] text-white shadow-2xl hidden md:block">
                <p className="text-5xl font-black mb-2">12+</p>
                <p className="text-xs uppercase tracking-widest font-bold opacity-80">Years of Experience</p>
              </div>
            </div>

            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                Our Story
              </div>
              <h2 
                className="text-4xl md:text-5xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                A Decade of Designing <br /> <span className="italic text-primary">Unforgettable</span> Memories
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Founded in the heart of Dubai, Golden Care Tourism began with a simple mission: to provide a level of service and local insight that traditional agencies couldn't match. We realized that true luxury isn't just about the price tag—it's about the seamlessness of the experience and the richness of the stories you take home.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <h4 className="text-4xl font-black mb-2">50k+</h4>
                  <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Happy Clients</p>
                </div>
                <div>
                  <h4 className="text-4xl font-black mb-2">100%</h4>
                  <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Local Expertise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-[#0a0f1a] text-white">
        <div className="container px-6 md:px-12 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              The <span className="text-primary">Principles</span> That Guide Us
            </h2>
            <p className="text-white/50 text-lg">
              We believe that travel is the most powerful way to broaden the mind and nourish the soul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 group">
                <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-white/40 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </main>
  );
}
