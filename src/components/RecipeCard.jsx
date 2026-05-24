import { Link } from 'react-router-dom'

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/receta/${recipe.id}`} className="recipe-card">
      {recipe.image_url ? (
        <img src={recipe.image_url} alt={recipe.title} className="recipe-card-img" />
      ) : (
        <div className="recipe-card-img placeholder">
          <span>{recipe.title.charAt(0)}</span>
        </div>
      )}
      <div className="recipe-card-body">
        <h3>{recipe.title}</h3>
        <div className="recipe-card-meta">
          {recipe.prep_time > 0 && <span className="prep-time">{recipe.prep_time} min</span>}
          {recipe.tags?.map((tag) => (
            <span key={tag} className="tag-chip small">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
