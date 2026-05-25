import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import SearchBar from '../components/SearchBar'
import TagFilter from '../components/TagFilter'
import RecipeCard from '../components/RecipeCard'

export default function Home() {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)
  const [sortBy, setSortBy] = useState('recent')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecipes()

    const channel = supabase
      .channel('recipes-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'recipes' }, () => {
        fetchRecipes()
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  async function fetchRecipes() {
    const { data } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false })
    setRecipes(data || [])
    setLoading(false)
  }

  const allTags = [...new Set(recipes.flatMap((r) => r.tags || []))].sort()

  const filtered = recipes
    .filter((r) => {
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.ingredients.toLowerCase().includes(q)
      const matchesTag = !selectedTag || r.tags?.includes(selectedTag)
      return matchesSearch && matchesTag
    })
    .sort((a, b) => {
      if (sortBy === 'oldest') return new Date(a.created_at) - new Date(b.created_at)
      if (sortBy === 'alpha') return a.title.localeCompare(b.title, 'es')
      if (sortBy === 'time') return (a.prep_time || 0) - (b.prep_time || 0)
      return new Date(b.created_at) - new Date(a.created_at)
    })

  return (
    <div className="page">
      <header className="home-header">
        <h1>Recetas</h1>
      </header>

      <SearchBar value={search} onChange={setSearch} />
      <div className="sort-bar">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
          <option value="recent">Más recientes</option>
          <option value="oldest">Más antiguas</option>
          <option value="alpha">A → Z</option>
          <option value="time">Menor tiempo</option>
        </select>
      </div>
      <TagFilter tags={allTags} selected={selectedTag} onToggle={setSelectedTag} />

      {loading ? (
        <p className="empty-state">Cargando...</p>
      ) : filtered.length === 0 ? (
        <p className="empty-state">
          {recipes.length === 0
            ? 'Aún no hay recetas. ¡Añade la primera!'
            : 'No se encontraron recetas'}
        </p>
      ) : (
        <div className="recipe-grid">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}

      <Link to="/nueva" className="fab">+</Link>
    </div>
  )
}
