import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import DivyangApplication from "@/models/DivyangApplication";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 0;

/* =========================================================
   STATUS DEFINITIONS
========================================================= */

const STATUS_GROUPS = {
  pending: [
    "pending",
    "submitted",
  ],

  underReview: [
    "under_review",
    "under review",
  ],

  approved: [
    "approved",
  ],

  rejected: [
    "rejected",
  ],

  completed: [
    "completed",
  ],
} as const;

/* =========================================================
   CREATE SAFE CASE-INSENSITIVE REGEX
========================================================= */

function createStatusRegex(
  values: readonly string[]
) {
  const escapedValues = values.map((value) =>
    value.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    )
  );

  return new RegExp(
    `^(${escapedValues.join("|")})$`,
    "i"
  );
}

/* =========================================================
   FORMAT STATUS
========================================================= */

function normalizeStatus(
  status: unknown
): string {
  if (
    !status ||
    typeof status !== "string"
  ) {
    return "unknown";
  }

  const value = status
    .trim()
    .toLowerCase();

  if (
    STATUS_GROUPS.pending.includes(
      value as "pending" | "submitted"
    )
  ) {
    return "pending";
  }

  if (
    STATUS_GROUPS.underReview.includes(
      value as
        | "under_review"
        | "under review"
    )
  ) {
    return "under_review";
  }

  if (value === "approved") {
    return "approved";
  }

  if (value === "rejected") {
    return "rejected";
  }

  if (value === "completed") {
    return "completed";
  }

  return value;
}

/* =========================================================
   CALCULATE PERCENTAGE
========================================================= */

function calculatePercentage(
  value: number,
  total: number
): number {
  if (!total || total <= 0) {
    return 0;
  }

  return Number(
    ((value / total) * 100).toFixed(1)
  );
}

/* =========================================================
   GET DASHBOARD
========================================================= */

