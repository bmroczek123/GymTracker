"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function addWorkout(formData: FormData) {
  const exercise = formData.get("exercise") as string
  const weight = parseFloat(formData.get("weight") as string)
  const reps = parseInt(formData.get("reps") as string)

  if (!exercise || isNaN(weight) || isNaN(reps)) return

  await prisma.workout.create({
    data: {
      exercise,
      weight,
      reps,
      date: new Date(), 
    },
  })

  revalidatePath("/")
}

export async function deleteWorkout(id: string) {
  await prisma.workout.delete({
    where: { id },
  })
  revalidatePath("/")
}