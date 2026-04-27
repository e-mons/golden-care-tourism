"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Mail, Send, Phone, MessageSquare } from "lucide-react";

export default function CTASection() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitted(true);
    // In a real app, this would send to an API
  };

  return (
    <section className="py-32 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[4rem] overflow-hidden min-h-[600px] flex items-center justify-center p-8 md:p-20 shadow-2xl">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-105"
            >
              <source
                src="/videos/v2.mp4"
                type="video/mp4"
              />
            </video>
            {/* Multi-layered Overlays for depth */}

          </div>

          <div className="relative z-10 w-full max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex flex-col gap-6 mb-8">
                  <div className="relative h-20 w-64 overflow-hidden">
                    <Image 
                      src="/images/logo.png" 
                      alt="Golden Care Tourism" 
                      fill
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md w-fit">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Available 24/7</span>
                  </div>
                </div>

                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-[1.2]"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Let&apos;s craft your <br />
                  <span className="text-primary italic">Golden Memory</span>
                </h2>

                <p className="text-white/70 text-lg md:text-xl mb-12 font-light leading-relaxed max-w-lg">
                  Whether it&apos;s a dream desert safari or a complex visa application, our consultants are ready to make it seamless.
                </p>

                <div className="flex flex-wrap gap-6">
                  <a href="tel:+97141234567" className="flex items-center gap-4 group cursor-pointer">
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-primary transition-all duration-300">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px] uppercase font-black tracking-widest">Call Us</p>
                      <p className="text-white font-bold">+971 4 123 4567</p>
                    </div>
                  </a>
                  <a href="https://wa.me/971509876543" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer">
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-primary transition-all duration-300">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px] uppercase font-black tracking-widest">WhatsApp</p>
                      <p className="text-white font-bold">+971 50 987 6543</p>
                    </div>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/[0.03] backdrop-blur-3xl p-10 md:p-12 rounded-[3rem] border border-white/10 shadow-inner"
              >
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                      <Send className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Inquiry Sent!</h3>
                    <p className="text-white/70">Our travel experts will contact you within the next 24 hours.</p>
                    <Button 
                      onClick={() => setSubmitted(false)}
                      variant="outline" 
                      className="mt-8 border-white/20 text-white hover:bg-white/10 rounded-xl"
                    >
                      Send Another
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-white mb-8 uppercase tracking-widest text-center lg:text-left">Send us a message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-white/50 text-[10px] font-black uppercase tracking-widest ml-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/50 text-[10px] font-black uppercase tracking-widest ml-2">How can we help?</label>
                        <textarea
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us about your travel plans..."
                          rows={3}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
                        />
                      </div>
                      <Button type="submit" className="w-full h-16 rounded-2xl bg-primary text-white hover:bg-primary/90 font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all duration-500 hover:gap-4">
                        Send Inquiry
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
