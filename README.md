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

## Stack

- **Frontend**: React + Vite (PWA)
- **Backend/DB**: Supabase (gratis)
- **Hosting**: Vercel (gratis)
- **Coste total**: 0€

## Setup

### 1. Supabase

1. Crea una cuenta gratis en [supabase.com](https://supabase.com)
2. Crea un proyecto nuevo
3. Ve a **SQL Editor** y ejecuta el contenido de `supabase/schema.sql`
4. Ve a **Settings > API** y copia la URL y la anon key

### 2. Variables de entorno

Copia el archivo de ejemplo y rellénalo con tus datos de Supabase:

```bash
cp .env.example .env
```

Edita `.env` con tu URL y anon key.

### 3. Desarrollo local

```bash
npm install
npm run dev
```

### 4. Deploy a Vercel

1. Sube el repo a GitHub
2. Conecta el repo en [vercel.com](https://vercel.com)
3. Añade las variables de entorno (`VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`) en Vercel
4. Deploy automático

### 5. Instalar en el móvil

Abre la URL de Vercel en el navegador del móvil y dale a **"Añadir a pantalla de inicio"**.
