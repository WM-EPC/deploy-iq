"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Command,
  Cpu,
  DatabaseZap,
  Filter,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  Network,
  Radar,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  champions,
  commandSignals,
  curriculumModules,
  firstNinetyDays,
  formatCurrency,
  getCompanyById,
  getDashboardMetrics,
  getTierCounts,
  platformNodes,
  portfolioCompanies,
  roiMetrics,
  trainingSessions,
  type EnablementTier,
  type PlatformKey,
  type PortfolioCompany,
  type RiskLevel,
  valuePipeline,
  vendorDeliverables,
} from "@/lib/hig-control-tower-data";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const tierFilters: Array<EnablementTier | "All"> = [
  "All",
  "Lighthouse",
  "Cohort",
  "Foundation",
  "Internal",
];

const riskFilters: Array<RiskLevel | "All"> = ["All", "Low", "Medium", "High"];

const platformFilters: Array<PlatformKey | "All"> = [
  "All",
  "ToltIQ",
  "ChatGPT",
  "Claude",
  "Copilot/Gemini",
  "Agents/API",
];

const levelOrder = ["Executive", "Foundation", "Practitioner", "Power User", "Champion"];

const platformColors: Record<PlatformKey, string> = {
  ToltIQ: "text-[#78f4e6] border-[#78f4e6]/30 bg-[#78f4e6]/10",
  ChatGPT: "text-[#b6f6c7] border-[#b6f6c7]/30 bg-[#b6f6c7]/10",
  Claude: "text-[#f2c098] border-[#f2c098]/30 bg-[#f2c098]/10",
  "Copilot/Gemini": "text-[#8fc7ff] border-[#8fc7ff]/30 bg-[#8fc7ff]/10",
  "Agents/API": "text-[#c7d2fe] border-[#c7d2fe]/30 bg-[#c7d2fe]/10",
};

