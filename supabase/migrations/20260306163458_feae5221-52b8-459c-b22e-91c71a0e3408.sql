
-- Create products table
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  original_price numeric,
  category text NOT NULL DEFAULT 'Other',
  condition text NOT NULL DEFAULT 'Used',
  image_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Everyone can view products
CREATE POLICY "Products are viewable by everyone" ON public.products
  FOR SELECT USING (true);

-- Authenticated users can insert their own products
CREATE POLICY "Users can insert their own products" ON public.products
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own products
CREATE POLICY "Users can update their own products" ON public.products
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own products
CREATE POLICY "Users can delete their own products" ON public.products
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Updated_at trigger
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

-- Storage policies
CREATE POLICY "Anyone can view product images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Users can delete their own product images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'product-images' AND (storage.foldername(name))[1] = auth.uid()::text);
