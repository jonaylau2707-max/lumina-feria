insert into public.brands (id, name, slug, active) values
  ('10000000-0000-4000-8000-000000000001', 'Yanbal', 'yanbal', true),
  ('10000000-0000-4000-8000-000000000002', 'Esika, L''Bel y Cyzone', 'esika-lbel-cyzone', true),
  ('10000000-0000-4000-8000-000000000003', 'Fuller', 'fuller', true),
  ('10000000-0000-4000-8000-000000000004', 'Samy Cosmetics', 'samy-cosmetics', true),
  ('10000000-0000-4000-8000-000000000005', 'Natura', 'natura', true)
on conflict (id) do nothing;

insert into public.categories (id, name, slug, description, active) values
  ('20000000-0000-4000-8000-000000000001', 'PerfumerÃ­a', 'perfumeria', 'Aromas que dejan una impresiÃ³n inolvidable.', true),
  ('20000000-0000-4000-8000-000000000002', 'Cuidado personal', 'cuidado-personal', 'Rutinas suaves para todos los dÃ­as.', true),
  ('20000000-0000-4000-8000-000000000003', 'Hogar', 'hogar', 'PequeÃ±os detalles para espacios con alma.', true),
  ('20000000-0000-4000-8000-000000000004', 'Accesorios', 'accesorios', 'Piezas versÃ¡tiles para complementar tu estilo.', true),
  ('20000000-0000-4000-8000-000000000005', 'Bienestar', 'bienestar', 'Momentos de pausa, calma y cuidado.', true)
on conflict (id) do nothing;

insert into public.products (
  id, name, slug, description, brand_id, category_id, pricing_type,
  regular_price, catalog_price, fair_price, featured, active
) values
  ('30000000-0000-4000-8000-000000000001', 'Eau de parfum Aurora', 'eau-de-parfum-aurora', 'Una fragancia luminosa con salida cÃ­trica, corazÃ³n de jazmÃ­n y fondo de almizcle suave. PresentaciÃ³n de 50 ml.', '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'FAIR', null, 129900, 89900, true, true),
  ('30000000-0000-4000-8000-000000000002', 'Crema corporal Verbena', 'crema-corporal-verbena', 'HidrataciÃ³n ligera con aroma verde y fresco. Textura de rÃ¡pida absorciÃ³n, ideal para uso diario.', '10000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000002', 'FIXED', 42900, null, null, true, true),
  ('30000000-0000-4000-8000-000000000003', 'Vela Higo & Cedro', 'vela-higo-cedro', 'Vela aromÃ¡tica vertida a mano con notas cÃ¡lidas de higo maduro, cedro y Ã¡mbar.', '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FAIR', null, 74900, 54900, true, true),
  ('30000000-0000-4000-8000-000000000004', 'Aretes Alba', 'aretes-alba', 'Aretes livianos de silueta orgÃ¡nica y acabado dorado mate para acompaÃ±ar looks cotidianos.', '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000004', 'FIXED', 38900, null, null, false, true),
  ('30000000-0000-4000-8000-000000000005', 'Bruma SueÃ±o Sereno', 'bruma-sueno-sereno', 'Bruma de almohada con lavanda y manzanilla, pensada para acompaÃ±ar tu ritual nocturno.', '10000000-0000-4000-8000-000000000005', '20000000-0000-4000-8000-000000000005', 'FAIR', null, 55900, 39900, true, true),
  ('30000000-0000-4000-8000-000000000006', 'Perfume Nocturne', 'perfume-nocturne', 'Una composiciÃ³n envolvente de rosa oscura, vainilla y maderas profundas. PresentaciÃ³n de 50 ml.', '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000001', 'FAIR', null, 144900, 99900, false, true),
  ('30000000-0000-4000-8000-000000000007', 'Aceite corporal CalÃ©ndula', 'aceite-corporal-calendula', 'Mezcla nutritiva de aceites vegetales y extracto de calÃ©ndula para una piel luminosa y suave.', '10000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000002', 'FIXED', 47900, null, null, false, true),
  ('30000000-0000-4000-8000-000000000008', 'Difusor TÃ© Blanco', 'difusor-te-blanco', 'Difusor de ambiente con notas limpias de tÃ© blanco y algodÃ³n. Incluye varillas naturales.', '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000003', 'FIXED', 64900, null, null, false, true),
  ('30000000-0000-4000-8000-000000000009', 'PaÃ±uelo JardÃ­n', 'panuelo-jardin', 'PaÃ±uelo satinado con estampado botÃ¡nico exclusivo, perfecto para el cuello, el cabello o tu bolso.', '10000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000004', 'FAIR', null, 45900, 32900, true, true),
  ('30000000-0000-4000-8000-000000000010', 'Sales de baÃ±o Bosque', 'sales-de-bano-bosque', 'Sales minerales con eucalipto, romero y pÃ©talos secos para convertir el baÃ±o en una pausa reparadora.', '10000000-0000-4000-8000-000000000005', '20000000-0000-4000-8000-000000000005', 'FIXED', 35900, null, null, false, true),
  ('30000000-0000-4000-8000-000000000011', 'JabÃ³n facial Nube', 'jabon-facial-nube', 'Limpiador sÃ³lido de espuma cremosa con avena coloidal y arcilla blanca para piel delicada.', '10000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000002', 'FAIR', null, 39900, 28900, false, true),
  ('30000000-0000-4000-8000-000000000012', 'Bandeja Terra', 'bandeja-terra', 'Bandeja decorativa de cerÃ¡mica en tono terracota, terminada a mano para que cada pieza sea Ãºnica.', '10000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'FIXED', 52900, null, null, true, true)
on conflict (id) do nothing;
