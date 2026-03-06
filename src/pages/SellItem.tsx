import { useState, useRef, useCallback } from "react";
import { Upload, Sparkles, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const SellItem = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [generating, setGenerating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const validateAndSetImage = (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast({ title: "Invalid file type", description: "Please upload a JPG, PNG, or WebP image.", variant: "destructive" });
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast({ title: "File too large", description: "Maximum file size is 5MB.", variant: "destructive" });
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSetImage(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSetImage(file);
  }, []);

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({ title: "Please sign in to sell items", variant: "destructive" });
      navigate("/auth");
      return;
    }

    if (!name || !price || !category || !condition) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    let imageUrl: string | null = null;

    try {
      // Upload image if selected
      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const filePath = `${user.id}/${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);
        imageUrl = urlData.publicUrl;
      }

      // Insert product
      const { error: insertError } = await supabase.from("products" as any).insert({
        user_id: user.id,
        name,
        description,
        price: parseFloat(price),
        original_price: null,
        category,
        condition,
        image_url: imageUrl,
      } as any);

      if (insertError) throw insertError;

      toast({ title: "🎉 Item posted successfully!", description: "Your item is now live on the marketplace." });
      navigate("/marketplace");
    } catch (err: any) {
      toast({ title: "Error posting item", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-heading text-3xl font-bold text-foreground">Sell an Item</h1>
      <p className="mt-1 text-muted-foreground">List your item for students at JSSATE</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Image Upload */}
        <div>
          <Label>Product Image</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
            className="hidden"
          />
          {imagePreview ? (
            <div className="relative mt-2 overflow-hidden rounded-xl border border-border">
              <img src={imagePreview} alt="Preview" className="h-56 w-full object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 text-foreground backdrop-blur-sm hover:bg-background"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`mt-2 flex h-40 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
                dragOver ? "border-primary bg-primary/5" : "border-border bg-muted/50 hover:border-primary/50"
              }`}
            >
              <div className="text-center">
                <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">JPG, PNG or WebP (max 5MB)</p>
              </div>
            </div>
          )}
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

        <Button type="submit" size="lg" className="w-full bg-gradient-accent border-0 text-secondary-foreground text-base" disabled={submitting}>
          {submitting ? "Posting..." : "Post Item for Sale"}
        </Button>
      </form>
    </div>
  );
};

export default SellItem;
