export interface Question {
  id: string;
  text: string;
  options: { label: string; value: number; description?: string }[];
}

export interface Dimension {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
  weight: number;
}

export const dimensions: Dimension[] = [
  {
    id: "executive-alignment",
    title: "Executive Alignment & Sponsorship",
    description:
      "Has leadership articulated a clear vision for AI adoption with measurable goals?",
    icon: "crown",
    weight: 1.2,
    questions: [
      {
        id: "ea-1",
        text: "Has leadership articulated a clear 'why now' narrative for AI adoption?",
        options: [
          { label: "No discussion at the executive level", value: 1 },
          { label: "Informal interest but no formal narrative", value: 2 },
          { label: "Executive sponsor identified with general vision", value: 3 },
          { label: "Clear narrative communicated to the organization", value: 4 },
          {
            label: "AI goals integrated into company OKRs with measurable targets",
            value: 5,
            description: "Moderna benchmark: CEO expects 20 daily ChatGPT uses per employee",
          },
        ],
      },
      {
        id: "ea-2",
        text: "Are executives visibly using AI tools themselves?",
        options: [
          { label: "No executive usage", value: 1 },
          { label: "A few executives experimenting individually", value: 2 },
          { label: "Some executives using regularly", value: 3 },
          { label: "Most executives using and sharing discoveries", value: 4 },
          {
            label: "Executives role-model usage and share weekly",
            value: 5,
            description: "OpenAI's CFO Sarah Friar shares her own usage weekly",
          },
        ],
      },
      {
        id: "ea-3",
        text: "Is there an AI Council or steering committee with authority to unblock cross-functional barriers?",
        options: [
          { label: "No governance structure", value: 1 },
          { label: "Ad-hoc discussions when issues arise", value: 2 },
          { label: "Working group formed but limited authority", value: 3 },
          { label: "AI Council with executive sponsorship", value: 4 },
          { label: "AI Council with budget authority and fast-track capability", value: 5 },
        ],
      },
    ],
  },
  {
    id: "current-usage",
    title: "Current AI Usage & Tooling",
    description:
      "Where is the organization on the AI adoption spectrum today?",
    icon: "activity",
    weight: 1.0,
    questions: [
      {
        id: "cu-1",
        text: "What is the current state of AI tool usage across the organization?",
        options: [
          { label: "No AI tools in use", value: 1 },
          { label: "Individual employees using personal accounts (shadow AI)", value: 2 },
          { label: "Departmental pilots with approved tools", value: 3 },
          { label: "Organization-wide deployment with moderate adoption", value: 4 },
          {
            label: "Deep adoption with custom GPTs and workflow integration",
            value: 5,
            description: "BBVA benchmark: 2,900+ custom GPTs in 5 months",
          },
        ],
      },
      {
        id: "cu-2",
        text: "How would you characterize the gap between your most advanced AI users and the median?",
        options: [
          { label: "No one is using AI meaningfully", value: 1 },
          { label: "A few enthusiasts, most haven't started", value: 2 },
          { label: "Growing group of power users, many still learning", value: 3 },
          { label: "Strong adoption across teams with some variation", value: 4 },
          {
            label: "Frontier users actively mentoring others; gap is closing",
            value: 5,
            description: "OpenAI data: frontier workers send 6x more messages than median",
          },
        ],
      },
      {
        id: "cu-3",
        text: "Which OpenAI Value Model best describes your current state?",
        options: [
          { label: "Pre-adoption: evaluating options", value: 1 },
          { label: "Value Model 1: Workforce Empowerment (ChatGPT for productivity)", value: 2 },
          { label: "Value Model 2: AI-Native Distribution (customer-facing AI)", value: 3 },
          { label: "Value Model 3: Expert Capability (AI as co-scientist/co-developer)", value: 4 },
          { label: "Value Models 4-5: Systems Management or Process Re-Engineering with Agents", value: 5 },
        ],
      },
    ],
  },
  {
    id: "technical-infra",
    title: "Technical Infrastructure Readiness",
    description:
      "Is the technical foundation in place for enterprise AI deployment?",
    icon: "server",
    weight: 1.0,
    questions: [
      {
        id: "ti-1",
        text: "What is your SSO/identity management readiness?",
        options: [
          { label: "No centralized identity management", value: 1 },
          { label: "Basic directory services (AD/LDAP)", value: 2 },
          { label: "SSO in place but not for AI tools", value: 3 },
          { label: "SAML SSO ready, can integrate AI tools", value: 4 },
          { label: "SAML SSO + SCIM provisioning ready for automated lifecycle management", value: 5 },
        ],
      },
      {
        id: "ti-2",
        text: "What is the state of your developer tooling and API infrastructure?",
        options: [
          { label: "Limited developer tooling", value: 1 },
          { label: "Basic development environment with manual processes", value: 2 },
          { label: "CI/CD pipelines in place, some API integrations", value: 3 },
          { label: "Mature dev environment, ready to integrate AI APIs", value: 4 },
          { label: "Advanced infrastructure with API gateway, monitoring, and ready for AI agents", value: 5 },
        ],
      },
      {
        id: "ti-3",
        text: "Do you have data residency or sovereignty requirements?",
        options: [
          { label: "Haven't evaluated requirements", value: 1 },
          { label: "Aware of requirements but haven't mapped them", value: 2 },
          { label: "Requirements documented, evaluating vendor compliance", value: 3 },
          { label: "Requirements clear, verified vendor can support", value: 4 },
          { label: "Requirements met with verified data residency configuration", value: 5 },
        ],
      },
    ],
  },
  {
    id: "security-compliance",
    title: "Security & Compliance Posture",
    description:
      "Can the organization meet enterprise security requirements for AI deployment?",
    icon: "shield",
    weight: 1.1,
    questions: [
      {
        id: "sc-1",
        text: "What compliance certifications does your organization require for AI tools?",
        options: [
          { label: "Haven't evaluated compliance needs for AI", value: 1 },
          { label: "General security awareness but no specific AI requirements", value: 2 },
          { label: "Standard compliance (SOC 2, basic data privacy)", value: 3 },
          { label: "Industry-specific compliance (HIPAA, GDPR, CCPA)", value: 4 },
          { label: "Comprehensive requirements including EKM, zero data retention, audit logging", value: 5 },
        ],
      },
      {
        id: "sc-2",
        text: "Does your organization have an AI-specific usage and acceptable use policy?",
        options: [
          { label: "No AI policy exists", value: 1 },
          { label: "Informal guidelines, nothing documented", value: 2 },
          { label: "Basic AI usage policy drafted", value: 3 },
          { label: "Comprehensive AI policy reviewed by legal", value: 4 },
          { label: "Living AI policy with regular reviews, clear escalation procedures, and a Policy GPT", value: 5 },
        ],
      },
      {
        id: "sc-3",
        text: "How does your organization handle data classification for AI inputs?",
        options: [
          { label: "No data classification framework", value: 1 },
          { label: "General data classification but not applied to AI", value: 2 },
          { label: "Beginning to define what data can be used with AI tools", value: 3 },
          { label: "Clear data classification with AI-specific guidelines", value: 4 },
          { label: "Automated data classification with AI guardrails and DLP integration", value: 5 },
        ],
      },
    ],
  },
  {
    id: "change-readiness",
    title: "Organizational Change Readiness",
    description:
      "Does the organization have the change management muscle to drive AI adoption?",
    icon: "users",
    weight: 1.1,
    questions: [
      {
        id: "cr-1",
        text: "Does your organization have a change management function or methodology?",
        options: [
          { label: "No formal change management", value: 1 },
          { label: "Ad-hoc change management for major projects", value: 2 },
          { label: "Established change methodology (e.g., Prosci/ADKAR)", value: 3 },
          { label: "Dedicated change team with proven track record", value: 4 },
          { label: "Mature change function with AI Champions network and continuous adoption measurement", value: 5 },
        ],
      },
      {
        id: "cr-2",
        text: "How has the organization handled previous technology rollouts?",
        options: [
          { label: "Poor track record — low adoption, high resistance", value: 1 },
          { label: "Mixed results — some successes, some failures", value: 2 },
          { label: "Generally successful with standard enterprise tools", value: 3 },
          { label: "Strong track record with structured rollout methodology", value: 4 },
          { label: "Exceptional — documented lessons learned, continuous improvement, adoption consistently above 80%", value: 5 },
        ],
      },
      {
        id: "cr-3",
        text: "Is there an internal communications infrastructure to support AI adoption?",
        options: [
          { label: "No internal comms infrastructure", value: 1 },
          { label: "Basic email communications", value: 2 },
          { label: "Intranet, Slack/Teams channels for announcements", value: 3 },
          { label: "Dedicated channels for AI updates with regular cadence", value: 4 },
          {
            label: "Centralized AI knowledge hub with training, policies, use cases, and win-sharing",
            value: 5,
            description: "San Antonio Spurs went from 14% to 85% AI fluency through structured comms",
          },
        ],
      },
    ],
  },
  {
    id: "team-capabilities",
    title: "Team Capabilities & Skills",
    description:
      "Does the organization have the technical talent to leverage AI effectively?",
    icon: "brain",
    weight: 0.9,
    questions: [
      {
        id: "tc-1",
        text: "What is the size and maturity of your developer/engineering population?",
        options: [
          { label: "No in-house engineering team", value: 1 },
          { label: "Small team (<20), primarily maintenance", value: 2 },
          { label: "Mid-size team (20-100), building internal tools", value: 3 },
          { label: "Large team (100-500), shipping production software", value: 4 },
          {
            label: "Enterprise engineering org (500+), mature DevOps and platform teams",
            value: 5,
            description: "Mercado Libre: 17,000 developers on AI-powered 'Verdi' platform",
          },
        ],
      },
      {
        id: "tc-2",
        text: "What is the current level of AI/ML expertise within the organization?",
        options: [
          { label: "No AI/ML expertise", value: 1 },
          { label: "A few individuals experimenting", value: 2 },
          { label: "Small data science team, limited production experience", value: 3 },
          { label: "Established AI/ML team with production deployments", value: 4 },
          { label: "Mature AI/ML org with eval frameworks, fine-tuning experience, and MLOps", value: 5 },
        ],
      },
      {
        id: "tc-3",
        text: "Is there awareness and capability around prompt engineering?",
        options: [
          { label: "No awareness", value: 1 },
          { label: "Some individuals self-teaching", value: 2 },
          { label: "Informal sharing of prompts and techniques", value: 3 },
          { label: "Structured prompt engineering training available", value: 4 },
          { label: "Prompt library with best practices, shared across teams, continuously improved", value: 5 },
        ],
      },
    ],
  },
  {
    id: "measurement",
    title: "Measurement & Evaluation Practices",
    description:
      "Can the organization instrument, measure, and iterate on AI performance?",
    icon: "chart",
    weight: 1.0,
    questions: [
      {
        id: "me-1",
        text: "Does the organization have KPI frameworks that could track AI adoption impact?",
        options: [
          { label: "No formal KPI tracking", value: 1 },
          { label: "Basic metrics (revenue, headcount) but not tied to tools", value: 2 },
          { label: "Department-level KPIs that could be connected to AI impact", value: 3 },
          { label: "Established KPI framework with baseline measurements", value: 4 },
          {
            label: "Instrumented KPIs tracking usage depth, time/quality savings, and risk/control metrics",
            value: 5,
            description: "OpenAI recommends 3 metric categories: usage depth, time/quality, risk/control",
          },
        ],
      },
      {
        id: "me-2",
        text: "Is there experience with A/B testing, controlled rollouts, or evaluation frameworks?",
        options: [
          { label: "No experience with controlled evaluation", value: 1 },
          { label: "Basic before/after comparisons", value: 2 },
          { label: "Some A/B testing in product or marketing", value: 3 },
          { label: "Structured experimentation with statistical rigor", value: 4 },
          { label: "Eval-driven development culture: write evals before deployment, continuous measurement", value: 5 },
        ],
      },
      {
        id: "me-3",
        text: "Can the organization connect technology adoption to specific business outcomes?",
        options: [
          { label: "No link between technology and business outcomes", value: 1 },
          { label: "Anecdotal connection — 'it feels like it's helping'", value: 2 },
          { label: "Some documented ROI from previous technology investments", value: 3 },
          { label: "Structured value tracking with defined outcomes per initiative", value: 4 },
          {
            label: "Outcome specificity: each adoption initiative tied to a single accountable business result",
            value: 5,
          },
        ],
      },
    ],
  },
];

