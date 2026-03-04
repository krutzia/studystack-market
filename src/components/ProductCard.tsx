import { Link } from "react-router-dom";
import { Star, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/mockData";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
          {product.category}
        </Badge>
        {product.condition === "New" && (
          <Badge className="absolute right-3 top-3 bg-accent text-accent-foreground">
            New
          </Badge>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-heading text-lg font-bold text-primary">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
              {product.seller.avatar}
            </div>
            <span className="text-xs text-muted-foreground">{product.seller.name}</span>
            {product.seller.verified && (
              <BadgeCheck className="h-3.5 w-3.5 text-primary" />
            )}
          </div>
          <div className="flex items-center gap-0.5">
            <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
            <span className="text-xs font-medium text-foreground">{product.seller.rating}</span>
          </div>
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">{product.postedAt}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
