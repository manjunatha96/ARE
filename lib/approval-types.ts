export type ApprovalStatus = "pending_approval" | "approved" | "rejected" | "draft";

export interface RuleApprovalInfo {
  approvalStatus: ApprovalStatus;
  createdBy: string;
  createdAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
  rejectedBy?: string;
  rejectionReason?: string;
  rejectedAt?: Date;
  submittedForApprovalAt?: Date;
}

export interface Rule extends RuleApprovalInfo {
  id: string;
  name: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "active" | "inactive" | "draft";
  conditions: any;
  remediationSteps: any[];
  verificationEnabled: boolean;
  verificationSteps?: any[];
  notificationsEnabled: boolean;
  silenceEnabled: boolean;
  silenceDuration: string;
  silenceUnit: "minutes" | "hours" | "days";
}

export interface ApprovalEvent {
  type: "created" | "submitted_for_approval" | "approved" | "rejected" | "resubmitted";
  ruleId: string;
  userId: string;
  timestamp: Date;
  metadata?: {
    rejectionReason?: string;
    previousStatus?: ApprovalStatus;
  };
}
