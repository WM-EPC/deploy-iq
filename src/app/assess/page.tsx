import { Badge } from "@/components/ui/badge";

export default function AssessPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Badge variant="secondary" className="mb-4">
        Step 1 of 5
      </Badge>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        AI Maturity Assessment
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Evaluate your organization&apos;s AI readiness across 7 dimensions. Results
        map to OpenAI&apos;s Align-Activate-Amplify-Accelerate-Govern framework.
      </p>
      <div className="mt-12 rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
        Assessment questionnaire — building next
      </div>
    </div>
  );
}
