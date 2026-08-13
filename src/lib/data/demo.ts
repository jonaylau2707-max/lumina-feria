import type { Brand, Category, Order, Product } from "@/types";

export const demoBrands: Brand[] = [
  { id: "10000000-0000-4000-8000-000000000001", name: "Aura", slug: "aura", logo_url: null, active: true },
  { id: "10000000-0000-4000-8000-000000000002", name: "Botánica", slug: "botanica", logo_url: null, active: true },
  { id: "10000000-0000-4000-8000-000000000003", name: "Maison 27", slug: "maison-27", logo_url: null, active: true },
  { id: "10000000-0000-4000-8000-000000000004", name: "Nativa", slug: "nativa", logo_url: null, active: true },
  { id: "10000000-0000-4000-8000-000000000005", name: "Serena", slug: "serena", logo_url: null, active: true },
];

export const demoCategories: Category[] = [
  { id: "20000000-0000-4000-8000-000000000001", name: "Perfumería", slug: "perfumeria", image_url: null, description: "Aromas que dejan una impresión inolvidable.", active: true },
  { id: "20000000-0000-4000-8000-000000000002", name: "Cuidado personal", slug: "cuidado-personal", image_url: null, description: "Rutinas suaves para todos los días.", active: true },
  { id: "20000000-0000-4000-8000-000000000003", name: "Hogar", slug: "hogar", image_url: null, description: "Pequeños detalles para espacios con alma.", active: true },
  { id: "20000000-0000-4000-8000-000000000004", name: "Accesorios", slug: "accesorios", image_url: null, description: "Piezas versátiles para complementar tu estilo.", active: true },
  { id: "20000000-0000-4000-8000-000000000005", name: "Bienestar", slug: "bienestar", image_url: null, description: "Momentos de pausa, calma y cuidado.", active: true },
];

type ProductSeed = Omit<Product, "brand" | "category"> & {
  brandIndex: number;
  categoryIndex: number;
};

const productSeeds: ProductSeed[] = [
  { id: "30000000-0000-4000-8000-000000000001", name: "Eau de parfum Aurora", slug: "eau-de-parfum-aurora", description: "Una fragancia luminosa con salida cítrica, corazón de jazmín y fondo de almizcle suave. Presentación de 50 ml.", image_url: null, pricing_type: "FAIR", regular_price: null, catalog_price: 129900, fair_price: 89900, featured: true, active: true, brand_id: demoBrands[0].id, category_id: demoCategories[0].id, brandIndex: 0, categoryIndex: 0 },
  { id: "30000000-0000-4000-8000-000000000002", name: "Crema corporal Verbena", slug: "crema-corporal-verbena", description: "Hidratación ligera con aroma verde y fresco. Textura de rápida absorción, ideal para uso diario.", image_url: null, pricing_type: "FIXED", regular_price: 42900, catalog_price: null, fair_price: null, featured: true, active: true, brand_id: demoBrands[1].id, category_id: demoCategories[1].id, brandIndex: 1, categoryIndex: 1 },
  { id: "30000000-0000-4000-8000-000000000003", name: "Vela Higo & Cedro", slug: "vela-higo-cedro", description: "Vela aromática vertida a mano con notas cálidas de higo maduro, cedro y ámbar.", image_url: null, pricing_type: "FAIR", regular_price: null, catalog_price: 74900, fair_price: 54900, featured: true, active: true, brand_id: demoBrands[2].id, category_id: demoCategories[2].id, brandIndex: 2, categoryIndex: 2 },
  { id: "30000000-0000-4000-8000-000000000004", name: "Aretes Alba", slug: "aretes-alba", description: "Aretes livianos de silueta orgánica y acabado dorado mate para acompañar looks cotidianos.", image_url: null, pricing_type: "FIXED", regular_price: 38900, catalog_price: null, fair_price: null, featured: false, active: true, brand_id: demoBrands[3].id, category_id: demoCategories[3].id, brandIndex: 3, categoryIndex: 3 },
  { id: "30000000-0000-4000-8000-000000000005", name: "Bruma Sueño Sereno", slug: "bruma-sueno-sereno", description: "Bruma de almohada con lavanda y manzanilla, pensada para acompañar tu ritual nocturno.", image_url: null, pricing_type: "FAIR", regular_price: null, catalog_price: 55900, fair_price: 39900, featured: true, active: true, brand_id: demoBrands[4].id, category_id: demoCategories[4].id, brandIndex: 4, categoryIndex: 4 },
  { id: "30000000-0000-4000-8000-000000000006", name: "Perfume Nocturne", slug: "perfume-nocturne", description: "Una composición envolvente de rosa oscura, vainilla y maderas profundas. Presentación de 50 ml.", image_url: null, pricing_type: "FAIR", regular_price: null, catalog_price: 144900, fair_price: 99900, featured: false, active: true, brand_id: demoBrands[2].id, category_id: demoCategories[0].id, brandIndex: 2, categoryIndex: 0 },
  { id: "30000000-0000-4000-8000-000000000007", name: "Aceite corporal Caléndula", slug: "aceite-corporal-calendula", description: "Mezcla nutritiva de aceites vegetales y extracto de caléndula para una piel luminosa y suave.", image_url: null, pricing_type: "FIXED", regular_price: 47900, catalog_price: null, fair_price: null, featured: false, active: true, brand_id: demoBrands[1].id, category_id: demoCategories[1].id, brandIndex: 1, categoryIndex: 1 },
  { id: "30000000-0000-4000-8000-000000000008", name: "Difusor Té Blanco", slug: "difusor-te-blanco", description: "Difusor de ambiente con notas limpias de té blanco y algodón. Incluye varillas naturales.", image_url: null, pricing_type: "FIXED", regular_price: 64900, catalog_price: null, fair_price: null, featured: false, active: true, brand_id: demoBrands[0].id, category_id: demoCategories[2].id, brandIndex: 0, categoryIndex: 2 },
  { id: "30000000-0000-4000-8000-000000000009", name: "Pañuelo Jardín", slug: "panuelo-jardin", description: "Pañuelo satinado con estampado botánico exclusivo, perfecto para el cuello, el cabello o tu bolso.", image_url: null, pricing_type: "FAIR", regular_price: null, catalog_price: 45900, fair_price: 32900, featured: true, active: true, brand_id: demoBrands[3].id, category_id: demoCategories[3].id, brandIndex: 3, categoryIndex: 3 },
  { id: "30000000-0000-4000-8000-000000000010", name: "Sales de baño Bosque", slug: "sales-de-bano-bosque", description: "Sales minerales con eucalipto, romero y pétalos secos para convertir el baño en una pausa reparadora.", image_url: null, pricing_type: "FIXED", regular_price: 35900, catalog_price: null, fair_price: null, featured: false, active: true, brand_id: demoBrands[4].id, category_id: demoCategories[4].id, brandIndex: 4, categoryIndex: 4 },
  { id: "30000000-0000-4000-8000-000000000011", name: "Jabón facial Nube", slug: "jabon-facial-nube", description: "Limpiador sólido de espuma cremosa con avena coloidal y arcilla blanca para piel delicada.", image_url: null, pricing_type: "FAIR", regular_price: null, catalog_price: 39900, fair_price: 28900, featured: false, active: true, brand_id: demoBrands[1].id, category_id: demoCategories[1].id, brandIndex: 1, categoryIndex: 1 },
  { id: "30000000-0000-4000-8000-000000000012", name: "Bandeja Terra", slug: "bandeja-terra", description: "Bandeja decorativa de cerámica en tono terracota, terminada a mano para que cada pieza sea única.", image_url: null, pricing_type: "FIXED", regular_price: 52900, catalog_price: null, fair_price: null, featured: true, active: true, brand_id: demoBrands[2].id, category_id: demoCategories[2].id, brandIndex: 2, categoryIndex: 2 },
];

