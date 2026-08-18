insert into public.products (id, name, slug, description, image_url, brand_id, category_id, pricing_type, regular_price, catalog_price, fair_price, featured, active) values
  (gen_random_uuid(), 'LIMP DESINFECTANTE MAGIA TROP 1000 ML', 'limp-desinfectante-magia-trop-1000-ml', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 6999, 6036, false, true),
  (gen_random_uuid(), 'CREMA LAVAPLATOS 1000 GR', 'crema-lavaplatos-1000-gr', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 6999, 6036, false, true),
  (gen_random_uuid(), 'ACONDICIONADOR PREPLANCHADO 500 ML', 'acondicionador-preplanchado-500-ml', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 10229, 2566, false, true),
  (gen_random_uuid(), 'SUAVIZANTE CARICIA EXT 1000 CC', 'suavizante-caricia-ext-1000-cc', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 9799, 8451, false, true),
  (gen_random_uuid(), 'VARSOL ECOLOGICO BIO 2000 CC', 'varsol-ecologico-bio-2000-cc', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 19999, 17249, false, true),
  (gen_random_uuid(), 'PROTECTOR SOLAR FPS 50ML', 'protector-solar-fps-50ml', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000005', 'FAIR', null, 40000, 31199, false, true),
  (gen_random_uuid(), 'JABON LIQUIDO MULTIUSOS X 1 LT REENVASADO', 'jabon-liquido-multiusos-x-1-lt-reenvasado', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 12000, 10000, false, true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  image_url = excluded.image_url,
  brand_id = excluded.brand_id,
  category_id = excluded.category_id,
  pricing_type = excluded.pricing_type,
  regular_price = excluded.regular_price,
  catalog_price = excluded.catalog_price,
  fair_price = excluded.fair_price,
  featured = excluded.featured,
  active = excluded.active;