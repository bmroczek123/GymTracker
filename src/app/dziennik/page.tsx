import { prisma } from "@/lib/db"
import WorkoutForm from "@/components/WorkoutForm"
import { deleteWorkout } from "@/app/actions"
import { Trash2 } from "lucide-react"

export const dynamic = "force-dynamic";

export default async function DziennikPage() {
  const workouts = await prisma.workout.findMany({ orderBy: { date: 'desc' } })

  return (
    <div className="content-wrapper">
      <WorkoutForm />
      <div className="card">
        <table className="table">
          <thead>
            <tr><th>Data</th><th>Ćwiczenie</th><th>KG</th><th>Powt.</th><th></th></tr>
          </thead>
          <tbody>
            {workouts.map((w) => (
              <tr key={w.id}>
                <td>{w.date.toLocaleDateString("pl-PL")}</td><td>{w.exercise}</td><td>{w.weight}</td><td>{w.reps}</td>
                <td>
                  <form action={deleteWorkout.bind(null, w.id)}>
                    <button className="delete-button"><Trash2 size={16}/></button>
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