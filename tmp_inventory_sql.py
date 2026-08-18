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
        yield items[i:i+size]

sql_parts = []
for batch in chunked(products, 45):
    values = []
    for p in batch:
        description = f"Producto importado desde inventario ESENCIAS VIP. Foto y descripción pendientes."
        values.append(
            "(gen_random_uuid(), '{name}', '{slug}', '{description}', null, '{brand_id}', '{category_id}', 'FAIR', null, {catalog_price}, {fair_price}, false, true)".format(
                name=esc(p['name']),
                slug=esc(p['slug']),
                description=esc(description),
                brand_id=p['brand_id'],
                category_id=cat_map[p['category']],
                catalog_price=int(p['catalog_price']),
                fair_price=int(p['fair_price']),
            )
        )
    sql = "insert into public.products (id, name, slug, description, image_url, brand_id, category_id, pricing_type, regular_price, catalog_price, fair_price, featured, active) values\n  " + ",\n  ".join(values) + "\non conflict (slug) do update set\n  name = excluded.name,\n  description = excluded.description,\n  image_url = excluded.image_url,\n  brand_id = excluded.brand_id,\n  category_id = excluded.category_id,\n  pricing_type = excluded.pricing_type,\n  regular_price = excluded.regular_price,\n  catalog_price = excluded.catalog_price,\n  fair_price = excluded.fair_price,\n  featured = excluded.featured,\n  active = excluded.active;"
    sql_parts.append(sql)

out = Path(r'C:\Users\Usuario\Documents\lumina\tmp_inventory_import.sql')
out.write_text("\n\n".join(sql_parts), encoding='utf-8')
print(json.dumps({'batches': len(sql_parts), 'products': len(products), 'sql_path': str(out)}, ensure_ascii=False))
