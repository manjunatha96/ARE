"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { Header } from "@/components/header";
import { RuleBuilder } from "@/components/rules/rule-builder";

export default function NewRulePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ruleType = searchParams.get("type");

  useEffect(() => {
    if (!ruleType) {
      router.push("/rules/overview");
    }
  }, [ruleType, router]);

  if (!ruleType) {
    return null;
  }

  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <Header
          title="Create New Rule"
          description={`Define conditions and actions for your ${ruleType.replace("-", " ")} remediation rule`}
        />
        <div className="flex-1 overflow-auto p-6 bg-background">
          <RuleBuilder />
        </div>
      </div>
    </AppShell>
  );
}
