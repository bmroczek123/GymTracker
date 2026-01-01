"use server"

import { revalidatePath } from "next/cache"
import { removeWorkout, createWorkout } from "@/services/workouts"

export async function deleteWorkoutAction(id: string) {
  await removeWorkout(id); 
  revalidatePath("/");
}

export async function addWorkoutAction(formData: FormData) {
  const exercise = formData.get("exercise") as string;
  const weight = parseFloat(formData.get("weight") as string);
  const reps = parseInt(formData.get("reps") as string);

  if (!exercise || isNaN(weight) || isNaN(reps)) return;

  await createWorkout({ exercise, weight, reps });
  revalidatePath("/");
}