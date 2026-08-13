-- Public storefront reads use only the anon role. Authenticated access belongs
-- to the admin policies, avoiding overlapping permissive SELECT policies.
drop policy if exists "Public reads active brands" on public.brands;
drop policy if exists "Public reads active categories" on public.categories;
drop policy if exists "Public reads active products" on public.products;

create policy "Public reads active brands"
on public.brands for select to anon using (active);

create policy "Public reads active categories"
on public.categories for select to anon using (active);

create policy "Public reads active products"
on public.products for select to anon using (active);

-- These public RPCs always use a dedicated anonymous client in the app.
-- Signed-in administrators do not need direct execution rights.
revoke execute on function public.create_order(text, text, text, text, jsonb) from authenticated;
revoke execute on function public.get_order_confirmation(uuid) from authenticated;

-- The RLS helper is only needed while evaluating authenticated admin policies.
revoke execute on function public.is_admin() from anon;

-- A public bucket serves known object URLs without a broad objects SELECT
-- policy. Removing it prevents unauthenticated bucket listing.
drop policy if exists "Public reads product images" on storage.objects;

-- Cover both foreign keys used by order history and product deletion checks.
create index if not exists order_items_product_idx
on public.order_items(product_id);
