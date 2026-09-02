import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
) {
  const participantId =
    request.cookies.get(
      "ajft_environment_participant_id"
    )?.value;

  return NextResponse.json({
    success: true,

    loggedIn: Boolean(
      participantId
    ),

    participantId:
      participantId || null,
  });
}