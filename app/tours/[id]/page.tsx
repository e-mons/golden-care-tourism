import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import BookingWidget from "./booking-widget";
import { MapPin, Star, ShieldCheck, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const revalidate = 60;

export default async function TourDetailsPage(
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const { id } = params;
  
  const supabase = await createClient();
  
  // Fetch tour details
  const { data: tour, error: tourError } = await supabase
    .from("tours")
    .select("*")
    .eq("id", id)
    .single();

  if (tourError || !tour) {
    notFound();
  }

  // Fetch future slots
  const { data: slots } = await supabase
    .from("tour_slots")
    .select("*")
    .eq("tour_id", id)
    .gte("start_time", new Date().toISOString())
    .order("start_time", { ascending: true });

  // Fetch addons available
  const { data: addons } = await supabase.from("addons").select("*");

  const mainImage = tour.image_urls?.[0] || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1600";

  return (
    <main className="min-h-screen bg-background">
      {/* Cinematic Hero */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image 
          src={mainImage} 
          alt={tour.title} 
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl space-y-6">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-primary text-white border-none px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                  {tour.category || "Luxury Tour"}
                </Badge>
                <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center gap-2">
                  <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
                  4.9 (120+ Reviews)
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
                {tour.title}
              </h1>
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-lg font-medium">{tour.location || "Dubai, UAE"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-lg font-medium">Duration: 4-6 Hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-16">
              {/* Overview */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-1.5 bg-primary rounded-full" />
                  <h2 className="text-3xl font-bold">Experience Highlights</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: ShieldCheck, title: "Premium Safety", desc: "Highest safety standards followed" },
                    { icon: Clock, title: "Instant Confirmation", desc: "Receive your ticket instantly" },
                    { icon: Users, title: "Small Groups", desc: "Maximum 8 guests per group" },
                    { icon: Star, title: "Expert Guide", desc: "Multilingual professional guides" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-6 rounded-[2.5rem] bg-card/70 backdrop-blur-2xl border border-border/50 shadow-xl shadow-primary/5">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed bg-card/70 backdrop-blur-2xl border border-border/50 p-10 rounded-[2.5rem] shadow-2xl shadow-primary/5">
                  <p className="whitespace-pre-line">{tour.description}</p>
                </div>
              </div>

              {/* Gallery (Small) */}
              {tour.image_urls && tour.image_urls.length > 1 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold">Visual Journey</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tour.image_urls.slice(1, 4).map((url: string, i: number) => (
                      <div key={i} className="aspect-square rounded-3xl overflow-hidden border border-border/50 relative">
                        <Image 
                          src={url} 
                          alt={`Gallery ${i}`} 
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Booking Widget */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <BookingWidget tour={tour} slots={slots || []} addons={addons || []} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
