import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const env = readFileSync(resolve(root, '.env'), 'utf-8')
const get = (key) => env.match(new RegExp(`${key}=(.+)`))?.[1]?.trim()

const supabase = createClient(get('VITE_SUPABASE_URL'), get('VITE_SUPABASE_ANON_KEY'))

const { data, error } = await supabase.from('recipes').select('*').order('created_at', { ascending: false })

if (error) {
  console.error('Error descargando recetas:', error.message)
  process.exit(1)
}

const dir = resolve(root, 'backups')
mkdirSync(dir, { recursive: true })

const date = new Date().toISOString().slice(0, 10)
const file = resolve(dir, `recetas-${date}.json`)
writeFileSync(file, JSON.stringify(data, null, 2))

console.log(`Backup guardado: backups/recetas-${date}.json (${data.length} recetas)`)
