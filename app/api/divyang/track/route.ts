import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import DivyangApplication from "@/models/DivyangApplication";
import DivyangStatusHistory from "@/models/DivyangStatusHistory";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function normalizeMobile(value: string) {
  return value.replace(/\D/g, "").slice(-10);
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);

    const applicationId =
      searchParams.get("applicationId")?.trim().toUpperCase() || "";

    const mobile = normalizeMobile(searchParams.get("mobile") || "");

    if (!applicationId && !mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Application ID or mobile number is required.",
        },
        { status: 400 }
      );
    }

    const query = applicationId
      ? {
          $or: [
            { applicationId },
            { applicationNumber: applicationId },
            { uniqueId: applicationId },
          ],
        }
      : {
          $or: [
            { mobile },
            { phone: mobile },
            { applicantMobile: mobile },
          ],
        };

    const application = await DivyangApplication.findOne(query).lean();

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message: "No Divyang application found with the provided details.",
        },
        { status: 404 }
      );
    }

    const applicationObject = application as Record<string, unknown>;

    const dbApplicationId =
      applicationObject.applicationId ||
      applicationObject.applicationNumber ||
      applicationObject.uniqueId ||
      String(applicationObject._id);

    /*
     * Get complete status history.
     *
     * Different versions of the model may use applicationId,
     * applicationNumber or application MongoDB ID.
     */
    const history = await DivyangStatusHistory.find({
      $or: [
        { applicationId: dbApplicationId },
        { applicationId: String(applicationObject._id) },
        { applicationNumber: dbApplicationId },
        { applicationMongoId: String(applicationObject._id) },
      ],
    })
      .sort({
        createdAt: -1,
        updatedAt: -1,
      })
      .lean();

    const currentStatus =
      applicationObject.status ||
      applicationObject.applicationStatus ||
      "Submitted";

    const statusLabelMap: Record<string, string> = {
      submitted: "Application Submitted",
      received: "Application Received",
      pending: "Pending Review",
      under_review: "Under Review",
      review: "Under Review",
      documents_required: "Documents Required",
      document_pending: "Documents Pending",
      documents_verified: "Documents Verified",
      verification: "Verification in Progress",
      verified: "Verified",
      approved: "Approved",
      rejected: "Rejected",
      processing: "Processing",
      completed: "Completed",
      closed: "Closed",
    };

    const normalizedStatus = String(currentStatus)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_");

    const currentStatusLabel =
      statusLabelMap[normalizedStatus] ||
      String(currentStatus)
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

    /*
     * Build tracking timeline.
     */
    const timeline = history
      .map((item) => {
        const historyItem = item as unknown as Record<string, unknown>;

        const status =
          historyItem.status ||
          historyItem.newStatus ||
          historyItem.applicationStatus ||
          "Updated";

        return {
          id: String(historyItem._id),

          status,

          statusLabel:
            statusLabelMap[
              String(status)
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "_")
            ] ||
            String(status)
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase()),

          remarks:
            historyItem.remarks ||
            historyItem.message ||
            historyItem.note ||
            "",

          updatedBy:
            historyItem.updatedBy ||
            historyItem.actionBy ||
            "AJFT Administration",

          createdAt:
            historyItem.createdAt ||
            historyItem.updatedAt ||
            null,
        };
      })
      .reverse();

    /*
     * If no history exists, show application submission
     * as the first timeline event.
     */
    if (timeline.length === 0) {
      timeline.push({
        id: String(applicationObject._id),
        status: currentStatus,
        statusLabel: currentStatusLabel,
        remarks: "Application successfully submitted.",
        updatedBy: "System",
        createdAt:
          applicationObject.createdAt ||
          applicationObject.updatedAt ||
          null,
      });
    }

    return NextResponse.json(
      {
        success: true,

        message: "Application tracking details loaded successfully.",

        application: {
          id: String(applicationObject._id),

          applicationId: dbApplicationId,

          applicantName:
            applicationObject.fullName ||
            applicationObject.applicantName ||
            applicationObject.name ||
            "",

          fatherName:
            applicationObject.fatherName ||
            applicationObject.guardianName ||
            "",

          mobile:
            applicationObject.mobile ||
            applicationObject.phone ||
            applicationObject.applicantMobile ||
            "",

          email: applicationObject.email || "",

          district: applicationObject.district || "",

          state: applicationObject.state || "",

          disabilityType:
            applicationObject.disabilityType ||
            applicationObject.disability ||
            "",

          disabilityPercentage:
            applicationObject.disabilityPercentage ||
            applicationObject.disabilityPercent ||
            "",

          status: currentStatus,

          statusLabel: currentStatusLabel,

          submittedAt:
            applicationObject.createdAt ||
            applicationObject.submittedAt ||
            null,

          updatedAt:
            applicationObject.updatedAt ||
            null,
        },

        tracking: {
          currentStatus,
          currentStatusLabel,
          totalUpdates: timeline.length,
          history: timeline,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("DIVYANG TRACK API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to track your application at the moment. Please try again later.",
      },
      { status: 500 }
    );
  }
}