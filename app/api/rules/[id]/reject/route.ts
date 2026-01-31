import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ruleId = params.id;
    const body = await request.json();
    const { reason } = body;

    if (!reason || typeof reason !== "string") {
      return NextResponse.json(
        { error: "Rejection reason is required" },
        { status: 400 }
      );
    }

    // TODO: Add authentication check - verify user is super admin
    // const user = await getCurrentUser();
    // if (user.role !== "super_admin") {
    //   return NextResponse.json(
    //     { error: "Unauthorized" },
    //     { status: 403 }
    //   );
    // }

    // TODO: Update database
    // const rule = await db.rules.update({
    //   where: { id: ruleId },
    //   data: {
    //     approvalStatus: "rejected",
    //     rejectedBy: user.id,
    //     rejectionReason: reason,
    //     rejectedAt: new Date(),
    //   },
    // });

    // TODO: Send notification to rule creator
    // await sendNotification({
    //   userId: rule.createdBy,
    //   type: "rule_rejected",
    //   title: `Your rule "${rule.name}" has been rejected`,
    //   message: `Reason: ${reason}`,
    // });

    return NextResponse.json({
      success: true,
      message: "Rule rejected successfully",
      ruleId,
      rejectionReason: reason,
    });
  } catch (error) {
    console.error("Error rejecting rule:", error);
    return NextResponse.json(
      { error: "Failed to reject rule" },
      { status: 500 }
    );
  }
}
