# Build Plan: H.I.G. AI Enablement Control Tower MVP

**Product:** H.I.G. AI Enablement Control Tower  
**Branch:** `hig-control-tower-prd`  
**Baseline tag:** `baseline-openai-deployment-toolkit`  
**Date:** April 24, 2026  
**Status:** Ready for MVP implementation

---

## 1. Build Strategy

Do not start fresh. Evolve the existing Deploy IQ app.

The current app already contains strong support modules:

- AI maturity assessment
- Deployment planner
- Workshop library
- ROI calculator
- Eval planner
- Case studies
- API playground
- Presentation mode

The H.I.G. pivot needs a new centerpiece:

> A portfolio-scale AI enablement control tower that sits above the existing modules and reframes them for H.I.G.'s multi-company, multi-platform environment.

The fastest high-impact move is to build one polished `/control-tower` page with realistic mock data and update navigation/homepage positioning.

---

## 2. MVP Implementation Scope

### Must Build

1. New data file:
   - `src/lib/hig-control-tower-data.ts`
   - Holds mock portfolio companies, sessions, curriculum modules, vendor deliverables, champions, ROI metrics, and dashboard summary metrics.

2. New page:
   - `src/app/control-tower/page.tsx`
   - Main H.I.G. control tower experience.

3. Navigation update:
   - Add `Control Tower` as first nav item.
   - Keep existing modules.

4. Homepage update:
   - Reposition from "OpenAI deployment toolkit" to "portfolio AI enablement control tower."
   - Preserve OpenAI artifacts as part of platform coverage, not the whole product.

5. Copy update:
   - Use "multi-platform" language.
   - Include ChatGPT, Claude, ToltIQ, Copilot/Gemini, API/agents.
   - Describe ToltIQ as an approved due diligence platform, not internal AI.

6. Verification:
   - `npm run lint`
   - `npm run build`

### Should Build If Time Allows

1. A portfolio detail drilldown panel or modal.
2. Filter controls by tier, sector, risk, and platform.
3. 90-day plan component.
4. Presentation mode slide updates for H.I.G. narrative.
5. README update documenting the pivot.

### Defer

1. Real backend persistence.
2. LMS integrations.
3. Real usage telemetry.
4. Authentication.
5. Vendor portal workflow.
6. Real H.I.G. data.

---

## 3. Proposed Page Layout

### `/control-tower`

#### Section 1: Header

Purpose:

- Frame the app as an operating system for the role.

Content:

- Title: "H.I.G. AI Enablement Control Tower"
- Subtitle: "Portfolio-scale training, adoption, governance, vendor coordination, and ROI across H.I.G. and its portfolio companies."
- Badges:
  - Multi-platform
  - Portfolio Operations
  - Demo Data

#### Section 2: Executive KPI Strip

Cards:

- Active portfolio companies
- Training completion
- Champion coverage
- At-risk companies
- Platform adoption
- Estimated annualized value pipeline

#### Section 3: Operating View Tabs

Use existing `Tabs` component.

Tabs:

1. Portfolio
2. Calendar
3. Curriculum
4. Champions
5. Vendors
6. ROI

#### Tab 1: Portfolio

Components:

- Segmentation summary: Lighthouse, Cohort, Foundation.
- Portfolio health table.
- Risk badges.
- Next best action column.

Columns:

- Company
- Sector
- Region
- Tier
- Maturity
- Training
- Champion Coverage
- Platforms
- Risk
- Next Action

#### Tab 2: Calendar

Components:

- Upcoming sessions list.
- Required/compliance markers.
- Owner and vendor.
- Readiness status.

Fields:

- Date
- Session
- Audience
- Platform
- Delivery mode
- Owner
- Vendor
- Status

#### Tab 3: Curriculum

Components:

- Role/platform matrix.
- Curriculum cards by level.
- Freshness status.

Levels:

- Foundation
- Practitioner
- Power User
- Champion
- Executive

Platforms:

- ToltIQ
- ChatGPT
- Claude
- Copilot/Gemini
- API/Agents
- Governance

#### Tab 4: Champions

Components:

