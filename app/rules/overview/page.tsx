import { AppShell } from "@/components/app-shell";
import { Header } from "@/components/header";
import { RuleOverview } from "@/components/rules/rule-overview";

export default function RuleOverviewPage() {
  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <Header
          title="Create Rule"
          description="Get started by choosing a rule type"
        />
        <div className="flex-1 overflow-auto p-6 bg-background">
          <RuleOverview />
        </div>
      </div>
    </AppShell>
  );
}
