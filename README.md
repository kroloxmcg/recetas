# Recetas

App de recetas para guardar, consultar y compartir las recetas que vamos encontrando en TikTok, Instagram y otros sitios.

## Funcionalidades

- Añadir recetas con título, ingredientes, pasos, foto, tiempo y tags
- Buscar por nombre o ingrediente
- Filtrar por tags libres (pasta, rápida, cena...)
- Link directo al vídeo original (TikTok, Instagram, YouTube)
- Se instala en el móvil como una app (PWA)
- Sincronización en tiempo real entre usuarios
- Funciona offline
- Protegida con PIN de acceso

## Stack

- **Frontend**: React + Vite (PWA)
- **Backend/DB**: Supabase (gratis)
- **Hosting**: Vercel (gratis)
- **Coste total**: 0€

No hace falta instalar nada. Todo funciona desde el navegador.

## Deploy

La app se despliega automáticamente con cada push a `main` gracias a la integración de Vercel con GitHub.

## Setup (solo la primera vez)

### 1. Supabase

1. Crea una cuenta gratis en [supabase.com](https://supabase.com)
2. Crea un proyecto nuevo
3. Ve a **SQL Editor** y ejecuta el contenido de `supabase/schema.sql`
4. Ve a **Settings > API Keys** y copia la URL del proyecto y la publishable key

### 2. Vercel

1. Entra en [vercel.com](https://vercel.com) con tu cuenta de GitHub
2. Importa el repo `recetas`
3. Añade las variables de entorno:
   - `VITE_SUPABASE_URL` → la URL de tu proyecto Supabase
   - `VITE_SUPABASE_ANON_KEY` → la publishable key de Supabase
   - `VITE_APP_PIN` → un PIN de 4 dígitos para proteger el acceso
4. Dale a Deploy

### 3. Instalar en el móvil

Abre la URL de Vercel en el navegador del móvil y dale a **"Añadir a pantalla de inicio"**.

## Desarrollo local (opcional)

Solo si quieres hacer cambios en el código:

```bash
cp .env.example .env    # rellena con tus datos de Supabase
npm install
npm run dev
```
