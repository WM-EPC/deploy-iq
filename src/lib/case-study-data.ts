export interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  logo?: string;
  challenge: string;
  solution: string;
  products: string[];
  results: { metric: string; value: string; context: string }[];
  keyTakeaway: string;
  valueModel: string;
  isComposite?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "morgan-stanley",
    company: "Morgan Stanley",
    industry: "Financial Services",
    challenge:
      "Wealth management advisors needed fast access to 350,000+ proprietary research documents (40M words) to serve clients effectively. Manual research took 30+ minutes per query.",
    solution:
      "Built AI @ Morgan Stanley Assistant using GPT-4 with RAG architecture, custom embeddings, and vector databases. LLM cross-checks retrieved documents with grounding prompts that force citations. Started with a rigorous eval framework testing every use case before deployment.",
    products: ["ChatGPT Enterprise", "API (GPT-4)", "RAG / Vector Stores"],
    results: [
      { metric: "Advisor Adoption", value: "98%", context: "of wealth management advisor teams use AI daily" },
      { metric: "Employee Reach", value: "~50%", context: "of all 82,000+ employees access generative AI tools" },
      { metric: "Query Speed", value: "30+ min → sec", context: "Research queries reduced from 30+ minutes to seconds" },
      { metric: "Scale", value: "100K+", context: "Scaled from 7,000 to 100,000+ answerable queries" },
      { metric: "Onboarding", value: "<30 min", context: "Per advisor onboarding time" },
    ],
    keyTakeaway:
      "Start with evals. Morgan Stanley built an evaluation framework testing every AI use case before deployment, with advisors and prompt engineers grading responses for accuracy and coherence.",
    valueModel: "Expert Capability",
  },
  {
    id: "klarna",
    company: "Klarna",
    industry: "FinTech",
    challenge:
      "Needed to scale customer service across 23 markets in 35+ languages while maintaining quality and reducing costs.",
    solution:
      "Launched AI customer service assistant handling support communications 24/7 with early and aggressive investment in the technology.",
    products: ["ChatGPT Enterprise", "API", "Agents"],
    results: [
      { metric: "Ticket Automation", value: "66%", context: "AI handles 2/3 of all customer service chats" },
      { metric: "Resolution Time", value: "82% faster", context: "11 minutes reduced to 2 minutes average" },
      { metric: "FTE Equivalent", value: "700", context: "Equivalent work of 700 full-time agents" },
      { metric: "Profit Impact", value: "$40M", context: "Estimated annual profit improvement" },
      { metric: "Repeat Inquiries", value: "-25%", context: "25% drop in repeat customer inquiries" },
      { metric: "Employee AI Usage", value: "90%", context: "of all employees use AI daily" },
    ],
    keyTakeaway:
      "Invest early. Compounding value favors early adopters with iterative strategies. Klarna's aggressive timeline created a flywheel of improvement that late movers can't easily replicate.",
    valueModel: "AI-Native Distribution",
  },
  {
    id: "stripe",
    company: "Stripe",
    industry: "Payments",
    challenge:
      "Needed to accelerate invoice resolution, detect fraud more effectively, and identify product integration opportunities at scale.",
    solution:
      "100 employees brainstormed features using GPT-4. 15 prototypes selected as strong integration candidates. Deployed AI across customer support, fraud detection, and developer experience.",
    products: ["API (GPT-4)", "Agents"],
    results: [
      { metric: "Resolution Speed", value: "35% faster", context: "Invoice resolution with AI agents" },
      { metric: "Innovation Pipeline", value: "15 prototypes", context: "From 100-person brainstorm to 15 shipped integrations" },
      { metric: "Payment Speed", value: "40% faster", context: "DALL-E users complete payments 40% faster via Stripe Link" },
    ],
    keyTakeaway:
      "Broad experimentation leads to focused shipping. By letting 100 employees brainstorm freely, Stripe identified the 15 highest-value integrations to productize.",
    valueModel: "Workforce Empowerment → Expert Capability",
  },
  {
    id: "bbva",
    company: "BBVA",
    industry: "Banking",
    challenge:
      "Needed to empower 100,000+ employees across credit risk, legal, compliance, and customer support to build their own AI tools without centralizing everything through IT.",
    solution:
      "Rolled out ChatGPT Enterprise with guardrails, enabling employees to create custom GPTs for their specific workflows. Decentralized innovation with centralized governance.",
    products: ["ChatGPT Enterprise", "Custom GPTs"],
    results: [
      { metric: "Custom GPTs Created", value: "2,900+", context: "Built by employees in just 5 months" },
      { metric: "Functions Covered", value: "4+", context: "Credit risk, legal, compliance, customer support" },
    ],
    keyTakeaway:
      "Empower experts. Rather than centralizing AI development, give domain experts the tools to create their own solutions within a governed framework.",
    valueModel: "Workforce Empowerment",
  },
  {
    id: "indeed",
    company: "Indeed",
    industry: "HR / Recruiting",
    challenge:
      "Job recommendations lacked personalization, leading to lower application rates and candidate engagement.",
    solution:
      "Used GPT-4o mini to generate personalized job recommendations that explain why each role is relevant to the specific candidate.",
    products: ["API (GPT-4o mini)"],
    results: [
      { metric: "Application Boost", value: "20%", context: "Increase in job applications through AI recommendations" },
      { metric: "Cost Optimization", value: "60% fewer tokens", context: "Optimized to use 60% fewer tokens while maintaining quality" },
    ],
    keyTakeaway:
      "Embed AI into products, not alongside them. By integrating AI directly into the job search experience, Indeed transformed a core user interaction rather than adding a separate feature.",
    valueModel: "AI-Native Distribution",
  },
  {
    id: "lowes",
    company: "Lowe's",
    industry: "Retail",
    challenge:
      "E-commerce product tagging was inaccurate and inconsistent across thousands of suppliers, degrading search and discovery.",
    solution:
      "Fine-tuned GPT-3.5 on proprietary product data, company-specific language, and context across thousands of suppliers.",
    products: ["API", "Fine-tuning"],
    results: [
      { metric: "Tagging Accuracy", value: "+20%", context: "Improvement in product tagging accuracy" },
      { metric: "Error Reduction", value: "60%", context: "Reduction in tagging errors" },
    ],
    keyTakeaway:
      "Fine-tune for domain specificity. When your product data, language, and taxonomy are unique, fine-tuning delivers accuracy that prompt engineering alone cannot match.",
    valueModel: "Expert Capability",
  },
  {
    id: "moderna",
    company: "Moderna",
    industry: "Pharma / Biotech",
    challenge:
      "Needed to deploy AI across all business functions — not just R&D — to transform how the entire organization works.",
    solution:
      "Deployed ChatGPT Enterprise to thousands of employees across all functions. CEO set expectation of 20 daily ChatGPT interactions per employee. Built Dose ID pilot for clinical data analysis.",
    products: ["ChatGPT Enterprise"],
    results: [
      { metric: "Deployment Scope", value: "All functions", context: "AI deployed across the entire organization" },
      { metric: "Usage Target", value: "20/day", context: "CEO expects 20 daily ChatGPT uses per employee" },
    ],
    keyTakeaway:
      "Executive alignment drives adoption. When the CEO sets a measurable AI usage target and integrates it into company culture, adoption follows.",
    valueModel: "Workforce Empowerment",
  },
  {
    id: "spurs",
    company: "San Antonio Spurs",
    industry: "Sports / Entertainment",
    challenge:
      "Low AI fluency across the organization (14%) limited the ability to leverage AI for operations, analytics, and fan engagement.",
    solution:
      "Integrated AI training directly into regular workflow operations rather than running it as a separate initiative.",
    products: ["ChatGPT Enterprise"],
    results: [
      { metric: "AI Fluency", value: "14% → 85%", context: "Through workflow-integrated training" },
    ],
    keyTakeaway:
      "Embed training in workflows, not classrooms. The Spurs didn't run 'AI training days' — they wove AI into daily work, which drove fluency from 14% to 85%.",
    valueModel: "Workforce Empowerment",
  },
  // Composite case studies
  {
    id: "global-pharma",
    company: "Global Pharma Co",
    industry: "Life Sciences",
    isComposite: true,
    challenge:
      "A Fortune 100 pharmaceutical company needed to deploy ChatGPT Enterprise across 143 countries while navigating complex regulatory requirements across global, regional, and local teams in a highly regulated industry.",
    solution:
      "Designed a governance-first rollout with global/regional/local governance tiers. Built a three-tier AI readiness framework: 'ready now,' 'needs controls before deployment,' and 'not ready for this environment.' Co-built the governance model with the client's Regulatory Affairs, Supply Chain, CMC, and Strategy teams.",
    products: ["ChatGPT Enterprise", "Custom GPTs", "API"],
    results: [
      { metric: "Geographic Scope", value: "143 countries", context: "Global deployment across all regions" },
      { metric: "Governance Maturity", value: "3-tier model", context: "Ready now / needs controls / not ready framework" },
      { metric: "Cross-functional Alignment", value: "4 functions", context: "Regulatory, Supply Chain, CMC, Strategy" },
    ],
    keyTakeaway:
      "In regulated industries, governance isn't a blocker — it's an enabler. The three-tier readiness framework gave executives a way to make decisions without needing to understand the underlying technology, and became the structure for all subsequent AI conversations.",
    valueModel: "Govern → Align → Activate",
  },
  {
    id: "f500-retail",
    company: "F500 Retail Corp",
    industry: "Retail / CPG",
    isComposite: true,
    challenge:
      "A Fortune 500 CPG company had purchased an enterprise AI platform but wasn't getting value. Low adoption, no clear connection between the technology and business outcomes leadership cared about.",
    solution:
      "Built a structured Center of Excellence with governance frameworks, intake processes, and prioritization models. Identified a single accountable business outcome per account — specifically purchase order cycle time reduction for the supply chain team. Built a success plan around that single outcome and ran enablement sessions with relevant teams.",
    products: ["ChatGPT Enterprise", "API"],
    results: [
      { metric: "Time to Value", value: "2 quarters", context: "Documented cost savings within two quarters" },
      { metric: "Adoption Approach", value: "Outcome-first", context: "Tied adoption to one accountable business result" },
      { metric: "Account Impact", value: "Reference customer", context: "Account became a reference customer and unlocked expansion" },
    ],
    keyTakeaway:
      "Adoption doesn't happen in general — it happens when you tie the technology to one outcome someone is already accountable for. The CoE framework (governance, intake, prioritization) provided the structure, but the single-outcome focus drove the results.",
    valueModel: "Align → Activate → Amplify",
  },
  {
    id: "enterprise-gaming",
    company: "Enterprise Gaming Co",
    industry: "Gaming / Entertainment",
    isComposite: true,
    challenge:
      "A global gaming organization needed to drive AI adoption across customer support, game development, data analytics, and internal operations — spanning multiple SVP-level functions with competing priorities.",
    solution:
      "Established executive governance across 5 SVP-level functions including SteerCo facilitation, executive dashboards, and escalation protocols. Built a digital transformation program with intake, prioritization, KPI dashboarding, and adoption measurement across 31 cross-functional initiatives. Tracked enterprise KPIs: NRR, productivity, customer health, NPS.",
    products: ["ChatGPT Enterprise", "Codex", "API"],
    results: [
      { metric: "Initiatives Managed", value: "31", context: "Cross-functional AI initiatives across 6 functions" },
      { metric: "Governance Scope", value: "5 SVPs", context: "Executive governance across 5 SVP-level functions" },
      { metric: "KPIs Tracked", value: "4 enterprise", context: "NRR, productivity, customer health, NPS" },
    ],
    keyTakeaway:
      "Large organizations need program-level governance, not project-level management. The SteerCo model with defined escalation protocols and shared KPIs created alignment across competing priorities.",
    valueModel: "Align → Accelerate",
  },
];

export const industries = [...new Set(caseStudies.map((cs) => cs.industry))];
export const valueModels = [...new Set(caseStudies.map((cs) => cs.valueModel))];
