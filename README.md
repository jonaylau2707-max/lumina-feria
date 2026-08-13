# Lúmina Feria

Tienda web de catálogo/feria construida con Next.js, TypeScript, Tailwind CSS y Supabase. Los clientes exploran productos, arman un carrito y envían una solicitud sin pagar. El administrador revisa la disponibilidad real, contacta por WhatsApp y confirma o cancela el pedido.

El proyecto funciona en modo demostración sin variables de entorno para poder revisar el escaparate. El envío real de pedidos y el panel administrativo se habilitan al conectar Supabase.

## Funcionalidades

- Home editorial, responsive y mobile-first.
- Catálogo con búsqueda, filtros por marca/categoría y ordenamiento reflejado en la URL.
- Precio fijo o precio catálogo + precio feria, con ahorro calculado centralmente.
- Detalle de producto, productos relacionados y selector de cantidad.
- Carrito persistente en `localStorage`, drawer responsive y página completa de revisión.
- Checkout de invitados sin pagos ni inventario.
- Pedido transaccional en PostgreSQL: el servidor consulta productos, recalcula precios y guarda snapshots históricos.
- Confirmación pública protegida por token no adivinable.
- Supabase Auth y tabla `admin_profiles` para autorización administrativa.
- Dashboard, productos, imágenes, marcas, categorías y pedidos.
- Contacto por enlace seguro de WhatsApp y estados `NEW`, `CONFIRMED`, `CANCELLED`.
- RLS, validación Zod en cliente/servidor, protección de rutas y límite básico de solicitudes.
- SEO, metadata por producto, Open Graph, sitemap, robots, 404, errores y skeletons.
- Pruebas de precios, carrito, validaciones, estados, teléfonos y slugs.

## Arquitectura

```text
src/
  app/
    (store)/                 # Tienda pública
    admin/                   # Login y panel protegido
    api/                     # Pedidos y mutaciones administrativas
  components/
    store/                   # Catálogo, carrito y checkout
    admin/                   # Formularios y gestión
    shared/                  # Componentes compartidos
  lib/
    data/                    # Acceso a datos y demo
    supabase/                # Clientes browser/server, auth y proxy
    utils/                   # Precios, teléfono y slugs
    validations/             # Esquemas Zod
  types/                     # Tipos de dominio
supabase/
  migrations/                # Schema, funciones, RLS y Storage
  seed.sql                   # 5 marcas, 5 categorías y 12 productos
tests/                       # Lógica crítica
public/og.png                # Tarjeta social de la marca
```

Los Server Components leen datos. Los Client Components se reservan para filtros, carrito y formularios. Las mutaciones pasan por Route Handlers autenticados. El pedido público usa una función PostgreSQL `security definer` de alcance mínimo para recalcular y guardar todo en una misma operación.

## Tablas

- `admin_profiles`: administradores asociados a `auth.users`.
- `brands`: nombre, slug, logo opcional y estado activo.
- `categories`: nombre, slug, descripción, imagen opcional y estado activo.
- `products`: relaciones, modalidad y campos de precio, imagen, destacado y activo.
- `orders`: cliente, teléfono, estado, total, número amigable y token público.
- `order_items`: snapshot histórico de nombre, imagen, precio, cantidad y subtotal.

También se crean los enums `pricing_type`, `order_status`, la secuencia `order_number_seq`, índices, triggers de actualización, funciones `create_order`, `get_order_confirmation`, `is_admin` y el bucket público `product-images`.

## Rutas públicas

- `/` — inicio.
- `/products` — catálogo y filtros.
- `/products/[slug]` — detalle.
- `/cart` — carrito y envío de solicitud.
- `/order-confirmation/[token]` — confirmación privada por token.

## Rutas administrativas

- `/admin/login` — acceso con Supabase Auth.
- `/admin` — dashboard.
- `/admin/products`, `/admin/products/new`, `/admin/products/[id]/edit`.
- `/admin/brands`.
- `/admin/categories`.
- `/admin/orders`, `/admin/orders/[id]`.

## Requisitos

