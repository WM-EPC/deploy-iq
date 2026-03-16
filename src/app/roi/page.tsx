import { Badge } from "@/components/ui/badge";
import { ROICalculator } from "@/components/roi/calculator";

export default function RoiPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12">
        <Badge variant="secondary" className="mb-4">
          Published Benchmarks
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          ROI &amp; Impact Calculator
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Connect OpenAI products to concrete business outcomes. Model your
          organization&apos;s projected value using published enterprise
          benchmarks from Klarna, Morgan Stanley, Stripe, and more.
        </p>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground/60 italic">
          Based on OpenAI&apos;s published data: workers save 40-60 minutes
          daily, ~10% productivity gains, and 75% of enterprises report positive
          ROI within the first year.
        </p>
      </div>
      <ROICalculator />
    </div>
  );
}
