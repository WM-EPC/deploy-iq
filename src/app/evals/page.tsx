import { Badge } from "@/components/ui/badge";

export default function EvalsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Badge variant="secondary" className="mb-4">
        Eval-Driven Development
      </Badge>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Eval Strategy Planner
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Design AI evaluation approaches using OpenAI&apos;s methodology — the
        Analyze-Measure-Improve flywheel, grader types, and Prompt Optimizer
        workflows.
      </p>
      <div className="mt-12 rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
        Eval planner — building next
      </div>
    </div>
  );
}
