"use client";

import { Play, Plane, Mail, Phone, MapPin, Camera, Send, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Luxury Fleet", href: "/fleet" },
    { name: "Careers", href: "/careers" },
    { name: "Travel Blog", href: "/blog" },
  ],
  services: [
    { name: "Flight Booking", href: "/flights" },
    { name: "Luxury Tours", href: "/tours" },
    { name: "Visa Services", href: "/visas" },
    { name: "Concierge", href: "/concierge" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Contact Us", href: "/contact" },
  ],
};

// Use generic icons because specific brand icons are missing in this version of lucide-react
const SocialIcons = [
  { icon: Share2, href: "#", label: "Facebook" },
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: Send, href: "#", label: "Twitter" },
  { icon: Play, href: "#", label: "Youtube" },
];

interface SocialIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  icon: React.ElementType;
}

export function SocialIcon({ icon: Icon, ...props }: SocialIconProps) {
  return (
    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:bg-primary/10 hover:border-primary/20 transition-all duration-300 group cursor-pointer">
      <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" {...props} />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#050811] text-white pt-24 pb-12 overflow-hidden">
      <div className="container px-6 md:px-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Plane className="h-7 w-7 text-white" />
              </div>
              <span className="text-3xl font-bold tracking-tighter font-playfair">
                Golden Care <span className="text-primary italic">Tourism</span>
              </span>
            </Link>
            <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-sm">
              The gold standard of luxury travel in the United Arab Emirates. Crafting bespoke itineraries since 2010.
            </p>
            <div className="flex gap-4">
              {SocialIcons.map((social, i) => (
                <Link key={i} href={social.href} aria-label={social.label}>
                  <SocialIcon icon={social.icon} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-8">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors flex items-center group">
                    <span className="h-px w-0 bg-primary group-hover:w-4 mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-8">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors flex items-center group">
                    <span className="h-px w-0 bg-primary group-hover:w-4 mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-8">Contact</h4>
            <ul className="space-y-6">
              <li className="flex gap-4 group">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-black tracking-widest mb-1">Office</p>
                  <p className="text-white/70 text-sm leading-relaxed">Sheikh Zayed Road, Dubai, UAE</p>
                </div>
              </li>
              <li className="flex gap-4 group">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-black tracking-widest mb-1">Call Us</p>
                  <p className="text-white/70 text-sm font-bold">+971 4 123 4567</p>
                </div>
              </li>
              <li className="flex gap-4 group">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-black tracking-widest mb-1">Email</p>
                  <p className="text-white/70 text-sm font-bold">concierge@goldencare.ae</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/30 text-sm font-medium">
            © {new Date().getFullYear()} Golden Care Tourism LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
              <span className="text-[10px] font-black uppercase tracking-widest">Payments by</span>
              <Image src="https://paystack.com/assets/img/logos/paystack-logo-blue.png" alt="Paystack" width={80} height={20} className="h-4 w-auto object-contain" />
            </div>
            <div className="h-4 w-px bg-white/10" />
            <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">
              License No. 1234567
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
