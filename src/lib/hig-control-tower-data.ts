export type EnablementTier = "Lighthouse" | "Cohort" | "Foundation" | "Internal";
export type RiskLevel = "Low" | "Medium" | "High";
export type ComplianceStatus = "On Track" | "At Risk" | "Overdue";
export type DeliverableStatus =
  | "Scoped"
  | "In Progress"
  | "Review"
  | "Approved"
  | "Blocked";

export interface PortfolioCompany {
  id: string;
  name: string;
  sector: string;
  region: string;
  employeeCount: number;
  enablementTier: EnablementTier;
  maturityScore: number;
  adoptionScore: number;
  trainingCompletion: number;
  complianceStatus: ComplianceStatus;
  sponsorStatus: "Confirmed" | "Pending" | "Missing";
  championCoverage: number;
  activeChampions: number;
  priorityPlatforms: PlatformKey[];
  priorityFunctions: string[];
  topUseCases: string[];
  roiPotential: number;
  valueCaptured: number;
  riskLevel: RiskLevel;
  nextAction: string;
  coordinates: {
    x: number;
    y: number;
  };
  adoptionTrend: number[];
}

export type PlatformKey =
  | "ToltIQ"
  | "ChatGPT"
  | "Claude"
  | "Copilot/Gemini"
  | "Agents/API";

export interface PlatformNode {
  name: PlatformKey;
  shortName: string;
  purpose: string;
  owners: string;
  maturity: number;
  activeCohorts: number;
  status: "Scale" | "Refresh" | "Watch" | "Pilot";
}

export interface TrainingSession {
  id: string;
  title: string;
  date: string;
  time: string;
  audience: string;
  deliveryMode: "Virtual" | "In Person" | "Hybrid";
  owner: string;
  vendor?: string;
  platform: PlatformKey | "Governance";
  required: boolean;
  status: "Scheduled" | "Needs Content" | "Ready" | "Complete";
  participantCount: number;
  companies: string[];
}

export interface CurriculumModule {
  id: string;
  title: string;
  level: "Foundation" | "Practitioner" | "Power User" | "Champion" | "Executive";
  audience: string[];
  platforms: Array<PlatformKey | "Governance">;
  businessOutcomes: string[];
  freshnessStatus: "Current" | "Needs Refresh" | "In Review";
  lastUpdated: string;
  assessmentType: "Knowledge Check" | "Hands-On Lab" | "Rubric" | "Attendance";
}

export interface VendorDeliverable {
  id: string;
  vendor: string;
  deliverable: string;
  platform: PlatformKey | "Governance";
  dueDate: string;
  status: DeliverableStatus;
  qualityScore?: number;
  reviewer: string;
  risk: string;
}

export interface Champion {
  id: string;
  name: string;
  company: string;
  function: string;
  region: string;
  platforms: PlatformKey[];
  engagementScore: number;
  coachingHours: number;
  status: "Active" | "Nominated" | "Needs Backfill";
}

export interface RoiMetric {
  id: string;
  companyId: string;
  company: string;
  useCase: string;
  platform: PlatformKey;
  baselineMetric: string;
  currentMetric: string;
  estimatedAnnualValue: number;
  confidence: "Low" | "Medium" | "High";
  evidence: string;
  stage: "Ideated" | "Piloting" | "Adopting" | "Measuring" | "Realized ROI";
}

export interface CommandSignal {
  id: string;
  title: string;
  detail: string;
  category: "Risk" | "Training" | "Vendor" | "Compliance" | "Growth" | "ROI";
  priority: RiskLevel;
  timestamp: string;
}

