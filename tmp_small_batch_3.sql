insert into public.products (id, name, slug, description, image_url, brand_id, category_id, pricing_type, regular_price, catalog_price, fair_price, featured, active) values
  (gen_random_uuid(), 'BRILLO DE LABIOS DIAMOND SPARKS # 1', 'brillo-de-labios-diamond-sparks-1', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 16000, 13905, false, true),
  (gen_random_uuid(), 'BRILLO DE LABIOS DIAMOND SPARKS # 2', 'brillo-de-labios-diamond-sparks-2', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 16000, 13905, false, true),
  (gen_random_uuid(), 'BRILLO DE LABIOS DIAMOND SPARKS # 3', 'brillo-de-labios-diamond-sparks-3', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 16000, 13905, false, true),
  (gen_random_uuid(), 'LABIAL LIQUIDO SAMY MATE SOFT MATTE # 2', 'labial-liquido-samy-mate-soft-matte-2', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 25900, 17280, false, true),
  (gen_random_uuid(), 'LABIAL LIQUIDO SAMY MATE SOFT MATTE # 6', 'labial-liquido-samy-mate-soft-matte-6', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 25900, 17280, false, true),
  (gen_random_uuid(), 'DELINEADOR MARCADOR PERFECT SAMY NEGRO', 'delineador-marcador-perfect-samy-negro', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 21000, 18225, false, true),
  (gen_random_uuid(), 'PALETA SOMBRAS SAMY X 9 NUDE', 'paleta-sombras-samy-x-9-nude', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 28200, 24570, false, true),
  (gen_random_uuid(), 'PALETA SOMBRAS SAMY X 9 BRONZE', 'paleta-sombras-samy-x-9-bronze', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 28200, 24570, false, true),
  (gen_random_uuid(), 'MASCARA PETAÑAS SAMY 3D NEGRO', 'mascara-petanas-samy-3d-negro', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 11000, 9585, false, true),
  (gen_random_uuid(), 'POMOS REDONDOS X 2 UND', 'pomos-redondos-x-2-und', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000004', 'FAIR', null, 9900, 8640, false, true)
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