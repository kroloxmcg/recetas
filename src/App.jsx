import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RecipeDetail from './pages/RecipeDetail'
import RecipeForm from './pages/RecipeForm'
import PinScreen from './components/PinScreen'

export default function App() {
  const [unlocked, setUnlocked] = useState(
    localStorage.getItem('recetas_unlocked') === 'true'
  )

  if (!unlocked) {
    return <PinScreen onUnlock={() => setUnlocked(true)} />
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receta/:id" element={<RecipeDetail />} />
        <Route path="/nueva" element={<RecipeForm />} />
        <Route path="/editar/:id" element={<RecipeForm />} />
      </Routes>
    </div>
  )
}
