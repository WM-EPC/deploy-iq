import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Questionnaire } from "@/components/assessment/questionnaire";

export const metadata: Metadata = {
  title: "AI Maturity Assessment — Deploy IQ",
  description: "Evaluate your organization's AI readiness across 7 dimensions. Maps to OpenAI's Align-Activate-Amplify-Accelerate-Govern framework.",
};

export default function AssessPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12 text-center">
        <Badge variant="secondary" className="mb-4">
          OpenAI Adoption Framework
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          AI Maturity Assessment
        </h1>
        <p className="mt-3 mx-auto max-w-2xl text-muted-foreground">
          Evaluate your organization&apos;s readiness across 7 dimensions. Results
          map to OpenAI&apos;s Align-Activate-Amplify-Accelerate-Govern framework
          with prioritized recommendations.
        </p>
      </div>
      <Questionnaire />
    </div>
  );
}
