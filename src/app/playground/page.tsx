"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Play,
  Send,
  Loader2,
  MessageSquare,
  Sparkles,
  FileSearch,
  Bot,
  Copy,
  Check,
} from "lucide-react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface DemoScenario {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  systemPrompt: string;
  starterPrompt: string;
  model: string;
}

const scenarios: DemoScenario[] = [
  {
    id: "deployment-advisor",
    title: "AI Deployment Advisor",
    description:
      "Ask questions about enterprise AI deployment strategy, OpenAI products, or adoption best practices.",
    icon: Bot,
    systemPrompt: `You are an expert AI Deployment Advisor helping enterprises adopt OpenAI's product suite. You have deep knowledge of:
- ChatGPT Enterprise (admin console, SSO/SCIM, EKM, custom GPTs, connectors)
- Codex (cloud agent, CLI, SDK, enterprise governance)
- Agents (Responses API, Agents SDK, AgentKit, Frontier platform)
- API Platform (GPT-5.4, o3/o4-mini, fine-tuning, evals)
- OpenAI's adoption framework: Align → Activate → Amplify → Accelerate → Govern
- Enterprise case studies: Morgan Stanley, Klarna, BBVA, Moderna, Stripe

Be specific, cite real data points, and connect technical features to business outcomes. Keep responses concise and actionable.`,
    starterPrompt:
      "We're a 5,000-person financial services company considering ChatGPT Enterprise. What should our first 90 days look like?",
    model: "gpt-4.1-mini",
  },
  {
    id: "executive-briefing",
    title: "Executive Briefing Generator",
    description:
      "Generate executive-ready content about AI adoption for C-suite audiences.",
    icon: Sparkles,
    systemPrompt: `You are a senior AI strategist preparing executive briefing content. Your audience is C-suite leaders who are smart but not technical.

Key principles:
- Lead with business outcomes, not technology features
- Use specific data points (Klarna: $40M profit improvement, Morgan Stanley: 98% advisor adoption)
- Connect AI capabilities to the executive's priorities: revenue, cost, risk, competitive advantage
- Be honest about limitations and risks
- Keep language clear, authoritative, and jargon-free

Format output with clear headers and bullet points suitable for executive presentations.`,
    starterPrompt:
      "Write a 1-page executive brief on why our organization should deploy ChatGPT Enterprise, including ROI data and risk considerations.",
    model: "gpt-4.1-mini",
  },
  {
    id: "eval-designer",
    title: "Eval Strategy Designer",
    description:
      "Describe your AI use case and get a tailored evaluation strategy with grader recommendations.",
    icon: FileSearch,
    systemPrompt: `You are an AI evaluation expert following OpenAI's eval-driven development methodology. When given a use case, you design a complete evaluation strategy including:

1. Success criteria definition
2. Recommended grader types (String Check, Code-based, Model-based/LLM Judge, Formatted)
3. Dataset requirements (JSONL format, minimum rows, train/validation/test splits)
4. The Evaluation Flywheel approach: Analyze (open coding → axial coding) → Measure (narrowly-scoped graders) → Improve (Prompt Optimizer)
5. Business metrics mapping (connect eval scores to financial impact)
6. Production monitoring recommendations

Be specific and practical. Include example grader implementations where helpful.`,
    starterPrompt:
      "We want to build a customer support chatbot that handles product return requests. How should we evaluate it?",
    model: "gpt-4.1-mini",
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="text-muted-foreground hover:text-foreground transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

function ChatDemo({ scenario }: { scenario: DemoScenario }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(scenario.starterPrompt);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: scenario.systemPrompt },
            ...newMessages,
          ],
          model: scenario.model,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "API request failed");
        return;
      }

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.content },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
            Send a message to start the conversation
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "rounded-lg p-4 text-sm",
              msg.role === "user"
                ? "bg-primary/10 ml-8"
                : "bg-muted mr-8"
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground">
                {msg.role === "user" ? "You" : "AI Deployment Advisor"}
              </span>
              <CopyButton text={msg.content} />
            </div>
            <div className="whitespace-pre-wrap">{msg.content}</div>
          </div>
        ))}
        {loading && (
          <div className="bg-muted rounded-lg p-4 mr-8">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4 text-sm text-destructive">
            {error}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Ask about enterprise AI deployment..."
          className="flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          rows={2}
        />
        <Button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="self-end"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12">
        <Badge variant="secondary" className="mb-4">
          <Play className="mr-1 h-3 w-3" />
          Live API
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          API Playground
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Live OpenAI API demonstrations. See the capabilities in action —
          deployment advisory, executive content generation, and eval strategy
          design.
        </p>
      </div>

      <Tabs defaultValue="deployment-advisor">
        <TabsList className="mb-6">
          {scenarios.map((s) => {
            const Icon = s.icon;
            return (
              <TabsTrigger key={s.id} value={s.id}>
                <Icon className="mr-1.5 h-4 w-4" />
                {s.title}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {scenarios.map((scenario) => (
          <TabsContent key={scenario.id} value={scenario.id}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{scenario.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {scenario.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {scenario.model}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ChatDemo scenario={scenario} />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Technical details */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-base">How This Works</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            Each demo uses the OpenAI Chat Completions API with tailored system
            prompts. The AI Deployment Advisor is configured with deep knowledge
            of OpenAI&apos;s product suite, adoption frameworks, and enterprise
            case studies.
          </p>
          <p>
            This demonstrates real API integration — the same pattern enterprises
            use to build custom AI experiences on top of OpenAI&apos;s platform.
            The system prompt is the &ldquo;secret sauce&rdquo; that transforms a
            general-purpose model into a domain-specific expert.
          </p>
          <div className="flex gap-2 mt-3">
            <Badge variant="secondary" className="text-xs">
              Next.js API Route
            </Badge>
            <Badge variant="secondary" className="text-xs">
              OpenAI Chat Completions
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Server-side API Key
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
