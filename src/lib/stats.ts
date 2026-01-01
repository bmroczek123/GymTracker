export interface Workout {
  id: string;
  date: Date | string;
  exercise: string;
  weight: number;
  reps: number;
}

export interface ChartData {
  date: string;
  value: number;
}

export const getUniqueExercises = (workouts: Workout[]): string[] => {
  return Array.from(new Set(workouts.map(w => w.exercise)));
};

export const getChartDataForExercise = (workouts: Workout[], selectedExercise: string) => {
  return workouts
    .filter(w => w.exercise === selectedExercise)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((w, index) => ({
      ...w,
      displayDate: new Date(w.date).toLocaleDateString("pl-PL"),
      chartId: index 
    }));
};


export const getMaxWeightForExercise = (workouts: Workout[], selectedExercise: string) => {
  const filtered = workouts.filter(w => w.exercise === selectedExercise);
  
  const grouped = filtered.reduce((acc, w) => {
    const dateKey = new Date(w.date).toLocaleDateString("pl-PL");
    const weight = Number(w.weight);
    
    if (!acc[dateKey] || weight > acc[dateKey].maxWeight) {
      acc[dateKey] = { maxWeight: weight, rawDate: new Date(w.date) };
    }
    return acc;
  }, {} as Record<string, { maxWeight: number; rawDate: Date }>);

  return Object.entries(grouped)
    .map(([date, val]) => ({
      date,
      maxWeight: val.maxWeight,
      rawDate: val.rawDate
    }))
    .sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime());
};