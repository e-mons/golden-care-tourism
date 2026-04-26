import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const faqs = [
  {
    q: "How do I book a tour with Golden Care Tourism?",
    a: "Booking is simple! You can search for your desired tour on our homepage, select your dates, and complete the booking securely online. Alternatively, you can contact our 24/7 support team via WhatsApp or phone for personalized assistance."
  },
  {
    q: "Do you provide visa assistance for all nationalities?",
    a: "Yes, we provide visa assistance for most nationalities. Our legal team stays updated with the latest UAE immigration rules to ensure a smooth application process for tourist, residency, and green visas."
  },
  {
    q: "What is your cancellation policy?",
    a: "Most of our tours offer free cancellation up to 24 hours before the scheduled start time. However, specific high-demand packages or hotel bundles may have different terms. Please check the specific policy during the checkout process."
  },
  {
    q: "Are your tours private or group-based?",
    a: "We offer both! Many of our signature experiences like Desert Safaris and Yacht Charters can be booked as private tours for a more exclusive experience, or you can join our curated group tours."
  },
  {
    q: "Do you offer airport transfer services?",
    a: "Yes, we provide luxury airport transfers from all major UAE airports (DXB, DWC, AUH). Our professional drivers will meet you at the arrivals hall with a personalized sign."
  }
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-40 pb-24">
        <div className="container px-6 md:px-12 mx-auto max-w-3xl">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-12 text-center"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Frequently Asked <span className="text-primary italic">Questions</span>
          </h1>
          
          <Accordion className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-[2rem] px-8 overflow-hidden bg-muted/30">
                <AccordionTrigger className="text-xl font-bold hover:no-underline hover:text-primary py-8">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-8">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <Footer />
    </main>
  );
}
