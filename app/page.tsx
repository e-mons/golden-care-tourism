import HeroVideo from "@/components/home/hero-video";
import FeaturedDestinations from "@/components/home/destination-cards";
import FlightDeals from "@/components/home/flight-deals";
import ServicesSection from "@/components/home/services-section";
import ToursShowcase from "@/components/home/tours-grid";
import VisaHighlight from "@/components/home/visa-highlight";
import BundleOffers from "@/components/home/bundle-offers";
import FlightCTA from "@/components/home/flight-cta";
import GalleryGrid from "@/components/home/gallery-grid";
import TravelBlog from "@/components/home/travel-blog";
import AffiliateSection from "@/components/home/affiliate-section";
import CTASection from "@/components/home/cta-section";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      
      
      {/* Section 1 & 2: Hero & Smart Search (Flights + Tours Tabs) */}
      <HeroVideo />
      
      {/* Section 3: Featured Destinations */}
      <FeaturedDestinations />

      {/* Section 4: Popular Flight Deals */}
      <FlightDeals />
      
      {/* Section 5 & 6: Popular Tours & Why Choose Us */}
      <ToursShowcase />
      <ServicesSection />
      
      {/* Section 7: Visa Services (Critical) */}
      <VisaHighlight />
      
      {/* Section 8: Bundle Offers */}
      <BundleOffers />

      {/* Section 9: Flight Booking CTA */}
      <FlightCTA />
      
      {/* Section 10: Travel Gallery */}
      <GalleryGrid />
      
      {/* Section 11: Travel Blog */}
      <TravelBlog />
      
      {/* Section 12: Affiliate Section */}
      <AffiliateSection />
      
      {/* Section 13 & 14: CTA & Newsletter */}
      <CTASection />
      
    </main>
  );
}
