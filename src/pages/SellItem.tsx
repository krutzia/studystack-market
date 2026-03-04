import { useState } from "react";
import { Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

const SellItem = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleGenerateDescription = () => {
    if (!name || !condition) {
      toast({ title: "Enter product name and condition first", variant: "destructive" });
      return;
    }
    setGenerating(true);
    setTimeout(() => {
      setDescription(
        `This ${name} is in ${condition.toLowerCase()} condition and is ideal for engineering students. Perfect for exam preparation and academic reference. Well-maintained and ready for use.`
      );
      setGenerating(false);
      toast({ title: "✨ AI description generated!" });
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "🎉 Item posted successfully!", description: "Your item is now live on the marketplace." });
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-heading text-3xl font-bold text-foreground">Sell an Item</h1>
      <p className="mt-1 text-muted-foreground">List your item for students at JSSATE</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Image Upload */}
        <div>
          <Label>Product Image</Label>
          <div className="mt-2 flex h-40 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 transition-colors hover:border-primary/50">
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Engineering Mechanics Book" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="price">Price (₹)</Label>
            <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="250" className="mt-1.5" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Condition</Label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select condition" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Used">Used</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="desc">Description</Label>
            <Button type="button" size="sm" variant="ghost" className="gap-1 text-primary" onClick={handleGenerateDescription} disabled={generating}>
              <Sparkles className="h-3.5 w-3.5" />
              {generating ? "Generating..." : "AI Generate"}
            </Button>
          </div>
          <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your item..." className="mt-1.5 min-h-[120px]" />
        </div>

        <Button type="submit" size="lg" className="w-full bg-gradient-accent border-0 text-secondary-foreground text-base">
          Post Item for Sale
        </Button>
      </form>
    </div>
  );
};

export default SellItem;
