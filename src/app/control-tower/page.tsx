"use client";

import { useMemo, useState, type ElementType } from "react";
import {
  AlertTriangle,
  AudioLines,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Command,
  Gauge,
  Layers3,
  LineChart,
  MapPin,
  MessageSquareText,
  Network,
  RefreshCcw,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type BaselineStage =
  | "unassessed"
  | "foundation"
  | "active"
  | "lighthouse"
  | "measuring"
  | "risk";

type SegmentId =
  | "business-services"
  | "healthcare"
  | "industrials"
  | "technology"
  | "consumer"
  | "firm";

type InterviewAnswer = {
  key: string;
  label: string;
  value: string;
};

const baselineStages: Array<{
  key: BaselineStage;
  label: string;
  shortLabel: string;
  description: string;
}> = [
  {
    key: "unassessed",
    label: "Unassessed",
    shortLabel: "No Baseline",
    description: "No survey or interview signal yet",
  },
  {
    key: "foundation",
    label: "Foundation",
    shortLabel: "Foundation",
    description: "Needs literacy, safe use, and sponsor alignment",
  },
  {
    key: "active",
    label: "Active Cohort",
    shortLabel: "Active",
    description: "Scheduled training or office hours in motion",
  },
  {
    key: "lighthouse",
    label: "Lighthouse",
    shortLabel: "Lighthouse",
    description: "High-readiness company that can create proof",
  },
  {
    key: "measuring",
    label: "Measuring ROI",
    shortLabel: "ROI",
    description: "Workflow adoption tied to measurable value",
  },
  {
    key: "risk",
    label: "At Risk",
    shortLabel: "Risk",
    description: "Governance, sentiment, sponsor, or adoption issue",
  },
];

const baselineSegments: Array<{
  id: SegmentId;
  name: string;
  count: number;
  employees: number;
  assessed: number;
  sentiment: number;
  championCoverage: number;
  counts: Record<BaselineStage, number>;
}> = [
  {
    id: "business-services",
    name: "Business Services",
    count: 92,
    employees: 48200,
    assessed: 66,
    sentiment: 71,
    championCoverage: 64,
    counts: {
      unassessed: 26,
      foundation: 18,
      active: 29,
      lighthouse: 8,
      measuring: 5,
      risk: 6,
    },
  },
  {
    id: "healthcare",
    name: "Healthcare",
    count: 68,
    employees: 91000,
    assessed: 31,
    sentiment: 49,
    championCoverage: 28,
    counts: {
      unassessed: 37,
      foundation: 14,
      active: 5,
      lighthouse: 2,
      measuring: 1,
      risk: 9,
    },
  },
  {
    id: "industrials",
    name: "Industrials & Logistics",
    count: 74,
    employees: 67200,
    assessed: 45,
    sentiment: 58,
    championCoverage: 42,
    counts: {
      unassessed: 29,
      foundation: 21,
      active: 14,
      lighthouse: 5,
      measuring: 2,
      risk: 3,
    },
  },
  {
    id: "technology",
    name: "Technology & Software",
    count: 54,
    employees: 28600,
    assessed: 42,
    sentiment: 79,
    championCoverage: 76,
    counts: {
      unassessed: 12,
      foundation: 7,
      active: 19,
      lighthouse: 9,
      measuring: 4,
      risk: 3,
    },
  },
  {
    id: "consumer",
    name: "Consumer & Retail",
    count: 112,
    employees: 108500,
    assessed: 61,
    sentiment: 54,
    championCoverage: 39,
    counts: {
      unassessed: 51,
      foundation: 28,
      active: 18,
      lighthouse: 3,
      measuring: 2,
      risk: 10,
    },
  },
  {
    id: "firm",
    name: "H.I.G. Firm-Side",
    count: 1,
    employees: 500,
    assessed: 1,
    sentiment: 83,
    championCoverage: 80,
    counts: {
      unassessed: 0,
      foundation: 0,
      active: 0,
      lighthouse: 0,
      measuring: 1,
      risk: 0,
    },
  },
];

const priorityQueue: Array<{
  id: string;
  rank: number;
  title: string;
  scope: string;
  segmentId: SegmentId;
  stage: BaselineStage;
  impact: "High" | "Medium" | "Low";
  owner: string;
  due: string;
  nextAction: string;
}> = [
  {
    id: "healthcare-baseline",
    rank: 1,
    title: "Launch healthcare safe-use baseline",
    scope: "37 unassessed companies, 14 at risk",
    segmentId: "healthcare",
    stage: "risk",
    impact: "High",
    owner: "AI Enablement + Legal",
    due: "May 3",
    nextAction: "Send HIPAA-safe survey path and schedule executive briefing cohort",
  },
  {
    id: "consumer-unassessed",
    rank: 2,
    title: "Close consumer portfolio baseline gap",
    scope: "51 companies have no readiness signal",
    segmentId: "consumer",
    stage: "unassessed",
    impact: "High",
    owner: "Portfolio Ops",
    due: "May 10",
    nextAction: "Route AI readiness interview to CEOs, CFOs, HR, and operations leads",
  },
  {
    id: "technology-roi",
    rank: 3,
    title: "Convert technology adoption into ROI proof",
    scope: "9 lighthouse companies, 7 measuring ROI",
    segmentId: "technology",
    stage: "measuring",
    impact: "High",
    owner: "Strategy & Transformation",
    due: "May 17",
    nextAction: "Collect cycle-time and developer productivity evidence from power users",
  },
  {
    id: "industrials-sponsor",
    rank: 4,
    title: "Confirm operating sponsors in industrials",
    scope: "21 companies stuck in foundation path",
    segmentId: "industrials",
    stage: "foundation",
    impact: "Medium",
    owner: "Operating Partners",
    due: "May 15",
    nextAction: "Run sponsor readiness call and assign champion candidates",
  },
  {
    id: "business-champions",
    rank: 5,
    title: "Scale business services champion model",
    scope: "29 companies in active cohorts",
    segmentId: "business-services",
    stage: "active",
    impact: "Medium",
    owner: "Bill Mabry",
    due: "May 22",
    nextAction: "Promote highest-confidence practitioners into peer coaching office hours",
  },
];

const trainingDemand = [
  { platform: "ChatGPT", demand: 78, gap: "Prompt patterns, Projects, data analysis" },
  { platform: "Claude", demand: 61, gap: "Long-context document review" },
  { platform: "ToltIQ", demand: 54, gap: "Source-linked diligence workflows" },
  { platform: "Copilot/Gemini", demand: 47, gap: "Workspace productivity and finance" },
  { platform: "Codex/API/Agents", demand: 29, gap: "Technical teams and automation pilots" },
];

const changeSentiment = [
  { label: "Opportunity", value: 46, color: "green" },
  { label: "Confusion", value: 21, color: "amber" },
  { label: "Job Concern", value: 14, color: "coral" },
  { label: "Skepticism", value: 12, color: "slate" },
  { label: "Fear", value: 7, color: "red" },
];

const interviewQuestionSets = {
  common: [
    {
      key: "role",
      prompt: "Which best describes your role?",
      options: ["Executive", "Operator", "Finance", "Technical", "Frontline"],
    },
    {
      key: "usage",
      prompt: "How often do you personally use ChatGPT, Claude, Copilot, or Gemini?",
      options: ["Never", "Tried once", "Monthly", "Weekly", "Daily"],
    },
    {
      key: "sentiment",
      prompt: "Which statement is closest to how you feel about AI at work?",
      options: [
        "Huge opportunity",
        "Helpful but unclear",
        "Concerned about my job",
        "Too risky",
        "Mostly hype",
      ],
    },
  ],
  technical: [
    {
      key: "technical_depth",
      prompt: "Which technical AI patterns have you used?",
      options: ["None yet", "GitHub/Codex", "API calls", "RAG", "Agents/evals"],
    },
  ],
  operator: [
    {
      key: "workflow",
      prompt: "Where would AI most help your weekly work?",
      options: ["Reporting", "Research", "Customer support", "Sales/marketing", "Operations"],
    },
  ],
  final: [
    {
      key: "champion",
      prompt: "Would you be willing to help peers adopt approved AI workflows?",
      options: ["Yes", "Maybe", "Not now"],
    },
  ],
};

const stageTone: Record<BaselineStage, string> = {
  unassessed: "border-[#64756f] bg-[#64756f]/12 text-[#d3ddd9]",
  foundation: "border-[#ff8b6b] bg-[#ff8b6b]/12 text-[#ffd1c4]",
  active: "border-[#74f7e7] bg-[#74f7e7]/12 text-[#c9fff8]",
  lighthouse: "border-[#5cff9a] bg-[#5cff9a]/12 text-[#c7ffd9]",
  measuring: "border-[#f1c35b] bg-[#f1c35b]/12 text-[#ffe3a3]",
  risk: "border-[#ff6358] bg-[#ff6358]/12 text-[#ffbbb5]",
};

export default function ControlTowerPage() {
  const [selectedSegmentId, setSelectedSegmentId] =
    useState<SegmentId>("healthcare");
  const [selectedStage, setSelectedStage] = useState<BaselineStage>("risk");
  const [selectedPriorityId, setSelectedPriorityId] = useState("healthcare-baseline");
  const [activeSection, setActiveSection] = useState("baseline");
  const [answers, setAnswers] = useState<InterviewAnswer[]>([]);

  const totals = useMemo(() => {
    const portfolioCompanyCount = baselineSegments
      .filter((segment) => segment.id !== "firm")
      .reduce((sum, segment) => sum + segment.count, 0);
    const assessed = baselineSegments
      .filter((segment) => segment.id !== "firm")
      .reduce((sum, segment) => sum + segment.assessed, 0);
    const atRisk = baselineSegments.reduce(
      (sum, segment) => sum + segment.counts.risk,
      0
    );
    const measuring = baselineSegments.reduce(
      (sum, segment) => sum + segment.counts.measuring,
      0
    );

    return {
      portfolioCompanyCount,
      assessed,
      unassessed: portfolioCompanyCount - assessed,
      atRisk,
      measuring,
      championCoverage: Math.round(
        baselineSegments.reduce(
          (sum, segment) => sum + segment.championCoverage * segment.count,
          0
        ) /
          baselineSegments.reduce((sum, segment) => sum + segment.count, 0)
      ),
    };
  }, []);

  const selectedSegment = baselineSegments.find(
    (segment) => segment.id === selectedSegmentId
  )!;
  const selectedPriority = priorityQueue.find(
    (priority) => priority.id === selectedPriorityId
  )!;
  const activeQuestions = getInterviewQuestions(answers);
  const currentQuestion = activeQuestions[answers.length];
  const interviewComplete = answers.length >= activeQuestions.length;
  const interviewResult = getInterviewResult(answers);

  const selectCell = (segmentId: SegmentId, stage: BaselineStage) => {
    setSelectedSegmentId(segmentId);
    setSelectedStage(stage);
    const match =
      priorityQueue.find(
        (priority) => priority.segmentId === segmentId && priority.stage === stage
      ) ??
      priorityQueue.find((priority) => priority.segmentId === segmentId) ??
      priorityQueue[0];
    setSelectedPriorityId(match.id);
  };

  const selectPriority = (id: string) => {
    const priority = priorityQueue.find((item) => item.id === id)!;
    setSelectedPriorityId(id);
    setSelectedSegmentId(priority.segmentId);
    setSelectedStage(priority.stage);
  };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div id="top" className="min-h-screen overflow-hidden bg-[#020806] text-[#ecfff8]">
      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(116,247,231,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(116,247,231,0.04)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_2%,rgba(27,126,99,0.22),transparent_32%),linear-gradient(180deg,rgba(2,8,6,0.12),#020806_70%)]" />
      </div>

      <div className="relative mx-auto flex max-w-[1760px] gap-4 px-4 py-4 sm:px-5 lg:px-6">
        <ControlRail activeSection={activeSection} onNavigate={scrollTo} />

        <main className="min-w-0 flex-1 space-y-4">
          <section className="rounded-lg border border-[#16372f] bg-[#05110f]/88 p-4 shadow-[0_0_0_1px_rgba(116,247,231,0.04),0_24px_80px_rgba(0,0,0,0.42)]">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap gap-2">
                  <SignalBadge tone="cyan">Portfolio Baseline</SignalBadge>
                  <SignalBadge tone="green">Survey + AI Interview</SignalBadge>
                  <SignalBadge tone="amber">Actionable Demo Data</SignalBadge>
                </div>
                <h1 className="text-2xl font-semibold sm:text-3xl">
                  H.I.G. AI Enablement Control Tower
                </h1>
                <p className="mt-2 max-w-4xl text-sm leading-6 text-[#9bbcb3]">
                  Baseline the portfolio, segment readiness, prioritize interventions,
                  and convert training into adoption and value evidence across H.I.G.,
                  offices, vendors, champions, and portfolio companies.
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-6">
                <MetricPill icon={BriefcaseBusiness} label="Portfolio Cos." value="400" detail="scope" />
                <MetricPill icon={Users} label="Firm Employees" value="500" detail="H.I.G." tone="cyan" />
                <MetricPill icon={MapPin} label="Offices" value="10" detail="global" tone="cyan" />
                <MetricPill icon={ClipboardCheck} label="Assessed" value={totals.assessed.toString()} detail={`${totals.unassessed} missing`} tone="green" />
                <MetricPill icon={AlertTriangle} label="At Risk" value={totals.atRisk.toString()} detail="needs action" tone="red" />
                <MetricPill icon={LineChart} label="ROI Evidence" value={totals.measuring.toString()} detail="measuring" tone="amber" />
              </div>
            </div>
          </section>

          <section id="baseline" className="scroll-mt-24 grid gap-4 xl:grid-cols-[minmax(0,1fr)_460px]">
            <MissionPanel>
              <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <PanelTitle
                  icon={Layers3}
                  eyebrow="Rows = portfolio segments, columns = baseline stage"
                  title="Portfolio Baseline Coverage"
                />
                <div className="rounded-md border border-[#1b4239] bg-[#071713] px-3 py-2 text-xs leading-5 text-[#a9c8bf]">
                  Selected: <span className="text-white">{selectedSegment.name}</span> /{" "}
                  <span className="text-[#74f7e7]">
                    {baselineStages.find((stage) => stage.key === selectedStage)?.label}
                  </span>
                </div>
              </div>

              <BaselineMatrix
                selectedSegmentId={selectedSegmentId}
                selectedStage={selectedStage}
                onSelect={selectCell}
              />

              <div className="mt-4 grid gap-3 lg:grid-cols-4">
                <SegmentInsight
                  label="Baseline Coverage"
                  value={`${Math.round((selectedSegment.assessed / selectedSegment.count) * 100)}%`}
                  detail={`${selectedSegment.assessed} of ${selectedSegment.count} companies`}
                  tone="cyan"
                />
                <SegmentInsight
                  label="Champion Coverage"
                  value={`${selectedSegment.championCoverage}%`}
                  detail="local peer-coach capacity"
                  tone={selectedSegment.championCoverage > 60 ? "green" : "amber"}
                />
                <SegmentInsight
                  label="Change Sentiment"
                  value={`${selectedSegment.sentiment}%`}
                  detail="opportunity-positive"
                  tone={selectedSegment.sentiment > 65 ? "green" : "amber"}
                />
                <SegmentInsight
                  label="Next Stage Count"
                  value={selectedSegment.counts[selectedStage].toString()}
                  detail={baselineStages.find((stage) => stage.key === selectedStage)?.description ?? ""}
                  tone={selectedStage === "risk" ? "red" : "green"}
                />
              </div>
            </MissionPanel>

            <MissionPanel>
              <div className="mb-4 flex items-center justify-between gap-3">
                <PanelTitle icon={Command} eyebrow="Ranked by urgency x value" title="Priority Queue" />
                <span className="flex items-center gap-2 text-xs text-[#86f7c4]">
                  <span className="h-2 w-2 rounded-full bg-[#35f49c] shadow-[0_0_16px_rgba(53,244,156,0.9)]" />
                  LIVE
                </span>
              </div>
              <div className="space-y-2">
                {priorityQueue.map((priority) => (
                  <PriorityRow
                    key={priority.id}
                    priority={priority}
                    selected={priority.id === selectedPriorityId}
                    onClick={() => selectPriority(priority.id)}
                  />
                ))}
              </div>

              <div className="mt-4 rounded-lg border border-[#21483e] bg-[#081713] p-4">
                <div className="mb-2 text-xs text-[#78998f]">Selected Action</div>
                <div className="text-sm font-medium text-white">
                  {selectedPriority.nextAction}
                </div>
                <div className="mt-3 grid gap-2 text-xs text-[#a9c8bf] sm:grid-cols-2">
                  <span>Owner: {selectedPriority.owner}</span>
                  <span>Due: {selectedPriority.due}</span>
                  <span>Impact: {selectedPriority.impact}</span>
                  <span>Scope: {selectedPriority.scope}</span>
                </div>
              </div>
            </MissionPanel>
          </section>

          <section id="interview" className="scroll-mt-24 grid gap-4 xl:grid-cols-[minmax(420px,0.9fr)_minmax(0,1fr)_400px]">
            <MissionPanel>
              <div className="mb-4 flex items-center justify-between gap-3">
                <PanelTitle
                  icon={AudioLines}
                  eyebrow="Conversational baseline intake"
                  title="AI Readiness Interview"
                />
                <button
                  className="rounded-md border border-[#21483e] px-3 py-1.5 text-xs text-[#a9c8bf] transition hover:border-[#74f7e7] hover:text-white"
                  onClick={() => setAnswers([])}
                >
                  <RefreshCcw className="mr-1 inline h-3.5 w-3.5" />
                  Reset
                </button>
              </div>

              <div className="rounded-lg border border-[#21483e] bg-[#071713] p-4">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md border border-[#74f7e7]/35 bg-[#74f7e7]/10 text-[#74f7e7]">
                    <MessageSquareText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Baseline Agent</div>
                    <div className="text-xs text-[#8fb0a7]">
                      Branching survey, voice-ready, text transcript captured
                    </div>
                  </div>
                </div>

                {interviewComplete ? (
                  <InterviewResult result={interviewResult} />
                ) : (
                  <div>
                    <div className="mb-3 text-sm leading-6 text-[#dff8f0]">
                      {currentQuestion.prompt}
                    </div>
                    <div className="grid gap-2">
                      {currentQuestion.options.map((option) => (
                        <button
                          key={option}
                          className="rounded-md border border-[#1b4239] bg-[#06130f] px-3 py-2 text-left text-sm text-[#bde0d6] transition hover:border-[#74f7e7] hover:bg-[#0b241f] hover:text-white"
                          onClick={() =>
                            setAnswers((prev) => [
                              ...prev,
                              {
                                key: currentQuestion.key,
                                label: currentQuestion.prompt,
                                value: option,
                              },
                            ])
                          }
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-3 grid gap-2">
                {answers.map((answer) => (
                  <div
                    key={`${answer.key}-${answer.value}`}
                    className="rounded-md border border-[#173a32] bg-[#06130f] px-3 py-2 text-xs text-[#a9c8bf]"
                  >
                    <span className="text-[#78998f]">{answer.key}:</span>{" "}
                    <span className="text-white">{answer.value}</span>
                  </div>
                ))}
              </div>
            </MissionPanel>

            <MissionPanel>
              <PanelTitle icon={BarChart3} eyebrow="Demand signal by approved platform" title="Training Demand" />
              <div className="mt-5 space-y-4">
                {trainingDemand.map((item) => (
                  <div key={item.platform}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium text-white">{item.platform}</div>
                        <div className="text-xs text-[#8fb0a7]">{item.gap}</div>
                      </div>
                      <span className="font-mono text-lg text-white">{item.demand}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#10231e]">
                      <div
                        className="h-full rounded-full bg-[#74f7e7]"
                        style={{ width: `${item.demand}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </MissionPanel>

            <MissionPanel>
              <PanelTitle icon={Gauge} eyebrow="Change impact pulse" title="Sentiment Mix" />
              <div className="mt-5 space-y-3">
                {changeSentiment.map((item) => (
                  <SentimentBar key={item.label} item={item} />
                ))}
              </div>
              <div className="mt-5 rounded-lg border border-[#21483e] bg-[#071713] p-4">
                <div className="text-xs text-[#78998f]">Comms Implication</div>
                <p className="mt-2 text-sm leading-6 text-[#c5e1d9]">
                  Healthcare and consumer cohorts need safety, job-impact, and
                  concrete workflow examples before advanced platform training.
                </p>
              </div>
            </MissionPanel>
          </section>

          <section id="operating-system" className="scroll-mt-24 grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
            <MissionPanel>
              <PanelTitle
                icon={Network}
                eyebrow="Filtered by baseline cell and priority selection"
                title="Operating Detail"
              />
              <OperatingTable selectedSegmentId={selectedSegmentId} selectedStage={selectedStage} />
            </MissionPanel>
            <MissionPanel>
              <PanelTitle
                icon={Target}
                eyebrow="Secondary drilldown, not the front-page hero"
                title="Opportunity Map"
              />
              <OpportunityMiniMap
                selectedSegmentId={selectedSegmentId}
                onSelect={setSelectedSegmentId}
              />
              <p className="mt-4 text-xs leading-5 text-[#8fb0a7]">
                Used after filtering. The map helps prioritize a small cohort, while
                the baseline grid scales to the full portfolio.
              </p>
            </MissionPanel>
          </section>

          <section id="ninety-day-plan" className="scroll-mt-24 grid gap-4 lg:grid-cols-3">
            <PlanCard
              phase="Days 1-30"
              title="Baseline and segment"
              items={[
                "Launch AI readiness survey and interview agent",
                "Segment companies by readiness, sentiment, and use-case demand",
                "Identify unassessed companies, sponsor gaps, and governance risks",
              ]}
            />
            <PlanCard
              phase="Days 31-60"
              title="Activate cohorts"
              items={[
                "Run foundation, platform, and executive briefing cohorts",
                "Stand up champion network and office hours",
                "Direct vendor content toward highest-demand topics",
              ]}
            />
            <PlanCard
              phase="Days 61-90"
              title="Measure and scale"
              items={[
                "Publish portfolio AI adoption review",
                "Capture lighthouse ROI evidence",
                "Move repeatable workflows into advanced automation pipeline",
              ]}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

function ControlRail({
  activeSection,
  onNavigate,
}: {
  activeSection: string;
  onNavigate: (section: string) => void;
}) {
  const railItems = [
    { id: "top", label: "Control Tower", icon: Command },
    { id: "baseline", label: "Baseline Grid", icon: Layers3 },
    { id: "interview", label: "AI Interview", icon: AudioLines },
    { id: "operating-system", label: "Operating Detail", icon: Network },
    { id: "ninety-day-plan", label: "90-Day Plan", icon: ShieldCheck },
  ];

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-[184px] shrink-0 rounded-lg border border-[#16372f] bg-[#04100d]/92 p-2 shadow-[0_20px_70px_rgba(0,0,0,0.38)] lg:block">
      <div className="mb-5 border-b border-[#173c32] px-2 pb-4">
        <div className="flex items-center gap-1 text-2xl font-semibold">
          H.I.G.
          <span className="ml-1 h-1.5 w-1.5 rounded-full bg-[#74f7e7] shadow-[0_0_14px_rgba(116,247,231,0.9)]" />
        </div>
        <div className="mt-1 text-xs text-[#86a49b]">Baseline command layer</div>
      </div>
      <nav className="space-y-1">
        {railItems.map((item) => {
          const Icon = item.icon;
          const active = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left text-xs transition",
                active
                  ? "border-[#74f7e7]/45 bg-[#0b302b] text-white shadow-[inset_3px_0_0_#74f7e7]"
                  : "border-transparent text-[#a7c4bb] hover:border-[#22483e] hover:bg-[#071713] hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="absolute inset-x-2 bottom-2 rounded-md border border-[#1b4239] bg-[#071713] p-3">
        <div className="text-xs text-[#74f7e7]">Baseline Status</div>
        <div className="mt-2 flex items-center gap-2 text-xs text-[#b6f6c7]">
          <span className="h-2 w-2 rounded-full bg-[#35f49c]" />
          68% assessed
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#10231e]">
          <div className="h-full w-[68%] rounded-full bg-[#74f7e7]" />
        </div>
      </div>
    </aside>
  );
}

function BaselineMatrix({
  selectedSegmentId,
  selectedStage,
  onSelect,
}: {
  selectedSegmentId: SegmentId;
  selectedStage: BaselineStage;
  onSelect: (segmentId: SegmentId, stage: BaselineStage) => void;
}) {
  const maxCount = Math.max(
    ...baselineSegments.flatMap((segment) =>
      baselineStages.map((stage) => segment.counts[stage.key])
    )
  );

  return (
    <div className="overflow-x-auto rounded-lg border border-[#173a32]">
      <div className="min-w-[900px]">
        <div className="grid grid-cols-[190px_repeat(6,1fr)] border-b border-[#173a32] bg-[#071713]">
          <div className="px-3 py-3 text-xs font-medium text-[#8fb0a7]">Segment</div>
          {baselineStages.map((stage) => (
            <div key={stage.key} className="px-3 py-3 text-xs font-medium text-[#8fb0a7]">
              {stage.label}
            </div>
          ))}
        </div>
        {baselineSegments.map((segment) => (
          <div
            key={segment.id}
            className="grid grid-cols-[190px_repeat(6,1fr)] border-b border-[#173a32] last:border-b-0"
          >
            <button
              className="px-3 py-4 text-left transition hover:bg-[#0a1d18]"
              onClick={() => onSelect(segment.id, selectedStage)}
            >
              <div className="text-sm font-medium text-white">{segment.name}</div>
              <div className="mt-1 text-xs text-[#8fb0a7]">
                {segment.count} companies - {Math.round((segment.assessed / segment.count) * 100)}% assessed
              </div>
            </button>
            {baselineStages.map((stage) => {
              const count = segment.counts[stage.key];
              const intensity = Math.max(0.12, count / maxCount);
              const selected =
                selectedSegmentId === segment.id && selectedStage === stage.key;

              return (
                <button
                  key={`${segment.id}-${stage.key}`}
                  onClick={() => onSelect(segment.id, stage.key)}
                  className={cn(
                    "group relative min-h-[72px] border-l border-[#173a32] px-3 py-3 text-left transition hover:bg-[#0d241f]",
                    selected && "bg-[#12332c] ring-1 ring-inset ring-[#74f7e7]/60"
                  )}
                  aria-label={`${segment.name} ${stage.label}: ${count}`}
                >
                  <div
                    className={cn("absolute inset-2 rounded-md border", stageTone[stage.key])}
                    style={{ opacity: 0.32 + intensity * 0.58 }}
                  />
                  <div className="relative z-10">
                    <div className="font-mono text-2xl text-white">{count}</div>
                    <div className="mt-1 text-xs text-[#9fbdb4]">{stage.shortLabel}</div>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function PriorityRow({
  priority,
  selected,
  onClick,
}: {
  priority: (typeof priorityQueue)[number];
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "w-full rounded-lg border p-3 text-left transition",
        selected
          ? "border-[#74f7e7]/60 bg-[#0c2a25]"
          : "border-[#173a32] bg-[#071411] hover:border-[#74f7e7]/40 hover:bg-[#0a1d18]"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#74f7e7]/30 bg-[#74f7e7]/10 font-mono text-sm text-[#c9fff8]">
          {priority.rank}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-white">{priority.title}</span>
          <span className="mt-1 block text-xs text-[#8fb0a7]">{priority.scope}</span>
          <span className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className={cn("rounded border px-2 py-0.5", stageTone[priority.stage])}>
              {baselineStages.find((stage) => stage.key === priority.stage)?.shortLabel}
            </span>
            <span className={cn("rounded border px-2 py-0.5", riskClass(priority.impact))}>
              {priority.impact}
            </span>
          </span>
        </span>
        <ChevronRight className="mt-1 h-4 w-4 text-[#78998f]" />
      </div>
    </button>
  );
}

function OperatingTable({
  selectedSegmentId,
  selectedStage,
}: {
  selectedSegmentId: SegmentId;
  selectedStage: BaselineStage;
}) {
  const segment = baselineSegments.find((item) => item.id === selectedSegmentId)!;
  const stage = baselineStages.find((item) => item.key === selectedStage)!;
  const sampleRows = [
    {
      company: segment.id === "healthcare" ? "BrightStar Care" : "Amsive",
      status: stage.label,
      sponsor: segment.id === "healthcare" ? "Pending" : "Confirmed",
      concern: segment.id === "healthcare" ? "Sensitive data handling" : "ROI proof",
      next: segment.id === "healthcare" ? "HIPAA-safe baseline cohort" : "Power-user workshop",
    },
    {
      company: segment.id === "consumer" ? "Accupac" : "3Pillar Global",
      status: stage.label,
      sponsor: "Confirmed",
      concern: segment.id === "consumer" ? "Low survey completion" : "Champion coverage",
      next: segment.id === "consumer" ? "CEO note + agent interview" : "Capture use case evidence",
    },
    {
      company: segment.id === "industrials" ? "4Refuel" : "Accounting Seed",
      status: stage.label,
      sponsor: segment.id === "industrials" ? "Missing" : "Confirmed",
      concern: "Training demand unclear",
      next: "Role-based branching survey",
    },
  ];

  return (
    <div className="mt-5 overflow-x-auto rounded-lg border border-[#173a32]">
      <table className="min-w-[760px] w-full border-collapse text-sm">
        <thead className="bg-[#071713] text-xs text-[#85a79d]">
          <tr>
            <th className="px-3 py-3 text-left font-medium">Company</th>
            <th className="px-3 py-3 text-left font-medium">Baseline Stage</th>
            <th className="px-3 py-3 text-left font-medium">Sponsor</th>
            <th className="px-3 py-3 text-left font-medium">Signal</th>
            <th className="px-3 py-3 text-left font-medium">Next Action</th>
          </tr>
        </thead>
        <tbody>
          {sampleRows.map((row) => (
            <tr key={row.company} className="border-t border-[#173a32] text-[#d8f2ea]">
              <td className="px-3 py-3 font-medium text-white">{row.company}</td>
              <td className="px-3 py-3">
                <span className={cn("rounded border px-2 py-1 text-xs", stageTone[selectedStage])}>
                  {row.status}
                </span>
              </td>
              <td className="px-3 py-3">{row.sponsor}</td>
              <td className="px-3 py-3 text-[#b5d1c8]">{row.concern}</td>
              <td className="px-3 py-3 text-[#b5d1c8]">{row.next}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OpportunityMiniMap({
  selectedSegmentId,
  onSelect,
}: {
  selectedSegmentId: SegmentId;
  onSelect: (segmentId: SegmentId) => void;
}) {
  return (
    <div className="mt-5 rounded-lg border border-[#173a32] bg-[#030b09] p-4">
      <div className="relative h-[260px] overflow-hidden rounded-md border border-[#173a32]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49.8%,rgba(116,247,231,0.18)_50%,transparent_50.2%),linear-gradient(180deg,transparent_49.8%,rgba(116,247,231,0.18)_50%,transparent_50.2%)]" />
        {baselineSegments
          .filter((segment) => segment.id !== "firm")
          .map((segment) => {
            const x = 14 + (segment.count / 112) * 72;
            const y = 86 - segment.sentiment * 0.72;
            const selected = segment.id === selectedSegmentId;

            return (
              <button
                key={segment.id}
                className={cn(
                  "absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-mono text-xs transition",
                  selected
                    ? "border-white bg-[#74f7e7]/20 text-white shadow-[0_0_24px_rgba(116,247,231,0.7)]"
                    : "border-[#74f7e7]/35 bg-[#74f7e7]/10 text-[#c9fff8] hover:border-[#74f7e7]"
                )}
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() => onSelect(segment.id)}
                aria-label={`Select ${segment.name}`}
              >
                {segment.name
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")}
              </button>
            );
          })}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-[#8fb0a7]">
        <span>Lower scale</span>
        <span>Higher scale</span>
      </div>
    </div>
  );
}

function InterviewResult({
  result,
}: {
  result: ReturnType<typeof getInterviewResult>;
}) {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-[#74f7e7]/35 bg-[#74f7e7]/10 p-3">
        <div className="text-xs text-[#9fded4]">Generated Readiness Profile</div>
        <div className="mt-2 flex items-end gap-2">
          <span className="font-mono text-4xl text-white">{result.score}</span>
          <span className="pb-1 text-sm text-[#9bbcb3]">/100</span>
        </div>
        <div className="mt-2 text-sm text-[#dff8f0]">{result.path}</div>
      </div>
      <div className="grid gap-2 text-sm">
        <ResultLine label="Sentiment" value={result.sentiment} />
        <ResultLine label="Training Path" value={result.training} />
        <ResultLine label="Routing" value={result.routing} />
      </div>
    </div>
  );
}

function getInterviewQuestions(answers: InterviewAnswer[]) {
  const role = answers.find((answer) => answer.key === "role")?.value;
  const roleBranch =
    role === "Technical"
      ? interviewQuestionSets.technical
      : interviewQuestionSets.operator;

  return [
    ...interviewQuestionSets.common,
    ...roleBranch,
    ...interviewQuestionSets.final,
  ];
}

function getInterviewResult(answers: InterviewAnswer[]) {
  const usage = answers.find((answer) => answer.key === "usage")?.value ?? "Never";
  const sentiment =
    answers.find((answer) => answer.key === "sentiment")?.value ?? "Helpful but unclear";
  const champion = answers.find((answer) => answer.key === "champion")?.value ?? "Maybe";
  const technical = answers.find((answer) => answer.key === "technical_depth")?.value;

  const score =
    usage === "Daily"
      ? 86
      : usage === "Weekly"
        ? 72
        : usage === "Monthly"
          ? 58
          : usage === "Tried once"
            ? 42
            : 24;

  return {
    score: technical === "Agents/evals" ? Math.min(score + 8, 95) : score,
    path:
      score >= 70
        ? "Power user / champion candidate"
        : score >= 45
          ? "Practitioner path"
          : "Foundation path",
    sentiment,
    training:
      technical === "GitHub/Codex" || technical === "API calls" || technical === "Agents/evals"
        ? "Codex/API/Agents technical cohort"
        : "ChatGPT + Claude role-based workflow lab",
    routing:
      champion === "Yes"
        ? "Nominate for champions network"
        : sentiment.includes("Concerned") || sentiment === "Too risky"
          ? "Change impact communications + safe-use briefing"
          : "Standard cohort assignment",
  };
}

function ResultLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-md border border-[#173a32] bg-[#06130f] px-3 py-2">
      <span className="text-[#78998f]">{label}</span>
      <span className="max-w-[230px] text-right text-white">{value}</span>
    </div>
  );
}

function SentimentBar({
  item,
}: {
  item: { label: string; value: number; color: string };
}) {
  const colors: Record<string, string> = {
    green: "bg-[#35f49c]",
    amber: "bg-[#f1c35b]",
    coral: "bg-[#ff9b6a]",
    slate: "bg-[#9fb0aa]",
    red: "bg-[#ff6358]",
  };

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-[#b5d1c8]">{item.label}</span>
        <span className="font-mono text-white">{item.value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#10231e]">
        <div
          className={cn("h-full rounded-full", colors[item.color])}
          style={{ width: `${item.value}%` }}
        />
      </div>
    </div>
  );
}

function PlanCard({
  phase,
  title,
  items,
}: {
  phase: string;
  title: string;
  items: string[];
}) {
  return (
    <MissionPanel className="min-h-[230px]">
      <div className="mb-3 text-xs text-[#74f7e7]">{phase}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-sm text-[#b5d1c8]">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#35f49c]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </MissionPanel>
  );
}

function MissionPanel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[#16372f] bg-[#06110f]/90 p-4 shadow-[0_0_0_1px_rgba(116,247,231,0.04),0_20px_60px_rgba(0,0,0,0.38)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function PanelTitle({
  icon: Icon,
  eyebrow,
  title,
}: {
  icon: ElementType;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[#74f7e7]/30 bg-[#74f7e7]/10 text-[#74f7e7]">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="text-xs text-[#83a39a]">{eyebrow}</p>
      </div>
    </div>
  );
}

function MetricPill({
  icon: Icon,
  label,
  value,
  detail,
  tone = "cyan",
}: {
  icon: ElementType;
  label: string;
  value: string;
  detail: string;
  tone?: "cyan" | "green" | "amber" | "red";
}) {
  const toneClass = {
    cyan: "text-[#74f7e7]",
    green: "text-[#35f49c]",
    amber: "text-[#f1c35b]",
    red: "text-[#ff735d]",
  }[tone];

  return (
    <div className="min-w-[132px] rounded-md border border-[#183b33] bg-[#081713] px-3 py-2">
      <div className="mb-1 flex items-center gap-2 text-xs text-[#88a69d]">
        <Icon className={cn("h-3.5 w-3.5", toneClass)} />
        {label}
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="font-mono text-xl text-white">{value}</span>
        <span className={cn("pb-0.5 text-xs", toneClass)}>{detail}</span>
      </div>
    </div>
  );
}

function SegmentInsight({
  label,
  value,
  detail,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  tone: "cyan" | "green" | "amber" | "red";
}) {
  const toneClass = {
    cyan: "text-[#74f7e7]",
    green: "text-[#35f49c]",
    amber: "text-[#f1c35b]",
    red: "text-[#ff735d]",
  }[tone];

  return (
    <div className="rounded-md border border-[#173a32] bg-[#071713] p-3">
      <div className="text-xs text-[#78998f]">{label}</div>
      <div className={cn("mt-1 font-mono text-2xl", toneClass)}>{value}</div>
      <div className="mt-1 text-xs leading-5 text-[#a9c8bf]">{detail}</div>
    </div>
  );
}

function SignalBadge({
  tone,
  children,
}: {
  tone: "cyan" | "green" | "amber";
  children: React.ReactNode;
}) {
  const toneClass = {
    cyan: "border-[#74f7e7]/30 bg-[#74f7e7]/10 text-[#a8fff5]",
    green: "border-[#35f49c]/30 bg-[#35f49c]/10 text-[#c7ffd9]",
    amber: "border-[#f1c35b]/30 bg-[#f1c35b]/10 text-[#ffe2a3]",
  }[tone];

  return (
    <span className={cn("rounded-md border px-2.5 py-1 text-xs", toneClass)}>
      {children}
    </span>
  );
}

function riskClass(risk: "High" | "Medium" | "Low") {
  return {
    High: "border-[#ff6358]/35 bg-[#ff6358]/10 text-[#ffbbb5]",
    Medium: "border-[#f1c35b]/35 bg-[#f1c35b]/10 text-[#ffe3a3]",
    Low: "border-[#35f49c]/35 bg-[#35f49c]/10 text-[#c7ffd9]",
  }[risk];
}
