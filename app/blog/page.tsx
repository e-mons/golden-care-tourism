import { motion } from "framer-motion";
import { ChevronRight, Calendar, User, MessageCircle, Clock, Search, Tag } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const posts = [
  {
    title: "10 Hidden Gems in Dubai You Must Visit in 2026",
    slug: "hidden-gems-dubai-2026",
    excerpt: "Beyond the skyscrapers and shopping malls, Dubai holds secret spots that will take your breath away. From the pink flamingos at Ras Al Khor to the traditional tea houses in Al Bastakiya, discover the soul of the city.",
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
    excerpt: "The ultimate guide to navigating the new residency rules and getting your golden visa in record time. We break down the requirements for investors, entrepreneurs, and professionals looking to call the UAE home.",
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
    excerpt: "Experience the ultimate freedom and luxury with our guide to renting a private yacht in Dubai Marina. What to expect, how to choose the right vessel, and the best time of day to catch the perfect sunset.",
    author: "David Chen",
    date: "May 05, 2026",
    category: "Lifestyle",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&q=80&w=800",
    comments: 42,
  },
  {
    title: "Dining in the Clouds: Best Rooftop Restaurants",
    slug: "dubai-rooftop-dining-guide",
    excerpt: "Dubai's skyline is legendary, but seeing it from these vantage points while enjoying world-class cuisine is an experience unlike any other. Here are our top picks for the summer season.",
    author: "Elena Rodriguez",
    date: "April 28, 2026",
    category: "Food & Drink",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?auto=format&fit=crop&q=80&w=800",
    comments: 18,
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-[#0a0f1a]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)" }} />
        <div className="container px-6 md:px-12 mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              The Golden <span className="text-primary italic">Journal</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed">
              Stories, guides, and insights from the heart of the UAE. Your ultimate companion for navigating luxury and adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <div className="container px-6 md:px-12 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-20">
              {posts.map((post, index) => (
                <article key={index} className="group">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden mb-8 border border-border shadow-2xl">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-foreground font-black text-[10px] uppercase tracking-widest shadow-lg">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="flex items-center gap-6 text-muted-foreground text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2 
                      className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-primary transition-colors duration-300 leading-tight"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {post.excerpt}
                  </p>

                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 group/btn"
                  >
                    Read Full Story
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </article>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-12">
              {/* Search */}
              <div className="p-8 rounded-[2rem] bg-muted/30 border border-border">
                <h3 className="text-xl font-bold mb-6">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full h-14 pl-12 pr-6 rounded-full bg-background border border-border focus:border-primary outline-none transition-colors"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              {/* Categories */}
              <div className="p-8 rounded-[2rem] bg-muted/30 border border-border">
                <h3 className="text-xl font-bold mb-6">Categories</h3>
                <div className="space-y-4">
                  {["Travel Guide", "Visa Tips", "Lifestyle", "Food & Drink", "Culture"].map((cat) => (
                    <Link 
                      key={cat} 
                      href={`/blog?category=${cat}`}
                      className="flex items-center justify-between group"
                    >
                      <span className="text-muted-foreground group-hover:text-primary transition-colors">{cat}</span>
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                        12
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="p-8 rounded-[2rem] bg-primary text-white overflow-hidden relative shadow-2xl shadow-primary/20">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Tag className="w-24 h-24 rotate-12" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Stay Inspired</h3>
                <p className="text-white/80 mb-8">Get the latest travel guides and exclusive offers sent to your inbox.</p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full h-12 px-6 rounded-full bg-white/20 border border-white/20 placeholder:text-white/60 outline-none focus:bg-white/30 transition-all"
                  />
                  <button className="w-full h-12 rounded-full bg-white text-primary font-bold hover:bg-white/90 transition-all">
                    Subscribe
                  </button>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
