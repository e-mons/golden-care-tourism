import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-40 pb-24">
        <div className="container px-6 md:px-12 mx-auto max-w-4xl">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-12"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Privacy <span className="text-primary italic">Policy</span>
          </h1>
          <div className="prose prose-lg prose-primary max-w-none prose-p:text-muted-foreground prose-headings:font-bold">
            <p>Last Updated: May 2026</p>
            <p>At Golden Care Tourism, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data you provide to us when using our website and services.</p>
            
            <h2>1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, such as when you book a tour, apply for a visa, or contact our support team. This may include your name, email address, phone number, passport details, and payment information.</p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to process your bookings, manage your visa applications, communicate with you about our services, and improve your overall experience with Golden Care Tourism.</p>

            <h2>3. Data Security</h2>
            <p>We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers and is only accessible by authorized personnel.</p>

            <h2>4. Third-Party Disclosure</h2>
            <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties, except for trusted third parties who assist us in operating our website and conducting our business (e.g., airlines, hotels, and government visa departments).</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
