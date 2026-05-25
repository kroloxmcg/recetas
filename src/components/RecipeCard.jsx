import { Link } from 'react-router-dom'
import { getTagColor } from '../utils/tagColors'

export default function RecipeCard({ recipe }) {
  const accent = recipe.tags?.length ? getTagColor(recipe.tags[0]) : null

  return (
    <Link
      to={`/receta/${recipe.id}`}
      className="recipe-card"
      style={accent ? { borderTop: `3px solid ${accent.border}` } : undefined}
    >
      {recipe.image_url ? (
        <img src={recipe.image_url} alt={recipe.title} className="recipe-card-img" />
      ) : (
        <div
          className="recipe-card-img placeholder"
          style={accent ? { background: accent.bg, color: accent.color } : undefined}
        >
          <span>{recipe.title.charAt(0)}</span>
        </div>
      )}
      <div className="recipe-card-body">
        <h3>{recipe.title}</h3>
        <div className="recipe-card-meta">
          {recipe.prep_time > 0 && <span className="prep-time">{recipe.prep_time} min</span>}
          {recipe.tags?.map((tag) => {
            const c = getTagColor(tag)
            return (
              <span
                key={tag}
                className="tag-chip small"
                style={{ background: c.bg, color: c.color }}
              >
                {tag}
              </span>
            )
          })}
        </div>
      </div>
    </Link>
  )
}
