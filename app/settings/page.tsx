import { AppShell } from "@/components/app-shell";
import { Header } from "@/components/header";
import { SettingsNav } from "@/components/settings/settings-nav";
import { GeneralSettings } from "@/components/settings/general-settings";
import { SeverityMappingSettings } from "@/components/settings/severity-mapping-settings";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <Header
          title="Settings & Configuration"
          description="Manage global remediation settings and configurations"
        />
        <div className="flex-1 overflow-auto p-6 bg-background">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            <div className="shrink-0 lg:w-56">
              <SettingsNav />
            </div>
            <div className="flex-1 space-y-8 pb-12">
              <GeneralSettings />
              <SeverityMappingSettings />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
