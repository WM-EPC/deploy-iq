"use client";

import { useState } from "react";
import {
  defaultPlanInputs,
  generatePlan,
  industryOptions,
  productOptions,
  useCaseOptions,
  timelineOptions,
  complianceOptions,
  type PlanInputs,
} from "@/lib/plan-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Target,
  BookOpen,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function PlanPage() {
  const [inputs, setInputs] = useState<PlanInputs>(defaultPlanInputs);
  const [showPlan, setShowPlan] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  const plan = generatePlan(inputs);

  const toggleProduct = (value: string) => {
    setInputs((prev) => ({
      ...prev,
      products: prev.products.includes(value)
        ? prev.products.filter((p) => p !== value)
        : [...prev.products, value],
    }));
  };

  const toggleUseCase = (value: string) => {
    setInputs((prev) => ({
      ...prev,
      useCases: prev.useCases.includes(value)
        ? prev.useCases.filter((u) => u !== value)
        : [...prev.useCases, value],
    }));
  };

  const toggleCompliance = (value: string) => {
    setInputs((prev) => ({
      ...prev,
      compliance: prev.compliance.includes(value)
        ? prev.compliance.filter((c) => c !== value)
        : [...prev.compliance, value],
    }));
  };

  if (!showPlan) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            Align &rarr; Activate &rarr; Amplify &rarr; Accelerate &rarr; Govern
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Deployment Planner
          </h1>
          <p className="mt-3 text-muted-foreground">
            Generate a customized enterprise adoption roadmap based on OpenAI&apos;s
            framework. Configure your organization profile below.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Organization Profile</CardTitle>
            <CardDescription>
              Tell us about your organization to generate a tailored deployment plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Company name */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Company Name (optional)
              </label>
              <input
                type="text"
                value={inputs.companyName}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, companyName: e.target.value }))
                }
                placeholder="Acme Corporation"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Industry */}
            <div>
              <label className="text-sm font-medium mb-2 block">Industry</label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {industryOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() =>
                      setInputs((prev) => ({ ...prev, industry: opt.value }))
                    }
                    className={cn(
                      "rounded-lg border px-3 py-2 text-xs font-medium transition-all",
                      inputs.industry === opt.value
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size sliders */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Total Employees</label>
                  <span className="text-sm font-mono text-primary">
                    {inputs.employeeCount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={100000}
                  step={100}
                  value={inputs.employeeCount}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      employeeCount: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-primary"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Target AI Users</label>
                  <span className="text-sm font-mono text-primary">
                    {inputs.targetUsers.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={inputs.employeeCount}
                  step={50}
                  value={Math.min(inputs.targetUsers, inputs.employeeCount)}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      targetUsers: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-primary"
                />
              </div>
            </div>

            {/* Products */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Products to Deploy
              </label>
              <div className="flex flex-wrap gap-2">
                {productOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => toggleProduct(opt.value)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                      inputs.products.includes(opt.value)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Use cases */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Primary Use Cases
              </label>
              <div className="flex flex-wrap gap-2">
                {useCaseOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => toggleUseCase(opt.value)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                      inputs.useCases.includes(opt.value)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <label className="text-sm font-medium mb-2 block">Timeline</label>
              <div className="grid grid-cols-3 gap-2">
                {timelineOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() =>
                      setInputs((prev) => ({ ...prev, timeline: opt.value }))
                    }
                    className={cn(
                      "rounded-lg border px-3 py-2 text-xs font-medium transition-all",
                      inputs.timeline === opt.value
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Compliance */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Compliance Requirements (if any)
              </label>
              <div className="flex flex-wrap gap-2">
                {complianceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => toggleCompliance(opt.value)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                      inputs.compliance.includes(opt.value)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            <Button onClick={() => setShowPlan(true)} className="w-full">
              Generate Deployment Plan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Plan view
  const companyLabel = inputs.companyName || "Your Organization";

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <Badge variant="secondary" className="mb-4">
            Deployment Plan
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {companyLabel} — AI Adoption Roadmap
          </h1>
          <p className="mt-2 text-muted-foreground">
            {inputs.targetUsers.toLocaleString()} users &middot;{" "}
            {industryOptions.find((o) => o.value === inputs.industry)?.label} &middot;{" "}
            {timelineOptions.find((o) => o.value === inputs.timeline)?.label}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowPlan(false)}
        >
          Edit Inputs
        </Button>
      </div>

      {/* Phase pipeline */}
      <div className="mb-10 flex gap-1">
        {plan.map((phase, i) => (
          <button
            key={phase.id}
            onClick={() =>
              setExpandedPhase(expandedPhase === phase.id ? null : phase.id)
            }
            className={cn(
              "flex-1 rounded-md py-3 text-center transition-all",
              expandedPhase === phase.id
                ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background"
                : "bg-muted text-muted-foreground hover:bg-accent"
            )}
          >
            <div className="text-xs font-bold">{phase.title}</div>
            <div className="text-[10px] opacity-75">{phase.weeks}</div>
          </button>
        ))}
      </div>

      {/* Phases */}
      <div className="space-y-6">
        {plan.map((phase) => {
          const isExpanded = expandedPhase === phase.id || expandedPhase === null;
          return (
            <Card key={phase.id}>
              <CardHeader
                className="cursor-pointer"
                onClick={() =>
                  setExpandedPhase(
                    expandedPhase === phase.id ? null : phase.id
                  )
                }
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle>
                        {phase.title}: {phase.subtitle}
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {phase.weeks}
                      </Badge>
                    </div>
                    <CardDescription className="mt-1">
                      {phase.description}
                    </CardDescription>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0 space-y-6">
                  <Separator />

                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* Deliverables */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <h3 className="text-sm font-semibold">Deliverables</h3>
                      </div>
                      <ul className="space-y-2">
                        {phase.deliverables.map((d, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* KPIs */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="h-4 w-4 text-primary" />
                        <h3 className="text-sm font-semibold">
                          Success Metrics
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {phase.kpis.map((kpi, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                            <span>{kpi}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Workshops */}
                  {phase.workshops.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                        <h3 className="text-sm font-semibold">
                          Training Sessions
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {phase.workshops.map((ws) => (
                          <Badge key={ws} variant="outline" className="text-xs">
                            {ws}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Products */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Layers className="h-4 w-4 text-purple-500" />
                      <h3 className="text-sm font-semibold">Products</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {phase.products.map((p) => (
                        <Badge key={p} variant="secondary" className="text-xs">
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Risks */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <h3 className="text-sm font-semibold">
                        Risks &amp; Mitigations
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {phase.risks.map((risk, i) => (
                        <li
                          key={i}
                          className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-3 text-sm"
                        >
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Credibility note */}
      <div className="mt-10 rounded-lg border border-border p-6 text-sm text-muted-foreground">
        <p className="italic">
          This plan follows OpenAI&apos;s published &ldquo;Staying Ahead in the Age of
          AI&rdquo; framework (Align &rarr; Activate &rarr; Amplify &rarr; Accelerate &rarr;
          Govern) and incorporates deployment patterns from enterprises including Morgan
          Stanley, Klarna, BBVA, and Moderna. The phased approach mirrors Center of Excellence
          methodologies used in deploying platform-level technologies across Fortune 500
          organizations — where governance maturity, stakeholder readiness, and outcome
          specificity are assessed before scaling.
        </p>
      </div>
    </div>
  );
}
