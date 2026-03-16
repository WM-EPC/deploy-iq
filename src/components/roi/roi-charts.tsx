"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ROIResults, ROIInputs } from "@/lib/roi-data";

interface ROIChartsProps {
  results: ROIResults;
  inputs: ROIInputs;
}

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
}

export function ROICharts({ results, inputs }: ROIChartsProps) {
  // Cumulative savings over 12 months
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const totalValue = results.annualProductivityValue + results.supportSavings + results.devProductivitySavings;
    const monthlyValue = totalValue / 12;
    const monthlyCost = results.annualCost / 12;
    const cumulativeValue = monthlyValue * month;
    const cumulativeCost = monthlyCost * month;
    return {
      month: `M${month}`,
      value: Math.round(cumulativeValue),
      cost: Math.round(cumulativeCost),
      net: Math.round(cumulativeValue - cumulativeCost),
    };
  });

  // 5-year projection
  const yearlyData = Array.from({ length: 5 }, (_, i) => {
    const year = i + 1;
    const totalValue = results.annualProductivityValue + results.supportSavings + results.devProductivitySavings;
    const projectedValue = totalValue * Math.pow(1.15, i);
    return {
      year: `Year ${year}`,
      value: Math.round(projectedValue),
      cost: results.annualCost,
      net: Math.round(projectedValue - results.annualCost),
    };
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cumulative Value vs. Cost (12 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  tickFormatter={formatCurrency}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.1}
                  name="Cumulative Value"
                />
                <Area
                  type="monotone"
                  dataKey="cost"
                  stroke="hsl(var(--destructive))"
                  fill="hsl(var(--destructive))"
                  fillOpacity={0.1}
                  name="Cumulative Cost"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">5-Year Net Value Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  tickFormatter={formatCurrency}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="net"
                  fill="hsl(var(--chart-2))"
                  radius={[4, 4, 0, 0]}
                  name="Net Value"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
