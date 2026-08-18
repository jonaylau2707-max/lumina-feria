insert into public.products (id, name, slug, description, image_url, brand_id, category_id, pricing_type, regular_price, catalog_price, fair_price, featured, active) values
  (gen_random_uuid(), 'MANGO METALICO PLASTIFICADO X 6', 'mango-metalico-plastificado-x-6', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 8000, 6555, false, true),
  (gen_random_uuid(), 'ESPONJA OLLA Y PARR X 3', 'esponja-olla-y-parr-x-3', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 5499, 4743, false, true),
  (gen_random_uuid(), 'ESPONJILLA MULTIUSOS ARCOIRIS X 3', 'esponjilla-multiusos-arcoiris-x-3', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 2766, 2386, false, true),
  (gen_random_uuid(), 'VINAGRE LIMPIADOR MULTIUSOS 3,785 ML', 'vinagre-limpiador-multiusos-3-785-ml', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 23799, 20526, false, true),
  (gen_random_uuid(), 'DESENGRASANTE MULTIUSO X 2000 CC', 'desengrasante-multiuso-x-2000-cc', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 41999, 36224, false, true),
  (gen_random_uuid(), 'JABON AZUL LIQUIDO BARRA 2000 CC', 'jabon-azul-liquido-barra-2000-cc', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000001', 'FAIR', null, 17499, 15428, false, true),
  (gen_random_uuid(), 'ROLLO PAÑO MICROFIBRA GRIS X 12 UN', 'rollo-pano-microfibra-gris-x-12-un', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 30999, 26736, false, true),
  (gen_random_uuid(), 'ROLLO PAÑO MICROFIBRA BLANCO X 12 UN', 'rollo-pano-microfibra-blanco-x-12-un', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 30999, 26736, false, true),
  (gen_random_uuid(), 'JABON LIQUIDO MULTIUSOS X 3785 CC', 'jabon-liquido-multiusos-x-3785-cc', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 30000, 25875, false, true),
  (gen_random_uuid(), 'DESINFECTANTE INODOROS X 500 CC', 'desinfectante-inodoros-x-500-cc', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 11000, 9488, false, true)
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