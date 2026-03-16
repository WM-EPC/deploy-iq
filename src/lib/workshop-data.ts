export interface WorkshopAgendaItem {
  time: string;
  title: string;
  description: string;
  type: "presentation" | "hands-on" | "discussion" | "break" | "demo";
}

export interface Workshop {
  id: string;
  title: string;
  audience: string;
  duration: string;
  format: string;
  product: string;
  phase: string;
  description: string;
  learningObjectives: string[];
  agenda: WorkshopAgendaItem[];
  preWork: string[];
  facilitatorNotes: string[];
  successMetrics: string[];
  followUp: string[];
}

export const workshops: Workshop[] = [
  {
    id: "executive-briefing",
    title: "Executive AI Briefing",
    audience: "C-Suite, VPs",
    duration: "60 min",
    format: "Presentation + Live Demo + Q&A",
    product: "ChatGPT Enterprise, Frontier",
    phase: "Align",
    description:
      "High-impact session designed to build executive alignment on AI strategy. Covers the industry landscape, OpenAI product capabilities with live demonstrations, published case study ROI, and a collaborative opportunity mapping exercise.",
    learningObjectives: [
      "Understand the current state of enterprise AI and why structured adoption matters",
      "See live demonstrations of ChatGPT Enterprise, Custom GPTs, and agent capabilities",
      "Connect AI capabilities to specific business outcomes using published ROI data",
      "Identify 3-5 high-value use cases specific to your organization",
      "Align on a preliminary adoption roadmap and governance approach",
    ],
    agenda: [
      {
        time: "0:00 - 0:10",
        title: "Industry Landscape & Why Now",
        description:
          "AI adoption data: 8x YoY Enterprise message growth, 75% positive ROI, the frontier gap (6x). Why 95% of pilots fail — and why structured deployment is the differentiator.",
        type: "presentation",
      },
      {
        time: "0:10 - 0:25",
        title: "Product Deep Dive with Live Demo",
        description:
          "Walk through ChatGPT Enterprise capabilities, Custom GPTs, Agents, and Codex with live demonstrations. Show the admin console, analytics dashboard, and security features.",
        type: "demo",
      },
      {
        time: "0:25 - 0:35",
        title: "Case Studies & ROI Data",
        description:
          "Morgan Stanley (98% advisor adoption), Klarna ($40M profit improvement), BBVA (2,900+ Custom GPTs in 5 months). Connect each to the audience's industry context.",
        type: "presentation",
      },
      {
        time: "0:35 - 0:50",
        title: "Opportunity Mapping Exercise",
        description:
          "Collaborative exercise: identify 3-5 high-value use cases specific to your organization. Map each to OpenAI's Five Value Models. Prioritize by impact and feasibility.",
        type: "discussion",
      },
      {
        time: "0:50 - 1:00",
        title: "Q&A & Next Steps",
        description:
          "Address executive concerns (security, hallucination, ROI timeline, workforce impact). Outline proposed next steps: assessment, pilot group selection, timeline.",
        type: "discussion",
      },
    ],
    preWork: [
      "Share the 'Staying Ahead in the Age of AI' executive brief (2-page summary)",
      "Request participants bring 1-2 workflow pain points they'd like AI to address",
      "Confirm admin access for live product demo",
    ],
    facilitatorNotes: [
      "Common executive objections and responses: Security ('zero data retention option, SOC 2, EKM'), Hallucination ('eval-driven development + human review workflows'), ROI Timeline ('75% report positive ROI within 12 months'), Job Displacement ('augmentation, not replacement — Klarna redeployed agents to higher-value work')",
      "Adapt case studies to the audience's industry — lead with the most relevant example",
      "Keep the live demo focused and rehearsed — technology failures in exec briefings erode confidence",
      "The opportunity mapping exercise is the most valuable part — let executives talk about their problems, not yours",
    ],
    successMetrics: [
      "Executive sponsor identified and committed",
      "3-5 use cases prioritized with business owners",
      "Agreement on assessment timeline and pilot approach",
      "Follow-up meeting scheduled within 2 weeks",
    ],
    followUp: [
      "Send assessment link within 24 hours",
      "Share customized ROI projection based on discussion",
      "Provide security whitepaper and compliance documentation",
      "Schedule AI Maturity Assessment with broader stakeholder group",
    ],
  },
  {
    id: "hackathon",
    title: "AI Hackathon",
    audience: "Cross-functional teams",
    duration: "Full day (6-8 hours)",
    format: "Facilitated hackathon with judging",
    product: "All products",
    phase: "Accelerate",
    description:
      "Full-day innovation event based on OpenAI Academy's published hackathon playbook. Cross-functional teams brainstorm, prototype, and demo AI solutions to real business problems.",
    learningObjectives: [
      "Experience hands-on AI development in a structured, time-boxed format",
      "Build working prototypes that address real business challenges",
      "Foster cross-functional collaboration between technical and business teams",
      "Identify high-potential use cases for post-hackathon development",
      "Create reusable prompts, Custom GPTs, or agent workflows",
    ],
    agenda: [
      {
        time: "0:00 - 0:30",
        title: "Kickoff & Inspiration",
        description:
          "Welcome, hackathon rules, judging criteria, and 2-3 inspiring examples of what's possible. Team introductions and challenge statement review.",
        type: "presentation",
      },
      {
        time: "0:30 - 2:00",
        title: "Brainstorming & Prototyping",
        description:
          "Teams identify their challenge, brainstorm approaches, and begin building initial prototypes. Champions and IT support circulate.",
        type: "hands-on",
      },
      {
        time: "2:00 - 2:30",
        title: "Break & Networking",
        description: "Lunch break with informal cross-team sharing.",
        type: "break",
      },
      {
        time: "2:30 - 5:00",
        title: "Build & Testing",
        description:
          "Deep prototyping. Teams build Custom GPTs, API integrations, or agent workflows. Champions available for technical guidance. Checkpoint at 4:00 to ensure demo readiness.",
        type: "hands-on",
      },
      {
        time: "5:00 - 6:00",
        title: "Demos & Feedback",
        description:
          "Each team gets 5 minutes to demo + 3 minutes Q&A. Judges score on Innovation, Impact/feasibility, Usability, Demo quality, Workflow effectiveness.",
        type: "presentation",
      },
      {
        time: "6:00 - 6:30",
        title: "Awards & Next Steps",
        description:
          "Winners announced, prizes awarded. Action items assigned for top prototypes. Post-event survey distributed.",
        type: "discussion",
      },
    ],
    preWork: [
      "Form teams of 3-6 (mixed technical/non-technical, cross-functional)",
      "Ensure all participants have ChatGPT Enterprise access and API keys",
      "Share challenge statements 48 hours in advance",
      "Set up shared repository for prototype centralization",
      "Brief IT support team on common issues and escalation procedures",
    ],
    facilitatorNotes: [
      "Team composition is critical: pair experienced AI users with beginners, mix technical and business roles",
      "Planning committee roles: Facilitator/Organizer, Internal Champions, IT Support, Judges/Review Panel",
      "Judging criteria (equal weight): Innovation, Impact/feasibility, Usability, Demo quality, Workflow effectiveness",
      "Have pre-built starter templates available for teams that get stuck",
      "The checkpoint at 4:00 PM is non-negotiable — teams must pivot to demo prep",
    ],
    successMetrics: [
      "Prototype completion rate (target: 80%+ of teams)",
      "Reusable prompts/Custom GPTs created",
      "Post-event adoption: how many prototypes move to production",
      "Participant engagement scores",
      "Cross-functional connections formed",
    ],
    followUp: [
      "Centralize all prototypes in shared repository within 48 hours",
      "Create post-event summary with photos, winning solutions, and lessons learned",
      "Assign owners and deadlines for top 3 prototypes to move toward production",
      "Share outcomes in company all-hands or newsletter",
      "Schedule follow-up check-in at 30 days to track prototype progress",
    ],
  },
  {
    id: "api-bootcamp",
    title: "API Bootcamp",
    audience: "Engineering teams",
    duration: "3 hours",
    format: "Code-along workshop",
    product: "API Platform, Responses API",
    phase: "Activate / Accelerate",
    description:
      "Hands-on technical workshop for engineering teams. Covers the OpenAI API architecture, Chat Completions vs. Responses API, RAG with vector stores, agent development with the Agents SDK, and eval-driven development basics.",
    learningObjectives: [
      "Understand the OpenAI API architecture and model selection tradeoffs",
      "Build a working RAG pipeline using vector stores and file_search",
      "Create a simple agent with tools using the Agents SDK",
      "Understand eval-driven development principles and when to apply them",
      "Know when to use fine-tuning vs. prompt engineering vs. RAG",
    ],
    agenda: [
      {
        time: "0:00 - 0:30",
        title: "API Architecture Overview",
        description:
          "Models (GPT-5.4, o3, o4-mini), API structure, authentication, rate limits, project-based hierarchy. Model selection: when to use reasoning models vs. flagship vs. mini.",
        type: "presentation",
      },
      {
        time: "0:30 - 1:00",
        title: "Chat Completions vs. Responses API",
        description:
          "Why Responses API is the new primitive. Built-in tools, stateful conversations, 40-80% better cache utilization. Live code walkthrough of both approaches.",
        type: "demo",
      },
      {
        time: "1:00 - 1:45",
        title: "Hands-on: Build a RAG Pipeline",
        description:
          "Create a vector store, upload documents, configure file_search. Build a Q&A system that retrieves and cites sources. Discuss chunking strategies and embedding tradeoffs.",
        type: "hands-on",
      },
      {
        time: "1:45 - 2:00",
        title: "Break",
        description: "Short break. Q&A on RAG exercise.",
        type: "break",
      },
      {
        time: "2:00 - 2:30",
        title: "Agents SDK Walkthrough",
        description:
          "Agents SDK architecture: agents, tools, handoffs, guardrails, tracing. Walk through building a simple agent that uses web search and code execution tools.",
        type: "demo",
      },
      {
        time: "2:30 - 2:45",
        title: "Eval-Driven Development Intro",
        description:
          "The Analyze → Measure → Improve flywheel. Grader types (string check, code-based, model-based). Why to write evals before prompts. Quick demo of the Prompt Optimizer.",
        type: "presentation",
      },
      {
        time: "2:45 - 3:00",
        title: "Decision Framework & Wrap-up",
        description:
          "When to fine-tune vs. prompt engineer vs. RAG. Cost/quality/latency tradeoffs. Resources for continued learning. Q&A.",
        type: "discussion",
      },
    ],
    preWork: [
      "Ensure all participants have OpenAI API keys with sufficient credits",
      "Set up development environment: Python 3.10+ or Node.js 18+",
      "Install OpenAI SDK: pip install openai or npm install openai",
      "Clone starter repository with exercise scaffolding",
      "Review API documentation overview (15 min read)",
    ],
    facilitatorNotes: [
      "Have a working backup for every live demo in case of API issues",
      "The RAG exercise is the highest-value section — ensure every participant gets it working",
      "Common question: 'When should we fine-tune?' Answer: When you need consistent style/format, domain-specific accuracy, or cost optimization at scale. Start with prompt engineering, then RAG, fine-tune last.",
      "For the Agents SDK section, keep it conceptual if participants are more junior — the hands-on RAG exercise is more important",
      "Distribute exercise solutions at the end, not during — struggle is part of the learning",
    ],
    successMetrics: [
      "All participants successfully make an API call",
      "80%+ complete the RAG exercise with working retrieval",
      "Participants can articulate when to use RAG vs. fine-tuning vs. prompt engineering",
      "At least 2-3 participants express intent to build something specific post-workshop",
    ],
    followUp: [
      "Share complete exercise code with solutions",
      "Create Slack/Teams channel for ongoing API questions",
      "Provide API credits or sandbox environment for continued experimentation",
      "Schedule 2-week check-in to review what participants have built",
      "Connect interested participants with Eval Strategy Planner for production readiness",
    ],
  },
  {
    id: "chatgpt-onboarding",
    title: "ChatGPT Enterprise Onboarding",
    audience: "All employees",
    duration: "90 min",
    format: "Hands-on workshop",
    product: "ChatGPT Enterprise",
    phase: "Activate",
    description:
      "Foundational onboarding workshop for all employees. Covers core ChatGPT Enterprise features, effective prompting techniques, data privacy guidelines, and building Custom GPTs.",
    learningObjectives: [
      "Navigate ChatGPT Enterprise confidently (projects, search, data analysis, voice)",
      "Write effective prompts for common work tasks",
      "Understand data privacy policies and what can/cannot be shared",
      "Create a basic Custom GPT for a personal workflow",
    ],
    agenda: [
      { time: "0:00 - 0:15", title: "Welcome & Data Privacy", description: "Login, workspace overview, enterprise security features, what data is and isn't shared, acceptable use policy.", type: "presentation" },
      { time: "0:15 - 0:40", title: "Core Features Tour", description: "Projects, search, data analysis, advanced voice, canvas. Hands-on: each participant completes 3 tasks from their actual work.", type: "hands-on" },
      { time: "0:40 - 1:00", title: "Prompting Techniques", description: "Role-based prompting, chain of thought, few-shot examples, iterative refinement. Practice with real work scenarios.", type: "hands-on" },
      { time: "1:00 - 1:20", title: "Build Your First Custom GPT", description: "Step-by-step: create a Custom GPT for a workflow you do weekly. Name it, give it instructions, test it with real input.", type: "hands-on" },
      { time: "1:20 - 1:30", title: "Resources & Next Steps", description: "Internal knowledge hub, AI Champions contact, prompt library, how to share Custom GPTs with your team.", type: "discussion" },
    ],
    preWork: [
      "Ensure all participants have ChatGPT Enterprise access (SSO login verified)",
      "Identify 2-3 repetitive tasks from their work they'd like to try with AI",
      "Review the organization's AI acceptable use policy (5 min read)",
    ],
    facilitatorNotes: [
      "Mixed audiences (technical + non-technical) require patience and multiple examples per concept",
      "The 'use your own work tasks' approach drives adoption far better than generic exercises",
      "Data privacy section is critical — handle confidently, cite specific controls (zero data retention, encryption, no training on Enterprise data)",
      "Custom GPT building is the 'aha moment' for most non-technical users — protect this time",
    ],
    successMetrics: [
      "100% of participants successfully use ChatGPT Enterprise for a real work task",
      "80%+ create a Custom GPT during the session",
      "Post-session: 7-day active usage rate above 60%",
      "Participant identifies at least one weekly workflow to transform with AI",
    ],
    followUp: [
      "Send prompt library and Custom GPT best practices guide",
      "Add participants to AI Champions Slack/Teams channel",
      "Schedule 2-week pulse check on usage and questions",
      "Identify power users for Champions network recruitment",
    ],
  },
  {
    id: "agents-deep-dive",
    title: "Agents Deep Dive",
    audience: "Technical leads, architects",
    duration: "2 hours",
    format: "Architecture walkthrough + build session",
    product: "Agents SDK, Responses API",
    phase: "Accelerate",
    description:
      "Technical deep dive into OpenAI's agent architecture for technical leads and solution architects. Covers the Responses API, Agents SDK, AgentKit, and Frontier platform architecture.",
    learningObjectives: [
      "Understand the Responses API as the new primitive for agentic work",
      "Design multi-agent architectures with handoffs, tracing, and guardrails",
      "Evaluate when to use Agents SDK vs. AgentKit vs. custom orchestration",
      "Plan agent governance: identity management, permissions, audit logging",
    ],
    agenda: [
      { time: "0:00 - 0:30", title: "Agent Architecture Overview", description: "Responses API architecture, built-in tools, 40-80% cache improvement. Why Assistants API is sunsetting (Aug 2026). The shift from stateless to stateful AI.", type: "presentation" },
      { time: "0:30 - 1:00", title: "Agents SDK Deep Dive", description: "Python/TypeScript SDK: agents, tools, handoffs, guardrails, tracing. Walk through a multi-agent customer service example with specialist routing.", type: "demo" },
      { time: "1:00 - 1:30", title: "Build Session: Multi-Agent Workflow", description: "Hands-on: build a 3-agent pipeline (intake → specialist → reviewer) with handoff logic and basic guardrails.", type: "hands-on" },
      { time: "1:30 - 2:00", title: "Frontier & Governance", description: "Frontier platform: Business Context, Agent Execution, Evaluation, Security. Agent IAM, permission boundaries, audit logging. Enterprise deployment considerations.", type: "presentation" },
    ],
    preWork: [
      "Review Agents SDK documentation (GitHub README)",
      "Install Agents SDK: pip install openai-agents or npm install @openai/agents",
      "Have a use case in mind: what workflow would benefit from multi-agent orchestration?",
    ],
    facilitatorNotes: [
      "This audience will ask hard architecture questions — be prepared with tradeoff discussions",
      "Common question: 'Agents SDK vs. LangChain vs. custom?' Answer: Agents SDK is purpose-built for OpenAI, provides native tracing/guardrails, and integrates tightly with Responses API. Use it unless you need multi-provider support.",
      "The Frontier section is forward-looking — frame it as 'where this is going' rather than 'what to deploy now'",
    ],
    successMetrics: [
      "Participants can articulate when to use agents vs. simple API calls",
      "Working multi-agent prototype from the build session",
      "Governance plan drafted for agent deployment in their org",
    ],
    followUp: [
      "Share Frontier documentation and early access information",
      "Connect with Solutions Engineering for production agent architecture review",
      "Schedule eval strategy session for agent quality measurement",
    ],
  },
  {
    id: "codex-dev-teams",
    title: "Codex for Dev Teams",
    audience: "Software engineers",
    duration: "2 hours",
    format: "Hands-on pairing session",
    product: "Codex, Codex CLI",
    phase: "Activate / Accelerate",
    description:
      "Practical workshop for software engineers to integrate Codex into their development workflow. Covers Codex Cloud, CLI, SDK, and best practices for AI-assisted development.",
    learningObjectives: [
      "Set up and configure Codex CLI with appropriate approval modes",
      "Use Codex effectively for code generation, review, debugging, and testing",
      "Understand Codex Enterprise governance (analytics, compliance, data retention)",
      "Integrate Codex into existing CI/CD workflows",
    ],
    agenda: [
      { time: "0:00 - 0:20", title: "Codex Overview & Setup", description: "Codex Cloud vs. CLI vs. SDK. Install CLI, configure auth, choose approval mode (suggest/auto-edit/full-auto). Sandboxing and security model.", type: "hands-on" },
      { time: "0:20 - 0:50", title: "Core Workflows", description: "Code generation, refactoring, debugging, test writing. Each participant works on a real task from their codebase.", type: "hands-on" },
      { time: "0:50 - 1:10", title: "Code Review with Codex", description: "Using Codex for PR reviews, security analysis, and documentation generation. Live demo on a real PR.", type: "demo" },
      { time: "1:10 - 1:40", title: "Advanced: Multi-Agent Pipelines", description: "Codex as MCP server via Agents SDK. Multi-agent development pipelines: PM → Designer → Frontend → Backend → Tester. When this makes sense vs. single-agent usage.", type: "presentation" },
      { time: "1:40 - 2:00", title: "Enterprise Governance & Wrap-up", description: "Analytics Dashboard, Compliance API, data retention policies. Why Codex excludes lines-of-code metrics. Best practices for team adoption.", type: "discussion" },
    ],
    preWork: [
      "Install Codex CLI: npm install -g @openai/codex",
      "Have a real codebase task ready (bug fix, feature, refactor, or test writing)",
      "Ensure GitHub/GitLab access for code review demo",
    ],
    facilitatorNotes: [
      "Engineers are skeptical until they see it work on their own code — the 'real task' exercises are critical",
      "The multi-agent pipeline section is aspirational — don't oversell current capabilities",
      "Governance matters: Codex intentionally excludes lines-of-code and acceptance-rate metrics to avoid perverse incentives. Frame this as a feature, not a limitation.",
    ],
    successMetrics: [
      "All participants have Codex CLI installed and working",
      "80%+ complete at least one real task using Codex",
      "Participants can configure appropriate approval modes for their team",
    ],
    followUp: [
      "Share team adoption guide with recommended settings",
      "Set up team-level Codex analytics dashboard",
      "Schedule 30-day review of usage patterns and productivity impact",
    ],
  },
  {
    id: "eval-workshop",
    title: "Eval-Driven Development",
    audience: "ML/AI engineers",
    duration: "2 hours",
    format: "Methodology + hands-on",
    product: "Evals API, Prompt Optimizer",
    phase: "Accelerate / Govern",
    description:
      "Methodology workshop on OpenAI's eval-driven development approach. Covers the Analyze-Measure-Improve flywheel, grader design, dataset creation, and the Prompt Optimizer workflow.",
    learningObjectives: [
      "Apply eval-driven development: write evals before prompts (like BDD)",
      "Design narrowly-scoped graders for specific failure modes",
      "Build eval datasets with appropriate train/validation/test splits",
      "Use the Prompt Optimizer for systematic improvement",
    ],
    agenda: [
      { time: "0:00 - 0:20", title: "Why Evals First", description: "Morgan Stanley case study: eval framework tested every use case before deployment. Why 'write evals before prompts' is like BDD. The cost of not measuring.", type: "presentation" },
      { time: "0:20 - 0:50", title: "The Evaluation Flywheel", description: "Analyze (open coding → axial coding), Measure (4 grader types), Improve (prompt rewrites + Prompt Optimizer). Walk through a real example end-to-end.", type: "demo" },
      { time: "0:50 - 1:20", title: "Hands-on: Build an Eval", description: "Create a JSONL dataset, implement string-check and model-based graders, run an eval, analyze results. Use a realistic scenario (customer support quality or content generation).", type: "hands-on" },
      { time: "1:20 - 1:45", title: "Prompt Optimizer & Business Metrics", description: "Live demo of the Prompt Optimizer workflow. Connecting eval scores to business metrics (per-unit costs, audit expenses, cost of misses).", type: "demo" },
      { time: "1:45 - 2:00", title: "Production Readiness", description: "When evals stabilize, failure modes documented, business case positive. Continuous monitoring and edge case capture. 7-step system design framework.", type: "discussion" },
    ],
    preWork: [
      "Read OpenAI Evals documentation (20 min)",
      "Identify one AI use case in your organization that needs quality measurement",
      "Prepare 5-10 example inputs and expected outputs for your use case",
    ],
    facilitatorNotes: [
      "The 'write evals before prompts' framing is counterintuitive for most engineers — use the BDD analogy heavily",
      "Model-based graders (LLM judges) are the most powerful but least intuitive — spend extra time here",
      "Common mistake: graders that are too broad. Push participants toward narrowly-scoped graders targeting specific failure modes",
    ],
    successMetrics: [
      "All participants create and run at least one eval",
      "Participants can choose the right grader type for their use case",
      "Draft eval plan for one production use case",
    ],
    followUp: [
      "Share eval templates and example datasets",
      "Connect with Eval Strategy Planner in Deploy IQ for structured planning",
      "Schedule production eval review at 30 days",
    ],
  },
  {
    id: "custom-gpt",
    title: "Custom GPT Workshop",
    audience: "Business teams",
    duration: "90 min",
    format: "Build-your-own-GPT session",
    product: "ChatGPT Enterprise",
    phase: "Amplify",
    description:
      "Hands-on workshop where business teams build Custom GPTs for their specific workflows. No coding required. Covers GPT configuration, knowledge upload, action creation, and sharing.",
    learningObjectives: [
      "Create a Custom GPT configured for a specific business workflow",
      "Upload knowledge files and configure retrieval settings",
      "Write effective system instructions for consistent behavior",
      "Share GPTs with teams and manage permissions",
    ],
    agenda: [
      { time: "0:00 - 0:15", title: "What Are Custom GPTs?", description: "Examples from BBVA (2,900+ in 5 months), Estee Lauder (240+). Why Custom GPTs are the packaging layer for organizational knowledge. Live demo of 3 well-built GPTs.", type: "presentation" },
      { time: "0:15 - 0:40", title: "Build Your GPT", description: "Step-by-step: choose a workflow, write instructions, upload knowledge files, configure conversation starters. Each participant builds a GPT for a real weekly task.", type: "hands-on" },
      { time: "0:40 - 1:00", title: "Test & Refine", description: "Test your GPT with real inputs. Iterate on instructions. Peer testing: swap GPTs with a neighbor and provide feedback.", type: "hands-on" },
      { time: "1:00 - 1:15", title: "Advanced: Actions & Sharing", description: "Connecting GPTs to external data sources. Sharing with your team. GPT lifecycle: when to update, retire, or replace.", type: "demo" },
      { time: "1:15 - 1:30", title: "Showcase & Next Steps", description: "3-4 volunteers demo their GPTs. Vote on most useful. Discuss scaling: how to build a GPT library for your department.", type: "discussion" },
    ],
    preWork: [
      "Identify one repetitive workflow you do at least weekly",
      "Gather any relevant documents, templates, or guidelines for that workflow",
      "Review 2-3 existing Custom GPTs in your workspace for inspiration",
    ],
    facilitatorNotes: [
      "This is the 'gateway drug' workshop — non-technical users who build a useful Custom GPT become long-term adopters",
      "The peer testing exercise surfaces instruction gaps that self-testing misses",
      "BBVA's 2,900 GPTs in 5 months is the aspirational benchmark — share it early",
    ],
    successMetrics: [
      "100% of participants create a working Custom GPT",
      "80%+ GPTs address a real workflow (not just a toy example)",
      "At least 3 GPTs shared with broader teams within 1 week",
    ],
    followUp: [
      "Create department-level GPT directory",
      "Identify top GPTs for organization-wide sharing",
      "Schedule monthly GPT showcase for cross-team inspiration",
    ],
  },
  {
    id: "security-review",
    title: "Security & Compliance Review",
    audience: "IT / Security teams",
    duration: "60 min",
    format: "Technical deep dive",
    product: "Admin Console, EKM, SSO/SCIM",
    phase: "Align / Govern",
    description:
      "Technical security review for IT and security teams. Covers OpenAI's enterprise security architecture, compliance certifications, data handling, admin controls, and governance configuration.",
    learningObjectives: [
      "Understand OpenAI's security architecture and compliance certifications",
      "Configure SSO, SCIM, and Enterprise Key Management",
      "Set up data residency, retention policies, and audit logging",
      "Design an AI governance policy appropriate for your industry",
    ],
    agenda: [
      { time: "0:00 - 0:15", title: "Security Architecture", description: "Zero trust architecture, encryption (AES-256, TLS 1.2+), data ownership model. Enterprise data is NOT used for model training. SOC 2 Type 2, ISO 27001/27017/27018/27701.", type: "presentation" },
      { time: "0:15 - 0:30", title: "Identity & Access Management", description: "SAML SSO setup, SCIM provisioning (Okta, Entra ID, Google Workspace, Ping). Domain verification. RBAC: Readers vs. Owners. SSO enforcement options.", type: "demo" },
      { time: "0:30 - 0:45", title: "Data Governance", description: "Data residency options (10 regions). Retention policies. Enterprise Key Management (EKM). Compliance: GDPR, CCPA, HIPAA, FERPA support. Business Associate Agreement availability.", type: "presentation" },
      { time: "0:45 - 1:00", title: "Governance Configuration", description: "Admin console walkthrough. Usage analytics and monitoring. Acceptable use policy template. Agent governance for Frontier: identity management, permissions, audit logging.", type: "discussion" },
    ],
    preWork: [
      "Compile list of compliance requirements specific to your industry",
      "Identify current identity provider and SSO configuration",
      "Review OpenAI Trust Portal (trust.openai.com) and Security documentation",
    ],
    facilitatorNotes: [
      "IT/Security teams need specifics, not marketing — lead with technical architecture",
      "Have compliance documentation ready: DPA, BAA, SOC 2 report access",
      "Common concern: 'Is our data used for training?' Answer: No. Enterprise, Business, Edu, Healthcare, and API data is never used for training. This is contractual.",
      "EKM is the differentiator for highly regulated industries — explain it clearly",
    ],
    successMetrics: [
      "Security team signs off on acceptable risk posture",
      "SSO/SCIM configuration plan agreed upon",
      "Governance policy draft reviewed and approved for pilot",
    ],
    followUp: [
      "Provide compliance documentation package",
      "Schedule SSO/SCIM configuration session with IT",
      "Share governance policy template for customization",
      "Connect with OpenAI Trust team for any remaining security questions",
    ],
  },
];