export async function GET() {
  try {
    /* =====================================================
       CONNECT DATABASE
    ===================================================== */

    await connectDB();

    /* =====================================================
       STATUS QUERIES
    ===================================================== */

    const pendingQuery = {
      status: {
        $regex: createStatusRegex(
          STATUS_GROUPS.pending
        ),
      },
    };

    const underReviewQuery = {
      status: {
        $regex: createStatusRegex(
          STATUS_GROUPS.underReview
        ),
      },
    };

    const approvedQuery = {
      status: {
        $regex: createStatusRegex(
          STATUS_GROUPS.approved
        ),
      },
    };

    const rejectedQuery = {
      status: {
        $regex: createStatusRegex(
          STATUS_GROUPS.rejected
        ),
      },
    };

    const completedQuery = {
      status: {
        $regex: createStatusRegex(
          STATUS_GROUPS.completed
        ),
      },
    };

    /* =====================================================
       FETCH DASHBOARD DATA
    ===================================================== */

    const [
      total,

      pending,

      underReview,

      approved,

      rejected,

      completed,

      recentApplications,

      latestApplication,

      applicationsByState,

      applicationsByDisability,
    ] = await Promise.all([
      /* TOTAL APPLICATIONS */

      DivyangApplication.countDocuments(),

      /* PENDING */

      DivyangApplication.countDocuments(
        pendingQuery
      ),

      /* UNDER REVIEW */

      DivyangApplication.countDocuments(
        underReviewQuery
      ),

      /* APPROVED */

      DivyangApplication.countDocuments(
        approvedQuery
      ),

      /* REJECTED */

      DivyangApplication.countDocuments(
        rejectedQuery
      ),

      /* COMPLETED */

      DivyangApplication.countDocuments(
        completedQuery
      ),

      /* RECENT APPLICATIONS */

      DivyangApplication.find({})
        .sort({
          createdAt: -1,
        })
        .limit(10)
        .select({
          _id: 1,

          applicationId: 1,

          fullName: 1,

          mobile: 1,

          disabilityType: 1,

          district: 1,

          state: 1,

          status: 1,

          createdAt: 1,

          updatedAt: 1,
        })
        .lean(),

      /* LATEST APPLICATION */

      DivyangApplication.findOne({})
        .sort({
          createdAt: -1,
        })
        .select({
          _id: 1,

          applicationId: 1,

          fullName: 1,

          mobile: 1,

          status: 1,

          createdAt: 1,
        })
        .lean(),

      /* APPLICATIONS BY STATE */

      DivyangApplication.aggregate([
        {
          $group: {
            _id: {
              $ifNull: [
                "$state",
                "Not Specified",
              ],
            },

            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            count: -1,
          },
        },

        {
          $limit: 10,
        },
      ]),

      /* APPLICATIONS BY DISABILITY */

      DivyangApplication.aggregate([
        {
          $group: {
            _id: {
              $ifNull: [
                "$disabilityType",
                "Not Specified",
              ],
            },

            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            count: -1,
          },
        },

        {
          $limit: 10,
        },
      ]),
    ]);

    /* =====================================================
       CALCULATED STATISTICS
    ===================================================== */

    const processing =
      pending +
      underReview;

    const decisionMade =
      approved +
      rejected +
      completed;

    const categorizedTotal =
      pending +
      underReview +
      approved +
      rejected +
      completed;

    const uncategorized =
      Math.max(
        0,
        total - categorizedTotal
      );

    /* =====================================================
       PERCENTAGES
    ===================================================== */

    const percentages = {
      pending: calculatePercentage(
        pending,
        total
      ),

      underReview: calculatePercentage(
        underReview,
        total
      ),

      approved: calculatePercentage(
        approved,
        total
      ),

      rejected: calculatePercentage(
        rejected,
        total
      ),

      completed: calculatePercentage(
        completed,
        total
      ),

      processing: calculatePercentage(
        processing,
        total
      ),

      decisionMade: calculatePercentage(
        decisionMade,
        total
      ),
    };

    /* =====================================================
       NORMALIZE RECENT APPLICATION STATUS
    ===================================================== */

    const normalizedRecentApplications =
      recentApplications.map(
        (application) => ({
          ...application,

          status: normalizeStatus(
            application.status
          ),
        })
      );

    /* =====================================================
       NORMALIZE LATEST APPLICATION
    ===================================================== */

    const normalizedLatestApplication =
      latestApplication
        ? {
            ...latestApplication,

            status: normalizeStatus(
              latestApplication.status
            ),
          }
        : null;

    /* =====================================================
       FORMAT STATE STATISTICS
    ===================================================== */

    const stateStatistics =
      applicationsByState.map((item) => ({
        state:
          item._id ||
          "Not Specified",

        count:
          item.count || 0,

        percentage:
          calculatePercentage(
            item.count || 0,
            total
          ),
      }));

    /* =====================================================
       FORMAT DISABILITY STATISTICS
    ===================================================== */

    const disabilityStatistics =
      applicationsByDisability.map(
        (item) => ({
          disabilityType:
            item._id ||
            "Not Specified",

          count:
            item.count || 0,

          percentage:
            calculatePercentage(
              item.count || 0,
              total
            ),
        })
      );

    /* =====================================================
       SUCCESS RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Divyang dashboard loaded successfully.",

        data: {
          /* ===============================================
             DASHBOARD SUMMARY
          =============================================== */

          summary: {
            total,

            pending,

            underReview,

            approved,

            rejected,

            completed,

            processing,

            decisionMade,

            uncategorized,
          },

          /* ===============================================
             PERCENTAGES
          =============================================== */

          percentages,

          /* ===============================================
             LATEST APPLICATION
          =============================================== */

          latestApplication:
            normalizedLatestApplication,

          /* ===============================================
             RECENT APPLICATIONS
          =============================================== */

          recentApplications:
            normalizedRecentApplications,

          /* ===============================================
             ANALYTICS
          =============================================== */

          analytics: {
            byState:
              stateStatistics,

            byDisability:
              disabilityStatistics,

            statusDistribution: {
              pending: {
                count: pending,

                percentage:
                  percentages.pending,
              },

              underReview: {
                count: underReview,

                percentage:
                  percentages.underReview,
              },

              approved: {
                count: approved,

                percentage:
                  percentages.approved,
              },

              rejected: {
                count: rejected,

                percentage:
                  percentages.rejected,
              },

              completed: {
                count: completed,

                percentage:
                  percentages.completed,
              },

              uncategorized: {
                count:
                  uncategorized,

                percentage:
                  calculatePercentage(
                    uncategorized,
                    total
                  ),
              },
            },
          },

          /* ===============================================
             API INFORMATION
          =============================================== */

          generatedAt:
            new Date().toISOString(),
        },
      },
      {
        status: 200,

        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, max-age=0",

          Pragma:
            "no-cache",

          Expires:
            "0",
        },
      }
    );
  } catch (error) {
    console.error(
      "================================================"
    );

    console.error(
      "DIVYANG ADMIN DASHBOARD ERROR"
    );

    console.error(error);

    console.error(
      "================================================"
    );

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unable to load Divyang dashboard.";

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to load Divyang dashboard.",

        error:
          process.env.NODE_ENV ===
          "development"
            ? errorMessage
            : undefined,
      },
      {
        status: 500,

        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  }
}