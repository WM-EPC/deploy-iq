"use client";

import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface DataPoint {
  dimension: string;
  fullName: string;
  score: number;
  fullMark: number;
}

interface RadarChartProps {
  data: DataPoint[];
}

export function RadarChart({ data }: RadarChartProps) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid
            stroke="hsl(var(--border))"
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{
              fill: "hsl(var(--muted-foreground))",
              fontSize: 12,
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            tick={{
              fill: "hsl(var(--muted-foreground))",
              fontSize: 10,
            }}
            tickCount={6}
          />
          <Radar
            name="Your Score"
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.15}
            strokeWidth={2}
          />
          <Tooltip
            content={({ payload }) => {
              if (!payload || payload.length === 0) return null;
              const item = payload[0].payload as DataPoint;
              return (
                <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
                  <p className="text-sm font-medium">{item.fullName}</p>
                  <p className="text-lg font-bold text-primary">
                    {item.score} <span className="text-sm font-normal text-muted-foreground">/ 5.0</span>
                  </p>
                </div>
              );
            }}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