export const frameworkPhases = [
  {
    id: "align",
    title: "Align",
    subtitle: "Build Strategic Vision",
    description: "Align your company, employees, and leadership on your AI strategy.",
    scoreRange: [1, 2],
    color: "#6366f1",
  },
  {
    id: "activate",
    title: "Activate",
    subtitle: "Enable & Motivate Teams",
    description: "Enable and motivate teams through structured skill-building.",
    scoreRange: [2, 3],
    color: "#8b5cf6",
  },
  {
    id: "amplify",
    title: "Amplify",
    subtitle: "Scale Wins",
    description: "Turn scattered wins into shared organizational knowledge.",
    scoreRange: [3, 3.5],
    color: "#a78bfa",
  },
  {
    id: "accelerate",
    title: "Accelerate",
    subtitle: "Remove Friction",
    description: "Enable ideas to move quickly from pilot to production.",
    scoreRange: [3.5, 4.5],
    color: "#c4b5fd",
  },
  {
    id: "govern",
    title: "Govern",
    subtitle: "Balance Speed & Responsibility",
    description: "Implement responsible AI practices that enable rather than slow adoption.",
    scoreRange: [4.5, 5],
    color: "#ddd6fe",
  },
];

export function calculateResults(answers: Record<string, number>) {
  const dimensionScores: Record<string, number> = {};
  let totalWeightedScore = 0;
  let totalWeight = 0;

  for (const dim of dimensions) {
    const questionScores = dim.questions
      .map((q) => answers[q.id])
      .filter((s) => s !== undefined);

    if (questionScores.length > 0) {
      const avg =
        questionScores.reduce((a, b) => a + b, 0) / questionScores.length;
      dimensionScores[dim.id] = Math.round(avg * 10) / 10;
      totalWeightedScore += avg * dim.weight;
      totalWeight += dim.weight;
    }
  }

  const overallScore =
    totalWeight > 0
      ? Math.round((totalWeightedScore / totalWeight) * 10) / 10
      : 0;

  // Determine recommended starting phase
  const phase = frameworkPhases.find(
    (p) => overallScore >= p.scoreRange[0] && overallScore < p.scoreRange[1]
  ) || frameworkPhases[0];

  // Generate gap analysis
  const gaps = dimensions
    .map((dim) => ({
      dimension: dim.title,
      score: dimensionScores[dim.id] || 0,
      gap: 5 - (dimensionScores[dim.id] || 0),
      priority: dim.weight * (5 - (dimensionScores[dim.id] || 0)),
    }))
    .sort((a, b) => b.priority - a.priority);

  return {
    dimensionScores,
    overallScore,
    recommendedPhase: phase,
    gaps,
  };
}
