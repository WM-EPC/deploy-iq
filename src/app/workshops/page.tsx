import { Badge } from "@/components/ui/badge";

export default function WorkshopsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Badge variant="secondary" className="mb-4">
        9 Templates
      </Badge>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Workshop &amp; Training Library
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Ready-to-deliver training templates built on OpenAI Academy formats,
        from Executive AI Briefings to API Bootcamps.
      </p>
      <div className="mt-12 rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
        Workshop library — building next
      </div>
    </div>
  );
}
