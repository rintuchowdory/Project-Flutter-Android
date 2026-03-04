
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2, Zap, Layout, ShieldCheck } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary animate-in fade-in slide-in-from-top-4 duration-1000">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Revolutionize your writing</span>
              </div>
              <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight animate-in fade-in slide-in-from-top-8 duration-1000 delay-100">
                Forge Ideas into <span className="text-primary italic">Powerful</span> Narratives
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body animate-in fade-in slide-in-from-top-12 duration-1000 delay-200">
                AI TextForge combines sophisticated design with cutting-edge AI to help you create, refine, and perfect your content in seconds.
              </p>
              <div className="flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-top-16 duration-1000 delay-300">
                <Link href="/text-generation">
                  <Button size="lg" className="h-14 px-8 text-lg font-bold gap-2 shadow-lg shadow-primary/25">
                    <Wand2 className="w-5 h-5" />
                    Try TextForge Free
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold">
                  View Examples
                </Button>
              </div>
            </div>
          </div>
          
          {/* Background Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
        </section>

        {/* Feature Grid */}
        <section className="py-24 bg-card/30 border-y">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-card border hover:border-primary/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">Instant Generation</h3>
                <p className="text-muted-foreground">
                  Get high-quality text responses in milliseconds using our optimized server-side processing.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-card border hover:border-primary/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Layout className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">Responsive Interface</h3>
                <p className="text-muted-foreground">
                  Draft content seamlessly across all devices with our ultra-clean, mobile-first design.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-card border hover:border-primary/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">Secure & Reliable</h3>
                <p className="text-muted-foreground">
                  Your prompts and results are handled with production-grade security and reliability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Showcase */}
        <section className="py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 space-y-8">
                <h2 className="font-headline text-4xl font-bold tracking-tight">
                  Designed for the <span className="text-secondary">Modern Writer</span>
                </h2>
                <p className="text-lg text-muted-foreground font-body">
                  We believe that tools should inspire. AI TextForge is built with a focused, distraction-free environment that lets your ideas take center stage.
                </p>
                <ul className="space-y-4">
                  {['Minimalist interface', 'High contrast readability', 'Intuitive action controls'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 relative">
                <div className="rounded-2xl overflow-hidden border shadow-2xl relative aspect-video">
                  <Image 
                    src={heroImage?.imageUrl || ""} 
                    alt={heroImage?.description || ""}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage?.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 blur-2xl rounded-full" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/20 blur-2xl rounded-full" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-card/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground font-medium">
            &copy; {new Date().getFullYear()} AI TextForge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
