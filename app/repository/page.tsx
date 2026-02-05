'use client';

import { AppShell } from "@/components/app-shell";
import { Header } from "@/components/header";
import { RepositoryManager } from "@/components/repository/repository-manager";

export default function RepositoryPage() {
  const handleAddScript = () => {
    console.log("[v0] Add new script");
  };

  const handleEditScript = (script: any) => {
    console.log("[v0] Edit script:", script.id);
  };

  const handleDeleteScript = (id: string) => {
    console.log("[v0] Delete script:", id);
  };

  const handleTestScript = (script: any) => {
    console.log("[v0] Test script:", script.id);
  };

  const handleAddAPI = () => {
    console.log("[v0] Add new outbound API");
  };

  const handleEditAPI = (api: any) => {
    console.log("[v0] Edit API:", api.id);
  };

  const handleDeleteAPI = (id: string) => {
    console.log("[v0] Delete API:", id);
  };

  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto p-6 bg-background">
          <div className="space-y-6 pb-12">
            <RepositoryManager
              onAddScript={handleAddScript}
              onEditScript={handleEditScript}
              onDeleteScript={handleDeleteScript}
              onTestScript={handleTestScript}
              onAddAPI={handleAddAPI}
              onEditAPI={handleEditAPI}
              onDeleteAPI={handleDeleteAPI}
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
