# Rule Approval Workflow System

## Overview
This document describes the complete approval workflow system for rules. Rules created by any user must be approved by a Super Admin before they can be executed.

## Approval Status States

### 1. **Draft** (`draft`)
- Initial state when a rule is created
- Rule can be edited freely by the creator
- Not yet submitted for approval
- Cannot execute

### 2. **Pending Approval** (`pending_approval`)
- Rule has been submitted for review by Super Admin
- Cannot be executed until approved
- Creator cannot make changes (locked)
- Super Admin receives notification for review

### 3. **Approved** (`approved`)
- Rule has been reviewed and approved by Super Admin
- Can now be executed
- Can be set to active/inactive status
- Creator receives approval notification

### 4. **Rejected** (`rejected`)
- Rule has been reviewed and rejected by Super Admin
- Includes detailed rejection reason/comments
- Creator receives rejection notification with reason
- Can be edited and resubmitted
- Cannot execute

## Key Features

### 1. Approval Status Badge
**Component:** `ApprovalStatusBadge`
- Visual indicator of current approval status
- Shows rejection reason on hover
- Used throughout the rule list and details pages

### 2. Approval Details Card
**Component:** `ApprovalDetails`
- Displays on rule detail page
- Shows:
  - Current approval status
  - Created by (user email) and date
  - Approved by (Super Admin email) and date (if approved)
  - Rejection reason and date (if rejected)
- Includes status-specific messages

### 3. Approval Dashboard
**Component:** `ApprovalDashboard`
**Page:** `/admin/approvals`
- Dedicated Super Admin interface for approving rules
- Summary cards showing:
  - Total pending approvals
  - Number of critical priority rules
  - Oldest pending rule (age in days)
- Full rule list with:
  - Rule name and description
  - Priority badge
  - Created by and date
  - Action buttons: View, Approve, Reject
- Reject dialog with:
  - Rule name and description
  - Text area for rejection reason
  - Confirmation button

### 4. Rule List Updates
**Component:** `RuleList`
- New "Approval Status" column showing:
  - Approval status badge
  - Rejection reason indicator
- Filter tabs for approval status:
  - All Rules
  - Pending Approval
  - Approved
  - Rejected
- Additional action: "Resubmit for Approval" for rejected rules

## User Workflows

### Creator Workflow
1. **Create Rule:** Navigate to `/rules/new` and create a rule
2. **Save as Draft:** Rule starts in `draft` status
3. **Submit for Approval:** Click "Submit for Approval" button (state changes to `pending_approval`)
4. **Wait for Review:** Rule appears in Super Admin approval dashboard
5. **Approval or Rejection:**
   - If approved: Rule becomes executable
   - If rejected: Review rejection reason and make corrections
6. **Resubmit (if rejected):** Edit rule and resubmit for approval

### Super Admin Workflow
1. **Access Approval Dashboard:** Navigate to `/admin/approvals`
2. **Review Pending Rules:** View all rules waiting for approval
3. **Review Rule Details:** Click "View" to see full rule configuration
4. **Approve Rule:** Click "Approve" button
   - Confirmation message shown
   - Rule creator receives notification
   - Rule status changes to `approved`
5. **Reject Rule:** Click "Reject" button
   - Modal opens for rejection reason
   - Enter detailed feedback/comments
   - Click "Confirm Rejection"
   - Rule creator receives notification with reason

## Database Schema

### Rules Table Fields
```
- id (primary key)
- name
- description
- priority (critical, high, medium, low)
- status (active, inactive, draft)
- approvalStatus (draft, pending_approval, approved, rejected)
- createdBy (user email/ID)
- createdAt (timestamp)
- approvedBy (user email/ID, nullable)
- approvedAt (timestamp, nullable)
- rejectedBy (user email/ID, nullable)
- rejectionReason (text, nullable)
- rejectedAt (timestamp, nullable)
- submittedForApprovalAt (timestamp, nullable)
- ... other rule config fields
```

## API Endpoints

### Approve Rule
```
POST /api/rules/[id]/approve
Request Body: {}
Response: { success: true, message: "Rule approved successfully", ruleId }
```

### Reject Rule
```
POST /api/rules/[id]/reject
Request Body: { reason: "string" }
Response: { success: true, message: "Rule rejected successfully", ruleId, rejectionReason }
```

## Components

### 1. ApprovalStatusBadge (`/components/rules/approval-status-badge.tsx`)
- Props:
  - `status: ApprovalStatus` - Current approval status
  - `rejectionReason?: string` - Optional rejection reason
- Displays color-coded badge with icon

### 2. ApprovalDetails (`/components/rules/approval-details.tsx`)
- Props:
  - `status: ApprovalStatus`
  - `createdBy?: string`
  - `createdAt?: Date`
  - `approvedBy?: string`
  - `approvedAt?: Date`
  - `rejectionReason?: string`
  - `rejectedAt?: Date`
- Shows detailed approval timeline and status

### 3. ApprovalDashboard (`/components/admin/approval-dashboard.tsx`)
- Props:
  - `pendingRules: PendingRule[]`
  - `onApprove: (ruleId: string) => void`
  - `onReject: (ruleId: string, reason: string) => void`
- Displays admin approval interface

## Pages

### Rule List Page (`/rules`)
- Updated with approval status column and filters
- Quick actions for pending and rejected rules

### Rule Details Page (`/rules/[id]`)
- Shows approval information card
- Displays approval timeline
- Shows rejection reason if applicable
- Warnings for non-approved rules

### Admin Approvals Page (`/admin/approvals`)
- Dedicated dashboard for Super Admins
- Summary statistics
- Pending rules list with actions
- Approval/rejection dialog

## Notifications
The following notifications should be sent:
1. **Rule Submitted for Approval** → Sent to Super Admins
2. **Rule Approved** → Sent to rule creator
3. **Rule Rejected** → Sent to rule creator with rejection reason

## Security Considerations

1. **Role-based Access Control**
   - Only Super Admins can approve/reject rules
   - `/admin/approvals` should be protected with Super Admin middleware

2. **Audit Trail**
   - All approval actions should be logged
   - Include: who approved/rejected, when, reason

3. **Rule Execution Prevention**
   - Rules with status other than `approved` cannot execute
   - Check approval status before any rule execution

## Integration Points

When implementing with your database:

1. **Save Rule with Approval Status:**
   - New rules default to `draft` status
   - Track `createdBy` with current user

2. **Update Rule for Approval:**
   - Change status to `pending_approval`
   - Record `submittedForApprovalAt`

3. **Approve Rule:**
   - Update status to `approved`
   - Record `approvedBy` and `approvedAt`
   - Clear any rejection reason data

4. **Reject Rule:**
   - Update status to `rejected`
   - Record `rejectionReason`, `rejectedBy`, `rejectedAt`

## Future Enhancements

1. **Bulk Approvals** - Approve multiple rules at once
2. **Approval History** - View all approval events for a rule
3. **Approval Workflows** - Custom approval chains/levels
4. **Comments** - Add comments to rules during review
5. **Scheduled Approvals** - Auto-approve after X days
6. **Approval Metrics** - Dashboard showing approval SLAs
