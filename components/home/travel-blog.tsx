"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const posts = [
  {
    title: "10 Hidden Gems in Dubai You Must Visit in 2026",
    slug: "hidden-gems-dubai-2026",
    excerpt: "Beyond the skyscrapers and shopping malls, Dubai holds secret spots that will take your breath away...",
    author: "Sarah Ahmed",
    date: "May 12, 2026",
    category: "Travel Guide",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200",
    comments: 24,
  },
  {
    title: "How to Secure Your UAE Residency Visa Smoothly",
    slug: "uae-residency-visa-guide",
    excerpt: "The ultimate guide to navigating the new residency rules and getting your golden visa in record time...",
    author: "Omar Khalid",
    date: "May 08, 2026",
    category: "Visa Tips",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?auto=format&fit=crop&q=80&w=800",
    comments: 15,
  },
  {
    title: "Luxury Yachting: A Day on the Arabian Gulf",
    slug: "luxury-yachting-dubai-guide",
    excerpt: "Experience the ultimate freedom and luxury with our guide to renting a private yacht in Dubai Marina...",
    author: "David Chen",
    date: "May 05, 2026",
    category: "Lifestyle",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&q=80&w=800",
    comments: 42,
  },
];

export default function TravelBlog() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-l-[10rem] -translate-y-20 pointer-events-none" />
      
      <div className="max-w-7xl px-8 md:px-16 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="h-px w-8 bg-primary" />
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">The Golden Journal</span>
            </motion.div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Insights & <span className="text-primary italic">Travel Stories</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-lg leading-relaxed">
            Stay updated with the latest travel trends, visa regulations, and local secrets from our expert team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group flex flex-col h-full"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8 shadow-lg group-hover:shadow-2xl transition-all duration-700">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                
                {/* Overlay with info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="absolute top-6 left-6">
                  <span className="px-5 py-2 rounded-full bg-white/90 backdrop-blur-md text-foreground text-[10px] font-black uppercase tracking-widest shadow-sm">
                    {post.category}
                  </span>
                </div>
                
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full border border-white/30 bg-primary/20 flex items-center justify-center text-[10px] font-black">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-xs font-bold">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
              </div>

              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-bold text-primary uppercase tracking-[0.1em] mb-4">
                  {post.date}
                  <span className="h-1 w-1 rounded-full bg-primary/30" />
                  <div className="flex items-center gap-1.5 lowercase font-medium text-muted-foreground">
                    <MessageCircle className="w-3 h-3" />
                    {post.comments} comments
                  </div>
                </div>

                <h3 
                  className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300 leading-snug flex-grow"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 line-clamp-3">
                  {post.excerpt}
                </p>

                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-foreground font-black text-xs uppercase tracking-widest group/link">
                  Read Article
                  <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white transition-all duration-300">
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
                  </div>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link href="/blog">
            <button className="group relative px-12 py-5 bg-[#0a0f1a] text-white rounded-full font-bold overflow-hidden transition-all duration-500 hover:pr-16 shadow-2xl">
              <span className="relative z-10 uppercase tracking-widest text-xs">Explore All Stories</span>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
              <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
