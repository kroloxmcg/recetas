import { getTagColor } from '../utils/tagColors'

export default function TagFilter({ tags, selected, onToggle }) {
  if (tags.length === 0) return null

  return (
    <div className="tag-filter">
      {tags.map((tag) => {
        const c = getTagColor(tag)
        const isActive = selected === tag
        return (
          <button
            key={tag}
            className={`tag-chip ${isActive ? 'active' : ''}`}
            style={
              isActive
                ? { background: c.color, color: '#fff' }
                : { background: c.bg, color: c.color }
            }
            onClick={() => onToggle(isActive ? null : tag)}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}
