import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlayCircle,
  CheckCircle,
  ArrowRight,
  Plus,
} from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Define Conditions",
    description: "Set up what events or conditions trigger this rule",
  },
  {
    number: 2,
    title: "Configure Actions",
    description: "Choose what remediation actions to execute",
  },
  {
    number: 3,
    title: "Set Policies",
    description: "Define retry policies and execution options",
  },
  {
    number: 4,
    title: "Review & Deploy",
    description: "Test and deploy your rule to production",
  },
];

export function RuleOverview() {
  return (
    <div className="space-y-8 pb-12">
      {/* Create New Rule */}
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <div className="text-center space-y-3 max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground">Create a New Rule</h2>
          <p className="text-muted-foreground">
            Define conditions and configure remediation actions to automatically resolve issues in your infrastructure
          </p>
        </div>

        <Link href="/rules/new?type=default" className="block">
          <Button size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Create New Rule
          </Button>
        </Link>
      </div>

      {/* Creation Process */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-4">How to Create a Rule</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                  {step.number}
                </div>
                {idx < steps.length - 1 && (
                  <div className="mt-2 h-12 w-0.5 bg-border" />
                )}
              </div>
              <div className="pt-1">
                <h4 className="font-semibold text-foreground text-sm">{step.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <Card className="bg-muted border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <PlayCircle className="h-5 w-5 text-primary" />
            Quick Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex gap-3">
            <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
            <p className="text-sm text-muted-foreground">
              Use descriptive rule names to make them easy to identify and manage
            </p>
          </div>
          <div className="flex gap-3">
            <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
            <p className="text-sm text-muted-foreground">
              Start with simple rules and gradually add complexity as you gain experience
            </p>
          </div>
          <div className="flex gap-3">
            <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
            <p className="text-sm text-muted-foreground">
              Test your rules in a development environment before deploying to production
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
