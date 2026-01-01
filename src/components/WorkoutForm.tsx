"use client"

import { addWorkoutAction } from "@/app/actions"
import { useState, useRef } from "react"

const COMMON_EXERCISES = [
  "Wyciskanie na klatkę (sztanga)", 
  "Wyciskanie hantli", "Przysiad ze sztangą",
  "Martwy ciąg", "Podciąganie na drążku",
  "Military Press (OHP)",
  "Wiosłowanie sztangą", "Uginanie ramion z hantlami", "Pompki na poręczach (Dipsy)"
]

export default function WorkoutForm() {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    await addWorkoutAction(formData)
    setLoading(false)
    formRef.current?.reset() 
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Dodaj serię</h3>
      </div>
      <div className="card-content">
        <form ref={formRef} action={handleSubmit} className="form">
          <input 
            name="exercise" 
            list="exercise-suggestions" 
            placeholder="Ćwiczenie" 
            className="input input-flex" 
            required 
          />
          <datalist id="exercise-suggestions">
            {COMMON_EXERCISES.map(ex => <option key={ex} value={ex} />)}
          </datalist>

          <input 
            name="weight" 
            type="number" 
            step="0.5" 
            placeholder="KG" 
            className="input input-narrow" 
            required 
          />
          <input 
            name="reps" 
            type="number" 
            placeholder="Powt." 
            className="input input-narrow" 
            required 
          />
          
          <button type="submit" className="button" disabled={loading}>
            {loading ? "..." : "Dodaj"}
          </button>
        </form>
      </div>
    </div>
  )
}