export const portfolioCompanies: PortfolioCompany[] = [
  {
    id: "amsive",
    name: "Amsive",
    sector: "Digital Marketing & Technology",
    region: "North America",
    employeeCount: 1150,
    enablementTier: "Lighthouse",
    maturityScore: 82,
    adoptionScore: 76,
    trainingCompletion: 88,
    complianceStatus: "On Track",
    sponsorStatus: "Confirmed",
    championCoverage: 92,
    activeChampions: 12,
    priorityPlatforms: ["ChatGPT", "Claude", "Copilot/Gemini", "ToltIQ"],
    priorityFunctions: ["Marketing", "Revenue Operations", "Analytics"],
    topUseCases: ["campaign analysis", "proposal acceleration", "insights synthesis"],
    roiPotential: 9400000,
    valueCaptured: 1800000,
    riskLevel: "Low",
    nextAction: "Expand advanced prompt engineering cohort",
    coordinates: { x: 53, y: 18 },
    adoptionTrend: [61, 64, 63, 68, 72, 70, 74, 76],
  },
  {
    id: "3pillar",
    name: "3Pillar Global",
    sector: "Technology & Software",
    region: "Global",
    employeeCount: 2100,
    enablementTier: "Lighthouse",
    maturityScore: 79,
    adoptionScore: 81,
    trainingCompletion: 91,
    complianceStatus: "On Track",
    sponsorStatus: "Confirmed",
    championCoverage: 86,
    activeChampions: 18,
    priorityPlatforms: ["Claude", "ChatGPT", "Agents/API"],
    priorityFunctions: ["Engineering", "Product", "Client Delivery"],
    topUseCases: ["developer acceleration", "delivery QA", "technical discovery"],
    roiPotential: 12100000,
    valueCaptured: 2600000,
    riskLevel: "Low",
    nextAction: "Capture ROI proof from Claude adoption spike",
    coordinates: { x: 27, y: 29 },
    adoptionTrend: [66, 69, 70, 73, 75, 78, 80, 81],
  },
  {
    id: "amerijet",
    name: "Amerijet",
    sector: "Logistics & Transportation",
    region: "North America",
    employeeCount: 1300,
    enablementTier: "Lighthouse",
    maturityScore: 73,
    adoptionScore: 68,
    trainingCompletion: 84,
    complianceStatus: "On Track",
    sponsorStatus: "Confirmed",
    championCoverage: 78,
    activeChampions: 8,
    priorityPlatforms: ["ChatGPT", "Copilot/Gemini"],
    priorityFunctions: ["Operations", "Customer Support", "Finance"],
    topUseCases: ["service recovery", "routing communications", "monthly reporting"],
    roiPotential: 7200000,
    valueCaptured: 900000,
    riskLevel: "Medium",
    nextAction: "Run customer support knowledge workflow lab",
    coordinates: { x: 74, y: 29 },
    adoptionTrend: [48, 50, 54, 57, 61, 62, 65, 68],
  },
  {
    id: "agileblue",
    name: "AgileBlue",
    sector: "Cybersecurity",
    region: "North America",
    employeeCount: 350,
    enablementTier: "Cohort",
    maturityScore: 67,
    adoptionScore: 58,
    trainingCompletion: 72,
    complianceStatus: "At Risk",
    sponsorStatus: "Confirmed",
    championCoverage: 64,
    activeChampions: 3,
    priorityPlatforms: ["Claude", "ChatGPT", "Agents/API"],
    priorityFunctions: ["Security Operations", "Sales Engineering", "Customer Success"],
    topUseCases: ["alert narrative drafting", "security playbook analysis", "RFP response"],
    roiPotential: 4100000,
    valueCaptured: 450000,
    riskLevel: "Medium",
    nextAction: "Review governance path for security operations use cases",
    coordinates: { x: 25, y: 51 },
    adoptionTrend: [39, 42, 46, 48, 50, 53, 55, 58],
  },
  {
    id: "accupac",
    name: "Accupac",
    sector: "Manufacturing & Consumer Products",
    region: "North America",
    employeeCount: 900,
    enablementTier: "Cohort",
    maturityScore: 61,
    adoptionScore: 52,
    trainingCompletion: 66,
    complianceStatus: "At Risk",
    sponsorStatus: "Pending",
    championCoverage: 48,
    activeChampions: 4,
    priorityPlatforms: ["ChatGPT", "Copilot/Gemini"],
    priorityFunctions: ["Operations", "Quality", "Finance"],
    topUseCases: ["quality documentation", "variance analysis", "SOP review"],
    roiPotential: 6800000,
    valueCaptured: 320000,
    riskLevel: "Medium",
    nextAction: "Confirm COO sponsor and finance pilot owner",
    coordinates: { x: 58, y: 39 },
    adoptionTrend: [36, 38, 41, 43, 46, 48, 50, 52],
  },
  {
    id: "accounting-seed",
    name: "Accounting Seed",
    sector: "Financial Operations Software",
    region: "North America",
    employeeCount: 180,
    enablementTier: "Cohort",
    maturityScore: 57,
    adoptionScore: 49,
    trainingCompletion: 62,
    complianceStatus: "On Track",
    sponsorStatus: "Confirmed",
    championCoverage: 58,
    activeChampions: 2,
    priorityPlatforms: ["ChatGPT", "Claude", "Agents/API"],
    priorityFunctions: ["Product", "Customer Success", "Finance"],
    topUseCases: ["support knowledge", "release note drafting", "customer onboarding"],
    roiPotential: 3100000,
    valueCaptured: 260000,
    riskLevel: "Medium",
    nextAction: "Schedule product and support workflow discovery",
    coordinates: { x: 45, y: 57 },
    adoptionTrend: [35, 37, 39, 42, 44, 45, 47, 49],
  },
  {
    id: "4refuel",
    name: "4Refuel",
    sector: "Energy & Logistics",
    region: "North America",
    employeeCount: 650,
    enablementTier: "Cohort",
    maturityScore: 63,
    adoptionScore: 54,
    trainingCompletion: 69,
    complianceStatus: "On Track",
    sponsorStatus: "Confirmed",
    championCoverage: 61,
    activeChampions: 5,
    priorityPlatforms: ["ChatGPT", "Copilot/Gemini"],
    priorityFunctions: ["Operations", "Fleet", "Customer Support"],
    topUseCases: ["route exception summaries", "customer updates", "safety documentation"],
    roiPotential: 5700000,
    valueCaptured: 520000,
    riskLevel: "Medium",
    nextAction: "Move fleet reporting pilot from idea to active workflow",
    coordinates: { x: 77, y: 48 },
    adoptionTrend: [43, 44, 46, 49, 50, 52, 53, 54],
  },
  {
    id: "sunbelt-rentals",
    name: "Sunbelt Rentals",
    sector: "Equipment Services",
    region: "North America",
    employeeCount: 1450,
    enablementTier: "Cohort",
    maturityScore: 65,
    adoptionScore: 59,
    trainingCompletion: 71,
    complianceStatus: "On Track",
    sponsorStatus: "Confirmed",
    championCoverage: 70,
    activeChampions: 9,
    priorityPlatforms: ["Agents/API", "ChatGPT"],
    priorityFunctions: ["Operations", "Field Service", "Customer Support"],
    topUseCases: ["field knowledge assistant", "repair workflow routing", "service escalation"],
    roiPotential: 10800000,
    valueCaptured: 860000,
    riskLevel: "Low",
    nextAction: "Approve agents roadmap for field service workflow",
    coordinates: { x: 81, y: 62 },
    adoptionTrend: [45, 47, 49, 51, 54, 56, 58, 59],
  },
  {
    id: "brightstar",
    name: "BrightStar Care",
    sector: "Healthcare Services",
    region: "North America",
    employeeCount: 5200,
    enablementTier: "Foundation",
    maturityScore: 44,
    adoptionScore: 31,
    trainingCompletion: 42,
    complianceStatus: "Overdue",
    sponsorStatus: "Pending",
    championCoverage: 22,
    activeChampions: 4,
    priorityPlatforms: ["ChatGPT", "Claude"],
    priorityFunctions: ["HR", "Clinical Operations", "Compliance"],
    topUseCases: ["policy lookup", "training support", "operations communications"],
    roiPotential: 8500000,
    valueCaptured: 0,
    riskLevel: "High",
    nextAction: "Run HIPAA-safe AI baseline before platform expansion",
    coordinates: { x: 28, y: 69 },
    adoptionTrend: [18, 20, 22, 24, 26, 28, 29, 31],
  },
  {
    id: "avanta",
    name: "Avanta Salud",
    sector: "Healthcare",
    region: "Latin America",
    employeeCount: 800,
    enablementTier: "Foundation",
    maturityScore: 39,
    adoptionScore: 28,
    trainingCompletion: 36,
    complianceStatus: "Overdue",
    sponsorStatus: "Missing",
    championCoverage: 18,
    activeChampions: 1,
    priorityPlatforms: ["ChatGPT", "Claude"],
    priorityFunctions: ["Operations", "Finance", "Compliance"],
    topUseCases: ["policy summaries", "patient operations admin", "finance reporting"],
    roiPotential: 4300000,
    valueCaptured: 0,
    riskLevel: "High",
    nextAction: "Secure executive sponsor and local champion backfill",
    coordinates: { x: 54, y: 69 },
    adoptionTrend: [14, 15, 17, 18, 21, 23, 25, 28],
  },
  {
    id: "hig-ops",
    name: "H.I.G. Capital",
    sector: "Firm Operations",
    region: "Global",
    employeeCount: 500,
    enablementTier: "Internal",
    maturityScore: 74,
    adoptionScore: 71,
    trainingCompletion: 86,
    complianceStatus: "On Track",
    sponsorStatus: "Confirmed",
    championCoverage: 80,
    activeChampions: 14,
    priorityPlatforms: ["ToltIQ", "ChatGPT", "Claude", "Copilot/Gemini"],
    priorityFunctions: ["Deal Teams", "Portfolio Ops", "Finance"],
    topUseCases: ["diligence acceleration", "IC memo prep", "portfolio reporting"],
    roiPotential: 13200000,
    valueCaptured: 3100000,
    riskLevel: "Low",
    nextAction: "Scale ToltIQ source-verification refresher to all deal teams",
    coordinates: { x: 69, y: 73 },
    adoptionTrend: [58, 61, 64, 66, 68, 69, 70, 71],
  },
];

