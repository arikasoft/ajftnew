import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  cookies,
} from "next/headers";

import {
  ObjectId,
} from "mongodb";

import connectDB from "@/lib/mongodb";

export const dynamic =
  "force-dynamic";

type NewsStatus =
  | "draft"
  | "published";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

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
   GET SINGLE NEWS
   PUBLIC ACCESS
========================================================= */

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } =
      await context.params;

    if (
      !ObjectId.isValid(
        id
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid news ID.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const { default: News } =
      await import(
        "@/models/News"
      );

    const news =
      await News.findById(
        id
      ).lean();

    if (!news) {
      return NextResponse.json(
        {
          success: false,
          message:
            "News not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error(
      "GET SINGLE NEWS ERROR:",
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
   UPDATE NEWS
   ADMIN ONLY
========================================================= */

export async function PUT(
  request: NextRequest,
  context: RouteContext
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
    const { id } =
      await context.params;

    if (
      !ObjectId.isValid(
        id
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid news ID.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const { default: News } =
      await import(
        "@/models/News"
      );

    const body =
      await request.json();

    const existingNews =
      await News.findById(
        id
      );

    if (!existingNews) {
      return NextResponse.json(
        {
          success: false,
          message:
            "News not found.",
        },
        {
          status: 404,
        }
      );
    }

    /* =====================================
       SANITIZE INPUT
    ===================================== */

    const title =
      typeof body.title ===
      "string"
        ? body.title.trim()
        : existingNews.title;

    const slug =
      typeof body.slug ===
      "string"
        ? body.slug
            .trim()
            .toLowerCase()
        : existingNews.slug;

    const excerpt =
      typeof body.excerpt ===
      "string"
        ? body.excerpt.trim()
        : existingNews.excerpt;

    const content =
      typeof body.content ===
      "string"
        ? body.content.trim()
        : existingNews.content;

    const category =
      typeof body.category ===
        "string" &&
      body.category.trim()
        ? body.category.trim()
        : existingNews.category;

    const image =
      typeof body.image ===
      "string"
        ? body.image.trim()
        : existingNews.image;

    const author =
      typeof body.author ===
        "string" &&
      body.author.trim()
        ? body.author.trim()
        : existingNews.author;

    const featured =
      typeof body.featured ===
      "boolean"
        ? body.featured
        : existingNews.featured;

    const important =
      typeof body.important ===
      "boolean"
        ? body.important
        : existingNews.important;

    let status: NewsStatus =
      existingNews.status ===
      "published"
        ? "published"
        : "draft";

    if (
      body.status ===
        "published" ||
      body.status === "draft"
    ) {
      status =
        body.status;
    }

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
       SLUG FORMAT VALIDATION
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

    const duplicateNews =
      await News.findOne({
        slug,
        _id: {
          $ne: id,
        },
      }).lean();

    if (duplicateNews) {
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
       PUBLISHED DATE
    ===================================== */

    let publishedAt =
      existingNews.publishedAt;

    if (
      status === "published" &&
      !publishedAt
    ) {
      publishedAt =
        new Date();
    }

    if (
      status === "draft"
    ) {
      publishedAt =
        null;
    }

    /* =====================================
       UPDATE NEWS
    ===================================== */

    existingNews.title =
      title;

    existingNews.slug =
      slug;

    existingNews.excerpt =
      excerpt;

    existingNews.content =
      content;

    existingNews.category =
      category;

    existingNews.image =
      image;

    existingNews.author =
      author;

    existingNews.featured =
      featured;

    existingNews.important =
      important;

    existingNews.status =
      status;

    existingNews.publishedAt =
      publishedAt;

    await existingNews.save();

    return NextResponse.json({
      success: true,
      message:
        "News updated successfully.",
      data:
        existingNews,
    });
  } catch (error) {
    console.error(
      "UPDATE NEWS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to update news.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   DELETE NEWS
   ADMIN ONLY
========================================================= */

export async function DELETE(
  request: NextRequest,
  context: RouteContext
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
    const { id } =
      await context.params;

    if (
      !ObjectId.isValid(
        id
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid news ID.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const { default: News } =
      await import(
        "@/models/News"
      );

    const news =
      await News.findByIdAndDelete(
        id
      );

    if (!news) {
      return NextResponse.json(
        {
          success: false,
          message:
            "News not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "News deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE NEWS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to delete news.",
      },
      {
        status: 500,
      }
    );
  }
}