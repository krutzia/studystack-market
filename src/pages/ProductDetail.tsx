import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BadgeCheck, MessageCircle, Star, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ChatDialog from "@/components/ChatDialog";

interface ProductData {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  category: string;
  condition: string;
  image_url: string | null;
  user_id: string;
  created_at: string;
  profiles: {
    full_name: string | null;
    verified: boolean | null;
    rating: number | null;
    college: string | null;
  } | null;
}

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("products")
        .select("*, profiles!products_user_id_fkey(full_name, verified, rating, college)")
        .eq("id", id!)
        .single() as { data: ProductData | null };

      setProduct(data);
      setLoading(false);
    };
    if (id) fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

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

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null;

  const sellerName = product.profiles?.full_name || "Anonymous";
  const sellerInitials = sellerName.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const isOwnProduct = user?.id === product.user_id;

  const handleChatClick = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setChatOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/marketplace" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Marketplace
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-border">
          <img
            src={product.image_url || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop"}
            alt={product.name}
            className="h-full w-full object-cover aspect-[4/3]"
          />
        </div>

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
            {product.original_price && (
              <>
                <span className="text-lg text-muted-foreground line-through">₹{product.original_price}</span>
                <Badge className="bg-accent text-accent-foreground">{discount}% off</Badge>
              </>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
            <Tag className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">AI Price Check</p>
              <p className="text-xs text-muted-foreground">
                Market average: ₹{product.original_price ? Math.round(product.original_price * 0.55) : product.price + 50} — This is a great deal!
              </p>
            </div>
          </div>

          {product.description && (
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          )}

          {/* Seller */}
          <div className="mt-8 rounded-xl border border-border bg-muted/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Seller</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {sellerInitials}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-semibold text-foreground">{sellerName}</span>
                  {product.profiles?.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                  {product.profiles?.rating || 0} · {product.profiles?.college || "JSSATE"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            {!isOwnProduct && (
              <Button size="lg" className="flex-1 gap-2" onClick={handleChatClick}>
                <MessageCircle className="h-4 w-4" /> Message Seller
              </Button>
            )}
            <Button size="lg" variant="outline" className="flex-1">
              Make an Offer
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground text-center">
            Posted {new Date(product.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Chat Dialog */}
      {user && !isOwnProduct && (
        <ChatDialog
          open={chatOpen}
          onOpenChange={setChatOpen}
          productId={product.id}
          productName={product.name}
          sellerId={product.user_id}
          sellerName={sellerName}
        />
      )}
    </div>
  );
};

export default ProductDetail;
