import { createClient } from "@/lib/supabase/server";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export const revalidate = 60; // Revalidate every minute

export default async function ToursPage() {
  const supabase = await createClient();
  const { data: tours } = await supabase
    .from("tours")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return (
    <main className="bg-background min-h-screen">
      

      {/* Premium Header */}
      <div className="relative py-32 overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000" 
            alt="Dubai Skyline" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px]" />
        </div>
        
        <div className="container relative z-10 px-4">
          <span className="inline-block py-1 px-4 rounded-full bg-white/20 text-white text-sm font-bold uppercase tracking-widest mb-6 border border-white/30 backdrop-blur-md">
            Exclusive Experiences
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
            Discover <span className="text-secondary">Premium Tours</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Curated luxury experiences across the United Arab Emirates. From private yachts to bespoke desert adventures.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-24 relative -mt-16 z-20">
        {!tours || tours.length === 0 ? (
          <div className="text-center py-24 bg-card/70 backdrop-blur-2xl rounded-[3rem] border border-border/50 shadow-2xl shadow-primary/5">
            <h3 className="text-2xl font-bold mb-2">No tours available right now</h3>
            <p className="text-muted-foreground">Check back later or contact our support team.</p>
            <Link href="/tours">
              <button className="mt-8 rounded-2xl px-8 h-14 font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">Refresh Page</button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {tours.map((tour) => (
              <div 
                key={tour.id} 
                className="bg-card/70 backdrop-blur-2xl border border-border/50 rounded-[2.5rem] overflow-hidden group hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  {tour.image_urls && tour.image_urls.length > 0 ? (
                    <Image
                      src={tour.image_urls[0]}
                      alt={tour.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <span className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Premium Tour</span>
                    </div>
                  )}
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-background/80 backdrop-blur-md border border-border/50 rounded-2xl text-foreground text-xs font-bold uppercase tracking-wider">
                    {tour.category || "Luxury"}
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-primary">
                    <MapPin className="h-3 w-3" />
                    {tour.location || "United Arab Emirates"}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                    {tour.title}
                  </h3>
                  
                  <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed mb-8 flex-1">
                    {tour.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-border/50">
                    <div>
                      <span className="text-3xl font-bold text-primary">AED {tour.base_price}</span>
                      <span className="text-muted-foreground text-xs ml-1">/ person</span>
                    </div>
                    <Link href={`/tours/${tour.id}`}>
                      <button className="rounded-2xl h-12 w-12 bg-primary text-primary-foreground flex items-center justify-center hover:w-32 transition-all duration-300 relative overflow-hidden group/btn shadow-lg shadow-primary/20">
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/btn:opacity-0 transition-opacity">
                          <ArrowRight className="h-5 w-5" />
                        </span>
                        <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap px-4 font-bold">
                          Details
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </main>
  );
}
