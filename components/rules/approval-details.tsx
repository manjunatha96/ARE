'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Clock, AlertTriangle } from "lucide-react";
import { format } from "date-fns";

export type ApprovalStatus = "pending_approval" | "approved" | "rejected" | "draft";

interface ApprovalDetailsProps {
  status: ApprovalStatus;
  createdBy?: string;
  createdAt?: Date;
  approvedBy?: string;
  approvedAt?: Date;
  rejectionReason?: string;
  rejectedAt?: Date;
}

export function ApprovalDetails({
  status,
  createdBy,
  createdAt,
  approvedBy,
  approvedAt,
  rejectionReason,
  rejectedAt,
}: ApprovalDetailsProps) {
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
      </CardContent>
    </Card>
  );
}

// Add this import at the top of the file
import { Label } from "@/components/ui/label";
