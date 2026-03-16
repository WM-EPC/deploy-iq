export interface PlanInputs {
  companyName: string;
  industry: string;
  employeeCount: number;
  targetUsers: number;
  products: string[];
  useCases: string[];
  timeline: string;
  compliance: string[];
}

export const defaultPlanInputs: PlanInputs = {
  companyName: "",
  industry: "financial-services",
  employeeCount: 5000,
  targetUsers: 1000,
  products: ["chatgpt-enterprise"],
  useCases: ["productivity"],
  timeline: "6-months",
  compliance: [],
};

export const industryOptions = [
  { value: "financial-services", label: "Financial Services" },
  { value: "healthcare", label: "Healthcare / Life Sciences" },
  { value: "technology", label: "Technology" },
  { value: "retail-cpg", label: "Retail / CPG" },
  { value: "government", label: "Government" },
  { value: "education", label: "Education" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "media", label: "Media / Entertainment" },
];

export const productOptions = [
  { value: "chatgpt-enterprise", label: "ChatGPT Enterprise" },
  { value: "codex", label: "Codex" },
  { value: "agents", label: "Agents / Agents SDK" },
  { value: "api", label: "API Platform" },
  { value: "frontier", label: "Frontier" },
];

export const useCaseOptions = [
  { value: "productivity", label: "Workforce Productivity" },
  { value: "customer-support", label: "Customer Support" },
  { value: "software-dev", label: "Software Development" },
  { value: "data-analysis", label: "Data Analysis & Insights" },
  { value: "content", label: "Content & Marketing" },
  { value: "rnd", label: "R&D / Innovation" },
];

export const timelineOptions = [
  { value: "3-months", label: "3 Months (Accelerated)" },
  { value: "6-months", label: "6 Months (Standard)" },
  { value: "12-months", label: "12 Months (Enterprise)" },
];

export const complianceOptions = [
  { value: "soc2", label: "SOC 2" },
  { value: "hipaa", label: "HIPAA" },
  { value: "gdpr", label: "GDPR" },
  { value: "ccpa", label: "CCPA" },
  { value: "fedramp", label: "FedRAMP" },
  { value: "ferpa", label: "FERPA" },
  { value: "iso27001", label: "ISO 27001" },
];

export interface PlanPhase {
  id: string;
  title: string;
  subtitle: string;
  weeks: string;
  description: string;
  deliverables: string[];
  workshops: string[];
  kpis: string[];
  risks: string[];
  products: string[];
}

