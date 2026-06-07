import { Heart, Package } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/lib/mockData";
import { useFavorites } from "@/hooks/useFavorites";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { favorites } = useFavorites();
  const favProducts = mockProducts.filter((p) => favorites.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
            G
          </div>
          <div className="text-center md:text-left">
            <h1 className="font-heading text-2xl font-bold text-foreground">Guest</h1>
            <p className="text-sm text-muted-foreground">Browsing in guest mode</p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Heart className="h-3.5 w-3.5" /> {favorites.length} saved
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" /> Your Favorites
        </h2>
        {favProducts.length === 0 ? (
          <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center">
            <Package className="h-10 w-10 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">No favorites yet</p>
            <Link to="/marketplace" className="mt-4">
              <Button>Browse Marketplace</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {favProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
