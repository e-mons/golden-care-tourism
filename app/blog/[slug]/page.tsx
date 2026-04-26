import { Calendar, User, Clock, ChevronLeft, Share2, Bookmark, ArrowRight, Quote } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const posts = {
  "hidden-gems-dubai-2026": {
    title: "10 Hidden Gems in Dubai You Must Visit in 2026",
    content: `
      <p>Dubai is often associated with grand skyscrapers, luxury shopping, and man-made islands. However, beneath its polished exterior lies a world of hidden gems waiting to be discovered by the curious traveler. As we move into 2026, the city has evolved to embrace more cultural and natural experiences.</p>
      
      <h2>1. Ras Al Khor Wildlife Sanctuary</h2>
      <p>Just a few minutes drive from the bustling Downtown, this sanctuary is home to thousands of flamingos. It's a peaceful escape where you can watch these beautiful birds against the backdrop of the Burj Khalifa.</p>
      
      <div class="my-12 p-8 bg-muted/30 rounded-[2rem] border-l-4 border-primary italic text-xl">
        "Dubai isn't just a city of the future; it's a city that respects its natural heritage while building its destiny."
      </div>

      <h2>2. Al Bastakiya Historic District</h2>
      <p>Step back in time as you wander through the narrow alleys of the oldest standing residential area in Dubai. The wind towers and traditional courtyard houses offer a glimpse into the city's humble beginnings.</p>

      <h2>3. The Moon Lake at Al Qudra</h2>
      <p>A hidden oasis in the middle of the desert, this crescent-shaped lake is perfect for a sunset picnic or stargazing away from the city lights.</p>
    `,
    author: "Sarah Ahmed",
    authorRole: "Senior Travel Editor",
    date: "May 12, 2026",
    category: "Travel Guide",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1600",
  },
  "uae-residency-visa-guide": {
    title: "How to Secure Your UAE Residency Visa Smoothly",
    content: `
      <p>The UAE has become a global hub for business and lifestyle, attracting millions from around the world. Securing residency is the first step towards calling this vibrant country home. In this guide, we explore the various pathways to residency in 2026.</p>
      
      <h2>The Golden Visa Program</h2>
      <p>Designed for long-term residency, the Golden Visa is available to investors, entrepreneurs, and highly skilled professionals. It offers 10 years of residency and the freedom to sponsor family members.</p>

      <h2>Green Visa for Freelancers</h2>
      <p>The Green Visa is ideal for independent professionals and skilled employees, providing 5 years of residency without the need for a local sponsor.</p>
    `,
    author: "Omar Khalid",
    authorRole: "Legal Consultant",
    date: "May 08, 2026",
    category: "Visa Tips",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?auto=format&fit=crop&q=80&w=1600",
  },
  "luxury-yachting-dubai-guide": {
    title: "Luxury Yachting: A Day on the Arabian Gulf",
    content: `
      <p>There's no better way to experience Dubai's skyline than from the water. A private yacht charter offers exclusivity, luxury, and breathtaking views of iconic landmarks like the Burj Al Arab and Atlantis The Palm.</p>
      
      <h2>Choosing Your Vessel</h2>
      <p>From sleek 50-foot sport yachts to massive 150-foot superyachts, the choice depends on your group size and the type of experience you desire.</p>

      <h2>The Best Routes</h2>
      <p>A typical 4-hour charter will take you from Dubai Marina, around the Palm Jumeirah, and towards the World Islands.</p>
    `,
    author: "David Chen",
    authorRole: "Lifestyle Correspondent",
    date: "May 05, 2026",
    category: "Lifestyle",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&q=80&w=1600",
  }
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug as keyof typeof posts] || posts["hidden-gems-dubai-2026"];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Article Header */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="container px-6 md:px-12 mx-auto relative z-10">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Journal
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-widest">
                {post.category}
              </span>
              <span className="text-muted-foreground text-sm">•</span>
              <span className="text-muted-foreground text-sm">{post.readTime}</span>
            </div>

            <h1 
              className="text-4xl md:text-6xl font-bold mb-10 leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-8 py-8 border-y border-border">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-muted overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${post.author}`} alt={post.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold">{post.author}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">{post.authorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="h-12 w-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="h-12 w-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="container px-6 md:px-12 mx-auto">
        <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl">
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="py-24">
        <div className="container px-6 md:px-12 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg prose-primary max-w-none prose-headings:font-bold prose-headings:font-playfair prose-p:text-muted-foreground prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-3">
              {["Dubai", "Travel", "Luxury", "Visas", "Lifestyle"].map(tag => (
                <span key={tag} className="px-4 py-2 rounded-full bg-muted text-xs font-bold hover:bg-primary/10 hover:text-primary cursor-pointer transition-all">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Bio */}
            <div className="mt-20 p-10 rounded-[3rem] bg-muted/30 border border-border flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
              <div className="h-24 w-24 rounded-full bg-muted shrink-0 overflow-hidden ring-4 ring-white shadow-xl">
                 <img src={`https://i.pravatar.cc/150?u=${post.author}`} alt={post.author} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">{post.author}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  A seasoned travel journalist with over a decade of experience exploring the Middle East. Sarah specializes in discovering off-the-beaten-path experiences and luxury travel trends.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <Link href="#" className="text-primary font-bold text-xs uppercase tracking-widest hover:underline">Follow Author</Link>
                  <Link href="#" className="text-primary font-bold text-xs uppercase tracking-widest hover:underline">View Articles</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-24 bg-muted/30">
        <div className="container px-6 md:px-12 mx-auto">
          <h2 className="text-3xl font-bold mb-12 font-playfair">Continue Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/blog/uae-residency-visa-guide" className="group">
              <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-6">
                <img src="https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?auto=format&fit=crop&q=80&w=800" alt="Related" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">How to Secure Your UAE Residency Visa Smoothly</h3>
            </Link>
            <Link href="/blog/luxury-yachting-dubai-guide" className="group">
              <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-6">
                <img src="https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&q=80&w=800" alt="Related" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Luxury Yachting: A Day on the Arabian Gulf</h3>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
