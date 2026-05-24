export default function TagFilter({ tags, selected, onToggle }) {
  if (tags.length === 0) return null

  return (
    <div className="tag-filter">
      {tags.map((tag) => (
        <button
          key={tag}
          className={`tag-chip ${selected === tag ? 'active' : ''}`}
          onClick={() => onToggle(selected === tag ? null : tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
