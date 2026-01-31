import { ApprovalDashboard } from "@/components/admin/approval-dashboard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Rule Approvals",
  description: "Review and approve pending rules",
};

// Mock data - replace with real data from database
const pendingRules = [
  {
    id: "6",
    name: "Service Health Check",
    description: "Restart unhealthy services automatically with retry mechanism. This rule monitors service status every 30 seconds.",
    priority: "critical" as const,
    createdBy: "alice.johnson@company.com",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: "8",
    name: "Auto Backup Trigger",
    description: "Create automatic backups when disk changes exceed 500MB",
    priority: "high" as const,
    createdBy: "bob.smith@company.com",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: "9",
    name: "Load Balancer Health Monitor",
    description: "Monitor load balancer health and auto-recover on failure",
    priority: "high" as const,
    createdBy: "carol.white@company.com",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    id: "10",
    name: "Database Query Optimizer",
    description: "Automatically optimize slow queries and index management",
    priority: "medium" as const,
    createdBy: "david.brown@company.com",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
];

async function handleApprove(ruleId: string) {
  "use server";
  console.log("Approving rule:", ruleId);
  // Update database
}

async function handleReject(ruleId: string, reason: string) {
  "use server";
  console.log("Rejecting rule:", ruleId, "Reason:", reason);
  // Update database
}

export default function ApprovalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/rules">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rule Approvals</h1>
          <p className="text-muted-foreground mt-1">Review and approve pending rules from team members</p>
        </div>
      </div>

      <ApprovalDashboard 
        pendingRules={pendingRules}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