export default function ControlTowerPage() {
  const metrics = getDashboardMetrics();
  const tierCounts = getTierCounts();
  const [tierFilter, setTierFilter] = useState<EnablementTier | "All">("All");
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "All">("All");
  const [platformFilter, setPlatformFilter] = useState<PlatformKey | "All">("All");
  const [selectedCompanyId, setSelectedCompanyId] = useState("amsive");
  const [signalFilter, setSignalFilter] = useState("All");

  const filteredCompanies = useMemo(() => {
    return portfolioCompanies.filter((company) => {
      const tierMatch = tierFilter === "All" || company.enablementTier === tierFilter;
      const riskMatch = riskFilter === "All" || company.riskLevel === riskFilter;
      const platformMatch =
        platformFilter === "All" || company.priorityPlatforms.includes(platformFilter);

      return tierMatch && riskMatch && platformMatch;
    });
  }, [tierFilter, riskFilter, platformFilter]);

  const selectedCompany = getCompanyById(selectedCompanyId);
  const visibleSignals = commandSignals.filter(
    (signal) => signalFilter === "All" || signal.category === signalFilter
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[#020806] text-[#ecfff8]">
      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(119,244,230,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(119,244,230,0.04)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(39,155,119,0.22),transparent_34%),linear-gradient(180deg,rgba(2,8,6,0.25),#020806_72%)]" />
      </div>

      <div className="relative mx-auto flex max-w-[1760px] gap-4 px-4 py-4 sm:px-5 lg:px-6">
        <CommandRail />

        <div className="min-w-0 flex-1 space-y-4">
          <header className="flex flex-col gap-4 rounded-lg border border-[#16372f] bg-[#05110f]/86 p-4 shadow-[0_0_0_1px_rgba(120,244,230,0.04),0_24px_80px_rgba(0,0,0,0.42)] lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <SignalBadge tone="cyan">Portfolio Operations</SignalBadge>
                <SignalBadge tone="green">Multi-platform</SignalBadge>
                <SignalBadge tone="amber">Demo Data</SignalBadge>
              </div>
              <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                <h1 className="text-2xl font-semibold sm:text-3xl">
                  H.I.G. AI Enablement Control Tower
                </h1>
                <p className="pb-1 text-sm text-[#9bbcb3]">
                  Training, governance, vendor coordination, champions, adoption, and ROI.
                </p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-6">
              <MetricPill
                icon={BriefcaseBusiness}
                label="Companies"
                value={metrics.activeCompanies.toString()}
                detail="active"
              />
              <MetricPill
                icon={GraduationCap}
                label="Training"
                value={`${metrics.avgTraining}%`}
                detail="+6 pts"
                tone="green"
              />
              <MetricPill
                icon={Users}
                label="Champions"
                value={`${metrics.championCoverage}%`}
                detail="coverage"
                tone="cyan"
              />
              <MetricPill
                icon={Gauge}
                label="Adoption"
                value={`${metrics.avgAdoption}`}
                detail="/100 avg"
                tone="green"
              />
              <MetricPill
                icon={AlertTriangle}
                label="At Risk"
                value={metrics.atRisk.toString()}
                detail="companies"
                tone="red"
              />
              <MetricPill
                icon={LineChart}
                label="Value"
                value={formatCurrency(metrics.valuePipelineTotal)}
                detail="pipeline"
                tone="amber"
              />
            </div>
          </header>

          <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_460px]">
            <MissionPanel className="min-h-[620px]">
              <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <PanelTitle
                  icon={Radar}
                  eyebrow="AI maturity x ROI potential"
                  title="Portfolio Universe"
                />
                <div className="flex flex-wrap gap-2">
                  <FilterSelect
                    label="Tier"
                    value={tierFilter}
                    options={tierFilters}
                    onChange={(value) => setTierFilter(value as EnablementTier | "All")}
                  />
                  <FilterSelect
                    label="Risk"
                    value={riskFilter}
                    options={riskFilters}
                    onChange={(value) => setRiskFilter(value as RiskLevel | "All")}
                  />
                  <FilterSelect
                    label="Platform"
                    value={platformFilter}
                    options={platformFilters}
                    onChange={(value) => setPlatformFilter(value as PlatformKey | "All")}
                  />
                  <button
                    className="inline-flex h-9 items-center gap-2 rounded-md border border-[#1b4239] bg-[#071713] px-3 text-xs text-[#c8e7de] transition hover:border-[#78f4e6]/60 hover:text-white"
                    onClick={() => {
                      setTierFilter("All");
                      setRiskFilter("All");
                      setPlatformFilter("All");
                    }}
                  >
                    <RefreshCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_150px]">
                <PortfolioUniverse
                  companies={filteredCompanies}
                  selectedCompanyId={selectedCompanyId}
                  onSelect={setSelectedCompanyId}
                />
                <TierLegend tierCounts={tierCounts} />
              </div>

              <CompanyDetailStrip company={selectedCompany} />
            </MissionPanel>

            <MissionPanel className="min-h-[620px]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <PanelTitle icon={Command} eyebrow="Auto-updating" title="Command Feed" />
                <div className="flex items-center gap-2 text-xs text-[#86f7c4]">
                  <span className="h-2 w-2 rounded-full bg-[#35f49c] shadow-[0_0_16px_rgba(53,244,156,0.9)]" />
                  LIVE
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {["All", "Risk", "Training", "Vendor", "Compliance", "Growth", "ROI"].map(
                  (category) => (
                    <button
                      key={category}
                      className={cn(
                        "rounded-md border px-3 py-1.5 text-xs transition",
                        signalFilter === category
                          ? "border-[#78f4e6]/60 bg-[#102b26] text-white"
                          : "border-[#19362f] bg-[#071411] text-[#8ead9f] hover:border-[#78f4e6]/40 hover:text-white"
                      )}
                      onClick={() => setSignalFilter(category)}
                    >
                      {category}
                    </button>
                  )
                )}
              </div>

              <div className="space-y-2">
                {visibleSignals.map((signal) => (
                  <CommandSignalRow key={signal.id} signal={signal} />
                ))}
              </div>
            </MissionPanel>
          </section>

          <section className="grid gap-4 xl:grid-cols-[400px_minmax(0,1fr)_minmax(420px,0.9fr)]">
            <PlatformStackPanel />
            <AdoptionPulsePanel metrics={metrics} />
            <ValuePipelinePanel />
          </section>

          <OperationsTabs selectedCompanyId={selectedCompanyId} />

          <section className="grid gap-4 lg:grid-cols-3">
            {firstNinetyDays.map((phase) => (
              <MissionPanel key={phase.phase} className="min-h-[230px]">
                <div className="mb-3 text-xs text-[#78f4e6]">{phase.phase}</div>
                <h3 className="text-lg font-semibold">{phase.title}</h3>
                <div className="mt-4 space-y-3">
                  {phase.actions.map((action) => (
                    <div key={action} className="flex gap-3 text-sm text-[#b5d1c8]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#35f49c]" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </MissionPanel>
            ))}
          </section>

          <section className="rounded-lg border border-[#245346] bg-[#06130f]/92 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-2 text-xs text-[#78f4e6]">
                  Interview narrative
                </div>
                <h2 className="text-xl font-semibold">
                  Not a training calendar. A portfolio value-creation operating layer.
                </h2>
                <p className="mt-2 max-w-4xl text-sm leading-6 text-[#a9c8bf]">
                  This control tower shows how H.I.G. can train across ToltIQ,
                  ChatGPT, Claude, Copilot/Gemini, and API/agent workflows while
                  coordinating vendors, champions, compliance, adoption analytics,
                  and measurable ROI across the portfolio.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2 rounded-md border border-[#78f4e6]/30 bg-[#78f4e6]/10 px-4 py-3 text-sm text-[#dffff9]">
                <Sparkles className="h-4 w-4 text-[#78f4e6]" />
                Ready for 6-8 minute demo flow
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function CommandRail() {
  const railItems = [
    { label: "Control Tower", icon: Radar, active: true },
    { label: "Portfolio", icon: BriefcaseBusiness },
    { label: "Calendar", icon: CalendarDays },
    { label: "Curriculum", icon: GraduationCap },
    { label: "Champions", icon: Users },
    { label: "Vendors", icon: DatabaseZap },
    { label: "ROI", icon: TrendingUp },
    { label: "Assessments", icon: ShieldCheck },
  ];

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-[164px] shrink-0 rounded-lg border border-[#16372f] bg-[#04100d]/92 p-2 shadow-[0_20px_70px_rgba(0,0,0,0.38)] lg:block">
      <div className="mb-5 border-b border-[#173c32] px-2 pb-4">
        <div className="flex items-center gap-1 text-2xl font-semibold">
          H.I.G.
          <span className="ml-1 h-1.5 w-1.5 rounded-full bg-[#78f4e6] shadow-[0_0_14px_rgba(120,244,230,0.9)]" />
        </div>
        <div className="mt-1 text-xs text-[#86a49b]">AI command layer</div>
      </div>
      <nav className="space-y-1">
        {railItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={cn(
                "flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left text-xs transition",
                item.active
                  ? "border-[#78f4e6]/40 bg-[#0b302b] text-white shadow-[inset_3px_0_0_#78f4e6]"
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
        <div className="text-xs text-[#78f4e6]">System Status</div>
        <div className="mt-2 flex items-center gap-2 text-xs text-[#b6f6c7]">
          <span className="h-2 w-2 rounded-full bg-[#35f49c]" />
          All systems operational
        </div>
        <Sparkline values={[3, 7, 5, 8, 6, 10, 7, 9]} className="mt-3 h-8" />
      </div>
    </aside>
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
        "rounded-lg border border-[#16372f] bg-[#06110f]/90 p-4 shadow-[0_0_0_1px_rgba(120,244,230,0.04),0_20px_60px_rgba(0,0,0,0.38)]",
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
  icon: React.ElementType;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[#78f4e6]/30 bg-[#78f4e6]/10 text-[#78f4e6]">
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
  icon: React.ElementType;
  label: string;
  value: string;
  detail: string;
  tone?: "cyan" | "green" | "amber" | "red";
}) {
  const toneClass = {
    cyan: "text-[#78f4e6]",
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

function SignalBadge({
  tone,
  children,
}: {
  tone: "cyan" | "green" | "amber";
  children: React.ReactNode;
}) {
  const toneClass = {
    cyan: "border-[#78f4e6]/30 bg-[#78f4e6]/10 text-[#a8fff5]",
    green: "border-[#35f49c]/30 bg-[#35f49c]/10 text-[#c7ffd9]",
    amber: "border-[#f1c35b]/30 bg-[#f1c35b]/10 text-[#ffe2a3]",
  }[tone];

  return (
    <span className={cn("rounded-md border px-2.5 py-1 text-xs", toneClass)}>
      {children}
    </span>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative inline-flex h-9 items-center rounded-md border border-[#1b4239] bg-[#071713] pl-3 pr-8 text-xs text-[#c8e7de]">
      <span className="mr-2 text-[#6e9187]">{label}</span>
      <select
        className="appearance-none bg-transparent pr-2 text-white outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#071713] text-white">
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-[#6e9187]" />
    </label>
  );
}

function PortfolioUniverse({
  companies,
  selectedCompanyId,
  onSelect,
}: {
  companies: PortfolioCompany[];
  selectedCompanyId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="relative min-h-[440px] overflow-hidden rounded-lg border border-[#14332c] bg-[#030b09]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,244,230,0.12),transparent_20%),radial-gradient(circle_at_center,transparent_0,transparent_21%,rgba(120,244,230,0.12)_21.4%,transparent_22%,transparent_38%,rgba(120,244,230,0.09)_38.4%,transparent_39%,transparent_55%,rgba(120,244,230,0.06)_55.4%,transparent_56%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49.8%,rgba(120,244,230,0.16)_50%,transparent_50.2%),linear-gradient(180deg,transparent_49.8%,rgba(120,244,230,0.16)_50%,transparent_50.2%)]" />
      <div className="absolute left-5 top-8 bottom-8 flex w-10 flex-col items-center justify-between text-xs text-[#8aa99f]">
        <span>HIGH</span>
        <span className="-rotate-90 whitespace-nowrap text-[#b3d0c7]">AI MATURITY</span>
        <span>LOW</span>
      </div>
      <div className="absolute bottom-4 left-[18%] right-[12%] flex items-center justify-between text-xs text-[#8aa99f]">
        <span>LOW ROI POTENTIAL</span>
        <span>HIGH ROI POTENTIAL</span>
      </div>
      <div className="absolute left-[17%] top-8 rounded-full border border-[#204d42] px-3 py-1 text-xs text-[#8aa99f]">
        Business Services
      </div>
      <div className="absolute right-[22%] top-8 rounded-full border border-[#204d42] px-3 py-1 text-xs text-[#8aa99f]">
        Technology
      </div>
      <div className="absolute bottom-12 left-[20%] rounded-full border border-[#204d42] px-3 py-1 text-xs text-[#8aa99f]">
        Healthcare
      </div>
      <div className="absolute bottom-12 right-[18%] rounded-full border border-[#204d42] px-3 py-1 text-xs text-[#8aa99f]">
        Logistics
      </div>

      {companies.map((company) => {
        const selected = selectedCompanyId === company.id;

        return (
          <button
            key={company.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 text-left outline-none"
            style={{ left: `${company.coordinates.x}%`, top: `${company.coordinates.y}%` }}
            onClick={() => onSelect(company.id)}
            aria-label={`Select ${company.name}`}
          >
            <span
              className={cn(
                "relative flex h-9 w-9 items-center justify-center rounded-full border transition",
                selected
                  ? "scale-110 border-white bg-white/10 shadow-[0_0_32px_rgba(120,244,230,0.75)]"
                  : "border-[#244c42] bg-[#071713] hover:scale-105 hover:border-[#78f4e6]"
              )}
            >
              <span
                className={cn(
                  "absolute inset-1 rounded-full border",
                  tierNodeClass(company.enablementTier)
                )}
              />
              <CircleDot className={cn("h-4 w-4", tierTextClass(company.enablementTier))} />
            </span>
            <span className="absolute left-10 top-0 min-w-[130px]">
              <span className="block text-sm font-medium text-white">{company.name}</span>
              <span className={cn("text-xs", tierTextClass(company.enablementTier))}>
                {company.enablementTier}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function TierLegend({ tierCounts }: { tierCounts: Record<EnablementTier, number> }) {
  const tiers: EnablementTier[] = ["Lighthouse", "Cohort", "Foundation", "Internal"];

  return (
    <div className="rounded-lg border border-[#173a32] bg-[#071713] p-3">
      <div className="mb-3 flex items-center gap-2 text-xs text-[#b6d5cc]">
        <Filter className="h-3.5 w-3.5 text-[#78f4e6]" />
        Tier Signal
      </div>
      <div className="space-y-3">
        {tiers.map((tier) => (
          <div key={tier} className="flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className={cn("h-2.5 w-2.5 rounded-full", tierDotClass(tier))} />
              <span className="text-[#b6d5cc]">{tier}</span>
            </div>
            <span className="font-mono text-white">{tierCounts[tier]}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 border-t border-[#173a32] pt-4">
        <div className="mb-2 text-xs text-[#78998f]">Operating Rule</div>
        <p className="text-xs leading-5 text-[#a9c7bd]">
          Lighthouse companies generate proof. Cohorts scale patterns. Foundation
          companies receive safe-use baselines first.
        </p>
      </div>
    </div>
  );
}

function CompanyDetailStrip({ company }: { company: PortfolioCompany }) {
  return (
    <div className="mt-4 grid gap-3 rounded-lg border border-[#173a32] bg-[#061713] p-3 md:grid-cols-[220px_repeat(4,1fr)_minmax(210px,1.25fr)]">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-md border border-[#78f4e6]/30 bg-[#78f4e6]/10 text-2xl font-semibold text-white">
          {company.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="truncate text-lg font-semibold">{company.name}</div>
          <div className="truncate text-xs text-[#91aea5]">{company.sector}</div>
          <div className={cn("mt-1 text-xs", tierTextClass(company.enablementTier))}>
            {company.enablementTier}
          </div>
        </div>
      </div>

      <StripMetric label="Maturity" value={company.maturityScore} />
      <StripMetric label="Adoption" value={company.adoptionScore} trend={company.adoptionTrend} />
      <StripMetric label="Training" value={company.trainingCompletion} suffix="%" />
      <StripMetric label="Champions" value={company.activeChampions} suffix="" />

      <div className="min-w-0 border-[#173a32] md:border-l md:pl-4">
        <div className="mb-2 text-xs text-[#78998f]">Next Action</div>
        <p className="text-sm leading-5 text-white">{company.nextAction}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {company.priorityPlatforms.slice(0, 4).map((platform) => (
            <span
              key={platform}
              className={cn("rounded border px-2 py-1 text-xs", platformColors[platform])}
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function StripMetric({
  label,
  value,
  suffix = "/100",
  trend,
}: {
  label: string;
  value: number;
  suffix?: string;
  trend?: number[];
}) {
  return (
    <div className="border-[#173a32] md:border-l md:pl-4">
      <div className="mb-2 text-xs text-[#78998f]">{label}</div>
      <div className="flex items-end gap-1">
        <span className="font-mono text-2xl text-white">{value}</span>
        <span className="pb-1 text-xs text-[#86a49b]">{suffix}</span>
      </div>
      {trend ? (
        <Sparkline values={trend} className="mt-1 h-7" />
      ) : (
        <div className="mt-2 text-xs text-[#35f49c]">+8%</div>
      )}
    </div>
  );
}

function CommandSignalRow({
  signal,
}: {
  signal: (typeof commandSignals)[number];
}) {
  const iconClass = {
    Risk: "text-[#ff735d] border-[#ff735d]/30 bg-[#ff735d]/10",
    Training: "text-[#78bdff] border-[#78bdff]/30 bg-[#78bdff]/10",
    Vendor: "text-[#c7d2fe] border-[#c7d2fe]/30 bg-[#c7d2fe]/10",
    Compliance: "text-[#f1c35b] border-[#f1c35b]/30 bg-[#f1c35b]/10",
    Growth: "text-[#35f49c] border-[#35f49c]/30 bg-[#35f49c]/10",
    ROI: "text-[#ff735d] border-[#ff735d]/30 bg-[#ff735d]/10",
  }[signal.category];

  const Icon =
    signal.category === "Risk" || signal.category === "ROI"
      ? AlertTriangle
      : signal.category === "Training"
        ? GraduationCap
        : signal.category === "Vendor"
          ? DatabaseZap
          : signal.category === "Compliance"
            ? ShieldCheck
            : TrendingUp;

  return (
    <button className="group flex w-full items-start gap-3 rounded-md border border-[#173a32] bg-[#071411] p-3 text-left transition hover:border-[#78f4e6]/45 hover:bg-[#0a1d18]">
      <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-md border", iconClass)}>
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-white">{signal.title}</span>
        <span className="mt-1 block text-xs text-[#8fb0a7]">{signal.detail}</span>
      </span>
      <span className="shrink-0 text-right">
        <span className={cn("block text-xs", riskTextClass(signal.priority))}>
          {signal.priority}
        </span>
        <span className="mt-1 block text-xs text-[#68877e]">{signal.timestamp}</span>
      </span>
    </button>
  );
}

function PlatformStackPanel() {
  return (
    <MissionPanel>
      <PanelTitle icon={Cpu} eyebrow="Portfolio enablement layer" title="AI Platform Stack" />
      <div className="mt-6 space-y-4">
        {platformNodes.map((node, index) => (
          <div key={node.name} className="flex items-center gap-3">
            <div className={cn("flex h-11 w-11 items-center justify-center rounded-md border font-mono text-sm", platformColors[node.name])}>
              {node.shortName}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <div className="truncate text-sm font-medium text-white">{node.name}</div>
                <span className="text-xs text-[#8fb0a7]">{node.status}</span>
              </div>
              <div className="mt-1 text-xs text-[#8fb0a7]">{node.purpose}</div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#10231e]">
                <div
                  className="h-full rounded-full bg-[#78f4e6]"
                  style={{ width: `${node.maturity}%` }}
                />
              </div>
            </div>
            {index < platformNodes.length - 1 && (
              <ArrowRight className="hidden h-4 w-4 text-[#2f5c51] 2xl:block" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 border-t border-[#173a32] pt-4 text-xs text-[#92b2a8]">
        <span className="rounded-md border border-[#173a32] px-2 py-2">Governance</span>
        <span className="rounded-md border border-[#173a32] px-2 py-2">Security</span>
        <span className="rounded-md border border-[#173a32] px-2 py-2">Data Policies</span>
        <span className="rounded-md border border-[#173a32] px-2 py-2">Risk Routing</span>
      </div>
    </MissionPanel>
  );
}

function AdoptionPulsePanel({
  metrics,
}: {
  metrics: ReturnType<typeof getDashboardMetrics>;
}) {
  return (
    <MissionPanel>
      <PanelTitle icon={LayoutDashboard} eyebrow="Last 30 days" title="Training & Adoption Pulse" />
      <div className="mt-5 grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)]">
        <div className="space-y-2">
          <PulseMetric label="Sessions Delivered" value="28" delta="+4" />
          <PulseMetric label="Attendance" value="1,248" delta="+14%" />
          <PulseMetric label="Completion Rate" value={`${metrics.avgTraining}%`} delta="+6%" />
          <PulseMetric label="Knowledge Score" value="74/100" delta="+5" />
        </div>
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div className="text-xs text-[#8fb0a7]">Adoption Velocity</div>
            <div className="font-mono text-3xl text-white">
              {metrics.avgAdoption}
              <span className="text-sm text-[#8fb0a7]">/100</span>
            </div>
          </div>
          <Sparkline
            values={[45, 52, 49, 57, 54, 63, 68, 64, 72, 69, 76, 71, 78]}
            className="h-36"
            filled
          />
          <div className="mt-4">
            <div className="mb-2 flex justify-between text-xs">
              <span className="text-[#8fb0a7]">Champion Coverage</span>
              <span className="font-mono text-white">{metrics.championCoverage}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#10231e]">
              <div
                className="h-full rounded-full bg-[#78f4e6]"
                style={{ width: `${metrics.championCoverage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </MissionPanel>
  );
}

function PulseMetric({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="rounded-md border border-[#173a32] bg-[#071713] px-3 py-2">
      <div className="text-xs text-[#78998f]">{label}</div>
      <div className="mt-1 flex items-end justify-between">
        <span className="font-mono text-xl text-white">{value}</span>
        <span className="text-xs text-[#35f49c]">{delta}</span>
      </div>
    </div>
  );
}

function ValuePipelinePanel() {
  const total = roiMetrics.reduce((sum, metric) => sum + metric.estimatedAnnualValue, 0);

  return (
    <MissionPanel>
      <PanelTitle icon={Target} eyebrow="Use cases to ROI" title="Value Creation Pipeline" />
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {valuePipeline.map((stage) => (
          <div
            key={stage.stage}
            className={cn(
              "relative rounded-md border px-3 py-3",
              stage.color === "green"
                ? "border-[#35f49c]/35 bg-[#35f49c]/10"
                : stage.color === "amber"
                  ? "border-[#f1c35b]/35 bg-[#f1c35b]/10"
                  : "border-[#78f4e6]/35 bg-[#78f4e6]/10"
            )}
          >
            <div className="text-xs text-[#9bbcb3]">{stage.stage}</div>
            <div className="mt-1 font-mono text-2xl text-white">{stage.count}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-md border border-[#173a32] bg-[#071713] p-4">
        <div className="text-xs text-[#78998f]">Estimated Annual Value Pipeline</div>
        <div className="mt-2 flex items-end justify-between gap-3">
          <div className="font-mono text-3xl text-white">{formatCurrency(total)}</div>
          <div className="flex h-12 items-end gap-2">
            {[30, 45, 58, 70, 86].map((height) => (
              <span
                key={height}
                className="w-4 rounded-t-sm border border-[#78f4e6]/45 bg-[#78f4e6]/18"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {["Diligence Acceleration", "Finance Automation", "Customer Support", "Revenue Ops"].map(
          (theme) => (
            <span
              key={theme}
              className="rounded-md border border-[#2c4b42] bg-[#0a1714] px-2 py-1 text-xs text-[#b8d6cd]"
            >
              {theme}
            </span>
          )
        )}
      </div>
    </MissionPanel>
  );
}

function OperationsTabs({ selectedCompanyId }: { selectedCompanyId: string }) {
  const selectedCompany = getCompanyById(selectedCompanyId);

  return (
    <MissionPanel>
      <Tabs defaultValue="portfolio" className="gap-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <PanelTitle
            icon={Network}
            eyebrow={`Selected company: ${selectedCompany.name}`}
            title="Operating System Detail"
          />
          <TabsList className="h-auto flex-wrap justify-start rounded-md border border-[#173a32] bg-[#071713] p-1">
            <TabsTrigger value="portfolio" className="data-active:bg-[#12332c] data-active:text-white">
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-active:bg-[#12332c] data-active:text-white">
              Calendar
            </TabsTrigger>
            <TabsTrigger value="curriculum" className="data-active:bg-[#12332c] data-active:text-white">
              Curriculum
            </TabsTrigger>
            <TabsTrigger value="champions" className="data-active:bg-[#12332c] data-active:text-white">
              Champions
            </TabsTrigger>
            <TabsTrigger value="vendors" className="data-active:bg-[#12332c] data-active:text-white">
              Vendors
            </TabsTrigger>
            <TabsTrigger value="roi" className="data-active:bg-[#12332c] data-active:text-white">
              ROI
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="portfolio">
          <PortfolioTable />
        </TabsContent>
        <TabsContent value="calendar">
          <TrainingCalendar />
        </TabsContent>
        <TabsContent value="curriculum">
          <CurriculumMatrix />
        </TabsContent>
        <TabsContent value="champions">
          <ChampionsView />
        </TabsContent>
        <TabsContent value="vendors">
          <VendorOps />
        </TabsContent>
        <TabsContent value="roi">
          <RoiView />
        </TabsContent>
      </Tabs>
    </MissionPanel>
  );
}

function PortfolioTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#173a32]">
      <table className="min-w-[980px] w-full border-collapse text-sm">
        <thead className="bg-[#071713] text-xs text-[#85a79d]">
          <tr>
            <th className="px-3 py-3 text-left font-medium">Company</th>
            <th className="px-3 py-3 text-left font-medium">Tier</th>
            <th className="px-3 py-3 text-left font-medium">Maturity</th>
            <th className="px-3 py-3 text-left font-medium">Training</th>
            <th className="px-3 py-3 text-left font-medium">Champions</th>
            <th className="px-3 py-3 text-left font-medium">Platforms</th>
            <th className="px-3 py-3 text-left font-medium">Risk</th>
            <th className="px-3 py-3 text-left font-medium">Next Action</th>
          </tr>
        </thead>
        <tbody>
          {portfolioCompanies.map((company) => (
            <tr key={company.id} className="border-t border-[#173a32] text-[#d8f2ea]">
              <td className="px-3 py-3">
                <div className="font-medium text-white">{company.name}</div>
                <div className="text-xs text-[#82a39a]">{company.sector}</div>
              </td>
              <td className={cn("px-3 py-3 text-xs", tierTextClass(company.enablementTier))}>
                {company.enablementTier}
              </td>
              <td className="px-3 py-3 font-mono">{company.maturityScore}</td>
              <td className="px-3 py-3 font-mono">{company.trainingCompletion}%</td>
              <td className="px-3 py-3 font-mono">{company.championCoverage}%</td>
              <td className="px-3 py-3">
                <div className="flex flex-wrap gap-1">
                  {company.priorityPlatforms.slice(0, 3).map((platform) => (
                    <span key={platform} className={cn("rounded border px-1.5 py-0.5 text-xs", platformColors[platform])}>
                      {platform}
                    </span>
                  ))}
                </div>
              </td>
              <td className={cn("px-3 py-3 text-xs", riskTextClass(company.riskLevel))}>
                {company.riskLevel}
              </td>
              <td className="px-3 py-3 text-[#b5d1c8]">{company.nextAction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TrainingCalendar() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {trainingSessions.map((session) => (
        <div key={session.id} className="rounded-lg border border-[#173a32] bg-[#071713] p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-medium text-white">{session.title}</div>
              <div className="mt-1 text-xs text-[#8fb0a7]">
                {session.date} at {session.time} - {session.deliveryMode}
              </div>
            </div>
            <span className={cn("rounded border px-2 py-1 text-xs", session.required ? "border-[#f1c35b]/35 bg-[#f1c35b]/10 text-[#ffe2a3]" : "border-[#78f4e6]/30 bg-[#78f4e6]/10 text-[#a8fff5]")}>
              {session.required ? "Required" : "Optional"}
            </span>
          </div>
          <div className="grid gap-2 text-xs text-[#b8d6cd] sm:grid-cols-2">
            <span>Audience: {session.audience}</span>
            <span>Platform: {session.platform}</span>
            <span>Owner: {session.owner}</span>
            <span>Vendor: {session.vendor ?? "Internal"}</span>
            <span>Participants: {session.participantCount}</span>
            <span>Status: {session.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function CurriculumMatrix() {
  const modulesByLevel = levelOrder.map((level) => ({
    level,
    modules: curriculumModules.filter((module) => module.level === level),
  }));

  return (
    <div className="grid gap-4 xl:grid-cols-5">
      {modulesByLevel.map(({ level, modules }) => (
        <div key={level} className="rounded-lg border border-[#173a32] bg-[#071713] p-3">
          <div className="mb-3 text-sm font-semibold text-white">{level}</div>
          <div className="space-y-3">
            {modules.map((module) => (
              <div key={module.id} className="rounded-md border border-[#24483f] bg-[#091b16] p-3">
                <div className="text-sm font-medium text-white">{module.title}</div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {module.platforms.map((platform) => (
                    <span key={platform} className="rounded border border-[#2c4d43] px-1.5 py-0.5 text-xs text-[#a8c8bf]">
                      {platform}
                    </span>
                  ))}
                </div>
                <div className={cn("mt-3 text-xs", freshnessTextClass(module.freshnessStatus))}>
                  {module.freshnessStatus} - {module.lastUpdated}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ChampionsView() {
  return (
    <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
      <div className="rounded-lg border border-[#173a32] bg-[#071713] p-4">
        <div className="text-sm font-semibold text-white">Coverage Gaps</div>
        <div className="mt-4 space-y-3 text-sm">
          <GapRow label="Healthcare foundation companies" value="2 missing" tone="red" />
          <GapRow label="Finance automation cohort" value="3 pending" tone="amber" />
          <GapRow label="Lighthouse champions" value="92%" tone="green" />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {champions.map((champion) => (
          <div key={champion.id} className="rounded-lg border border-[#173a32] bg-[#071713] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-medium text-white">{champion.name}</div>
                <div className="mt-1 text-xs text-[#8fb0a7]">
                  {champion.company} - {champion.function}
                </div>
              </div>
              <span className={cn("rounded border px-2 py-1 text-xs", champion.status === "Active" ? "border-[#35f49c]/35 bg-[#35f49c]/10 text-[#b6f6c7]" : champion.status === "Nominated" ? "border-[#f1c35b]/35 bg-[#f1c35b]/10 text-[#ffe2a3]" : "border-[#ff735d]/35 bg-[#ff735d]/10 text-[#ffb8ad]")}>
                {champion.status}
              </span>
            </div>
            <div className="mt-4">
              <div className="mb-2 flex justify-between text-xs">
                <span className="text-[#8fb0a7]">Engagement</span>
                <span className="font-mono text-white">{champion.engagementScore}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#10231e]">
                <div className="h-full rounded-full bg-[#78f4e6]" style={{ width: `${champion.engagementScore}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VendorOps() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {vendorDeliverables.map((item) => (
        <div key={item.id} className="rounded-lg border border-[#173a32] bg-[#071713] p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-medium text-white">{item.deliverable}</div>
              <div className="mt-1 text-xs text-[#8fb0a7]">
                {item.vendor} - {item.platform} - due {item.dueDate}
              </div>
            </div>
            <span className={cn("rounded border px-2 py-1 text-xs", deliverableStatusClass(item.status))}>
              {item.status}
            </span>
          </div>
          <div className="text-xs leading-5 text-[#b5d1c8]">{item.risk}</div>
          <div className="mt-3 flex items-center justify-between border-t border-[#173a32] pt-3 text-xs text-[#8fb0a7]">
            <span>Reviewer: {item.reviewer}</span>
            <span>{item.qualityScore ? `Quality ${item.qualityScore}` : "Quality pending"}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function RoiView() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {roiMetrics.map((metric) => (
        <div key={metric.id} className="rounded-lg border border-[#173a32] bg-[#071713] p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-medium text-white">{metric.useCase}</div>
              <div className="mt-1 text-xs text-[#8fb0a7]">
                {metric.company} - {metric.platform}
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-lg text-white">
                {formatCurrency(metric.estimatedAnnualValue)}
              </div>
              <div className="text-xs text-[#8fb0a7]">{metric.confidence} confidence</div>
            </div>
          </div>
          <div className="grid gap-3 text-xs text-[#b5d1c8] sm:grid-cols-2">
            <div className="rounded-md border border-[#24483f] bg-[#091b16] p-3">
              <div className="mb-1 text-[#78998f]">Baseline</div>
              {metric.baselineMetric}
            </div>
            <div className="rounded-md border border-[#24483f] bg-[#091b16] p-3">
              <div className="mb-1 text-[#78998f]">Current</div>
              {metric.currentMetric}
            </div>
          </div>
          <div className="mt-3 text-xs text-[#8fb0a7]">{metric.evidence}</div>
        </div>
      ))}
    </div>
  );
}

function GapRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "green" | "amber" | "red";
}) {
  const color =
    tone === "green" ? "text-[#35f49c]" : tone === "amber" ? "text-[#f1c35b]" : "text-[#ff735d]";

  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-[#173a32] bg-[#091b16] px-3 py-2">
      <span className="text-[#b5d1c8]">{label}</span>
      <span className={cn("font-mono", color)}>{value}</span>
    </div>
  );
}

function Sparkline({
  values,
  className,
  filled = false,
}: {
  values: number[];
  className?: string;
  filled?: boolean;
}) {
  const width = 180;
  const height = 70;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1);
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 10) - 5;
      return `${x},${y}`;
    })
    .join(" ");
  const fillPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("w-full overflow-visible", className)}
      role="img"
      aria-label="Trend line"
    >
      {filled && (
        <polygon points={fillPoints} fill="rgba(53,244,156,0.12)" stroke="none" />
      )}
      <polyline
        points={points}
        fill="none"
        stroke="#35f49c"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {values.map((value, index) => {
        const x = (index / (values.length - 1)) * width;
        const y = height - ((value - min) / range) * (height - 10) - 5;

        return <circle key={`${value}-${index}`} cx={x} cy={y} r="2.5" fill="#c7ffd9" />;
      })}
    </svg>
  );
}

function tierNodeClass(tier: EnablementTier) {
  return {
    Lighthouse: "border-[#35f49c] bg-[#35f49c]/15 shadow-[0_0_20px_rgba(53,244,156,0.48)]",
    Cohort: "border-[#f1c35b] bg-[#f1c35b]/15 shadow-[0_0_20px_rgba(241,195,91,0.42)]",
    Foundation: "border-[#ff735d] bg-[#ff735d]/15 shadow-[0_0_20px_rgba(255,115,93,0.38)]",
    Internal: "border-[#78f4e6] bg-[#78f4e6]/15 shadow-[0_0_20px_rgba(120,244,230,0.45)]",
  }[tier];
}

function tierDotClass(tier: EnablementTier) {
  return {
    Lighthouse: "bg-[#35f49c]",
    Cohort: "bg-[#f1c35b]",
    Foundation: "bg-[#ff735d]",
    Internal: "bg-[#78f4e6]",
  }[tier];
}

function tierTextClass(tier: EnablementTier) {
  return {
    Lighthouse: "text-[#35f49c]",
    Cohort: "text-[#f1c35b]",
    Foundation: "text-[#ff735d]",
    Internal: "text-[#78f4e6]",
  }[tier];
}

function riskTextClass(risk: RiskLevel) {
  return {
    Low: "text-[#35f49c]",
    Medium: "text-[#f1c35b]",
    High: "text-[#ff735d]",
  }[risk];
}

function freshnessTextClass(status: string) {
  return {
    Current: "text-[#35f49c]",
    "Needs Refresh": "text-[#ff735d]",
    "In Review": "text-[#f1c35b]",
  }[status];
}

function deliverableStatusClass(status: string) {
  return {
    Scoped: "border-[#78f4e6]/30 bg-[#78f4e6]/10 text-[#a8fff5]",
    "In Progress": "border-[#f1c35b]/35 bg-[#f1c35b]/10 text-[#ffe2a3]",
    Review: "border-[#c7d2fe]/35 bg-[#c7d2fe]/10 text-[#dfe4ff]",
    Approved: "border-[#35f49c]/35 bg-[#35f49c]/10 text-[#b6f6c7]",
    Blocked: "border-[#ff735d]/35 bg-[#ff735d]/10 text-[#ffb8ad]",
  }[status];
}
