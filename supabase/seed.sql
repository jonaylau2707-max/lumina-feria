insert into public.brands (id, name, slug, active) values
  ('10000000-0000-4000-8000-000000000001', 'Aura', 'aura', true),
  ('10000000-0000-4000-8000-000000000002', 'Botánica', 'botanica', true),
  ('10000000-0000-4000-8000-000000000003', 'Maison 27', 'maison-27', true),
  ('10000000-0000-4000-8000-000000000004', 'Nativa', 'nativa', true),
  ('10000000-0000-4000-8000-000000000005', 'Serena', 'serena', true)
on conflict (id) do nothing;

insert into public.categories (id, name, slug, description, active) values
  ('20000000-0000-4000-8000-000000000001', 'Perfumería', 'perfumeria', 'Aromas que dejan una impresión inolvidable.', true),
  ('20000000-0000-4000-8000-000000000002', 'Cuidado personal', 'cuidado-personal', 'Rutinas suaves para todos los días.', true),
  ('20000000-0000-4000-8000-000000000003', 'Hogar', 'hogar', 'Pequeños detalles para espacios con alma.', true),
  ('20000000-0000-4000-8000-000000000004', 'Accesorios', 'accesorios', 'Piezas versátiles para complementar tu estilo.', true),
  ('20000000-0000-4000-8000-000000000005', 'Bienestar', 'bienestar', 'Momentos de pausa, calma y cuidado.', true)
on conflict (id) do nothing;

insert into public.products (
  id, name, slug, description, brand_id, category_id, pricing_type,
  regular_price, catalog_price, fair_price, featured, active
) values
  ('30000000-0000-4000-8000-000000000001', 'Eau de parfum Aurora', 'eau-de-parfum-aurora', 'Una fragancia luminosa con salida cítrica, corazón de jazmín y fondo de almizcle suave. Presentación de 50 ml.', '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'FAIR', null, 129900, 89900, true, true),
  ('30000000-0000-4000-8000-000000000002', 'Crema corporal Verbena', 'crema-corporal-verbena', 'Hidratación ligera con aroma verde y fresco. Textura de rápida absorción, ideal para uso diario.', '10000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000002', 'FIXED', 42900, null, null, true, true),
  ('30000000-0000-4000-8000-000000000003', 'Vela Higo & Cedro', 'vela-higo-cedro', 'Vela aromática vertida a mano con notas cálidas de higo maduro, cedro y ámbar.', '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 74900, 54900, true, true),
  ('30000000-0000-4000-8000-000000000004', 'Aretes Alba', 'aretes-alba', 'Aretes livianos de silueta orgánica y acabado dorado mate para acompañar looks cotidianos.', '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000004', 'FIXED', 38900, null, null, false, true),
  ('30000000-0000-4000-8000-000000000005', 'Bruma Sueño Sereno', 'bruma-sueno-sereno', 'Bruma de almohada con lavanda y manzanilla, pensada para acompañar tu ritual nocturno.', '10000000-0000-4000-8000-000000000005', '20000000-0000-4000-8000-000000000005', 'FAIR', null, 55900, 39900, true, true),
  ('30000000-0000-4000-8000-000000000006', 'Perfume Nocturne', 'perfume-nocturne', 'Una composición envolvente de rosa oscura, vainilla y maderas profundas. Presentación de 50 ml.', '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000001', 'FAIR', null, 144900, 99900, false, true),
  ('30000000-0000-4000-8000-000000000007', 'Aceite corporal Caléndula', 'aceite-corporal-calendula', 'Mezcla nutritiva de aceites vegetales y extracto de caléndula para una piel luminosa y suave.', '10000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000002', 'FIXED', 47900, null, null, false, true),
  ('30000000-0000-4000-8000-000000000008', 'Difusor Té Blanco', 'difusor-te-blanco', 'Difusor de ambiente con notas limpias de té blanco y algodón. Incluye varillas naturales.', '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000003', 'FIXED', 64900, null, null, false, true),
  ('30000000-0000-4000-8000-000000000009', 'Pañuelo Jardín', 'panuelo-jardin', 'Pañuelo satinado con estampado botánico exclusivo, perfecto para el cuello, el cabello o tu bolso.', '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000004', 'FAIR', null, 45900, 32900, true, true),
  ('30000000-0000-4000-8000-000000000010', 'Sales de baño Bosque', 'sales-de-bano-bosque', 'Sales minerales con eucalipto, romero y pétalos secos para convertir el baño en una pausa reparadora.', '10000000-0000-4000-8000-000000000005', '20000000-0000-4000-8000-000000000005', 'FIXED', 35900, null, null, false, true),
  ('30000000-0000-4000-8000-000000000011', 'Jabón facial Nube', 'jabon-facial-nube', 'Limpiador sólido de espuma cremosa con avena coloidal y arcilla blanca para piel delicada.', '10000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 39900, 28900, false, true),
  ('30000000-0000-4000-8000-000000000012', 'Bandeja Terra', 'bandeja-terra', 'Bandeja decorativa de cerámica en tono terracota, terminada a mano para que cada pieza sea única.', '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FIXED', 52900, null, null, true, true)
on conflict (id) do nothing;
