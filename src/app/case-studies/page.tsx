"use client";

import { useState } from "react";
import { caseStudies, industries } from "@/lib/case-study-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Building2,
  TrendingUp,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Layers,
} from "lucide-react";

export default function CaseStudiesPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter
    ? caseStudies.filter((cs) => cs.industry === filter)
    : caseStudies;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12">
        <Badge variant="secondary" className="mb-4">
          {caseStudies.length} Case Studies
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Enterprise Case Studies
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Quantified results from enterprises deploying OpenAI&apos;s product
          suite. Published case studies plus composite examples from real-world
          deployment patterns.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter(null)}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
            !filter
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent"
          )}
        >
          All
        </button>
        {industries.map((ind) => (
          <button
            key={ind}
            onClick={() => setFilter(filter === ind ? null : ind)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              filter === ind
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent"
            )}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Case study cards */}
      <div className="space-y-6">
        {filtered.map((cs) => {
          const isExpanded = expandedId === cs.id;
          return (
            <Card key={cs.id} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : cs.id)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-xl">{cs.company}</CardTitle>
                      {cs.isComposite && (
                        <Badge variant="outline" className="text-xs">
                          Composite
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {cs.industry}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <Layers className="mr-1 h-3 w-3" />
                        {cs.valueModel}
                      </Badge>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <CardDescription className="mt-2">
                  {cs.challenge}
                </CardDescription>

                {/* Always-visible results preview */}
                <div className="mt-4 flex flex-wrap gap-4">
                  {cs.results.slice(0, 3).map((r, i) => (
                    <div key={i} className="text-center">
                      <div className="text-lg font-bold text-primary">
                        {r.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {r.metric}
                      </div>
                    </div>
                  ))}
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0 space-y-6">
                  <Separator />

                  {/* Solution */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold">Solution</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {cs.solution}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {cs.products.map((p) => (
                        <Badge key={p} variant="outline" className="text-xs">
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Full results */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <h3 className="text-sm font-semibold">Results</h3>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {cs.results.map((r, i) => (
                        <div
                          key={i}
                          className="rounded-lg border border-border p-3"
                        >
                          <div className="text-xl font-bold text-primary">
                            {r.value}
                          </div>
                          <div className="text-xs font-medium">{r.metric}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {r.context}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key takeaway */}
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold">Key Takeaway</h3>
                    </div>
                    <p className="text-sm">{cs.keyTakeaway}</p>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
