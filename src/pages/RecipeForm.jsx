import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const EMPTY = {
  title: '',
  ingredients: '',
  steps: '',
  link: '',
  prep_time: '',
  tags: '',
}

export default function RecipeForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)
  const [form, setForm] = useState(EMPTY)
  const [imageFile, setImageFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(isEditing)

  useEffect(() => {
    if (!isEditing) return
    async function fetch() {
      const { data } = await supabase.from('recipes').select('*').eq('id', id).single()
      if (data) {
        setForm({
          title: data.title,
          ingredients: data.ingredients,
          steps: data.steps,
          link: data.link || '',
          prep_time: data.prep_time || '',
          tags: (data.tags || []).join(', '),
        })
      }
      setLoading(false)
    }
    fetch()
  }, [id, isEditing])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) return
    setSaving(true)

    let image_url = undefined

    if (imageFile) {
      const ext = imageFile.name.split('.').pop()
      const fileName = `${Date.now()}.${ext}`
      const { error } = await supabase.storage
        .from('recipe-images')
        .upload(fileName, imageFile)

      if (!error) {
        const { data: urlData } = supabase.storage
          .from('recipe-images')
          .getPublicUrl(fileName)
        image_url = urlData.publicUrl
      }
    }

    const record = {
      title: form.title.trim(),
      ingredients: form.ingredients.trim(),
      steps: form.steps.trim(),
      link: form.link.trim(),
      prep_time: parseInt(form.prep_time, 10) || 0,
      tags: form.tags
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
    }

    if (image_url !== undefined) record.image_url = image_url

    if (isEditing) {
      await supabase.from('recipes').update(record).eq('id', id)
    } else {
      await supabase.from('recipes').insert(record)
    }

    navigate('/')
  }

  if (loading) return <div className="page"><p className="empty-state">Cargando...</p></div>

  return (
    <div className="page">
      <nav className="detail-nav">
        <Link to={isEditing ? `/receta/${id}` : '/'} className="back-btn">← Volver</Link>
      </nav>

      <h1>{isEditing ? 'Editar receta' : 'Nueva receta'}</h1>

      <form onSubmit={handleSubmit} className="recipe-form">
        <label>
          Título *
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Ingredientes
          <textarea
            name="ingredients"
            value={form.ingredients}
            onChange={handleChange}
            rows={5}
            placeholder="Un ingrediente por línea"
          />
        </label>

        <label>
          Pasos
          <textarea
            name="steps"
            value={form.steps}
            onChange={handleChange}
            rows={6}
            placeholder="Describe los pasos..."
          />
        </label>

        <label>
          Link al vídeo
          <input
            type="url"
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="https://..."
          />
        </label>

        <label>
          Foto
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </label>

        <label>
          Tiempo de preparación (minutos)
          <input
            type="number"
            name="prep_time"
            value={form.prep_time}
            onChange={handleChange}
            min="0"
          />
        </label>

        <label>
          Tags (separados por coma)
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="pasta, rápida, cena..."
          />
        </label>

        <button type="submit" className="btn btn-save" disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </div>
  )
}
