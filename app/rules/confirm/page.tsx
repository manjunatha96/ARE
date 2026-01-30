import { AppShell } from "@/components/app-shell";
import { Header } from "@/components/header";
import { RuleConfirmation } from "@/components/rules/rule-confirmation";

export default function RuleConfirmationPage() {
  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <Header
          title="Confirm Rule Configuration"
          description="Review your rule settings before final submission"
        />
        <div className="flex-1 overflow-auto p-6 bg-background">
          <RuleConfirmation />
        </div>
      </div>
    </AppShell>
  );
}
