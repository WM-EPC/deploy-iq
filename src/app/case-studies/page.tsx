import { Badge } from "@/components/ui/badge";

export default function CaseStudiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Badge variant="secondary" className="mb-4">
        10+ Enterprises
      </Badge>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Enterprise Case Studies
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Quantified results from enterprises deploying OpenAI&apos;s product
        suite — from Morgan Stanley&apos;s 98% advisor adoption to Klarna&apos;s
        $40M profit improvement.
      </p>
      <div className="mt-12 rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
        Case studies — building next
      </div>
    </div>
  );
}