export const platformNodes: PlatformNode[] = [
  {
    name: "ToltIQ",
    shortName: "TQ",
    purpose: "Diligence, source-linked analysis",
    owners: "Deal teams",
    maturity: 72,
    activeCohorts: 4,
    status: "Scale",
  },
  {
    name: "ChatGPT",
    shortName: "GPT",
    purpose: "Enterprise productivity and custom GPTs",
    owners: "Firm + portfolio",
    maturity: 78,
    activeCohorts: 9,
    status: "Scale",
  },
  {
    name: "Claude",
    shortName: "CL",
    purpose: "Long-context document reasoning",
    owners: "Operators, legal, finance",
    maturity: 69,
    activeCohorts: 6,
    status: "Refresh",
  },
  {
    name: "Copilot/Gemini",
    shortName: "CG",
    purpose: "Workspace productivity",
    owners: "Finance and office teams",
    maturity: 58,
    activeCohorts: 5,
    status: "Pilot",
  },
  {
    name: "Agents/API",
    shortName: "AI",
    purpose: "Workflow automation and integrations",
    owners: "Technical teams",
    maturity: 46,
    activeCohorts: 3,
    status: "Watch",
  },
];

export const trainingSessions: TrainingSession[] = [
  {
    id: "tq-power",
    title: "ToltIQ Diligence Power User Lab",
    date: "Apr 29",
    time: "10:00 AM CT",
    audience: "Deal teams and operating partners",
    deliveryMode: "Virtual",
    owner: "Bill Mabry",
    vendor: "ToltIQ",
    platform: "ToltIQ",
    required: true,
    status: "Ready",
    participantCount: 64,
    companies: ["H.I.G. Capital"],
  },
  {
    id: "healthcare-safe-ai",
    title: "HIPAA-Safe AI Baseline",
    date: "May 1",
    time: "1:00 PM CT",
    audience: "Healthcare portfolio operators",
    deliveryMode: "Hybrid",
    owner: "Portfolio Ops",
    vendor: "BrightPath Learning",
    platform: "Governance",
    required: true,
    status: "Needs Content",
    participantCount: 118,
    companies: ["BrightStar Care", "Avanta Salud"],
  },
  {
    id: "claude-doc-review",
    title: "Claude for Long-Context Document Review",
    date: "May 3",
    time: "11:30 AM CT",
    audience: "Finance, legal, and operations leaders",
    deliveryMode: "Virtual",
    owner: "AI Enablement Office",
    vendor: "Skillable",
    platform: "Claude",
    required: false,
    status: "Needs Content",
    participantCount: 92,
    companies: ["Amsive", "3Pillar Global", "Accounting Seed"],
  },
  {
    id: "finance-copilot",
    title: "Copilot/Gemini Finance Automation Lab",
    date: "May 6",
    time: "9:00 AM CT",
    audience: "CFOs and finance directors",
    deliveryMode: "Virtual",
    owner: "Finance Transformation",
    vendor: "BrightPath Learning",
    platform: "Copilot/Gemini",
    required: false,
    status: "Scheduled",
    participantCount: 45,
    companies: ["Accupac", "Amerijet", "4Refuel"],
  },
  {
    id: "champion-bootcamp",
    title: "AI Champion Bootcamp",
    date: "May 8",
    time: "2:00 PM CT",
    audience: "Newly nominated AI champions",
    deliveryMode: "Virtual",
    owner: "Bill Mabry",
    platform: "ChatGPT",
    required: true,
    status: "Ready",
    participantCount: 37,
    companies: ["Amsive", "Sunbelt Rentals", "AgileBlue", "Accounting Seed"],
  },
];