- Champion coverage by tier.
- Champion table.
- Coverage gaps.
- Office hours/coaching metrics.

Fields:

- Champion
- Company
- Function
- Region
- Platforms
- Engagement
- Status

#### Tab 5: Vendors

Components:

- Vendor deliverables board.
- Content freshness indicators.
- Platform release refresh queue.

Fields:

- Vendor
- Deliverable
- Platform
- Due date
- Status
- Reviewer
- Risk

#### Tab 6: ROI

Components:

- Adoption funnel.
- Use case value cards.
- Case study candidates.
- Executive summary block.

Metrics:

- Training completion
- Active adoption
- Use cases in production
- Estimated value
- Confidence level

#### Section 4: 90-Day Operating Plan

Three columns:

- Days 1-30: Baseline and align
- Days 31-60: Launch repeatable enablement
- Days 61-90: Measure and scale

#### Section 5: Interview Close

Short block:

> "This is how I would run the role: not as a series of trainings, but as a portfolio value creation program with measurable adoption."

---

## 4. Mock Data Requirements

Create realistic but non-sensitive demo data.

### Portfolio Companies

Use a blend of public H.I.G. portfolio examples and clearly demo-friendly placeholders if needed.

Potential public examples:

- 3Pillar Global
- Amsive
- Amerijet
- Accupac
- Accounting Seed
- AgileBlue
- 4Refuel
- Avanta Salud

Include sectors:

- Business Services
- Technology
- Healthcare
- Industrials
- Consumer
- Logistics
- Cybersecurity
- Financial Operations

Include tiers:

- Lighthouse
- Cohort
- Foundation

Include priority platforms:

- ToltIQ
- ChatGPT Enterprise
- Claude Enterprise
- Copilot/Gemini
- API/Agents

### Training Sessions

Examples:

- ToltIQ Diligence Power User Lab
- Claude for Long-Context Document Review
- ChatGPT Enterprise for Portfolio Operators
- Executive AI Briefing: AI Value Creation in the Middle Market
- AI Governance and Acceptable Use Baseline
- Copilot/Gemini Productivity Lab for Finance Teams
- Agentic Workflow Ideation for Customer Support

### Curriculum Modules

Examples:

- AI Foundations for Portfolio Company Leaders
- Safe Use and Data Boundaries
- ToltIQ Source-Linked Diligence
- ChatGPT and Claude Prompt Patterns
- Finance Automation With Spreadsheet Assistants
- AI Champions Facilitation Kit
- API and Agent Readiness for Technical Teams

### Vendor Deliverables

Examples:

- ToltIQ diligence lab refresh
- Claude vs ChatGPT document analysis quick guide
- Portfolio executive briefing deck
- AI governance knowledge check
- Finance automation hands-on exercise

### Champions

Use mock names and realistic functions:

- CFO
- COO
- VP Operations
- IT Director
- Revenue Operations
- Customer Support
- Engineering

### ROI Metrics

Examples:

- Diligence document review cycle time reduction.
- Monthly reporting package preparation time saved.
- Customer support knowledge retrieval improvement.
- Sales proposal drafting time saved.
- Finance variance analysis cycle time reduced.

---

## 5. Visual Design Direction

The UI should feel like a PE operating dashboard:

- Dense but organized.
- Executive-readable.
- Muted professional palette.
- Strong status indicators.
- Tables and dashboards over marketing-style cards.
- Limited decorative styling.
- No oversized hero treatment on the control tower page.

Use existing components:

- `Card`
- `Badge`
- `Button`
- `Tabs`
- `Progress`
- `Separator`

Use lucide icons:

- `Command`
- `Building2`
- `CalendarDays`
- `GraduationCap`
- `Users`
- `ClipboardCheck`
- `TrendingUp`
- `AlertTriangle`
- `ShieldCheck`
- `BriefcaseBusiness`
- `Rocket`

---

## 6. File-Level Implementation Plan

### Step 1: Add Mock Data

Create:

`src/lib/hig-control-tower-data.ts`

Export:

