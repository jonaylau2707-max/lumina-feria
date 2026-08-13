create extension if not exists pgcrypto;

create type public.pricing_type as enum ('FIXED', 'FAIR');
create type public.order_status as enum ('NEW', 'CONFIRMED', 'CANCELLED');

create table public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 2 and 120),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  logo_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  image_url text,
  description text check (description is null or char_length(description) <= 300),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text not null check (char_length(description) between 10 and 2000),
  image_url text,
  brand_id uuid not null references public.brands(id) on delete restrict,
  category_id uuid not null references public.categories(id) on delete restrict,
  pricing_type public.pricing_type not null,
  regular_price numeric(12, 2),
  catalog_price numeric(12, 2),
  fair_price numeric(12, 2),
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_pricing_check check (
    (pricing_type = 'FIXED' and regular_price > 0 and catalog_price is null and fair_price is null)
    or
    (pricing_type = 'FAIR' and regular_price is null and catalog_price > 0 and fair_price > 0 and fair_price < catalog_price)
  )
);

create sequence public.order_number_seq start 1001;

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  public_token uuid not null default gen_random_uuid() unique,
  order_number text not null unique default (
    'LUM-' || extract(year from now())::text || '-' || lpad(nextval('public.order_number_seq')::text, 5, '0')
  ),
  first_name text not null check (char_length(first_name) between 2 and 60),
  last_name text not null check (char_length(last_name) between 2 and 60),
  phone text not null check (char_length(phone) between 7 and 25),
  notes text check (notes is null or char_length(notes) <= 500),
  status public.order_status not null default 'NEW',
  total numeric(12, 2) not null check (total > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_image_url text,
  unit_price numeric(12, 2) not null check (unit_price > 0),
  quantity integer not null check (quantity between 1 and 99),
  subtotal numeric(12, 2) not null check (subtotal > 0),
  created_at timestamptz not null default now()
);

create index products_active_featured_idx on public.products(active, featured);
create index products_brand_idx on public.products(brand_id);
create index products_category_idx on public.products(category_id);
create index orders_status_created_idx on public.orders(status, created_at desc);
create index orders_phone_idx on public.orders(phone);
create index order_items_order_idx on public.order_items(order_id);

create or replace function public.set_updated_at()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger brands_updated_at before update on public.brands for each row execute function public.set_updated_at();
create trigger categories_updated_at before update on public.categories for each row execute function public.set_updated_at();
create trigger products_updated_at before update on public.products for each row execute function public.set_updated_at();
create trigger orders_updated_at before update on public.orders for each row execute function public.set_updated_at();
create trigger admin_profiles_updated_at before update on public.admin_profiles for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.admin_profiles where id = (select auth.uid()));
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.admin_profiles enable row level security;
alter table public.brands enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "Public reads active brands" on public.brands for select to anon, authenticated using (active or public.is_admin());
create policy "Public reads active categories" on public.categories for select to anon, authenticated using (active or public.is_admin());
create policy "Public reads active products" on public.products for select to anon, authenticated using (active or public.is_admin());
create policy "Admins manage brands" on public.brands for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage categories" on public.categories for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage products" on public.products for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins read profiles" on public.admin_profiles for select to authenticated using (public.is_admin());
create policy "Admins read orders" on public.orders for select to authenticated using (public.is_admin());
create policy "Admins update orders" on public.orders for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins read order items" on public.order_items for select to authenticated using (public.is_admin());

create or replace function public.create_order(
  customer_first_name text,
  customer_last_name text,
  customer_phone text,
  customer_notes text,
  cart_items jsonb
)
returns table(order_id uuid, order_token uuid, created_order_number text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_order_id uuid;
  new_token uuid;
  new_number text;
  computed_total numeric(12, 2);
begin
  if char_length(trim(customer_first_name)) not between 2 and 60
    or char_length(trim(customer_last_name)) not between 2 and 60
    or char_length(trim(customer_phone)) not between 7 and 25
    or customer_notes is not null and char_length(trim(customer_notes)) > 500 then
    raise exception 'INVALID_CUSTOMER_DATA';
  end if;

  if jsonb_typeof(cart_items) <> 'array' or jsonb_array_length(cart_items) < 1 or jsonb_array_length(cart_items) > 50 then
    raise exception 'INVALID_CART';
  end if;

  with requested as (
    select product_id::uuid, quantity::integer
    from jsonb_to_recordset(cart_items) as x(product_id text, quantity integer)
  ), priced as (
    select p.id, r.quantity,
      case when p.pricing_type = 'FAIR' then p.fair_price else p.regular_price end as unit_price
    from requested r
    join public.products p on p.id = r.product_id and p.active
    where r.quantity between 1 and 99
  )
  select sum(unit_price * quantity) into computed_total from priced;

  if computed_total is null
    or (select count(*) from jsonb_array_elements(cart_items)) <>
       (select count(*) from jsonb_to_recordset(cart_items) as x(product_id text, quantity integer)
        join public.products p on p.id = x.product_id::uuid and p.active where x.quantity between 1 and 99) then
    raise exception 'INVALID_CART';
  end if;

  insert into public.orders(first_name, last_name, phone, notes, total)
  values(trim(customer_first_name), trim(customer_last_name), trim(customer_phone), nullif(trim(customer_notes), ''), computed_total)
  returning id, public_token, order_number into new_order_id, new_token, new_number;

  insert into public.order_items(order_id, product_id, product_name, product_image_url, unit_price, quantity, subtotal)
  select new_order_id, p.id, p.name, p.image_url,
    case when p.pricing_type = 'FAIR' then p.fair_price else p.regular_price end,
    x.quantity,
    (case when p.pricing_type = 'FAIR' then p.fair_price else p.regular_price end) * x.quantity
  from jsonb_to_recordset(cart_items) as x(product_id text, quantity integer)
  join public.products p on p.id = x.product_id::uuid and p.active;

  return query select new_order_id, new_token, new_number;
end;
$$;

revoke all on function public.create_order(text, text, text, text, jsonb) from public;
grant execute on function public.create_order(text, text, text, text, jsonb) to anon, authenticated;

create or replace function public.get_order_confirmation(token uuid)
returns jsonb language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'id', o.id,
    'order_number', o.order_number,
    'first_name', o.first_name,
    'last_name', o.last_name,
    'phone', o.phone,
    'notes', o.notes,
    'status', o.status,
    'total', o.total,
    'created_at', o.created_at,
    'order_items', coalesce(jsonb_agg(to_jsonb(oi) order by oi.created_at), '[]'::jsonb)
  )
  from public.orders o
  left join public.order_items oi on oi.order_id = o.id
  where o.public_token = token
  group by o.id;
$$;

revoke all on function public.get_order_confirmation(uuid) from public;
grant execute on function public.get_order_confirmation(uuid) to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "Public reads product images" on storage.objects for select to public using (bucket_id = 'product-images');
create policy "Admins upload product images" on storage.objects for insert to authenticated with check (bucket_id = 'product-images' and public.is_admin());
create policy "Admins update product images" on storage.objects for update to authenticated using (bucket_id = 'product-images' and public.is_admin()) with check (bucket_id = 'product-images' and public.is_admin());
create policy "Admins delete product images" on storage.objects for delete to authenticated using (bucket_id = 'product-images' and public.is_admin());
