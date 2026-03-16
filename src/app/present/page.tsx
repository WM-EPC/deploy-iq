"use client";

import { useState, useCallback, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Presentation,
  X,
} from "lucide-react";

interface Slide {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  notes?: string;
}

const slides: Slide[] = [
  {
    title: "Deploy IQ",
    subtitle: "Enterprise AI Deployment Toolkit",
    content: (
      <div className="space-y-8 text-center">
        <p className="text-2xl text-muted-foreground">
          Structured adoption of OpenAI&apos;s product suite
        </p>
        <div className="flex justify-center gap-6 text-sm text-muted-foreground">
          <span>Assessment</span>
          <span className="text-primary">&rarr;</span>
          <span>Planning</span>
          <span className="text-primary">&rarr;</span>
          <span>Enablement</span>
          <span className="text-primary">&rarr;</span>
          <span>Measurement</span>
          <span className="text-primary">&rarr;</span>
          <span>Governance</span>
        </div>
        <p className="text-sm text-muted-foreground/60 italic">
          Built on OpenAI&apos;s published frameworks and methodology
        </p>
      </div>
    ),
  },
  {
    title: "The Problem",
    subtitle: "Why 95% of AI pilots fail",
    content: (
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="text-5xl font-bold text-primary">75%</div>
          <p className="text-muted-foreground">
            of enterprises report positive ROI from AI
          </p>
        </div>
        <div className="space-y-4">
          <div className="text-5xl font-bold text-destructive">95%</div>
          <p className="text-muted-foreground">
            of AI pilots fail to move beyond experimental
          </p>
        </div>
        <div className="md:col-span-2 text-center">
          <p className="text-xl">
            The gap isn&apos;t the technology. It&apos;s the{" "}
            <span className="font-bold text-primary">deployment</span>.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "OpenAI's Adoption Framework",
    subtitle: "Align → Activate → Amplify → Accelerate → Govern",
    content: (
      <div className="space-y-6">
        {[
          { phase: "Align", desc: "Build strategic vision. Executive sponsorship, AI Council, measurable goals." },
          { phase: "Activate", desc: "Enable teams. Pilot group, Champions network, foundational training." },
          { phase: "Amplify", desc: "Scale wins. Knowledge hub, Custom GPTs, communities of practice." },
          { phase: "Accelerate", desc: "Remove friction. Hackathons, eval frameworks, advanced products." },
          { phase: "Govern", desc: "Balance speed & responsibility. Responsible AI playbook, policy GPT." },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {i + 1}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{item.phase}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Enterprise Results",
    subtitle: "Published case studies with quantified outcomes",
    content: (
      <div className="grid gap-6 md:grid-cols-2">
        {[
          { company: "Morgan Stanley", metric: "98%", desc: "advisor adoption, 350K+ docs searchable" },
          { company: "Klarna", metric: "$40M", desc: "profit improvement, 66% ticket automation" },
          { company: "BBVA", metric: "2,900+", desc: "Custom GPTs created in 5 months" },
          { company: "San Antonio Spurs", metric: "14% → 85%", desc: "AI fluency through workflow training" },
        ].map((item) => (
          <div key={item.company} className="rounded-lg border border-border p-6">
            <div className="text-sm text-muted-foreground mb-1">{item.company}</div>
            <div className="text-4xl font-bold text-primary">{item.metric}</div>
            <div className="text-sm text-muted-foreground mt-1">{item.desc}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "The Toolkit",
    subtitle: "Everything an AI Deployment Manager needs",
    content: (
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { title: "AI Maturity Assessment", desc: "7 dimensions, maps to Align→Govern framework" },
          { title: "Deployment Planner", desc: "Customized 5-phase roadmap with KPIs and risk mitigation" },
          { title: "Workshop Library", desc: "9 templates from Executive Briefings to API Bootcamps" },
          { title: "ROI Calculator", desc: "Published benchmarks, per-user value, break-even analysis" },
          { title: "Eval Strategy Planner", desc: "Analyze→Measure→Improve flywheel, grader recommendations" },
          { title: "Live API Playground", desc: "Real OpenAI API demos: advisory, content gen, eval design" },
        ].map((item) => (
          <div key={item.title} className="rounded-lg border border-border p-4">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Built by Experience",
    subtitle: "15+ years making complex technology land in enterprises",
    content: (
      <div className="space-y-6 max-w-2xl mx-auto">
        {[
          "Designed Salesforce's Success Executive Certification — live assessment with scored rubrics, built with PhDs in instructional design",
          "Drove $50M+ in realized value across 7 Fortune 500 accounts at Celonis through structured CoE frameworks",
          "Led change management for 14,000-person enterprise system rollout with 15 instructional designers",
          "Built production AI systems: 5-agent voice orchestration (Realtime API), medical training simulator (used in Fortune 100 RFP), full-stack app with auth and payments",
          "Led 143-country regulatory program for Fortune 100 pharma — governance at global scale",
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <p className="text-muted-foreground">{item}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Next Steps",
    content: (
      <div className="space-y-8 text-center max-w-2xl mx-auto">
        <p className="text-xl text-muted-foreground">
          The through-line: take something complex, meet the audience where they
          are, and make it land in a way that actually changes behavior.
        </p>
        <div className="space-y-4">
          {[
            "Start with the AI Maturity Assessment",
            "Generate a customized Deployment Plan",
            "Select workshops for your first 90 days",
            "Model your ROI with published benchmarks",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-left rounded-lg border border-border p-4"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {i + 1}
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function PresentPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slide = slides[currentSlide];

  const next = useCallback(() => {
    if (currentSlide < slides.length - 1) setCurrentSlide((s) => s + 1);
  }, [currentSlide]);

  const prev = useCallback(() => {
    if (currentSlide > 0) setCurrentSlide((s) => s - 1);
  }, [currentSlide]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col",
        isFullscreen ? "h-screen bg-background" : "min-h-screen"
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border px-6 py-3">
        <div className="flex items-center gap-3">
          <Presentation className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">Presentation Mode</span>
          <Badge variant="secondary" className="text-xs">
            {currentSlide + 1} / {slides.length}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={toggleFullscreen}>
            {isFullscreen ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (window.location.href = "/")}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Slide */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="mt-3 text-xl text-muted-foreground">
                {slide.subtitle}
              </p>
            )}
          </div>
          <div className="mt-12">{slide.content}</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-border px-6 py-3">
        <Button
          variant="ghost"
          onClick={prev}
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>

        {/* Slide dots */}
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === currentSlide
                  ? "w-6 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          onClick={next}
          disabled={currentSlide === slides.length - 1}
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
