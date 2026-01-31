# Super Admin Rule Approval Guide

## Where to Find the Approval Buttons

### 1. **Main Navigation - Rule Approvals Link**
   - As a Super Admin, you'll see a new **"Rule Approvals"** section in the left sidebar
   - Located at the bottom under an "ADMIN" section separator
   - Click on **"Rule Approvals"** to access the approval dashboard
   - Navigation path: `/admin/approvals`

### 2. **Admin Approvals Dashboard**
   The dashboard shows:

   **Summary Statistics:**
   - Total pending rules awaiting approval
   - Critical priority rules count
   - Oldest pending rule (to prioritize review)

   **Pending Rules List:**
   - Rule name and description
   - Creator's name and creation date
   - Priority level
   - Status badge
   - Approval and Rejection buttons

### 3. **Approval Actions**

   #### **Approve a Rule**
   1. Navigate to `/admin/approvals`
   2. Find the rule you want to approve in the pending list
   3. Click the **"Approve"** button (green checkmark)
   4. The rule status changes to **"approved"**
   5. The rule can now be executed

   #### **Reject a Rule**
   1. Navigate to `/admin/approvals`
   2. Find the rule you want to reject
   3. Click the **"Reject"** button (red X)
   4. A dialog appears asking for rejection reason
   5. Enter your feedback/comment explaining why it was rejected
   6. Click **"Confirm Rejection"**
   7. The rule status changes to **"rejected"**
   8. The creator can see your rejection reason and resubmit

### 4. **Rule Details Page**
   You can also view approval details on individual rule pages:

   1. Go to **"Rule Engine"** → **"Rules"**
   2. Click on any rule name
   3. You'll see an **"Approval Information"** card showing:
      - Current approval status
      - Created by (user) and date
      - Approved by (user) and date (if approved)
      - Rejection reason and timestamp (if rejected)
      - Next steps based on status

### 5. **Tracking Rejections**

   **For Creators:**
   - When a rule is rejected, the creator can see:
     - The rejection reason in the rule details
     - An alert banner showing the feedback
     - Option to "Resubmit for Approval" after making changes

   **Dashboard View:**
   - Rule list shows rejection status clearly
   - Filter tab for "Rejected" rules
   - Rejection reasons visible on hover

### 6. **Rule Status Indicators**

   **On Rule List:**
   - 🔵 **Pending Approval** - Awaiting your review (yellow badge)
   - ✅ **Approved** - Rule approved and ready (green badge)
   - ❌ **Rejected** - Rule rejected with reason (red badge)
   - 📝 **Draft** - Not yet submitted for approval (gray badge)

### 7. **API Endpoints (For Developers)**

   **Approve Rule:**
   ```
   POST /api/rules/[id]/approve
   Body: { approvedBy: "admin-user-id" }
   ```

   **Reject Rule:**
   ```
   POST /api/rules/[id]/reject
   Body: {
     rejectedBy: "admin-user-id",
     rejectionReason: "Resource limits not properly defined"
   }
   ```

## Key Features

- ✅ Rules can only execute after approval
- ✅ Rejection reasons are captured and displayed
- ✅ Creators can resubmit after rejection
- ✅ Full approval audit trail maintained
- ✅ Dashboard shows all pending rules in one place
- ✅ Approval status visible in rule list and details
- ✅ Notifications can be configured for approval/rejection events

## Workflow Summary

```
Create Rule (Draft)
    ↓
Submit for Approval (Pending)
    ↓
Super Admin Reviews
    ├→ APPROVE → Can Execute
    └→ REJECT → Creator can Resubmit
         ↓
    Show Rejection Reason
         ↓
    Edit & Resubmit
```
