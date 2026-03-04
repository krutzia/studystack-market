import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Shield, Sparkles, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/lib/mockData";
import heroImage from "@/assets/hero-image.jpg";

const features = [
  { icon: Shield, title: "Verified Students", desc: "College email verification ensures trusted transactions" },
  { icon: Sparkles, title: "AI-Powered", desc: "Auto-generate descriptions & get smart price suggestions" },
  { icon: Users, title: "Campus Community", desc: "Buy & sell within your own college network" },
  { icon: TrendingUp, title: "Best Prices", desc: "AI-recommended pricing for fair deals every time" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Students exchanging resources on campus" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
              <BookOpen className="h-4 w-4" />
              JSS Academy of Technical Education
            </div>
            <h1 className="mt-6 font-heading text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">
              Your Campus{" "}
              <span className="text-secondary">Marketplace</span>
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 md:text-xl">
              Buy and sell books, notes, gadgets, and study materials within your campus.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/marketplace">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 text-base">
                  Browse Marketplace <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/sell">
                <Button size="lg" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 gap-2 text-base">
                  Start Selling
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-center font-heading text-3xl font-bold text-foreground">
          Why CampusKart?
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Listings */}
      <section className="container mx-auto px-4 pb-20">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-foreground">Recent Listings</h2>
          <Link to="/marketplace">
            <Button variant="ghost" className="gap-1 text-primary">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mockProducts.slice(0, 3).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
