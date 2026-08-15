-- Only authenticated users recognized by the existing is_admin() helper can
-- delete orders. order_items are removed by their ON DELETE CASCADE foreign key.
grant delete on table public.orders to authenticated;

create policy "Admins delete orders"
on public.orders
for delete
to authenticated
using ((select public.is_admin()));
