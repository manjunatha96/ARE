"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Header } from "@/components/header";
import { NodeProfileList } from "@/components/node-profile/node-profile-list";
import { NodeProfileForm } from "@/components/node-profile/node-profile-form";
import { NodeProfileStats } from "@/components/node-profile/node-profile-stats";
import { NodeProfileActivity } from "@/components/node-profile/node-profile-activity";
import { PageAuditLog, type AuditLog } from "@/components/page-audit-log";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Download } from "lucide-react";

interface NodeProfile {
  id: string;
  name: string;
  description: string;
  allowedIPs: string[];
  authRequired: boolean;
  isActive: boolean;
  lastModified: string;
}

const auditLogs: AuditLog[] = [
  {
    id: "1",
    action: "Profile Created",
    user: "Admin",
    timestamp: "2024-01-15 14:30:00",
    details: "Created new node profile: Production Servers",
    status: "success",
    module: "Node Profiles",
  },
  {
    id: "2",
    action: "Profile Updated",
    user: "John Doe",
    timestamp: "2024-01-15 12:15:00",
    details: "Updated IP whitelist for Staging profile",
    status: "success",
    module: "Node Profiles",
  },
  {
    id: "3",
    action: "Profile Disabled",
    user: "Admin",
    timestamp: "2024-01-14 16:45:00",
    details: "Disabled Legacy profile",
    status: "success",
    module: "Node Profiles",
  },
];

export default function NodeProfilesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<NodeProfile | null>(null);

  const handleAddProfile = () => {
    console.log("[v0] Add new node profile");
    setEditingProfile(null);
    setIsFormOpen(true);
  };

  const handleEditProfile = (profile: NodeProfile) => {
    console.log("[v0] Edit profile:", profile.id);
    setEditingProfile(profile);
    setIsFormOpen(true);
  };

  const handleDeleteProfile = (id: string) => {
    console.log("[v0] Delete profile:", id);
  };

  const handleSave = (profile: Partial<NodeProfile>) => {
    console.log("[v0] Saving profile:", profile);
    setIsFormOpen(false);
    setEditingProfile(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingProfile(null);
  };

  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <Header
          title="Node Profiles"
          description="Define and manage node profiles that control how incoming events are accepted and validated"
        />
        <div className="flex-1 overflow-auto p-6 bg-background">
          <div className="space-y-6 pb-12 max-w-7xl mx-auto">
            {/* Audit Log Button - At Top */}
            <div className="flex justify-end">
              <PageAuditLog logs={auditLogs} pageTitle="Node Profiles" />
            </div>

            {/* Stats Cards */}
            <NodeProfileStats />

            {/* Quick Actions and Recent Activity Row */}
            {!isFormOpen && (
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground text-sm">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button 
                        onClick={handleAddProfile} 
                        className="w-full gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Create Profile
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full gap-2 bg-transparent"
                      >
                        <Download className="h-4 w-4" />
                        Export Profiles
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                <div className="lg:col-span-2">
                  <NodeProfileActivity />
                </div>
              </div>
            )}

            {/* Search Bar */}
            {!isFormOpen && (
              <div className="flex gap-2">
                <Input
                  placeholder="Search node profiles by name or description..."
                  className="bg-background"
                />
              </div>
            )}

            {isFormOpen ? (
              <NodeProfileForm
                profile={editingProfile}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <NodeProfileList
                onAdd={handleAddProfile}
                onEdit={handleEditProfile}
                onDelete={handleDeleteProfile}
              />
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
