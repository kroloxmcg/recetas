import { useState } from 'react'

const PIN = import.meta.env.VITE_APP_PIN

export default function PinScreen({ onUnlock }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (input === PIN) {
      localStorage.setItem('recetas_unlocked', 'true')
      onUnlock()
    } else {
      setError(true)
      setInput('')
    }
  }

  return (
    <div className="pin-screen">
      <div className="pin-box">
        <h1>Recetas</h1>
        <p>Introduce el PIN para entrar</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={input}
            onChange={(e) => {
              setError(false)
              setInput(e.target.value.replace(/\D/g, ''))
            }}
            placeholder="····"
            autoFocus
          />
          {error && <span className="pin-error">PIN incorrecto</span>}
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )
}