- Node.js 20 o superior.
- npm.
- Un proyecto de Supabase.
- Opcional: Supabase CLI para aplicar migraciones desde terminal.

## Instalación y ejecución local

```bash
npm install
cp .env.example .env.local
npm run dev
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Sin Supabase verás datos de demostración; no podrás enviar pedidos ni entrar al panel.

## Variables de entorno

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU_PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_CLAVE_PUBLICA_ANON
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Obtén URL y clave pública en **Supabase → Project Settings → API**. Este proyecto no necesita `service_role`; no la expongas ni la agregues a variables `NEXT_PUBLIC_*`.

## Configurar Supabase

### Opción A: Supabase CLI

1. Instala e inicia sesión en Supabase CLI.
2. Vincula el proyecto:

   ```bash
   supabase login
   supabase link --project-ref TU_PROJECT_REF
   ```

3. Aplica la migración:

   ```bash
   supabase db push
   ```

4. Carga los datos de demostración:

   ```bash
   supabase db seed
   ```

### Opción B: SQL Editor

1. Abre **Supabase → SQL Editor**.
2. Ejecuta, en orden, los archivos de `supabase/migrations/`.
3. Ejecuta `supabase/seed.sql`.

La migración configura tablas, constraints, índices, RLS, funciones y el bucket `product-images`. No crees políticas públicas adicionales para `orders` u `order_items`: las confirmaciones se consultan únicamente por la función y su token.

## Crear el primer administrador

1. En **Supabase → Authentication → Users**, crea un usuario con su correo y una contraseña segura. No incluyas esa contraseña en el repositorio.
2. Copia el UUID del usuario.
3. En SQL Editor ejecuta, reemplazando los valores:

   ```sql
   insert into public.admin_profiles (id, full_name)
   values ('UUID_DEL_USUARIO', 'Nombre del administrador');
   ```

4. Inicia sesión en `/admin/login`.

Una cuenta de Auth sin registro en `admin_profiles` no puede acceder ni ejecutar acciones administrativas.

## Imágenes y Storage

El formulario acepta JPG, PNG, WebP y AVIF de hasta 5 MB. Los archivos se guardan con nombres UUID dentro del bucket público `product-images`: las URL conocidas son públicas, pero no se permite listar sus objetos de forma anónima. RLS restringe altas, cambios y borrados a administradores. Al reemplazar o eliminar físicamente un producto, el servidor intenta retirar la imagen anterior de forma segura.

## Seguridad e integridad

- El navegador envía solo IDs, cantidades y datos del cliente.
- PostgreSQL vuelve a consultar productos activos y elige el precio real según `pricing_type`.
- El total y los snapshots se escriben dentro de una función transaccional.
- El público no tiene políticas para leer pedidos, modificar catálogo ni cambiar estados.
- Proxy renueva la sesión; layouts y Route Handlers vuelven a verificar el perfil admin.
- No hay contraseñas hardcodeadas, pagos, inventario numérico ni claves privadas en el cliente.
- Productos con historial se desactivan en lugar de romper el pedido histórico.

## Verificación

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Desplegar en Vercel

1. Sube el repositorio a GitHub.
2. En Vercel selecciona **Add New → Project** e importa el repositorio.
3. Vercel detectará Next.js. Mantén `npm run build` como comando de build.
4. Agrega `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` y `NEXT_PUBLIC_SITE_URL` en **Project Settings → Environment Variables**.
5. Define `NEXT_PUBLIC_SITE_URL` con el dominio final, por ejemplo `https://tu-dominio.vercel.app`.
6. Despliega.
7. En **Supabase → Authentication → URL Configuration**, agrega el dominio de Vercel a los redirect URLs permitidos.

No es necesario usar una clave `service_role` en Vercel.

## Subir el proyecto a GitHub

Si todavía no existe `origin`:

```bash
git remote add origin URL_DEL_REPOSITORIO
git branch -M main
git push -u origin main
```

Si `origin` ya existe, revísalo con `git remote -v` y usa:

```bash
git push -u origin main
```

No reemplaces el remote ni uses `git push --force` sin una razón explícita.
