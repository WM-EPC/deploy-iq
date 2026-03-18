import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardCheck,
  Map,
  BookOpen,
  Calculator,
  FlaskConical,
  Building2,
  Play,
  ArrowRight,
  Zap,
  Target,
  TrendingUp,
  Shield,
} from "lucide-react";

const features = [
  {
    href: "/assess",
    icon: ClipboardCheck,
    title: "AI Maturity Assessment",
    description:
      "Evaluate organizational readiness across 7 dimensions. Maps to OpenAI's Align-Activate-Amplify-Accelerate-Govern framework.",
    badge: "Start Here",
  },
  {
    href: "/plan",
    icon: Map,
    title: "Deployment Planner",
    description:
      "Generate a customized adoption roadmap with phased rollout, RACI matrices, KPIs, and risk mitigation — powered by GPT.",
    badge: null,
  },
  {
    href: "/workshops",
    icon: BookOpen,
    title: "Workshop Library",
    description:
      "9 ready-to-deliver training templates from Executive AI Briefings to API Bootcamps, built on OpenAI Academy formats.",
    badge: null,
  },
  {
    href: "/roi",
    icon: Calculator,
    title: "ROI Calculator",
    description:
      "Connect OpenAI products to concrete business outcomes using published case study benchmarks from Klarna, Morgan Stanley, and Stripe.",
    badge: null,
  },
  {
    href: "/evals",
    icon: FlaskConical,
    title: "Eval Strategy Planner",
    description:
      "Design AI evaluation approaches using OpenAI's eval-driven development methodology — the Analyze-Measure-Improve flywheel.",
    badge: null,
  },
  {
    href: "/case-studies",
    icon: Building2,
    title: "Case Study Library",
    description:
      "10+ enterprise case studies with quantified results. Morgan Stanley, Klarna, BBVA, Moderna, and more.",
    badge: null,
  },
  {
    href: "/playground",
    icon: Play,
    title: "API Playground",
    description:
      "Live OpenAI API demonstrations — chat completions, RAG queries, eval graders, and agent workflows.",
    badge: "Live API",
  },
];

const stats = [
  { value: "75%", label: "of enterprises report positive AI ROI", source: "Wharton Study" },
  { value: "8x", label: "YoY growth in Enterprise AI messages", source: "OpenAI 2025 Report" },
  { value: "95%", label: "of AI pilots fail to scale beyond experimental", source: "Industry Data" },
  { value: "6x", label: "more messages from frontier vs. median workers", source: "OpenAI 2025 Report" },
];

const pillars = [
  {
    icon: Target,
    title: "Align & Activate",
    description: "Executive alignment, stakeholder mapping, structured skill-building, and AI Champions networks.",
  },
  {
    icon: TrendingUp,
    title: "Amplify & Accelerate",
    description: "Scale wins across the organization. Move from pilot to production with clear intake and prioritization.",
  },
  {
    icon: Shield,
    title: "Govern",
    description: "Responsible AI practices that enable speed. Policy GPTs, quarterly reviews, and agent governance.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-1/5" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              Built on OpenAI&apos;s Published Frameworks
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Enterprise AI Deployment,{" "}
              <span className="text-primary">Structured</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Turn OpenAI&apos;s product suite into measurable business value.
              Assess readiness, plan deployment, design workshops, calculate ROI,
              and build evaluation strategies — all in one toolkit.
            </p>
            <p className="mt-3 text-sm text-muted-foreground/60">
              A demo by{" "}
              <a
                href="https://billmabry.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Bill Mabry
              </a>
              {" "}&middot; Built on OpenAI&apos;s published frameworks &amp; methodology
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/assess"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Start Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold tracking-tight">
                  {stat.value}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground/60">
                  {stat.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Framework pillars */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              OpenAI&apos;s Enterprise Adoption Framework
            </h2>
            <p className="mt-3 text-muted-foreground">
              From &ldquo;Staying Ahead in the Age of AI&rdquo; — a structured
              approach to moving enterprises from initial exposure to confident,
              scalable use.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Your Deployment Toolkit
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every tool an AI Deployment Manager needs — from first customer
              conversation to scaled production adoption.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.href} href={feature.href}>
                  <Card className="group h-full transition-colors hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        {feature.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {feature.badge}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="mt-4 group-hover:text-primary">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About / credibility */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Why This Toolkit Exists
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                75% of enterprises report positive ROI from AI — but 95% of
                pilots never make it past the experimental phase. The gap isn&apos;t
                the technology. It&apos;s the deployment.
              </p>
              <p>
                Deploy IQ operationalizes OpenAI&apos;s published adoption
                frameworks into a structured toolkit — assessment, planning,
                training, measurement, and evaluation — so enterprises move from
                curious to confident.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/assess"
                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Zap className="h-4 w-4" />
                Start Your Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Builder credit */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm text-muted-foreground">
              Built by{" "}
              <a
                href="https://billmabry.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary transition-colors"
              >
                Bill Mabry
              </a>{" "}
              — using OpenAI&apos;s published frameworks and methodology
            </p>
            <p className="mt-1 text-xs text-muted-foreground/50">
              15+ years driving enterprise technology adoption at Salesforce, Celonis, and Fortune 500 consulting
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
