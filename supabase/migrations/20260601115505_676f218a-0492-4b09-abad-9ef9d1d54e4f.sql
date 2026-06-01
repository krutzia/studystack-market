-- Allow guest (unauthenticated) posting now that authentication is removed
ALTER TABLE public.products ALTER COLUMN user_id DROP NOT NULL;

DROP POLICY IF EXISTS "Users can insert their own products" ON public.products;
DROP POLICY IF EXISTS "Users can update their own products" ON public.products;
DROP POLICY IF EXISTS "Users can delete their own products" ON public.products;

CREATE POLICY "Anyone can insert products"
ON public.products FOR INSERT TO anon, authenticated
WITH CHECK (true);

GRANT INSERT ON public.products TO anon;

-- Allow public uploads to product-images bucket
DROP POLICY IF EXISTS "Users can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Owners can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Owners can delete product images" ON storage.objects;

CREATE POLICY "Anyone can upload product images"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'product-images');
