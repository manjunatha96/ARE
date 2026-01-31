'use client';

import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";

export type ApprovalStatus = "pending_approval" | "approved" | "rejected" | "draft";

interface ApprovalStatusBadgeProps {
  status: ApprovalStatus;
  rejectionReason?: string;
}

export function ApprovalStatusBadge({ status, rejectionReason }: ApprovalStatusBadgeProps) {
  const statusConfig = {
    pending_approval: {
      label: "Pending Approval",
      variant: "outline" as const,
      icon: Clock,
      color: "text-amber-600",
    },
    approved: {
      label: "Approved",
      variant: "default" as const,
      icon: CheckCircle2,
      color: "text-green-600",
    },
    rejected: {
      label: "Rejected",
      variant: "destructive" as const,
      icon: XCircle,
      color: "text-red-600",
    },
    draft: {
      label: "Draft",
      variant: "secondary" as const,
      icon: AlertCircle,
      color: "text-slate-600",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className={`h-3 w-3 ${config.color}`} />
        {config.label}
      </Badge>
      {status === "rejected" && rejectionReason && (
        <span className="text-xs text-muted-foreground cursor-help" title={rejectionReason}>
          💬 Comment available
        </span>
      )}
    </div>
  );
}
