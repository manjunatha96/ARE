'use client';

import { useState } from "react"

import { Label } from "@/components/ui/label"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Clock, AlertTriangle, Check, X } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export type ApprovalStatus = "pending_approval" | "approved" | "rejected" | "draft";

interface ApprovalDetailsProps {
  ruleId: string;
  status: ApprovalStatus;
  createdBy?: string;
  createdAt?: Date;
  approvedBy?: string;
  approvedAt?: Date;
  rejectionReason?: string;
  rejectedAt?: Date;
  isSuperAdmin?: boolean;
  onApprovalStatusChange?: (newStatus: ApprovalStatus) => void;
}

export function ApprovalDetails({
  ruleId,
  status,
  createdBy,
  createdAt,
  approvedBy,
  approvedAt,
  rejectionReason,
  rejectedAt,
  isSuperAdmin = false,
  onApprovalStatusChange,
}: ApprovalDetailsProps) {
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectionComment, setRejectionComment] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      const response = await fetch(`/api/rules/${ruleId}/approve`, {
        method: "POST",
      });
      if (response.ok) {
        onApprovalStatusChange?.("approved");
      }
    } catch (error) {
      console.error("[v0] Approval error:", error);
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionComment.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }
    setIsRejecting(true);
    try {
      const response = await fetch(`/api/rules/${ruleId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: rejectionComment }),
      });
      if (response.ok) {
        onApprovalStatusChange?.("rejected");
        setShowRejectDialog(false);
        setRejectionComment("");
      }
    } catch (error) {
      console.error("[v0] Rejection error:", error);
    } finally {
      setIsRejecting(false);
    }
  };
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Approval Information</CardTitle>
        <CardDescription>Rule creation and approval timeline</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Section */}
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">Current Status</Label>
            <div className="flex items-center gap-2">
              {status === "pending_approval" && (
                <>
                  <Clock className="h-5 w-5 text-amber-600" />
                  <span className="text-sm font-medium text-foreground">Pending Approval</span>
                </>
              )}
              {status === "approved" && (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-foreground">Approved</span>
                </>
              )}
              {status === "rejected" && (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="text-sm font-medium text-foreground">Rejected</span>
                </>
              )}
              {status === "draft" && (
                <>
                  <AlertTriangle className="h-5 w-5 text-slate-600" />
                  <span className="text-sm font-medium text-foreground">Draft</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Created By */}
        {createdBy && createdAt && (
          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-semibold text-foreground mb-3">Created</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created By:</span>
                <span className="font-medium text-foreground">{createdBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created On:</span>
                <span className="font-medium text-foreground">{format(new Date(createdAt), "PPpp")}</span>
              </div>
            </div>
          </div>
        )}

        {/* Approved Section */}
        {status === "approved" && approvedBy && approvedAt && (
          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-semibold text-green-700 mb-3">Approved</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Approved By:</span>
                <span className="font-medium text-foreground">{approvedBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Approved On:</span>
                <span className="font-medium text-foreground">{format(new Date(approvedAt), "PPpp")}</span>
              </div>
            </div>
          </div>
        )}

        {/* Rejected Section */}
        {status === "rejected" && rejectionReason && (
          <div className="border-t border-border pt-4">
            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <div className="font-medium text-red-900">Rejection Reason</div>
                  <div className="text-red-800 text-sm">{rejectionReason}</div>
                  {rejectedAt && (
                    <div className="text-xs text-red-700 pt-2">
                      Rejected on: {format(new Date(rejectedAt), "PPpp")}
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Pending Approval Info */}
        {status === "pending_approval" && (
          <Alert className="bg-amber-50 border-amber-200">
            <Clock className="h-4 w-4" />
            <AlertDescription className="text-amber-800">
              This rule is awaiting approval from a Super Admin before it can be executed. You will receive a notification once it is reviewed.
            </AlertDescription>
          </Alert>
        )}

        {/* Super Admin Approval Actions */}
        {isSuperAdmin && status === "pending_approval" && (
          <div className="border-t border-border pt-4 space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Admin Actions</h4>
            <div className="flex gap-3">
              <Button
                onClick={handleApprove}
                disabled={isApproving}
                className="gap-2 flex-1"
              >
                <Check className="h-4 w-4" />
                {isApproving ? "Approving..." : "Approve Rule"}
              </Button>

              <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="gap-2 flex-1"
                    disabled={isRejecting}
                  >
                    <X className="h-4 w-4" />
                    Reject Rule
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reject Rule</DialogTitle>
                    <DialogDescription>
                      Provide feedback on why this rule is being rejected. The creator will use this to make improvements.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="rejection-reason" className="text-foreground">
                        Rejection Reason
                      </Label>
                      <Textarea
                        id="rejection-reason"
                        placeholder="Explain why this rule cannot be approved (e.g., unclear conditions, resource limits, security concerns)..."
                        value={rejectionComment}
                        onChange={(e) => setRejectionComment(e.target.value)}
                        className="bg-background min-h-24"
                      />
                    </div>
                    <div className="flex gap-3 justify-end">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowRejectDialog(false);
                          setRejectionComment("");
                        }}
                        className="bg-transparent"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleReject}
                        disabled={isRejecting || !rejectionComment.trim()}
                      >
                        {isRejecting ? "Rejecting..." : "Confirm Rejection"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
