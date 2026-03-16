"use client";

import { useState } from "react";
import { dimensions, calculateResults, type Dimension } from "@/lib/assessment-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AssessmentResults } from "./results";
import {
  Crown,
  Activity,
  Server,
  Shield,
  Users,
  Brain,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  crown: Crown,
  activity: Activity,
  server: Server,
  shield: Shield,
  users: Users,
  brain: Brain,
  chart: BarChart3,
};

export function Questionnaire() {
  const [currentDimension, setCurrentDimension] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const dim = dimensions[currentDimension];
  const question = dim.questions[currentQuestion];
  const totalQuestions = dimensions.reduce((sum, d) => sum + d.questions.length, 0);
  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / totalQuestions) * 100;

  const handleSelect = (questionId: string, value: number) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // Auto-advance after a short delay
    setTimeout(() => {
      if (currentQuestion < dim.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else if (currentDimension < dimensions.length - 1) {
        setCurrentDimension(currentDimension + 1);
        setCurrentQuestion(0);
      } else {
        // All done
        setShowResults(true);
      }
    }, 300);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentDimension > 0) {
      const prevDim = dimensions[currentDimension - 1];
      setCurrentDimension(currentDimension - 1);
      setCurrentQuestion(prevDim.questions.length - 1);
    }
  };

  const canGoBack = currentDimension > 0 || currentQuestion > 0;

  if (showResults) {
    const results = calculateResults(answers);
    return (
      <AssessmentResults
        results={results}
        answers={answers}
        onRetake={() => {
          setAnswers({});
          setCurrentDimension(0);
          setCurrentQuestion(0);
          setShowResults(false);
        }}
      />
    );
  }

  const DimIcon = iconMap[dim.icon] || BarChart3;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>
            Question {answeredCount + 1} of {totalQuestions}
          </span>
          <span>{Math.round(progressPercent)}% complete</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Dimension indicator */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <DimIcon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{dim.title}</h2>
            <Badge variant="secondary" className="text-xs">
              {currentDimension + 1} of {dimensions.length}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{dim.description}</p>
        </div>
      </div>

      {/* Dimension pills */}
      <div className="mb-8 flex gap-1.5 overflow-x-auto pb-2">
        {dimensions.map((d, i) => {
          const allAnswered = d.questions.every((q) => answers[q.id] !== undefined);
          const isCurrent = i === currentDimension;
          return (
            <button
              key={d.id}
              onClick={() => {
                setCurrentDimension(i);
                setCurrentQuestion(0);
              }}
              className={cn(
                "flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                isCurrent
                  ? "bg-primary text-primary-foreground"
                  : allAnswered
                    ? "bg-green-500/10 text-green-500"
                    : "bg-muted text-muted-foreground hover:bg-accent"
              )}
            >
              {allAnswered && <CheckCircle2 className="h-3 w-3" />}
              {d.title.split(" ")[0]}
            </button>
          );
        })}
      </div>

      {/* Question */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {question.text}
          </CardTitle>
          <CardDescription>
            Select the option that best describes your organization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option) => {
            const isSelected = answers[question.id] === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(question.id, option.value)}
                className={cn(
                  "w-full rounded-lg border p-4 text-left transition-all",
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border hover:border-primary/50 hover:bg-accent/50"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {option.value}
                  </div>
                  <div>
                    <p className={cn("text-sm font-medium", isSelected && "text-primary")}>
                      {option.label}
                    </p>
                    {option.description && (
                      <p className="mt-1 text-xs text-muted-foreground italic">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={goBack}
          disabled={!canGoBack}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        {answeredCount === totalQuestions && (
          <Button onClick={() => setShowResults(true)}>
            View Results
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
