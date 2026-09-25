import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Job from "@/models/Job";

function isAdmin(request: Request) {
  const cookieHeader =
    request.headers.get("cookie") || "";

  return cookieHeader.includes(
    "ajft_admin_session="
  );
}

export async function GET(
  request: Request
) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    const jobs = await Job.find({})
      .sort({
        createdAt: -1,
      })
      .lean();

    return NextResponse.json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Admin jobs GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load jobs.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: Request
) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const {
      jobId,
      title,
      slug,
      department,
      category,
      location,
      employmentType,
      vacancies,
      qualification,
      experience,
      ageLimit,
      salaryMin,
      salaryMax,
      salaryText,
      description,
      responsibilities,
      requirements,
      skills,
      lastDate,
      status,
      featured,
    } = body;

    if (
      !jobId ||
      !title ||
      !slug ||
      !lastDate
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Job ID, title, slug and last date are required.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const duplicate = await Job.findOne({
      $or: [
        {
          jobId: String(jobId).trim(),
        },
        {
          slug: String(slug)
            .trim()
            .toLowerCase(),
        },
      ],
    });

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Job ID or slug already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const job = await Job.create({
      jobId: String(jobId).trim(),

      title: String(title).trim(),

      slug: String(slug)
        .trim()
        .toLowerCase(),

      department:
        department || "",

      category:
        category || "General",

      location:
        location || "Darbhanga, Bihar",

      employmentType:
        employmentType || "Full Time",

      vacancies:
        Number(vacancies) || 1,

      qualification:
        qualification || "",

      experience:
        experience || "",

      ageLimit:
        ageLimit || "",

      salaryMin:
        Number(salaryMin) || 0,

      salaryMax:
        Number(salaryMax) || 0,

      salaryText:
        salaryText || "",

      description:
        description || "",

      responsibilities:
        Array.isArray(responsibilities)
          ? responsibilities
          : [],

      requirements:
        Array.isArray(requirements)
          ? requirements
          : [],

      skills:
        Array.isArray(skills)
          ? skills
          : [],

      lastDate:
        new Date(lastDate),

      status:
        status || "Draft",

      featured:
        Boolean(featured),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Job created successfully.",
        job,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Admin jobs POST error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create job.",
      },
      {
        status: 500,
      }
    );
  }
}