export function generatePlan(inputs: PlanInputs): PlanPhase[] {
  const isAccelerated = inputs.timeline === "3-months";
  const isEnterprise = inputs.timeline === "12-months";
  const hasCompliance = inputs.compliance.length > 0;
  const hasAgents = inputs.products.includes("agents") || inputs.products.includes("frontier");
  const hasCodex = inputs.products.includes("codex");
  const hasAPI = inputs.products.includes("api");

  return [
    {
      id: "align",
      title: "Align",
      subtitle: "Build Strategic Vision",
      weeks: isAccelerated ? "Week 1" : isEnterprise ? "Weeks 1-3" : "Weeks 1-2",
      description:
        "Align leadership on AI strategy with measurable goals integrated into company OKRs. Establish governance structure and secure executive sponsorship.",
      deliverables: [
        "Signed-off adoption charter with measurable goals",
        "AI Council formed with executive sponsorship and budget authority",
        "Stakeholder map (RACI) across all impacted functions",
        `Security pre-flight complete${hasCompliance ? ` (${inputs.compliance.map(c => c.toUpperCase()).join(", ")} requirements verified)` : ""}`,
        "Organizational 'why now' narrative documented and communicated",
        `SSO/SCIM readiness confirmed${inputs.industry === "healthcare" ? " with HIPAA BAA in place" : ""}`,
      ],
      workshops: ["Executive AI Briefing", "Security & Compliance Review"],
      kpis: [
        "Executive sponsor committed (yes/no)",
        "# of use cases identified and prioritized",
        "Security sign-off obtained (yes/no)",
        "AI Council meeting cadence established",
      ],
      risks: [
        "Executive misalignment on priorities — mitigate with structured opportunity mapping exercise",
        "Security/compliance delays — mitigate with early engagement of IT/Legal",
        hasCompliance
          ? `Compliance requirements (${inputs.compliance.join(", ")}) may extend timeline — mitigate with parallel workstreams`
          : "Shadow AI risk if rollout is perceived as too slow — mitigate with clear communication of timeline",
      ],
      products: ["ChatGPT Enterprise (Admin Console)"],
    },
    {
      id: "activate",
      title: "Activate",
      subtitle: "Enable & Motivate Teams",
      weeks: isAccelerated ? "Weeks 2-3" : isEnterprise ? "Weeks 4-8" : "Weeks 3-6",
      description: `Deploy to pilot group of ${Math.min(Math.round(inputs.targetUsers * 0.1), 100)} users across 3-4 functions. Stand up AI Champions network and deliver foundational training.`,
      deliverables: [
        `Workspace provisioned: SSO configured, ${Math.min(Math.round(inputs.targetUsers * 0.1), 100)}-user pilot group onboarded`,
        "AI Champions network launched (1 champion per 25 pilot users)",
        "Foundational training delivered to 100% of pilot group",
        "Monthly 'AI Friday' exploration time instituted",
        "Baseline metrics established: DAU/WAU, messages per seat, training completion",
        hasCodex ? "Codex CLI deployed to engineering pilot group with configured approval modes" : "",
      ].filter(Boolean),
      workshops: [
        "ChatGPT Enterprise Onboarding",
        hasCodex ? "Codex for Dev Teams" : "",
        hasAPI ? "API Bootcamp" : "",
      ].filter(Boolean),
      kpis: [
        "Pilot group activation rate (target: 90%+ within first week)",
        "Messages per seat per week (baseline measurement)",
        "Training completion rate (target: 100% of pilot)",
        "AI Champions recruited (target: 1 per 25 users)",
        "First 'AI Friday' participation rate",
      ],
      risks: [
        "Low pilot engagement — mitigate with champions network and visible executive usage",
        "Training doesn't translate to daily usage — mitigate with 'use your own work tasks' approach",
        "Technical issues during onboarding — mitigate with IT support standby and pre-tested SSO",
      ],
      products: inputs.products.map((p) =>
        productOptions.find((o) => o.value === p)?.label || p
      ),
    },
    {
      id: "amplify",
      title: "Amplify",
      subtitle: "Scale Wins Across Organization",
      weeks: isAccelerated ? "Weeks 4-6" : isEnterprise ? "Weeks 9-20" : "Weeks 7-12",
      description: `Roll out to full target of ${inputs.targetUsers.toLocaleString()} users. Document and share wins. Build centralized AI knowledge hub and communities of practice.`,
      deliverables: [
        `Organization-wide deployment: ${inputs.targetUsers.toLocaleString()} users active`,
        "Centralized AI knowledge hub launched (training, policies, use case library, prompt library)",
        "Department-specific workshops delivered for top 5 use cases",
        "Custom GPT development program launched (target: 10+ GPTs in first month)",
        "Monthly win-sharing cadence established (newsletter, all-hands segment)",
        "Communities of practice active in Slack/Teams",
      ],
      workshops: [
        "Custom GPT Workshop",
        "Department-specific onboarding sessions",
      ],
      kpis: [
        `Active user rate (target: 70%+ of ${inputs.targetUsers.toLocaleString()} seats)`,
        "Custom GPTs created (benchmark: BBVA created 2,900+ in 5 months)",
        "Knowledge hub contributions per month",
        "Win stories documented per department",
        "Frontier gap reduction (ratio of power users to median users)",
      ],
      risks: [
        "Adoption plateau after initial enthusiasm — mitigate with continuous enablement and win-sharing",
        "Custom GPT sprawl without governance — mitigate with lifecycle policy and quality review",
        "Department resistance — mitigate with function-specific use cases and local champions",
      ],
      products: ["ChatGPT Enterprise", "Custom GPTs"],
    },
    {
      id: "accelerate",
      title: "Accelerate",
      subtitle: "Remove Friction & Speed Innovation",
      weeks: isAccelerated ? "Weeks 7-10" : isEnterprise ? "Weeks 21-36" : "Months 4-6",
      description:
        "Deploy advanced products and use cases. Run organization-wide hackathon. Implement eval frameworks for production AI. Move toward higher Value Models.",
      deliverables: [
        hasAgents ? "Agent workflows deployed for top 2-3 automation use cases" : "Advanced API integrations for top 2-3 custom use cases",
        "Organization-wide AI Hackathon completed (OpenAI Academy playbook)",
        "Eval framework implemented for all production AI use cases",
        "Intake and prioritization process established for AI projects",
        hasCodex ? "Codex analytics dashboard live with team-level adoption tracking" : "",
        "AI project portfolio with clear ownership and success criteria",
      ].filter(Boolean),
      workshops: [
        "AI Hackathon (Full Day)",
        hasAgents ? "Agents Deep Dive" : "",
        "Eval-Driven Development",
      ].filter(Boolean),
      kpis: [
        "Hackathon prototype completion rate (target: 80%+)",
        "Prototypes moved to production post-hackathon (target: 3+)",
        "Time from AI project idea to production (target: <4 weeks)",
        "Eval coverage: % of production AI use cases with active evals",
        hasAgents ? "Agent task completion rate and escalation rate" : "",
      ].filter(Boolean),
      risks: [
        "Hackathon generates excitement but no follow-through — mitigate with assigned owners and 30-day check-ins",
        "Eval adoption is slow (engineers resist measurement) — mitigate with Morgan Stanley case study and BDD framing",
        hasAgents ? "Agent governance gaps — mitigate with identity management, permissions, and audit logging from day one" : "",
      ].filter(Boolean),
      products: inputs.products.map((p) =>
        productOptions.find((o) => o.value === p)?.label || p
      ),
    },
    {
      id: "govern",
      title: "Govern",
      subtitle: "Balance Speed & Responsibility",
      weeks: "Ongoing",
      description:
        "Implement responsible AI practices that enable rather than slow adoption. Establish continuous measurement, governance reviews, and agent lifecycle management.",
      deliverables: [
        "Responsible AI playbook published (plain-language, distinguishes 'safe-to-try' from 'requires escalation')",
        "Policy GPT deployed for governance questions",
        "Quarterly governance review cadence with legal, risk, and functional teams",
        "Usage analytics dashboard: messages/seat, Projects adoption, GPT reuse, eval scores",
        "Governance velocity tracked: review delays, audit cycle times",
        hasAgents ? "Agent governance framework: identity management, permission boundaries, audit logging, escalation procedures" : "",
      ].filter(Boolean),
      workshops: ["Security & Compliance Review (quarterly refresh)"],
      kpis: [
        "Governance review completion rate (target: 100% on schedule)",
        "Time from AI project request to approval (target: <5 business days)",
        "Policy GPT usage rate",
        "Audit findings resolved within SLA (target: 100%)",
        "Employee awareness of AI policy (target: 90%+ can locate and reference)",
      ],
      risks: [
        "Governance becomes a bottleneck — mitigate by tracking review delays and optimizing process quarterly",
        "Policy drift as products evolve — mitigate with quarterly reviews tied to OpenAI product releases",
        "Compliance requirements change — mitigate with proactive monitoring of regulatory landscape",
      ],
      products: hasAgents
        ? ["Admin Console", "Frontier (Governance)", "Evals API"]
        : ["Admin Console", "Evals API"],
    },
  ];
}
