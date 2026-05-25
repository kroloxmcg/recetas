const palette = [
  { bg: '#dbeafe', color: '#1e40af', border: '#93bbfd' },   // blue
  { bg: '#d1fae5', color: '#065f46', border: '#6ee7b7' },   // emerald
  { bg: '#ede9fe', color: '#5b21b6', border: '#c4b5fd' },   // violet
  { bg: '#fce7f3', color: '#9d174d', border: '#f9a8d4' },   // pink
  { bg: '#fef3c7', color: '#92400e', border: '#fcd34d' },   // amber
  { bg: '#ccfbf1', color: '#115e59', border: '#5eead4' },   // teal
  { bg: '#e0e7ff', color: '#3730a3', border: '#a5b4fc' },   // indigo
  { bg: '#fde68a', color: '#78350f', border: '#f59e0b' },   // yellow
  { bg: '#fee2e2', color: '#991b1b', border: '#fca5a5' },   // red
  { bg: '#f3e8ff', color: '#6b21a8', border: '#d8b4fe' },   // purple
]

function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

export function getTagColor(tag) {
  return palette[hash(tag) % palette.length]
}
