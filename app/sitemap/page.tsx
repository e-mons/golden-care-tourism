import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const sections = [
  {
    title: "Main Pages",
    links: [
      { name: "Home", href: "/" },
      { name: "All Tours", href: "/tours" },
      { name: "Visa Services", href: "/visas" },
      { name: "Special Offers", href: "/offers" },
      { name: "About Us", href: "/about" },
    ]
  },
  {
    title: "Tour Categories",
    links: [
      { name: "City Tours", href: "/tours?category=City Tours" },
      { name: "Desert Safaris", href: "/tours?category=Desert Safari" },
      { name: "Yacht Charters", href: "/tours?category=Yacht Charter" },
      { name: "Adventure Sports", href: "/tours?category=Adventure" },
    ]
  },
  {
    title: "Partner Program",
    links: [
      { name: "Become a Partner", href: "/affiliate" },
      { name: "Partner Dashboard", href: "/affiliates" },
    ]
  },
  {
    title: "Support & Legal",
    links: [
      { name: "Contact Us", href: "/#contact" },
      { name: "FAQs", href: "/faq" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Sitemap", href: "/sitemap" },
    ]
  }
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-40 pb-24">
        <div className="container px-6 md:px-12 mx-auto">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-16"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Site <span className="text-primary italic">Navigation</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
            {sections.map((section, i) => (
              <div key={i}>
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <div className="h-1 w-8 bg-primary rounded-full" />
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <Link 
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
