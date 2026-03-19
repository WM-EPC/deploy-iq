# Deploy IQ — CLAUDE.md

## Project Overview
Enterprise AI Deployment Toolkit built for Bill Mabry's OpenAI AI Deployment Manager interview. Deployed to Vercel.

## Tech Stack
- Next.js 16 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui (v4 — uses @base-ui/react, NOT asChild)
- Recharts for data visualization
- Lucide React for icons
- Deployed on Vercel: https://deploy-iq.vercel.app/
- GitHub: https://github.com/WM-EPC/deploy-iq

## Key Conventions
- Dark mode enabled by default (`<html className="dark">`)
- shadcn/ui v4 Button does NOT support `asChild` — use styled Link elements or `buttonVariants` (client-only)
- Server components cannot import from `"use client"` modules — use inline styles for Links in server components
- Recharts SSR warnings about width/height are harmless — ignore them
- All content is OpenAI-specific (not vendor-agnostic) — references their frameworks, products, case studies by name
- Bill Mabry credit appears in hero section, footer, and bottom of landing page

## Environment Variables
- `OPENAI_API_KEY` — required for /playground API demos (set in .env.local and Vercel)

## Project Structure
- `src/app/` — Pages (assess, plan, workshops, roi, evals, case-studies, playground, present)
- `src/app/api/chat/route.ts` — Server-side OpenAI API proxy
- `src/components/` — Organized by feature (assessment/, roi/, shared/, ui/)
- `src/lib/` — Data models and logic (assessment-data, plan-data, roi-data, case-study-data, workshop-data)

## The Assignment (ACTIVE — Due ~March 20, 2026)
OpenAI sent a 48-hour technical take-home: design an AI-powered meal analysis system architecture.
- Assignment files are in `/Users/billmabrym1max/Documents/Coding Projects/deployment-mgr/assignment/`
- PowerPoint slides: `Meal_Analysis_System_Bill_Mabry.pptx`
- HTML reference doc: `reference.html`
- Full Q&A: `FULL-QA-REFERENCE.md`
- Presentation content: `PRESENTATION.md`
- Bill needs to record a <10 min Loom video presenting the architecture
- Part 2 is a 30-min virtual onsite with VP Engineering
