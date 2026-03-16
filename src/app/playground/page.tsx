import { Badge } from "@/components/ui/badge";

export default function PlaygroundPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Badge variant="secondary" className="mb-4">
        Live API
      </Badge>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        API Playground
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Live OpenAI API demonstrations — chat completions, RAG queries, eval
        graders, and agent tool use. See the capabilities in action.
      </p>
      <div className="mt-12 rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
        API playground — building next
      </div>
    </div>
  );
}
