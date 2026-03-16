"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  defaultInputs,
  calculateROI,
  benchmarks,
  type ROIInputs,
} from "@/lib/roi-data";
import { ROICharts } from "./roi-charts";
import {
  DollarSign,
  Clock,
  TrendingUp,
  Users,
  Headphones,
  Code,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const useCases = [
  { value: "workforce", label: "Workforce Empowerment", description: "ChatGPT Enterprise for all employees", icon: Users },
  { value: "support", label: "Customer Support", description: "AI agents for ticket automation", icon: Headphones },
  { value: "development", label: "Software Development", description: "Codex for developer productivity", icon: Code },
  { value: "all", label: "Full Suite", description: "All products across the organization", icon: Building2 },
];

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
}

function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return value.toFixed(0);
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format = "number",
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format?: "number" | "currency";
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-sm font-mono text-primary">
          {format === "currency" ? formatCurrency(value) : formatNumber(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
      />
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>{format === "currency" ? formatCurrency(min) : formatNumber(min)}</span>
        <span>{format === "currency" ? formatCurrency(max) : formatNumber(max)}</span>
      </div>
    </div>
  );
}

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>(defaultInputs);
  const results = calculateROI(inputs);

  const update = (key: keyof ROIInputs, value: number | string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-5">
        {/* Input panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Profile</CardTitle>
              <CardDescription>
                Adjust inputs to model your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SliderInput
                label="Total Employees"
                value={inputs.employees}
                onChange={(v) => update("employees", v)}
                min={100}
                max={50000}
                step={100}
              />
              <SliderInput
                label="Avg. Fully Loaded Salary"
                value={inputs.avgSalary}
                onChange={(v) => update("avgSalary", v)}
                min={50000}
                max={250000}
                step={5000}
                format="currency"
              />
              <SliderInput
                label="Target AI Users"
                value={inputs.targetAIUsers}
                onChange={(v) => update("targetAIUsers", v)}
                min={50}
                max={inputs.employees}
                step={50}
              />
              <SliderInput
                label="ChatGPT Enterprise Cost/Seat/Month"
                value={inputs.chatgptEnterpriseCostPerSeat}
                onChange={(v) => update("chatgptEnterpriseCostPerSeat", v)}
                min={20}
                max={100}
                step={5}
                format="currency"
              />

              <Separator />

              <div>
                <label className="text-sm font-medium mb-3 block">
                  Primary Use Case
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {useCases.map((uc) => {
                    const Icon = uc.icon;
                    const isSelected = inputs.useCase === uc.value;
                    return (
                      <button
                        key={uc.value}
                        onClick={() => update("useCase", uc.value)}
                        className={cn(
                          "flex flex-col items-start gap-1 rounded-lg border p-3 text-left transition-all",
                          isSelected
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <Icon className={cn("h-4 w-4", isSelected ? "text-primary" : "text-muted-foreground")} />
                        <span className="text-xs font-medium">{uc.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {(inputs.useCase === "support" || inputs.useCase === "all") && (
                <SliderInput
                  label="Monthly Support Tickets"
                  value={inputs.supportTicketsPerMonth}
                  onChange={(v) => update("supportTicketsPerMonth", v)}
                  min={1000}
                  max={100000}
                  step={1000}
                />
              )}

              {(inputs.useCase === "development" || inputs.useCase === "all") && (
                <SliderInput
                  label="Developer Count"
                  value={inputs.developerCount}
                  onChange={(v) => update("developerCount", v)}
                  min={10}
                  max={5000}
                  step={10}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results panel */}
        <div className="lg:col-span-3 space-y-6">
          {/* Key metrics */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <DollarSign className="h-5 w-5 text-green-500 mb-2" />
                <div className="text-2xl font-bold">{formatCurrency(results.netAnnualValue)}</div>
                <p className="text-xs text-muted-foreground">Net Annual Value</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <TrendingUp className="h-5 w-5 text-primary mb-2" />
                <div className="text-2xl font-bold">{results.roiPercentage}%</div>
                <p className="text-xs text-muted-foreground">ROI</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Clock className="h-5 w-5 text-amber-500 mb-2" />
                <div className="text-2xl font-bold">{results.monthsToBreakeven}mo</div>
                <p className="text-xs text-muted-foreground">To Break Even</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Users className="h-5 w-5 text-blue-500 mb-2" />
                <div className="text-2xl font-bold">{formatCurrency(results.perEmployeeValue)}</div>
                <p className="text-xs text-muted-foreground">Per User/Year</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <ROICharts results={results} inputs={inputs} />

          {/* Value breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Value Breakdown</CardTitle>
              <CardDescription>Annual impact by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                    <span className="text-sm">Workforce Productivity</span>
                  </div>
                  <span className="font-mono text-sm font-medium">
                    {formatCurrency(results.annualProductivityValue)}
                  </span>
                </div>
                {results.supportSavings > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="text-sm">Support Automation</span>
                    </div>
                    <span className="font-mono text-sm font-medium">
                      {formatCurrency(results.supportSavings)}
                    </span>
                  </div>
                )}
                {results.devProductivitySavings > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500" />
                      <span className="text-sm">Developer Productivity (Codex)</span>
                    </div>
                    <span className="font-mono text-sm font-medium">
                      {formatCurrency(results.devProductivitySavings)}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="text-sm">Annual Cost (Licenses)</span>
                  </div>
                  <span className="font-mono text-sm font-medium text-red-400">
                    -{formatCurrency(results.annualCost)}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-sm">Net Annual Value</span>
                  <span className="font-mono text-sm text-green-500">
                    {formatCurrency(results.netAnnualValue)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">5-Year Projected Value</span>
                  <span className="font-mono text-sm font-medium">
                    {formatCurrency(results.fiveYearValue)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Benchmarks */}
      <Card>
        <CardHeader>
          <CardTitle>Enterprise Benchmarks</CardTitle>
          <CardDescription>
            Published results from enterprises deploying OpenAI products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benchmarks.slice(0, 6).map((b, i) => (
              <div
                key={i}
                className="rounded-lg border border-border p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{b.company}</span>
                  <Badge variant="secondary" className="text-xs">
                    {b.industry}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-primary">{b.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {b.context}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
