"use client"

import { useState } from "react"
import { 
  Line, XAxis, YAxis, CartesianGrid, 
  ResponsiveContainer, Tooltip, Legend, 
  ComposedChart,
  Bar,
  LineChart
} from "recharts"
import { getUniqueExercises, getChartDataForExercise, Workout, getMaxWeightForExercise } from "@/lib/stats"

export default function WorkoutChart({ workouts }: { workouts: Workout[] }) {
  const exercises =  getUniqueExercises(workouts)
  
  const [selected, setSelected] = useState(exercises[0] || "");

const data = getChartDataForExercise(workouts, selected);
  const maxData = getMaxWeightForExercise(workouts, selected);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title mb-4">Postępy treningowe</h3>
        <select 
          value={selected} 
          onChange={(e) => setSelected(e.target.value)} 
          className="select"
          style={{ 
            padding: '8px', 
            borderRadius: '6px', 
            border: '1px solid #e4e4e7', 
            width: '100%', 
            maxWidth: '300px' 
          }}
        >
          {exercises.map(ex => <option key={ex} value={ex}>{ex}</option>)}
        </select>
      </div>

      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            
            <XAxis 
              dataKey="chartId" 
              tickFormatter={(val) => data[val]?.displayDate}
              tick={{ 
                fontSize: 11, 
                fill: '#64748b' 
              }}
            />

            <YAxis 
              yAxisId="left" 
              orientation="left" 
              stroke="#18181b"
              tick={{ fontSize: 12 }}
              label={{ value: 'Ciężar (kg)', angle: -90, position: 'insideLeft', offset: 10 }}
            />

            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#3b82f6"
              tick={{ fontSize: 12 }}
              label={{ value: 'Powtórzenia', angle: 90, position: 'insideRight', offset: 10 }}
            />

            <Tooltip 
              labelFormatter={(val) => `Data: ${data[val]?.displayDate}`}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            />
            <Legend verticalAlign="top" height={40}/>

            <Bar 
              yAxisId="right" 
              dataKey="reps" 
              name="Liczba powtórzeń" 
              fill="#dae53e" 
              radius={[4, 4, 0, 0]} 
              barSize={30}
            />
            
            <Line 
              yAxisId="left"
              name="Ciężar (kg)"
              type="monotone" 
              dataKey="weight" 
              stroke="#18181b" 
              strokeWidth={4} 
              dot={{ r: 6, fill: "#18181b", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 8, strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Progresja ciężaru maksymalnego</h3>
        </div>
        <div className="card-content" style={{ paddingTop: '20px' }}>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={maxData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis unit="kg" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="top" height={40}/>
                <Line 
                  type="stepAfter"
                  dataKey="maxWeight" 
                  name="Najcięższa seria dnia (kg)" 
                  stroke="#ef4444" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: "#ef4444" }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}