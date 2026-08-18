insert into public.products (id, name, slug, description, image_url, brand_id, category_id, pricing_type, regular_price, catalog_price, fair_price, featured, active) values
  (gen_random_uuid(), 'CREMA FACIAL NUTRITIVA SAMY 50 GR', 'crema-facial-nutritiva-samy-50-gr', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000005', 'FAIR', null, 40800, 37800, false, true),
  (gen_random_uuid(), 'CONTORNO DE OJOS REVITALIZANTE SAMY', 'contorno-de-ojos-revitalizante-samy', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000005', 'FAIR', null, 31900, 27810, false, true),
  (gen_random_uuid(), 'CREMA DIA Q10+ACIDO HIALURON X 60 ML BYPHASE', 'crema-dia-q10-acido-hialuron-x-60-ml-byphase', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000001', 'FAIR', null, 52900, 45765, false, true),
  (gen_random_uuid(), 'SUERO FACIAL REAFIRMANTE N2 X 50ML BYPHASE', 'suero-facial-reafirmante-n2-x-50ml-byphase', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000005', 'FAIR', null, 50500, 44145, false, true),
  (gen_random_uuid(), 'SUERO FACIAL ANTIARRUGAS RETINOL X 50 ML BYPHASE', 'suero-facial-antiarrugas-retinol-x-50-ml-byphase', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000005', 'FAIR', null, 50500, 44010, false, true),
  (gen_random_uuid(), 'SUERO FACIAL ANTIMANCHAS NIACINA X 50 ML BYPHASE', 'suero-facial-antimanchas-niacina-x-50-ml-byphase', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000005', 'FAIR', null, 50500, 44010, false, true),
  (gen_random_uuid(), 'SUERO FACIAL HIDRATANTE HYALURON X 50 ML BYPHASE', 'suero-facial-hidratante-hyaluron-x-50-ml-byphase', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000005', 'FAIR', null, 50500, 44010, false, true),
  (gen_random_uuid(), 'SUERO FACIAL ILUMINADOR VIT C X 50 ML BYPHASE', 'suero-facial-iluminador-vit-c-x-50-ml-byphase', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000005', 'FAIR', null, 50500, 44010, false, true),
  (gen_random_uuid(), 'TOALLITAS DESMAQ ALOE VERA 20 UND', 'toallitas-desmaq-aloe-vera-20-und', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000005', 'FAIR', null, 13500, 11880, false, true),
  (gen_random_uuid(), 'PAÑITOS BOLSA X 120 UND X 3', 'panitos-bolsa-x-120-und-x-3', 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.', null, '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 13229, 12931, false, true)
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