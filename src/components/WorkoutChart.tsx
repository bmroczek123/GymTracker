"use client"
import { useState } from "react"
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  ResponsiveContainer, Tooltip, Legend 
} from "recharts"

export default function WorkoutChart({ workouts }: { workouts: any[] }) {
  const exercises = Array.from(new Set(workouts.map(w => w.exercise)))
  const [selected, setSelected] = useState(exercises[0] || "")

  const data = workouts
    .filter(w => w.exercise === selected)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((w, index) => ({
      ...w,
      displayDate: new Date(w.date).toLocaleDateString("pl-PL"),
      chartId: index 
    }))

  return (
    <div className="card">
      <div className="card-header">
        <select value={selected} onChange={(e) => setSelected(e.target.value)} className="select">
          {exercises.map(ex => <option key={ex} value={ex}>{ex}</option>)}
        </select>
      </div>
      <div className="card-content" style={{ paddingTop: '20px' }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
            
            <XAxis 
              dataKey="chartId" 
              tickFormatter={(val) => data[val]?.displayDate}
              tick={{ fontSize: 12 }}
            />

            <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />

            <Tooltip 
              labelFormatter={(val) => `Data: ${data[val]?.displayDate}`}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7' }}
            />
            <Legend verticalAlign="top" height={36}/>
            
            <Line 
              yAxisId="left"
              name="Ciężar (kg)"
              type="monotone" 
              dataKey="weight" 
              stroke="#18181b" 
              strokeWidth={3} 
              dot={{ r: 6, fill: "#18181b" }}
              activeDot={{ r: 9 }}
            />

            <Line 
              yAxisId="right"
              name="Powtórzenia"
              type="monotone" 
              dataKey="reps" 
              stroke="#2563eb" 
              strokeWidth={2} 
              strokeDasharray="5 5"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}