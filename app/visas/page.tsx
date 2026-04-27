import { VisaForm } from "./visa-form";
import { ShieldCheck, Clock, Info } from "lucide-react";
import Image from "next/image";
export default function VisasPage() {
  return (
    <main className="bg-background min-h-screen">
      
      
      {/* Premium Header */}
      <div className="relative py-32 overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1544971587-b842c27f8e14?auto=format&fit=crop&q=80&w=2000" 
            alt="Abu Dhabi" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px]" />
        </div>
        
        <div className="container relative z-10 px-4">
          <span className="inline-block py-1 px-4 rounded-full bg-white/20 text-white text-sm font-bold uppercase tracking-widest mb-6 border border-white/30 backdrop-blur-md">
            Fast-Track Processing
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
            UAE Visa <span className="text-secondary">Services</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            From 30-day tourist entry to exclusive Golden Visa residency. Our AI-assisted platform handles the complexity while you prepare for your journey.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-24 relative -mt-16 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card/70 backdrop-blur-2xl border border-border/50 rounded-[2.5rem] p-8 shadow-2xl shadow-primary/5">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Secure Processing</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your documents are encrypted and stored securely. We adhere to strict UAE data privacy guidelines for all sensitive information.
              </p>
            </div>
            
            <div className="bg-card/70 backdrop-blur-2xl border border-border/50 rounded-[2.5rem] p-8 shadow-2xl shadow-primary/5">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-6">Processing Timeline</h3>
              <div className="space-y-4">
                {[
                  { name: "Tourist Visa (Standard)", time: "3-5 Days" },
                  { name: "Tourist Visa (Express)", time: "24-48 Hours" },
                  { name: "Residency Visa", time: "14-21 Days" },
                  { name: "Golden Visa", time: "Contact Us" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm border-b border-border/50 pb-3 last:border-0 last:pb-0">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="font-bold text-primary">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary/10 backdrop-blur-md border border-secondary/20 rounded-[2.5rem] p-8 shadow-xl">
              <div className="flex gap-4 items-start">
                <Info className="h-6 w-6 text-secondary shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-2">Need help?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our visa experts are available for a free consultation.
                  </p>
                  <button className="text-primary font-bold text-sm hover:underline">
                    Chat with an expert →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-8">
            <div className="bg-card/70 backdrop-blur-2xl border border-border/50 shadow-2xl shadow-primary/5 rounded-[3rem] p-8 md:p-16">
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-2">Application Form</h2>
                <p className="text-muted-foreground">Please provide accurate information as per your passport.</p>
              </div>
              <VisaForm />
            </div>
          </div>
        </div>
      </div>
      
      
    </main>
  );
}
