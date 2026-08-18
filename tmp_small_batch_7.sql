insert into public.products (id, name, slug, description, image_url, brand_id, category_id, pricing_type, regular_price, catalog_price, fair_price, featured, active) values
  (gen_random_uuid(), 'BLANQUEADOR SIN CLORO X 1000 CC', 'blanqueador-sin-cloro-x-1000-cc', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 9199, 7934, false, true),
  (gen_random_uuid(), 'PLANQUEADOR SIN CLORO X 2000 CC', 'planqueador-sin-cloro-x-2000-cc', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000001', 'FAIR', null, 16099, 13886, false, true),
  (gen_random_uuid(), 'DESMAQUILLANTE BIFASICO', 'desmaquillante-bifasico', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000005', 'FAIR', null, 30000, 16100, false, true),
  (gen_random_uuid(), 'DETERG PRENDAS OSCURAS 2 LT', 'deterg-prendas-oscuras-2-lt', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 19999, 17249, false, true),
  (gen_random_uuid(), 'LIMPIA HOR. Y PARRI. LIMON 2000 CC', 'limpia-hor-y-parri-limon-2000-cc', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 19999, 17249, false, true),
  (gen_random_uuid(), 'VARSOL ECOLOGICO BIO 3785', 'varsol-ecologico-bio-3785', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 24150, 20829, false, true),
  (gen_random_uuid(), 'AROMATIZANTE DE TELAS 500 CC', 'aromatizante-de-telas-500-cc', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 38200, 32946, false, true),
  (gen_random_uuid(), 'LIMP DESINFECTANTE BICARBONATO 1000 ML', 'limp-desinfectante-bicarbonato-1000-ml', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 12999, 11212, false, true),
  (gen_random_uuid(), 'LIMP DESINFECTANTE CITRONELA 1000 ML', 'limp-desinfectante-citronela-1000-ml', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 7699, 6640, false, true),
  (gen_random_uuid(), 'LIMP DESINFECTANTE BRISAS BOSQ 1000 ML', 'limp-desinfectante-brisas-bosq-1000-ml', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 6999, 6036, false, true)
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