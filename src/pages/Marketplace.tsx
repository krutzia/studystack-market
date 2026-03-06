import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { mockProducts, categories, type Category, type Product } from "@/lib/mockData";
import { supabase } from "@/integrations/supabase/client";

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [dbProducts, setDbProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data: products } = await supabase
        .from("products" as any)
        .select("*, profiles!products_user_id_fkey(full_name, verified, rating, avatar_url, college)")
        .order("created_at", { ascending: false }) as any;

      if (products) {
        const mapped: Product[] = products.map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description || "",
          price: p.price,
          originalPrice: p.original_price,
          category: p.category as Category,
          condition: p.condition,
          image: p.image_url || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
          seller: {
            name: p.profiles?.full_name || "Anonymous",
            avatar: (p.profiles?.full_name || "A").split(" ").map((n: string) => n[0]).join("").slice(0, 2),
            rating: p.profiles?.rating || 0,
            verified: p.profiles?.verified || false,
            college: p.profiles?.college || "JSSATE",
          },
          postedAt: new Date(p.created_at).toLocaleDateString(),
        }));
        setDbProducts(mapped);
      }
    };
    fetchProducts();
  }, []);

  const allProducts = useMemo(() => [...dbProducts, ...mockProducts], [dbProducts]);

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory, allProducts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-bold text-foreground">Marketplace</h1>
      <p className="mt-1 text-muted-foreground">Browse items from verified JSSATE students</p>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search for books, gadgets, notes..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" variant={activeCategory === "All" ? "default" : "outline"} onClick={() => setActiveCategory("All")}>All</Button>
        {categories.map((c) => (
          <Button key={c} size="sm" variant={activeCategory === c ? "default" : "outline"} onClick={() => setActiveCategory(c)}>{c}</Button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-lg font-medium text-muted-foreground">No items found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
