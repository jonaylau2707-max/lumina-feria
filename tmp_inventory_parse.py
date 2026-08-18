import json
import re
import unicodedata
from collections import Counter

import pandas as pd

path = r'C:\Users\Usuario\Downloads\INVENTARIO ESENCIAS VIP.xlsx'
df = pd.read_excel(path, header=None)

brand = None
brand_headers = {
    "ESIKA, L'BEL Y CYZONE": "Esika, L'Bel y Cyzone",
    "YANBAL": "Yanbal",
    "SAMY COSMETICS": "Samy Cosmetics",
    "FULLER": "Fuller",
    "NATURA": "Natura",
}
brand_map = {
    "Yanbal": "10000000-0000-4000-8000-000000000001",
    "Esika, L'Bel y Cyzone": "10000000-0000-4000-8000-000000000002",
    "Fuller": "10000000-0000-4000-8000-000000000003",
    "Samy Cosmetics": "10000000-0000-4000-8000-000000000004",
    "Natura": "10000000-0000-4000-8000-000000000005",
}
cat_map = {
    "perfumeria": "20000000-0000-4000-8000-000000000001",
    "cuidado-personal": "20000000-0000-4000-8000-000000000002",
    "hogar": "20000000-0000-4000-8000-000000000003",
    "accesorios": "20000000-0000-4000-8000-000000000004",
    "bienestar": "20000000-0000-4000-8000-000000000005",
}

def slugify(text: str) -> str:
    text = unicodedata.normalize('NFKD', str(text)).encode('ascii', 'ignore').decode('ascii').lower()
    text = re.sub(r'[^a-z0-9]+', '-', text).strip('-')
    return text[:140]

def classify(name: str) -> str:
    n = name.upper()
    hogar_kw = ['LIMPIA', 'LIMP ', 'DESENGRAS', 'JABON LIQUIDO MULTIUSOS', 'VINAGRE LIMPIADOR', 'VARSOL', 'MICROFIBRA', 'INODOROS', 'BLANQUEADOR', 'LAVAPLATOS', 'SUAVIZANTE', 'DESINFECTANTE', 'AROMATIZANTE DE TELAS', 'DETERG', 'ACONDICIONADOR PREPLANCHADO', 'MANGO METALICO', 'ESPONJA', 'ESPONJILLA', 'PAÑ', 'PA�', 'PAÑITOS', 'PA�ITOS', 'ROLLO PA']
    accesorios_kw = ['POMOS']
    bienestar_kw = ['PROTECTOR SOLAR', 'SUERO', 'CREMA FACIAL', 'CONTORNO DE OJOS', 'AGUA MICELAR', 'TOALLITAS DESMAQ', 'DESMAQUILLANTE', 'CREMA DE MANOS', 'TOTAL BLOCK', 'BIOMILK', 'RETINOL']
    cuidado_kw = ['MASCARA', 'LABIAL', 'DELINEADOR', 'PALETA', 'BASE ', 'POLVO COMPACTO', 'BALSAMO', 'BRILLO DE LABIOS', 'LIP OIL', 'DESOD ', 'DESODORANTES', 'TALCO', 'MULTI TAL', 'MASC ']
    if any(k in n for k in hogar_kw):
        return 'hogar'
    if any(k in n for k in accesorios_kw):
        return 'accesorios'
    if any(k in n for k in bienestar_kw):
        return 'bienestar'
    if any(k in n for k in cuidado_kw):
        return 'cuidado-personal'
    return 'perfumeria'

products = []
for _, row in df.iterrows():
    c1 = '' if pd.isna(row[1]) else str(row[1]).strip()
    c3 = '' if pd.isna(row[3]) else str(row[3]).strip()
    c4 = '' if pd.isna(row[4]) else str(row[4]).strip()

    if c1 in brand_headers and c3 == '' and c4 == '':
        brand = brand_headers[c1]
        continue

    if not brand or not c1:
        continue

    if c3.upper() == 'PRECIO DE CATALOGO' or c4.upper() == 'PRECIO DE VENTA ESPECIAL':
        continue

    try:
        catalog = float(c3)
        fair = float(c4)
    except Exception:
        continue

    products.append({
        'name': c1,
        'slug': slugify(c1),
        'brand': brand,
        'brand_id': brand_map[brand],
        'category': classify(c1),
        'catalog_price': round(catalog),
        'fair_price': round(fair),
    })

summary = {
    'count': len(products),
    'brands': Counter(p['brand'] for p in products),
    'categories': Counter(p['category'] for p in products),
    'sample': products[:12],
}
print(json.dumps(summary, ensure_ascii=False))
with open(r'C:\Users\Usuario\Documents\lumina\tmp_inventory_products.json', 'w', encoding='utf-8') as fh:
    json.dump(products, fh, ensure_ascii=False, indent=2)
