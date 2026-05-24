import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RecipeDetail from './pages/RecipeDetail'
import RecipeForm from './pages/RecipeForm'

export default function App() {
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
