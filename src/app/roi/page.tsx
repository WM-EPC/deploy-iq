import { Badge } from "@/components/ui/badge";

export default function RoiPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Badge variant="secondary" className="mb-4">
        Published Benchmarks
      </Badge>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        ROI &amp; Impact Calculator
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Connect OpenAI products to concrete business outcomes using published
        enterprise benchmarks from Klarna, Morgan Stanley, Stripe, and more.
      </p>
      <div className="mt-12 rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
        ROI calculator — building next
      </div>
    </div>
  );
}
