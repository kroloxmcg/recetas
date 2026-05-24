-- Ejecutar en Supabase SQL Editor (https://supabase.com/dashboard)

create table recipes (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  ingredients text not null default '',
  steps text not null default '',
  link text default '',
  image_url text default '',
  prep_time integer default 0,
  tags text[] default '{}',
  created_at timestamptz default now()
);

-- Acceso público (sin auth, solo 2 personas)
alter table recipes enable row level security;

create policy "Public access"
  on recipes
  for all
  using (true)
  with check (true);

-- Bucket para fotos de recetas
insert into storage.buckets (id, name, public)
values ('recipe-images', 'recipe-images', true)
on conflict (id) do nothing;

create policy "Public upload"
  on storage.objects
  for insert
  with check (bucket_id = 'recipe-images');

create policy "Public read"
  on storage.objects
  for select
  using (bucket_id = 'recipe-images');

create policy "Public delete"
  on storage.objects
  for delete
  using (bucket_id = 'recipe-images');
