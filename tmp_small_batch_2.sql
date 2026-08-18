insert into public.products (id, name, slug, description, image_url, brand_id, category_id, pricing_type, regular_price, catalog_price, fair_price, featured, active) values
  (gen_random_uuid(), 'TOTAL BLOCK DERMA FUSION SPF 50', 'total-block-derma-fusion-spf-50', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000005', 'FAIR', null, 70500, 70000, false, true),
  (gen_random_uuid(), 'BASE ANTIEDAD EFECT LIFTING', 'base-antiedad-efect-lifting', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 58500, 55000, false, true),
  (gen_random_uuid(), 'ZENTRO', 'zentro', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'FAIR', null, 125000, 100000, false, true),
  (gen_random_uuid(), 'OHM PARFUM', 'ohm-parfum', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'FAIR', null, 136000, 100000, false, true),
  (gen_random_uuid(), 'BIOMILK', 'biomilk', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000005', 'FAIR', null, 45000, 54600, false, true),
  (gen_random_uuid(), 'DESODORANTES YANBAL', 'desodorantes-yanbal', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 12500, 10500, false, true),
  (gen_random_uuid(), 'TEMPTATION HOMBRE', 'temptation-hombre', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'FAIR', null, 149500, 90000, false, true),
  (gen_random_uuid(), 'DENDUR EAU DE PARFUM', 'dendur-eau-de-parfum', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'FAIR', null, 149500, 95000, false, true),
  (gen_random_uuid(), 'AGUA MICELAR SAMY X 125 ML', 'agua-micelar-samy-x-125-ml', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000005', 'FAIR', null, 11300, 9855, false, true),
  (gen_random_uuid(), 'AGUA MICELAR SAMY X 125 ML DERMATOLOGICA', 'agua-micelar-samy-x-125-ml-dermatologica', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000005', 'FAIR', null, 14300, 12420, false, true)
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