- `portfolioCompanies`
- `trainingSessions`
- `curriculumModules`
- `vendorDeliverables`
- `champions`
- `roiMetrics`
- `dashboardMetrics`
- helper functions for aggregate counts

### Step 2: Add Control Tower Page

Create:

`src/app/control-tower/page.tsx`

Structure:

- import data
- define formatting helpers
- render header
- render KPI strip
- render tabs
- render 90-day plan
- render interview close block

Keep state minimal:

- selected tab handled by `Tabs`
- optional filter state only if easy

### Step 3: Update Navigation

Edit:

`src/components/shared/navigation.tsx`

Changes:

- Add Control Tower first.
- Consider shortening nav labels if desktop nav crowds.
- Keep existing app sections.

### Step 4: Update Homepage

Edit:

`src/app/page.tsx`

Changes:

- Reframe headline.
- Add Control Tower feature card.
- Adjust stats from OpenAI-only to portfolio enablement language.
- Keep OpenAI framework language as a supporting foundation, but add multi-platform and PE context.

### Step 5: Optional Presentation Update

Edit:

`src/app/present/page.tsx`

Changes:

- Add a slide for H.I.G. control tower narrative.
- Add a slide for first 90 days.
- Add a slide for multi-platform curriculum.

This can be deferred if MVP page is strong.

### Step 6: Verify

Run:

```bash
npm run lint
npm run build
```

Expected:

- Existing lint warnings may remain unless cleaned.
- Build should pass.

---

## 7. Acceptance Criteria

### Product Acceptance

- A user can open `/control-tower` and understand the H.I.G. role strategy in under one minute.
- The dashboard clearly shows portfolio-scale operations.
- The app visibly supports multi-platform training, including ToltIQ, ChatGPT, Claude, Copilot/Gemini, and API/agents.
- The dashboard includes vendor/content operations.
- The dashboard includes champions network tracking.
- The dashboard includes adoption and ROI tracking.
- The page supports a 6-8 minute interview walkthrough.

### Technical Acceptance

- TypeScript compiles.
- `npm run build` passes.
- New data is typed.
- No new dependencies are introduced unless necessary.
- Existing pages continue to work.
- No real H.I.G. confidential data is used.

### Story Acceptance

The app should support this talk track:

> "I tagged the prior version as the OpenAI deployment toolkit baseline. For H.I.G., I expanded the concept into a multi-platform portfolio enablement control tower. This reflects the actual role: coordinating training, vendors, calendars, compliance, champions, adoption analytics, and ROI across a global PE firm and its portfolio companies."

---

## 8. Suggested Commit Plan

### Commit 1

Message:

`Add HIG control tower PRD and build plan`

Files:

- `docs/HIG_AI_ENABLEMENT_CONTROL_TOWER_PRD.md`
- `docs/HIG_CONTROL_TOWER_BUILD_PLAN.md`

### Commit 2

Message:

`Add HIG control tower data model`

Files:

- `src/lib/hig-control-tower-data.ts`

### Commit 3

Message:

`Build HIG enablement control tower dashboard`

Files:

- `src/app/control-tower/page.tsx`
- `src/components/shared/navigation.tsx`

### Commit 4

Message:

`Reframe homepage for portfolio AI enablement`

Files:

- `src/app/page.tsx`

### Commit 5

Message:

`Polish HIG demo narrative and verification`

Files:

- optional `src/app/present/page.tsx`
- optional `README.md`

---

## 9. Future Roadmap

### Phase 2: Portfolio Drilldowns

- Individual company pages.
- Maturity trend.
- use case pipeline.
- training records.
- champion activity.
- ROI details.

### Phase 3: Assessment Integration

- Convert current AI maturity assessment into portfolio company assessment.
- Save assessment to mock company record.
- Generate recommended learning path.

### Phase 4: Curriculum Builder

- More detailed module library.
- Platform-specific labs.
- vendor brief generator.
- content refresh queue.

### Phase 5: Executive Reporting

- One-click monthly report.
- portfolio heatmap.
- board-ready ROI summary.
- case study generator.

### Phase 6: Real Integrations

- LMS
- calendar
- platform analytics
- survey tool
- vendor project management
- CRM or portfolio ops system

