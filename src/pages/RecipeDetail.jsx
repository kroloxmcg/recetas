import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { getTagColor } from '../utils/tagColors'

export default function RecipeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.from('recipes').select('*').eq('id', id).single()
      setRecipe(data)
      setLoading(false)
    }
    fetch()
  }, [id])

  async function handleDelete() {
    if (!confirm('¿Seguro que quieres borrar esta receta?')) return

    if (recipe.image_url) {
      const path = recipe.image_url.split('/recipe-images/')[1]
      if (path) await supabase.storage.from('recipe-images').remove([path])
    }

    await supabase.from('recipes').delete().eq('id', id)
    navigate('/')
  }

  if (loading) return <div className="page"><p className="empty-state">Cargando...</p></div>
  if (!recipe) return <div className="page"><p className="empty-state">Receta no encontrada</p></div>

  return (
    <div className="page detail-page">
      <nav className="detail-nav">
        <Link to="/" className="back-btn">← Volver</Link>
        <div className="detail-actions">
          <Link to={`/editar/${id}`} className="btn btn-edit">Editar</Link>
          <button onClick={handleDelete} className="btn btn-delete">Borrar</button>
        </div>
      </nav>

      {recipe.image_url && (
        <img src={recipe.image_url} alt={recipe.title} className="detail-img" />
      )}

      <h1>{recipe.title}</h1>

      <div className="detail-meta">
        {recipe.prep_time > 0 && <span className="prep-time">{recipe.prep_time} min</span>}
        {recipe.tags?.map((tag) => {
          const c = getTagColor(tag)
          return (
            <span key={tag} className="tag-chip" style={{ background: c.bg, color: c.color }}>
              {tag}
            </span>
          )
        })}
      </div>

      {recipe.ingredients && (
        <section>
          <h2>Ingredientes</h2>
          <div className="detail-text">{recipe.ingredients}</div>
        </section>
      )}

      {recipe.steps && (
        <section>
          <h2>Pasos</h2>
          <div className="detail-text">{recipe.steps}</div>
        </section>
      )}

      {recipe.link && (
        <a href={recipe.link} target="_blank" rel="noopener noreferrer" className="btn btn-video">
          Ver vídeo original
        </a>
      )}
    </div>
  )
}
