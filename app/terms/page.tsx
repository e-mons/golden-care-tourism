
export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="pt-40 pb-24">
        <div className="container px-6 md:px-12 mx-auto max-w-4xl">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-12"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Terms & <span className="text-primary italic">Conditions</span>
          </h1>
          <div className="prose prose-lg prose-primary max-w-none prose-p:text-muted-foreground prose-headings:font-bold">
            <p>Last Updated: May 2026</p>
            <p>By accessing and using the services provided by Golden Care Tourism, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before making any bookings.</p>
            
            <h2>1. Booking and Payment</h2>
            <p>All bookings are subject to availability. Full payment or a specified deposit is required at the time of booking to secure your reservation. Payments are processed securely through our authorized payment gateways.</p>

            <h2>2. Cancellation and Refunds</h2>
            <p>Cancellation policies vary depending on the service booked (e.g., specific tours, hotel packages). Please refer to the cancellation terms provided at the time of booking. Refund processing times may vary based on your bank and the service provider.</p>

            <h2>3. Visa Services</h2>
            <p>Golden Care Tourism assists in the preparation and submission of visa applications. However, the final decision rests solely with the respective government authorities. We are not responsible for any visa rejections or delays caused by government processing.</p>

            <h2>4. Limitation of Liability</h2>
            <p>Golden Care Tourism acts as an intermediary between you and various service providers (airlines, hotels, tour operators). We are not liable for any personal injury, property damage, or other loss resulting from the acts or omissions of these third-party providers.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