export const demoProducts: Product[] = productSeeds.map(
  ({ brandIndex, categoryIndex, ...product }) => ({
    ...product,
    brand: demoBrands[brandIndex],
    category: demoCategories[categoryIndex],
  }),
);

export const demoOrders: Order[] = [
  {
    id: "40000000-0000-4000-8000-000000000001",
    order_number: "LUM-2026-0104",
    first_name: "Camila",
    last_name: "Torres",
    phone: "300 555 0182",
    notes: "Prefiero contacto después de las 4 p. m.",
    status: "NEW",
    total: 132800,
    created_at: "2026-08-13T14:10:00.000Z",
    order_items: [
      { id: "50000000-0000-4000-8000-000000000001", product_id: demoProducts[0].id, product_name: demoProducts[0].name, product_image_url: null, unit_price: 89900, quantity: 1, subtotal: 89900 },
      { id: "50000000-0000-4000-8000-000000000002", product_id: demoProducts[1].id, product_name: demoProducts[1].name, product_image_url: null, unit_price: 42900, quantity: 1, subtotal: 42900 },
    ],
  },
  {
    id: "40000000-0000-4000-8000-000000000002",
    order_number: "LUM-2026-0103",
    first_name: "Laura",
    last_name: "Mejía",
    phone: "315 555 0108",
    notes: null,
    status: "CONFIRMED",
    total: 109800,
    created_at: "2026-08-12T17:25:00.000Z",
    order_items: [
      { id: "50000000-0000-4000-8000-000000000003", product_id: demoProducts[2].id, product_name: demoProducts[2].name, product_image_url: null, unit_price: 54900, quantity: 2, subtotal: 109800 },
    ],
  },
  {
    id: "40000000-0000-4000-8000-000000000003",
    order_number: "LUM-2026-0102",
    first_name: "Natalia",
    last_name: "Ríos",
    phone: "301 555 0144",
    notes: "Es para regalo.",
    status: "CANCELLED",
    total: 39900,
    created_at: "2026-08-11T12:05:00.000Z",
    order_items: [
      { id: "50000000-0000-4000-8000-000000000004", product_id: demoProducts[4].id, product_name: demoProducts[4].name, product_image_url: null, unit_price: 39900, quantity: 1, subtotal: 39900 },
    ],
  },
];
