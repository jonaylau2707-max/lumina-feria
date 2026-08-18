insert into public.products (id, name, slug, description, image_url, brand_id, category_id, pricing_type, regular_price, catalog_price, fair_price, featured, active) values
  (gen_random_uuid(), 'DESOD NITRO', 'desod-nitro', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 10990, 9000, false, true),
  (gen_random_uuid(), 'DESOD ALL BLACK', 'desod-all-black', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 10990, 9000, false, true),
  (gen_random_uuid(), 'LIP OIL CHERRY NECTAR', 'lip-oil-cherry-nectar', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 10990, 9000, false, true),
  (gen_random_uuid(), 'XOOL ACTIVE', 'xool-active', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'FAIR', null, 64500, 58000, false, true),
  (gen_random_uuid(), '10 VIVE LA PASION', '10-vive-la-pasion', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'FAIR', null, 67500, 60000, false, true),
  (gen_random_uuid(), 'CREMA DE MANOS CACAO', 'crema-de-manos-cacao', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000005', 'FAIR', null, 20000, 15000, false, true),
  (gen_random_uuid(), 'SOLO PARFUM', 'solo-parfum', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'FAIR', null, 117500, 85000, false, true),
  (gen_random_uuid(), 'TEMPTATION MUJER', 'temptation-mujer', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'FAIR', null, 182000, 90000, false, true),
  (gen_random_uuid(), 'TOTAL BLOCK DERMA COLOR SPF 50', 'total-block-derma-color-spf-50', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000005', 'FAIR', null, 70500, 70000, false, true),
  (gen_random_uuid(), 'GAIA ETERNAL', 'gaia-eternal', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'FAIR', null, 157000, 95000, false, true)
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