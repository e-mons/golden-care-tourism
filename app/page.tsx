import HeroVideo from "@/components/home/hero-video";
import FeaturedDestinations from "@/components/home/destination-cards";
import ServicesSection from "@/components/home/services-section";
import ToursShowcase from "@/components/home/tours-grid";
import VisaHighlight from "@/components/home/visa-highlight";
import BundleOffers from "@/components/home/bundle-offers";
import GalleryGrid from "@/components/home/gallery-grid";
import TravelBlog from "@/components/home/travel-blog";
import AffiliateSection from "@/components/home/affiliate-section";
import CTASection from "@/components/home/cta-section";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      
      
      {/* Section 1 & 2: Hero & Smart Search */}
      <HeroVideo />
      
      {/* Section 3: Featured Destinations */}
      <FeaturedDestinations />
      
      {/* Section 4 & 5: Popular Tours & Why Choose Us */}
      <ToursShowcase />
      <ServicesSection />
      
      {/* Section 6: Visa Services (Critical) */}
      <VisaHighlight />
      
      {/* Section 7: Bundle Offers */}
      <BundleOffers />
      
      {/* Section 9: Travel Gallery */}
      <GalleryGrid />
      
      {/* Section 10: Travel Blog */}
      <TravelBlog />
      
      {/* Section 11: Affiliate Section */}
      <AffiliateSection />
      
      {/* Section 12 & 13: CTA & Newsletter */}
      <CTASection />
      
    </main>
  );
}