export const curriculumModules: CurriculumModule[] = [
  {
    id: "exec-ai-value",
    title: "Executive AI Value Creation Briefing",
    level: "Executive",
    audience: ["Portfolio company CEOs", "CFOs", "COOs", "Operating Partners"],
    platforms: ["ChatGPT", "Claude", "ToltIQ", "Governance"],
    businessOutcomes: ["portfolio value creation", "sponsor alignment", "90-day roadmap"],
    freshnessStatus: "Current",
    lastUpdated: "Apr 18",
    assessmentType: "Rubric",
  },
  {
    id: "safe-use",
    title: "Safe Use, Data Boundaries, and Escalation",
    level: "Foundation",
    audience: ["All H.I.G. users", "Portfolio company leaders", "AI champions"],
    platforms: ["Governance", "ChatGPT", "Claude", "Copilot/Gemini"],
    businessOutcomes: ["risk reduction", "compliance", "safe adoption"],
    freshnessStatus: "Current",
    lastUpdated: "Apr 21",
    assessmentType: "Knowledge Check",
  },
  {
    id: "toltiq-source",
    title: "ToltIQ Source-Linked Diligence",
    level: "Power User",
    audience: ["Deal teams", "Operating Partners", "Investment professionals"],
    platforms: ["ToltIQ"],
    businessOutcomes: ["diligence acceleration", "source verification", "IC memo quality"],
    freshnessStatus: "Current",
    lastUpdated: "Apr 19",
    assessmentType: "Hands-On Lab",
  },
  {
    id: "doc-reasoning",
    title: "ChatGPT + Claude Document Reasoning Patterns",
    level: "Practitioner",
    audience: ["Finance", "Legal", "Operations", "Strategy"],
    platforms: ["ChatGPT", "Claude"],
    businessOutcomes: ["document cycle time", "research synthesis", "quality improvement"],
    freshnessStatus: "Needs Refresh",
    lastUpdated: "Mar 28",
    assessmentType: "Hands-On Lab",
  },
  {
    id: "champions-kit",
    title: "AI Champions Facilitation Kit",
    level: "Champion",
    audience: ["AI champions", "Functional leaders"],
    platforms: ["ChatGPT", "Claude", "Copilot/Gemini", "Governance"],
    businessOutcomes: ["peer coaching", "adoption momentum", "local use case intake"],
    freshnessStatus: "In Review",
    lastUpdated: "Apr 8",
    assessmentType: "Rubric",
  },
  {
    id: "agents-readiness",
    title: "API and Agent Readiness for Technical Teams",
    level: "Power User",
    audience: ["Engineering", "IT", "Data teams"],
    platforms: ["Agents/API"],
    businessOutcomes: ["workflow automation", "eval coverage", "internal tooling"],
    freshnessStatus: "Current",
    lastUpdated: "Apr 16",
    assessmentType: "Hands-On Lab",
  },
];

