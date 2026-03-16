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
import { cn } from "@/lib/utils";
import {
  FlaskConical,
  CheckCircle2,
  ArrowRight,
  RotateCw,
  Search,
  BarChart3,
  TrendingUp,
  Code,
  Brain,
  FileText,
  Settings,
} from "lucide-react";

const useCaseTypes = [
  { value: "classification", label: "Classification", icon: Settings, description: "Categorize inputs into predefined labels" },
  { value: "generation", label: "Text Generation", icon: FileText, description: "Create content, summaries, or responses" },
  { value: "rag", label: "RAG / Q&A", icon: Search, description: "Retrieve and synthesize from knowledge bases" },
  { value: "code", label: "Code Generation", icon: Code, description: "Write, review, or debug code" },
  { value: "agents", label: "Agent Workflows", icon: Brain, description: "Multi-step autonomous task execution" },
  { value: "support", label: "Customer Support", icon: BarChart3, description: "Handle inquiries and resolve issues" },
];

interface GraderRec {
  type: string;
  description: string;
  bestFor: string;
  example: string;
}

const graderMatrix: Record<string, GraderRec[]> = {
  classification: [
    { type: "String Check", description: "Exact match against expected label", bestFor: "Binary or multi-class classification with clear ground truth", example: "grader: string_check(expected='positive', actual=output)" },
    { type: "Code-based (Python)", description: "Custom logic for fuzzy matching or multi-label", bestFor: "Cases where partial matches or synonym handling is needed", example: "def grade(output, expected): return output.lower().strip() == expected.lower().strip()" },
  ],
  generation: [
    { type: "Model-based (LLM Judge)", description: "GPT-4 evaluates quality, tone, accuracy", bestFor: "Subjective quality assessment where human judgment is needed", example: "Prompt: 'Rate this response 1-5 on helpfulness, accuracy, and tone.'" },
    { type: "Code-based (Python)", description: "Length checks, format validation, keyword presence", bestFor: "Structural requirements: minimum length, required sections, format compliance", example: "def grade(output): return len(output) > 100 and 'conclusion' in output.lower()" },
  ],
  rag: [
    { type: "Model-based (LLM Judge)", description: "Evaluate retrieval relevance and answer grounding", bestFor: "Checking if answers are supported by retrieved documents", example: "Prompt: 'Is the answer fully supported by the provided context? Rate faithfulness 1-5.'" },
    { type: "String Check", description: "Verify citation presence", bestFor: "Ensuring answers include source references", example: "grader: string_check(contains='[Source:', actual=output)" },
    { type: "Code-based (Python)", description: "Check retrieval precision and recall", bestFor: "Measuring whether the right documents were retrieved", example: "def grade(retrieved, relevant): return len(set(retrieved) & set(relevant)) / len(relevant)" },
  ],
  code: [
    { type: "Code-based (Python)", description: "Run generated code and check output", bestFor: "Functional correctness - does the code produce the right result?", example: "def grade(code, test_cases): return all(run(code, tc.input) == tc.expected for tc in test_cases)" },
    { type: "Model-based (LLM Judge)", description: "Evaluate code quality, readability, best practices", bestFor: "Subjective quality beyond correctness: style, efficiency, security", example: "Prompt: 'Review this code for correctness, readability, and security. Rate each 1-5.'" },
  ],
  agents: [
    { type: "Code-based (Python)", description: "Check task completion and tool usage patterns", bestFor: "Verifying agents completed the task and used appropriate tools", example: "def grade(trace): return trace.final_state == 'completed' and len(trace.tool_calls) <= max_steps" },
    { type: "Model-based (LLM Judge)", description: "Evaluate reasoning quality and decision-making", bestFor: "Assessing whether the agent's reasoning chain was sound", example: "Prompt: 'Review this agent trace. Was the reasoning sound? Were tool selections appropriate?'" },
    { type: "Formatted", description: "Validate output structure against expected schema", bestFor: "Ensuring agent output matches expected format", example: "grader: formatted_check(schema={status: str, result: dict, confidence: float})" },
  ],
  support: [
    { type: "Model-based (LLM Judge)", description: "Evaluate helpfulness, empathy, accuracy", bestFor: "Holistic quality assessment of support interactions", example: "Prompt: 'Rate this support response on helpfulness (1-5), empathy (1-5), accuracy (1-5).'" },
    { type: "Code-based (Python)", description: "Check resolution status and response time", bestFor: "Operational metrics: was the issue resolved? Within SLA?", example: "def grade(interaction): return interaction.resolved and interaction.time < sla" },
    { type: "String Check", description: "Verify required disclaimers or policy references", bestFor: "Compliance: ensuring required language is included", example: "grader: string_check(contains='Please note our refund policy', actual=output)" },
  ],
};

