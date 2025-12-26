import { prisma } from "@/lib/db"
import WorkoutChart from "@/components/WorkoutChart"

export const dynamic = "force-dynamic";

export default async function WykresyPage() {
  const workouts = await prisma.workout.findMany()
  return (
    <div className="content-wrapper">
      <h2 className="navbar-title">Postępy</h2>
      <WorkoutChart workouts={workouts} />
    </div>
  )
}