export const vendorDeliverables: VendorDeliverable[] = [
  {
    id: "vendor-toltiq",
    vendor: "ToltIQ",
    deliverable: "Diligence lab refresh with source-verification rubric",
    platform: "ToltIQ",
    dueDate: "Apr 26",
    status: "Review",
    qualityScore: 91,
    reviewer: "Bill Mabry",
    risk: "Needs examples for commercial diligence and add-on screening",
  },
  {
    id: "vendor-claude",
    vendor: "Skillable",
    deliverable: "Claude vs ChatGPT document analysis quick guide",
    platform: "Claude",
    dueDate: "May 3",
    status: "In Progress",
    qualityScore: 78,
    reviewer: "AI Enablement Office",
    risk: "Refresh required after latest Claude release notes",
  },
  {
    id: "vendor-governance",
    vendor: "BrightPath Learning",
    deliverable: "HIPAA-safe AI governance knowledge check",
    platform: "Governance",
    dueDate: "Apr 30",
    status: "Blocked",
    reviewer: "Legal / Compliance",
    risk: "Healthcare cohort launch depends on approval",
  },
  {
    id: "vendor-finance",
    vendor: "BrightPath Learning",
    deliverable: "Finance automation hands-on exercise",
    platform: "Copilot/Gemini",
    dueDate: "May 5",
    status: "Scoped",
    reviewer: "Finance Transformation",
    risk: "Needs sanitized monthly close data set",
  },
];

