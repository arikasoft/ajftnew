import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  cookies,
} from "next/headers";

import connectDB from "@/lib/mongodb";

export const dynamic =
  "force-dynamic";

type NewsStatus =
  | "draft"
  | "published";

/* =========================================================
   NEWS ADMIN AUTHENTICATION
========================================================= */

async function isNewsAdminAuthenticated() {
  const cookieStore =
    await cookies();

  const session =
    cookieStore.get(
      "ajft_news_admin"
    )?.value;

  return (
    session === "authenticated"
  );
}

/* =========================================================
   GET NEWS
   PUBLIC ACCESS
========================================================= */

export async function GET(
  request: NextRequest
) {
  try {
    await connectDB();

    const { default: News } =
      await import(
        "@/models/News"
      );

    const { searchParams } =
      new URL(
        request.url
      );

    const statusParam =
      searchParams.get(
        "status"
      ) || "published";

    const limitParam =
      searchParams.get(
        "limit"
      ) || "50";

    const requestedLimit =
      Number(
        limitParam
      );

    const limit =
      Math.min(
        Math.max(
          Number.isFinite(
            requestedLimit
          )
            ? requestedLimit
            : 50,
          1
        ),
        200
      );

    /* =====================================
       STRICT STATUS VALIDATION
    ===================================== */

    let query: {
      status?: NewsStatus;
    } = {};

    if (
      statusParam === "draft" ||
      statusParam === "published"
    ) {
      query.status =
        statusParam;
    }

    /*
      status=all
      Empty query returns all news.
    */

    const news =
      await News.find(
        query
      )
        .sort({
          featured: -1,
          important: -1,
          publishedAt: -1,
          createdAt: -1,
        })
        .limit(
          limit
        )
        .lean();

    return NextResponse.json(
      {
        success: true,

        count:
          news.length,

        data:
          news,
      }
    );
  } catch (error) {
    console.error(
      "GET NEWS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to load news.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   CREATE NEWS
   ADMIN ONLY
========================================================= */

export async function POST(
  request: NextRequest
) {
  /* =====================================
     AUTHENTICATION CHECK
  ===================================== */

  const authenticated =
    await isNewsAdminAuthenticated();

  if (!authenticated) {
    return NextResponse.json(
      {
        success: false,

        message:
          "Unauthorized access. Please login as News Administrator.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    await connectDB();

    const { default: News } =
      await import(
        "@/models/News"
      );

    const body =
      await request.json();

    /* =====================================
       SANITIZE INPUT
    ===================================== */

    const title =
      typeof body.title ===
      "string"
        ? body.title.trim()
        : "";

    const slug =
      typeof body.slug ===
      "string"
        ? body.slug
            .trim()
            .toLowerCase()
        : "";

    const excerpt =
      typeof body.excerpt ===
      "string"
        ? body.excerpt.trim()
        : "";

    const content =
      typeof body.content ===
      "string"
        ? body.content.trim()
        : "";

    const category =
      typeof body.category ===
        "string" &&
      body.category.trim()
        ? body.category.trim()
        : "General";

    const image =
      typeof body.image ===
      "string"
        ? body.image.trim()
        : "";

    const author =
      typeof body.author ===
        "string" &&
      body.author.trim()
        ? body.author.trim()
        : "AJFT Team";

    const featured =
      body.featured === true;

    const important =
      body.important === true;

    const status: NewsStatus =
      body.status ===
      "published"
        ? "published"
        : "draft";

    /* =====================================
       VALIDATION
    ===================================== */

    if (!title) {
      return NextResponse.json(
        {
          success: false,

          message:
            "News title is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!slug) {
      return NextResponse.json(
        {
          success: false,

          message:
            "News URL slug is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!excerpt) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Short summary is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!content) {
      return NextResponse.json(
        {
          success: false,

          message:
            "News content is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================
       VALIDATE SLUG FORMAT
    ===================================== */

    const slugPattern =
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

    if (
      !slugPattern.test(
        slug
      )
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Slug may contain only lowercase letters, numbers and hyphens.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================
       DUPLICATE SLUG CHECK
    ===================================== */

    const existingNews =
      await News.findOne({
        slug,
      }).lean();

    if (existingNews) {
      return NextResponse.json(
        {
          success: false,

          message:
            "This news URL slug already exists. Please use another slug.",
        },
        {
          status: 409,
        }
      );
    }

    /* =====================================
       CREATE NEWS
    ===================================== */

    const news =
      await News.create({
        title,

        slug,

        excerpt,

        content,

        category,

        image,

        author,

        featured,

        important,

        status,

        publishedAt:
          status ===
          "published"
            ? new Date()
            : null,
      });

    return NextResponse.json(
      {
        success: true,

        message:
          status ===
          "published"
            ? "News published successfully."
            : "News saved as draft successfully.",

        data:
          news,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE NEWS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to create news.",
      },
      {
        status: 500,
      }
    );
  }
}