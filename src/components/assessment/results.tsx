"use client";

import { dimensions, frameworkPhases } from "@/lib/assessment-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadarChart } from "./radar-chart";
import {
  RotateCcw,
  ArrowRight,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Gap {
  dimension: string;
  score: number;
  gap: number;
  priority: number;
}

interface Results {
  dimensionScores: Record<string, number>;
  overallScore: number;
  recommendedPhase: (typeof frameworkPhases)[number];
  gaps: Gap[];
}

interface AssessmentResultsProps {
  results: Results;
  answers: Record<string, number>;
  onRetake: () => void;
}

const phaseRecommendations: Record<string, string[]> = {
  align: [
    "Schedule executive alignment workshop within 2 weeks",
    "Identify and formalize AI Council with budget authority",
    "Define 3-5 measurable AI adoption goals tied to business OKRs",
    "Draft organizational 'why now' narrative for AI",
    "Conduct stakeholder mapping across all functions",
  ],
  activate: [
    "Select pilot group of 50-100 users across 3-4 functions",
    "Deploy ChatGPT Enterprise with SSO/SCIM configuration",
    "Launch AI Champions network from early adopters",
    "Deliver Executive AI Briefing and initial onboarding workshops",
    "Establish baseline metrics: DAU/WAU, messages per seat",
    "Institute monthly 'AI Friday' exploration time",
  ],
  amplify: [
    "Roll out organization-wide access beyond pilot group",
    "Build centralized AI knowledge hub (policies, training, use cases)",
    "Run department-specific workshops for top 5 use cases",
    "Begin custom GPT development for high-value workflows",
    "Establish monthly win-sharing cadence (newsletter, all-hands segment)",
    "Launch communities of practice in Slack/Teams",
  ],
  accelerate: [
    "Deploy advanced products: Codex for dev teams, Agents for workflow automation",
    "Run organization-wide AI Hackathon using OpenAI's playbook",
    "Implement eval framework for production AI use cases",
    "Create intake and prioritization process for AI projects",
    "Move toward Value Models 2-3 (AI-Native Distribution, Expert Capability)",
    "Establish API integration patterns for custom solutions",
  ],
  govern: [
    "Publish Responsible AI playbook with clear escalation procedures",
    "Deploy Policy GPT for governance questions",
    "Implement agent governance: identity management, permissions, audit logging",
    "Conduct quarterly governance reviews with legal, risk, and functional teams",
    "Track governance velocity: review delays and audit cycle times",
    "Prepare for Frontier platform deployment with full agent lifecycle management",
  ],
};

export function AssessmentResults({ results, answers, onRetake }: AssessmentResultsProps) {
  const { dimensionScores, overallScore, recommendedPhase, gaps } = results;

  const chartData = dimensions.map((dim) => ({
    dimension: dim.title.split(" ")[0],
    fullName: dim.title,
    score: dimensionScores[dim.id] || 0,
    fullMark: 5,
  }));

  const scoreLabel =
    overallScore < 2
      ? "Early Stage"
      : overallScore < 3
        ? "Developing"
        : overallScore < 4
          ? "Maturing"
          : "Advanced";

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Overall score */}
      <div className="text-center">
        <Badge variant="secondary" className="mb-4">
          Assessment Complete
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Your AI Maturity Score
        </h1>
        <div className="mt-6 inline-flex flex-col items-center">
          <div className="text-6xl font-bold tracking-tight">{overallScore}</div>
          <div className="text-lg text-muted-foreground">out of 5.0</div>
          <Badge className="mt-2" variant="secondary">
            {scoreLabel}
          </Badge>
        </div>
      </div>

      {/* Radar chart */}
      <Card>
        <CardHeader>
          <CardTitle>Maturity Across Dimensions</CardTitle>
          <CardDescription>
            Scores across all 7 assessment dimensions. Gaps indicate priority
            areas for your deployment plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadarChart data={chartData} />
        </CardContent>
      </Card>

      {/* Recommended phase */}
      <Card className="border-primary/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-primary" />
            <CardTitle>Recommended Starting Phase</CardTitle>
          </div>
          <CardDescription>
            Based on your overall score of {overallScore}, mapped to OpenAI&apos;s
            adoption framework
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Phase pipeline */}
          <div className="mb-6 flex gap-1">
            {frameworkPhases.map((phase) => {
              const isRecommended = phase.id === recommendedPhase.id;
              const isPast =
                frameworkPhases.indexOf(phase) <
                frameworkPhases.indexOf(recommendedPhase);
              return (
                <div
                  key={phase.id}
                  className={cn(
                    "flex-1 rounded-md py-2 text-center text-xs font-medium transition-all",
                    isRecommended
                      ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : isPast
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {phase.title}
                </div>
              );
            })}
          </div>

          <h3 className="text-lg font-semibold">
            {recommendedPhase.title}: {recommendedPhase.subtitle}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {recommendedPhase.description}
          </p>

          <Separator className="my-4" />

          <h4 className="mb-3 text-sm font-semibold">
            Recommended Next Steps
          </h4>
          <ul className="space-y-2">
            {(phaseRecommendations[recommendedPhase.id] || []).map(
              (rec, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{rec}</span>
                </li>
              )
            )}
          </ul>
        </CardContent>
      </Card>

      {/* Gap analysis */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <CardTitle>Gap Analysis</CardTitle>
          </div>
          <CardDescription>
            Dimensions sorted by priority — weighted score gap identifies where
            intervention will have the most impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gaps.map((gap, i) => (
              <div key={gap.dimension}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold",
                        i < 2
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium">{gap.dimension}</span>
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">
                    {gap.score} / 5.0
                  </span>
                </div>
                <div className="ml-7 h-2 rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      gap.score >= 4
                        ? "bg-green-500"
                        : gap.score >= 3
                          ? "bg-blue-500"
                          : gap.score >= 2
                            ? "bg-amber-500"
                            : "bg-red-500"
                    )}
                    style={{ width: `${(gap.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enterprise context */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>How You Compare</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Based on OpenAI&apos;s State of Enterprise AI 2025 report, weekly
            Enterprise messages grew <strong>8x year-over-year</strong>, with
            structured workflows (Projects, Custom GPTs) increasing{" "}
            <strong>19x</strong>.
          </p>
          <p>
            <strong>75%</strong> of enterprises report positive ROI from AI
            adoption — but <strong>95%</strong> of pilots fail to move beyond
            experimental. The difference is structured deployment, not the
            technology itself.
          </p>
          <p>
            The frontier gap is real: top-performing workers send{" "}
            <strong>6x</strong> more messages than median. Closing this gap
            through structured enablement is exactly what the Deployment Planner
            addresses.
          </p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/plan"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Generate Deployment Plan
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Button variant="outline" onClick={onRetake}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Retake Assessment
        </Button>
      </div>
    </div>
  );
}
