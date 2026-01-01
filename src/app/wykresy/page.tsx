import WorkoutChart from "@/components/WorkoutChart";
import { getAllWorkouts } from "@/services/workouts"; 

export const dynamic = "force-dynamic";

export default async function WykresyPage() {
  const workouts = await getAllWorkouts();

  return (
    <div className="content-wrapper">
      
      <WorkoutChart workouts={workouts} />
    </div>
  );
}