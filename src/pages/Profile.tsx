import { BadgeCheck, Star, Package, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/lib/mockData";

const Profile = () => {
  const userListings = mockProducts.slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
            AS
          </div>
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <h1 className="font-heading text-2xl font-bold text-foreground">Arjun Sharma</h1>
              <BadgeCheck className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">arjun.sharma@jssaten.ac.in</p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                <BadgeCheck className="mr-1 h-3 w-3" /> Verified Student
              </Badge>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-secondary text-secondary" /> 4.5 rating
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Package className="h-3.5 w-3.5" /> 12 items sold
              </span>
            </div>
          </div>
          <div className="md:ml-auto">
            <Button variant="outline" className="gap-1.5">
              <MessageCircle className="h-4 w-4" /> Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="mt-8">
        <h2 className="font-heading text-xl font-bold text-foreground">Your Listings</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {userListings.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
