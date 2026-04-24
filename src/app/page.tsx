import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Radar,
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
    href: "/control-tower",
    icon: Radar,
    title: "H.I.G. AI Enablement Control Tower",
    description:
      "Portfolio mission control for multi-platform training, vendor content, champions, compliance, adoption analytics, and ROI across H.I.G. and portfolio companies.",
    badge: "New",
  },
  {
    href: "/assess",
    icon: ClipboardCheck,
    title: "Portfolio AI Maturity Assessment",
    description:
      "Evaluate company readiness across executive alignment, governance, tool access, AI fluency, champion coverage, and measurable value potential.",
    badge: "Start Here",
  },
  {
    href: "/plan",
    icon: Map,
    title: "Enablement Roadmap Builder",
    description:
      "Generate phased adoption plans by company tier, audience, platform stack, compliance needs, operating sponsor, and business outcome.",
    badge: null,
  },
  {
    href: "/workshops",
    icon: BookOpen,
    title: "Multi-Platform Curriculum",
    description:
      "Role-based paths spanning ToltIQ, ChatGPT, Claude, Copilot/Gemini, API/agents, governance, and AI champions.",
    badge: null,
  },
  {
    href: "/roi",
    icon: Calculator,
    title: "Adoption & ROI Calculator",
    description:
      "Connect training completion and workflow adoption to time savings, cycle-time reduction, margin expansion, and value creation evidence.",
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
  { value: "100+", label: "portfolio companies to segment and enable", source: "Portfolio Ops Scale" },
  { value: "5+", label: "frontier and approved AI platforms to train", source: "Multi-Platform Stack" },
  { value: "40%", label: "travel and direct delivery requirement", source: "Role Signal" },
  { value: "1", label: "central operating view for adoption and ROI", source: "Control Tower" },
];

const pillars = [
  {
    icon: Target,
    title: "Segment & Mobilize",
    description: "Classify portfolio companies into lighthouse, cohort, and foundation paths with sponsors and champions.",
  },
  {
    icon: TrendingUp,
    title: "Train & Operationalize",
    description: "Coordinate multi-platform curricula, vendor deliverables, calendars, office hours, and hands-on labs.",
  },
  {
    icon: Shield,
    title: "Measure & Govern",
    description: "Track completion, adoption, risk, content freshness, use case movement, and ROI evidence.",
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
              H.I.G. Portfolio Operations Demo
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Portfolio AI Enablement,{" "}
              <span className="text-primary">Commanded</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A control tower for training and adoption across H.I.G., its offices,
              vendors, champions, and portfolio companies. Coordinate ToltIQ,
              ChatGPT, Claude, Copilot/Gemini, API/agents, governance, and ROI in
              one operating system.
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
                href="/control-tower"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Enter Control Tower
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
              >
                View Proof Points
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
              Portfolio Enablement Operating Model
            </h2>
            <p className="mt-3 text-muted-foreground">
              Treat AI training as a value-creation program: segment the portfolio,
              train across approved platforms, govern safe use, and report measurable
              adoption outcomes.
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
              Your Enablement Operating System
            </h2>
            <p className="mt-3 text-muted-foreground">
              The current Deploy IQ modules become the support system around the new
              control tower: assessment, roadmap, curriculum, ROI, evals, and proof.
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
