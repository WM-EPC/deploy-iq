"use client";

import { useState } from "react";
import { workshops } from "@/lib/workshop-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Clock,
  Users,
  Target,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Presentation,
  Wrench,
  MessageSquare,
  Coffee,
  Play,
  ListChecks,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const typeIcons: Record<string, React.ElementType> = {
  presentation: Presentation,
  "hands-on": Wrench,
  discussion: MessageSquare,
  break: Coffee,
  demo: Play,
};

const typeColors: Record<string, string> = {
  presentation: "bg-blue-500/10 text-blue-500",
  "hands-on": "bg-green-500/10 text-green-500",
  discussion: "bg-amber-500/10 text-amber-500",
  break: "bg-muted text-muted-foreground",
  demo: "bg-purple-500/10 text-purple-500",
};

export default function WorkshopsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12">
        <Badge variant="secondary" className="mb-4">
          {workshops.length} Templates
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Workshop &amp; Training Library
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Ready-to-deliver training templates built on OpenAI Academy formats.
          Each includes learning objectives, detailed agenda, facilitator notes,
          and rubric-based success metrics.
        </p>
      </div>

      {/* Workshop grid */}
      <div className="space-y-6">
        {workshops.map((ws) => {
          const isExpanded = expandedId === ws.id;
          return (
            <Card key={ws.id} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : ws.id)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{ws.title}</CardTitle>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <Users className="mr-1 h-3 w-3" />
                        {ws.audience}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="mr-1 h-3 w-3" />
                        {ws.duration}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {ws.phase}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {ws.product}
                      </Badge>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                </div>
                <CardDescription className="mt-2">
                  {ws.description}
                </CardDescription>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0">
                  <Separator className="mb-6" />

                  <Tabs defaultValue="agenda">
                    <TabsList className="mb-6">
                      <TabsTrigger value="agenda">Agenda</TabsTrigger>
                      <TabsTrigger value="objectives">Objectives</TabsTrigger>
                      <TabsTrigger value="facilitator">Facilitator Guide</TabsTrigger>
                      <TabsTrigger value="metrics">Success Metrics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="agenda">
                      <div className="space-y-3">
                        {ws.agenda.map((item, i) => {
                          const Icon = typeIcons[item.type] || BookOpen;
                          return (
                            <div
                              key={i}
                              className="flex gap-4 rounded-lg border border-border p-4"
                            >
                              <div className="shrink-0">
                                <div
                                  className={cn(
                                    "flex h-8 w-8 items-center justify-center rounded-lg",
                                    typeColors[item.type]
                                  )}
                                >
                                  <Icon className="h-4 w-4" />
                                </div>
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-mono text-muted-foreground">
                                    {item.time}
                                  </span>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs capitalize"
                                  >
                                    {item.type}
                                  </Badge>
                                </div>
                                <h4 className="text-sm font-semibold">
                                  {item.title}
                                </h4>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </TabsContent>

                    <TabsContent value="objectives">
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Target className="h-4 w-4 text-primary" />
                            <h3 className="text-sm font-semibold">
                              Learning Objectives
                            </h3>
                          </div>
                          <ul className="space-y-2">
                            {ws.learningObjectives.map((obj, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm"
                              >
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                <span>{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Separator />

                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <ListChecks className="h-4 w-4 text-amber-500" />
                            <h3 className="text-sm font-semibold">
                              Pre-Work Required
                            </h3>
                          </div>
                          <ul className="space-y-2">
                            {ws.preWork.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm"
                              >
                                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="facilitator">
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="h-4 w-4 text-amber-500" />
                            <h3 className="text-sm font-semibold">
                              Facilitator Notes
                            </h3>
                          </div>
                          <ul className="space-y-3">
                            {ws.facilitatorNotes.map((note, i) => (
                              <li
                                key={i}
                                className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-3 text-sm"
                              >
                                {note}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Separator />

                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <ArrowRight className="h-4 w-4 text-primary" />
                            <h3 className="text-sm font-semibold">
                              Follow-Up Actions
                            </h3>
                          </div>
                          <ul className="space-y-2">
                            {ws.followUp.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm"
                              >
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="metrics">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Target className="h-4 w-4 text-green-500" />
                          <h3 className="text-sm font-semibold">
                            Success Metrics
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 italic">
                          Measured through observable skill demonstration, not
                          self-reported satisfaction — moving beyond &ldquo;did you
                          enjoy the training?&rdquo; to &ldquo;can you apply what
                          you learned?&rdquo;
                        </p>
                        <ul className="space-y-2">
                          {ws.successMetrics.map((metric, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                              <span>{metric}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