export const champions: Champion[] = [
  {
    id: "champ-1",
    name: "Maya Chen",
    company: "Amsive",
    function: "Analytics",
    region: "North America",
    platforms: ["ChatGPT", "Claude", "Copilot/Gemini"],
    engagementScore: 94,
    coachingHours: 16,
    status: "Active",
  },
  {
    id: "champ-2",
    name: "Daniel Ruiz",
    company: "3Pillar Global",
    function: "Engineering",
    region: "Global",
    platforms: ["Claude", "ChatGPT", "Agents/API"],
    engagementScore: 91,
    coachingHours: 22,
    status: "Active",
  },
  {
    id: "champ-3",
    name: "Priya Shah",
    company: "Amerijet",
    function: "Operations",
    region: "North America",
    platforms: ["ChatGPT", "Copilot/Gemini"],
    engagementScore: 76,
    coachingHours: 9,
    status: "Active",
  },
  {
    id: "champ-4",
    name: "Elena Park",
    company: "Accupac",
    function: "Finance",
    region: "North America",
    platforms: ["ChatGPT", "Copilot/Gemini"],
    engagementScore: 68,
    coachingHours: 6,
    status: "Nominated",
  },
  {
    id: "champ-5",
    name: "Open Seat",
    company: "Avanta Salud",
    function: "Compliance",
    region: "Latin America",
    platforms: ["ChatGPT", "Claude"],
    engagementScore: 18,
    coachingHours: 0,
    status: "Needs Backfill",
  },
];

export const roiMetrics: RoiMetric[] = [
  {
    id: "roi-diligence",
    companyId: "hig-ops",
    company: "H.I.G. Capital",
    useCase: "Diligence document review acceleration",
    platform: "ToltIQ",
    baselineMetric: "8-12 hours per first-pass VDR review",
    currentMetric: "3-5 hours with source-linked extraction",
    estimatedAnnualValue: 4300000,
    confidence: "High",
    evidence: "Deal team pilot logs and source verification rubric",
    stage: "Measuring",
  },
  {
    id: "roi-dev",
    companyId: "3pillar",
    company: "3Pillar Global",
    useCase: "Developer delivery acceleration",
    platform: "Claude",
    baselineMetric: "5.8 days avg discovery-to-story cycle",
    currentMetric: "4.1 days across active client delivery pods",
    estimatedAnnualValue: 6200000,
    confidence: "Medium",
    evidence: "Delivery pod adoption trend and sprint retros",
    stage: "Adopting",
  },
  {
    id: "roi-finance",
    companyId: "accupac",
    company: "Accupac",
    useCase: "Finance variance narrative drafting",
    platform: "Copilot/Gemini",
    baselineMetric: "14 hours per monthly reporting cycle",
    currentMetric: "Pilot target: 6 hours per cycle",
    estimatedAnnualValue: 820000,
    confidence: "Medium",
    evidence: "Pilot design approved, sanitized data set pending",
    stage: "Piloting",
  },
  {
    id: "roi-support",
    companyId: "amerijet",
    company: "Amerijet",
    useCase: "Customer support knowledge retrieval",
    platform: "ChatGPT",
    baselineMetric: "9.4 min average policy lookup",
    currentMetric: "4.8 min average with guided workflow",
    estimatedAnnualValue: 1100000,
    confidence: "Medium",
    evidence: "Support lab observations and QA sampling",
    stage: "Adopting",
  },
  {
    id: "roi-field",
    companyId: "sunbelt-rentals",
    company: "Sunbelt Rentals",
    useCase: "Field service workflow routing",
    platform: "Agents/API",
    baselineMetric: "Manual routing and repeated escalation loops",
    currentMetric: "Agent workflow roadmap approved",
    estimatedAnnualValue: 3700000,
    confidence: "Low",
    evidence: "Use case business case and workshop output",
    stage: "Ideated",
  },
];

