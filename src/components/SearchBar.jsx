export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar receta o ingrediente..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
