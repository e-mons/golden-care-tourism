import Link from "next/link";
import { Mail, Phone, MapPin, X } from "lucide-react";

const SocialIcons = [
  {
    name: "Facebook",
    href: "#",
    icon: (props: any) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "#",
    icon: X,
  },
  {
    name: "Instagram",
    href: "#",
    icon: (props: any) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Linkedin",
    href: "#",
    icon: (props: any) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-24 pb-12">
      <div className="container px-6 md:px-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center group">
              <div className="relative h-16 w-56 overflow-hidden">
                <img 
                  src="/images/logo.png" 
                  alt="Golden Care Tourism" 
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Your premier partner for luxury tourism and seamless visa processing in the United Arab Emirates. Experience the gold standard of travel.
            </p>
            <div className="flex gap-4">
              {SocialIcons.map((social, i) => (
                <Link key={i} href={social.href} className="h-12 w-12 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: "About Us", href: "/about" },
                { name: "Our Tours", href: "/tours" },
                { name: "Visa Services", href: "/visas" },
                { name: "Special Offers", href: "/offers" },
                { name: "Travel Blog", href: "/blog" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors flex items-center group">
                    <span className="h-1 w-0 bg-primary mr-0 group-hover:w-2 group-hover:mr-2 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-8">Popular Services</h4>
            <ul className="space-y-4">
              {[
                { name: "Desert Safari", href: "/tours?category=Desert Safari" },
                { name: "Burj Khalifa Tickets", href: "/tours?category=City Tours" },
                { name: "Visit Visa", href: "/visas" },
                { name: "Residency Visa", href: "/visas" },
                { name: "Yacht Rental", href: "/tours?category=Yacht Charter" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors flex items-center group">
                    <span className="h-1 w-0 bg-primary mr-0 group-hover:w-2 group-hover:mr-2 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-8">Get in Touch</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <a href="tel:+97141234567" className="group flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Call Us</p>
                    <p className="font-bold">+971 4 123 4567</p>
                  </div>
                </a>
              </li>
              <li className="flex gap-4">
                <a href="mailto:info@goldencare.ae" className="group flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Email Us</p>
                    <p className="font-bold">info@goldencare.ae</p>
                  </div>
                </a>
              </li>
              <li className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Visit Us</p>
                  <p className="font-bold text-sm">Business Bay, Dubai, UAE</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p>© 2026 Golden Care Tourism L.L.C. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