const flywheelSteps = [
  {
    id: "analyze",
    title: "Analyze",
    icon: Search,
    color: "bg-blue-500/10 text-blue-500",
    description: "Manually examine ~50 failing examples",
    details: [
      "Open Coding: Apply descriptive labels to failing traces",
      "Axial Coding: Group codes into higher-level categories",
      "Create a structured taxonomy of failure modes",
      "Identify the 2-3 most impactful failure types to address first",
    ],
  },
  {
    id: "measure",
    title: "Measure",
    icon: BarChart3,
    color: "bg-green-500/10 text-green-500",
    description: "Build automated evaluators to quantify failures",
    details: [
      "Choose grader type based on failure mode (see recommendations below)",
      "Build narrowly-scoped graders targeting specific failure points",
      "Broad graders produce noisy signals - narrow graders produce actionable data",
      "Validate LLM judges with Train (20%) / Validation (40%) / Test (40%) split",
    ],
  },
  {
    id: "improve",
    title: "Improve",
    icon: TrendingUp,
    color: "bg-purple-500/10 text-purple-500",
    description: "Iterate on prompts using eval results",
    details: [
      "Manual prompt rewrites informed by failure analysis",
      "Automated Prompt Optimizer: upload dataset, add graders, click Optimize",
      "Minimum 3 rows for Prompt Optimizer (more is better)",
      "Always manually review optimized prompts before production",
    ],
  },
];

export default function EvalsPage() {
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);

  const recommendations = selectedUseCase ? graderMatrix[selectedUseCase] || [] : [];

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12">
        <Badge variant="secondary" className="mb-4">
          Eval-Driven Development
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Eval Strategy Planner
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Design AI evaluation approaches using OpenAI&apos;s methodology. Write
          evals before prompts - like BDD for AI systems.
        </p>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground/60 italic">
          &ldquo;You can&apos;t improve what you can&apos;t measure.&rdquo; Morgan Stanley
          built an eval framework testing every use case before deployment - achieving
          98% advisor adoption.
        </p>
      </div>

      {/* The Evaluation Flywheel */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <RotateCw className="h-5 w-5 text-primary" />
            <CardTitle>The Evaluation Flywheel</CardTitle>
          </div>
          <CardDescription>
            OpenAI&apos;s continuous improvement cycle: Analyze failures, Measure
            with automated graders, Improve with prompt optimization. Repeat.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {flywheelSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.id}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", step.color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-muted-foreground">
                          Step {i + 1}
                        </span>
                        {i < 2 && (
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        )}
                      </div>
                      <h3 className="font-semibold">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {step.description}
                  </p>
                  <ul className="space-y-1.5">
                    {step.details.map((d, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Use case selector */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          Select Your Use Case
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {useCaseTypes.map((uc) => {
            const Icon = uc.icon;
            const isSelected = selectedUseCase === uc.value;
            return (
              <button
                key={uc.value}
                onClick={() =>
                  setSelectedUseCase(isSelected ? null : uc.value)
                }
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-4 text-left transition-all",
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border hover:border-primary/50"
                )}
              >
                <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", isSelected ? "text-primary" : "text-muted-foreground")} />
                <div>
                  <div className="text-sm font-medium">{uc.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {uc.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grader recommendations */}
      {selectedUseCase && recommendations.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-primary" />
              <CardTitle>Recommended Graders</CardTitle>
            </div>
            <CardDescription>
              Grader recommendations for{" "}
              {useCaseTypes.find((u) => u.value === selectedUseCase)?.label} use
              cases
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec, i) => (
              <div
                key={i}
                className="rounded-lg border border-border p-4 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {rec.type}
                  </Badge>
                </div>
                <p className="text-sm">{rec.description}</p>
                <p className="text-xs text-muted-foreground">
                  <strong>Best for:</strong> {rec.bestFor}
                </p>
                <div className="rounded bg-muted p-2">
                  <code className="text-xs text-muted-foreground break-all">
                    {rec.example}
                  </code>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 7-Step System Design */}
      <Card>
        <CardHeader>
          <CardTitle>Eval-Driven System Design (7 Steps)</CardTitle>
          <CardDescription>
            From OpenAI Cookbook: the complete path from prototype to production
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { step: 1, title: "Problem Understanding", description: "Interview domain experts. Document decision criteria. Understand what 'good' looks like." },
              { step: 2, title: "Data Assembly", description: "Start small. Collect input samples. Have experts annotate expected outputs." },
              { step: 3, title: "Minimal V0 System", description: "Build skeleton end-to-end system quickly. Don't optimize yet." },
              { step: 4, title: "Initial Evals with Ground Truth", description: "Process inputs. Have experts correct outputs. Create targeted evaluations." },
              { step: 5, title: "Business Metrics Mapping", description: "Connect eval scores to financial impact: per-unit costs, audit expenses, cost of misses." },
              { step: 6, title: "Iterative Improvement", description: "Use eval results to identify high-impact issues. Focus only on business-relevant failures." },
              { step: 7, title: "Production Integration", description: "Instrument production for continuous improvement. Monitor edge cases. Eval performance stabilizes." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {item.step}
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
