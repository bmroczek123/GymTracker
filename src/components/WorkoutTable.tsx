"use client"

import { Trash2 } from "lucide-react"
import { deleteWorkoutAction } from "@/app/actions"

interface Workout {
  id: string;
  date: Date;
  exercise: string;
  weight: number;
  reps: number;
}

export default function WorkoutTable({ workouts }: { workouts: Workout[] }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Historia treningów</h3>
      </div>
      <div className="card-content">
        <table className="table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Ćwiczenie</th>
              <th>KG</th>
              <th>Powt.</th>
              <th>Akcja</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((w) => (
              <tr key={w.id}>
                <td>{new Date(w.date).toLocaleDateString("pl-PL")}</td>
                <td>{w.exercise}</td>
                <td>{w.weight}</td>
                <td>{w.reps}</td>
                <td>
                  <form action={deleteWorkoutAction.bind(null, w.id)}>
                    <button className="delete-button" type="submit">
                      <Trash2 size={16}/>
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}