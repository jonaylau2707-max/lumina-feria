insert into public.products (id, name, slug, description, image_url, brand_id, category_id, pricing_type, regular_price, catalog_price, fair_price, featured, active) values
  (gen_random_uuid(), 'POMOS TRIANGULARES X 2 UND', 'pomos-triangulares-x-2-und', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000004', 'FAIR', null, 9900, 8640, false, true),
  (gen_random_uuid(), 'BASE LIQUIDA  KOLOR FACTORY # 3', 'base-liquida-kolor-factory-3', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 16500, 14445, false, true),
  (gen_random_uuid(), 'BRILLO DE LABIOS KOLOR FACTORY LIP OIL #101', 'brillo-de-labios-kolor-factory-lip-oil-101', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 8900, 7830, false, true),
  (gen_random_uuid(), 'BRILLO DE LABIOS KOLOR FACTORY LIP OIL #102', 'brillo-de-labios-kolor-factory-lip-oil-102', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 8900, 7830, false, true),
  (gen_random_uuid(), 'BRILLO DE LABIOS KOLOR FACTORY LIP OIL #103', 'brillo-de-labios-kolor-factory-lip-oil-103', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 8900, 7830, false, true),
  (gen_random_uuid(), 'POLVO COMPACTO KOLOR FACTORY # 01', 'polvo-compacto-kolor-factory-01', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 10500, 9180, false, true),
  (gen_random_uuid(), 'POLVO COMPACTO KOLOR FACTORY # 02', 'polvo-compacto-kolor-factory-02', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 10500, 9180, false, true),
  (gen_random_uuid(), 'POLVO COMPACTO KOLOR FACTORY # 03', 'polvo-compacto-kolor-factory-03', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 10500, 9180, false, true),
  (gen_random_uuid(), 'BALSAMO LABIOS PEPTIDOS KOLOR FACTORY # 103', 'balsamo-labios-peptidos-kolor-factory-103', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 15000, 10395, false, true),
  (gen_random_uuid(), 'CREMA FACIAL HIDRATANTE SAMY 50 GR', 'crema-facial-hidratante-samy-50-gr', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000005', 'FAIR', null, 40800, 37800, false, true)
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