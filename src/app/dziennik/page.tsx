import WorkoutForm from "@/components/WorkoutForm"
import WorkoutTable from "@/components/WorkoutTable"
import { getAllWorkouts } from "@/services/workouts"

export const dynamic = "force-dynamic";

export default async function DziennikPage() {
  const workouts = await getAllWorkouts();

  return (
    <div className="content-wrapper">
      <WorkoutForm />
      
      <div className="mt-8">
        <WorkoutTable workouts={workouts} />
      </div>
    </div>
  )
}