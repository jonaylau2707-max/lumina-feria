import json
from pathlib import Path
products = json.loads(Path(r'C:\Users\Usuario\Documents\lumina\tmp_inventory_products.json').read_text(encoding='utf-8'))
cat_map = {
    'perfumeria': '20000000-0000-4000-8000-000000000001',
    'cuidado-personal': '20000000-0000-4000-8000-000000000002',
    'hogar': '20000000-0000-4000-8000-000000000003',
    'accesorios': '20000000-0000-4000-8000-000000000004',
    'bienestar': '20000000-0000-4000-8000-000000000005',
}

def esc(value: str) -> str:
    return value.replace("'", "''")

def chunked(items, size):
    for i in range(0, len(items), size):
        yield i, items[i:i+size]

for start, batch in chunked(products[45:], 10):
    values = []
    for p in batch:
        description = 'Producto importado desde inventario ESENCIAS VIP. Foto y descripcion pendientes.'
        values.append(
            "(gen_random_uuid(), '{name}', '{slug}', '{description}', null, '{brand_id}', '{category_id}', 'FAIR', null, {catalog_price}, {fair_price}, false, true)".format(
                name=esc(p['name']), slug=esc(p['slug']), description=description, brand_id=p['brand_id'], category_id=cat_map[p['category']], catalog_price=int(p['catalog_price']), fair_price=int(p['fair_price'])
            )
        )
    sql = "insert into public.products (id, name, slug, description, image_url, brand_id, category_id, pricing_type, regular_price, catalog_price, fair_price, featured, active) values\n  " + ",\n  ".join(values) + "\non conflict (slug) do update set\n  name = excluded.name,\n  description = excluded.description,\n  image_url = excluded.image_url,\n  brand_id = excluded.brand_id,\n  category_id = excluded.category_id,\n  pricing_type = excluded.pricing_type,\n  regular_price = excluded.regular_price,\n  catalog_price = excluded.catalog_price,\n  fair_price = excluded.fair_price,\n  featured = excluded.featured,\n  active = excluded.active;"
    idx = start // 10 + 1
    Path(fr'C:\Users\Usuario\Documents\lumina\tmp_small_batch_{idx}.sql').write_text(sql, encoding='utf-8')
print('done')
