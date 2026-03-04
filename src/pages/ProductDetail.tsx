import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BadgeCheck, MessageCircle, Star, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProducts } from "@/lib/mockData";

const ProductDetail = () => {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-lg text-muted-foreground">Product not found</p>
        <Link to="/marketplace">
          <Button className="mt-4">Back to Marketplace</Button>
        </Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/marketplace" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Marketplace
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-2xl border border-border">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover aspect-[4/3]" />
        </div>

        {/* Info */}
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{product.category}</Badge>
            <Badge variant="outline">{product.condition}</Badge>
          </div>

          <h1 className="mt-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-heading text-3xl font-bold text-primary">₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
                <Badge className="bg-accent text-accent-foreground">{discount}% off</Badge>
              </>
            )}
          </div>

          {/* AI Price Suggestion mock */}
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
            <Tag className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">AI Price Check</p>
              <p className="text-xs text-muted-foreground">
                Market average: ₹{product.originalPrice ? Math.round(product.originalPrice * 0.55) : product.price + 50} — This is a great deal!
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Seller */}
          <div className="mt-8 rounded-xl border border-border bg-muted/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Seller</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {product.seller.avatar}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-semibold text-foreground">{product.seller.name}</span>
                  {product.seller.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                  {product.seller.rating} · {product.seller.college}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button size="lg" className="flex-1 gap-2">
              <MessageCircle className="h-4 w-4" /> Chat with Seller
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              Make an Offer
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground text-center">Posted {product.postedAt}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