export const commandSignals: CommandSignal[] = [
  {
    id: "sig-champions",
    title: "5 companies have no confirmed AI champion",
    detail: "Impact: adoption and local enablement coverage",
    category: "Risk",
    priority: "High",
    timestamp: "2m ago",
  },
  {
    id: "sig-toltiq",
    title: "ToltIQ diligence power user lab scheduled",
    detail: "May 2 - 11:00 AM ET - 34 registrants",
    category: "Training",
    priority: "Low",
    timestamp: "2m ago",
  },
  {
    id: "sig-claude",
    title: "Claude document analysis module needs refresh",
    detail: "Vendor: Skillable - due May 3",
    category: "Vendor",
    priority: "Medium",
    timestamp: "15m ago",
  },
  {
    id: "sig-healthcare",
    title: "Healthcare cohort needs HIPAA-safe AI workshop",
    detail: "Avanta Salud and BrightStar Care blocked",
    category: "Compliance",
    priority: "High",
    timestamp: "28m ago",
  },
  {
    id: "sig-growth",
    title: "Strong adoption growth at 3Pillar Global",
    detail: "Adoption score +14 this month",
    category: "Growth",
    priority: "Low",
    timestamp: "2h ago",
  },
  {
    id: "sig-roi",
    title: "ROI evidence missing for 4 lighthouse companies",
    detail: "Capture value stories before quarterly review",
    category: "ROI",
    priority: "High",
    timestamp: "3h ago",
  },
  {
    id: "sig-vendor",
    title: "Vendor content review pending",
    detail: "4 deliverables in review queue",
    category: "Vendor",
    priority: "Medium",
    timestamp: "4h ago",
  },
];

export const valuePipeline = [
  { stage: "Ideated", count: 142, color: "cyan" },
  { stage: "Piloting", count: 46, color: "cyan" },
  { stage: "Adopting", count: 28, color: "green" },
  { stage: "Measuring", count: 16, color: "amber" },
  { stage: "Realized ROI", count: 9, color: "green" },
];

export const firstNinetyDays = [
  {
    phase: "Days 1-30",
    title: "Baseline the portfolio",
    actions: [
      "Confirm AI platform stack and governance boundaries",
      "Inventory vendors, content, LMS data, and usage signals",
      "Segment companies into Lighthouse, Cohort, and Foundation tiers",
    ],
  },
  {
    phase: "Days 31-60",
    title: "Launch repeatable enablement",
    actions: [
      "Ship firm-side ToltIQ and frontier platform curricula",
      "Launch first champion cohort and weekly office hours",
      "Stand up vendor briefs, content QA, and release refresh cadence",
    ],
  },
  {
    phase: "Days 61-90",
    title: "Measure and scale",
    actions: [
      "Publish monthly portfolio AI adoption review",
      "Capture lighthouse company ROI proof points",
      "Prioritize advanced API/agent and functional automation programs",
    ],
  },
];

export function formatCurrency(value: number) {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }

  return `$${Math.round(value / 1000)}K`;
}

export function getDashboardMetrics() {
  const activeCompanies = portfolioCompanies.filter(
    (company) => company.enablementTier !== "Internal"
  );
  const avgTraining = Math.round(
    activeCompanies.reduce((sum, company) => sum + company.trainingCompletion, 0) /
      activeCompanies.length
  );
  const avgAdoption = Math.round(
    portfolioCompanies.reduce((sum, company) => sum + company.adoptionScore, 0) /
      portfolioCompanies.length
  );
  const championCoverage = Math.round(
    activeCompanies.reduce((sum, company) => sum + company.championCoverage, 0) /
      activeCompanies.length
  );
  const atRisk = activeCompanies.filter((company) => company.riskLevel === "High").length;
  const valuePipelineTotal = roiMetrics.reduce(
    (sum, metric) => sum + metric.estimatedAnnualValue,
    0
  );
  const valueCaptured = portfolioCompanies.reduce(
    (sum, company) => sum + company.valueCaptured,
    0
  );

  return {
    activeCompanies: activeCompanies.length,
    avgTraining,
    avgAdoption,
    championCoverage,
    atRisk,
    valuePipelineTotal,
    valueCaptured,
  };
}

export function getTierCounts() {
  return portfolioCompanies.reduce(
    (counts, company) => {
      counts[company.enablementTier] += 1;
      return counts;
    },
    {
      Lighthouse: 0,
      Cohort: 0,
      Foundation: 0,
      Internal: 0,
    } as Record<EnablementTier, number>
  );
}

export function getCompanyById(id: string) {
  return portfolioCompanies.find((company) => company.id === id) ?? portfolioCompanies[0];
}
