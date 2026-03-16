import { Badge } from "@/components/ui/badge";

export default function PlanPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Badge variant="secondary" className="mb-4">
        Align &rarr; Activate &rarr; Amplify &rarr; Accelerate &rarr; Govern
      </Badge>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Deployment Planner
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Generate a customized enterprise adoption roadmap based on your
        assessment results, industry, and OpenAI product selection.
      </p>
      <div className="mt-12 rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
        Deployment planner — building next
      </div>
    </div>
  );
}
