import { prisma } from "@/lib/db"; 

export const getAllWorkouts = async () => {
  return await prisma.workout.findMany({
    orderBy: { date: 'desc' }
  });
};

export const removeWorkout = async (id: string) => {
  return await prisma.workout.delete({
    where: { id }
  });
};

export const createWorkout = async (data: { exercise: string; weight: number; reps: number }) => {
  return await prisma.workout.create({
    data: {
      exercise: data.exercise,
      weight: data.weight,
      reps: data.reps,
      date: new Date(), 
    }
  });
};