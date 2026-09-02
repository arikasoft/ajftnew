import { cookies } from "next/headers";

export async function getStudentSession() {
  const cookieStore =
    await cookies();

  const studentId =
    cookieStore.get(
      "ajft_student_id"
    )?.value;

  if (!studentId) {
    return null;
  }

  return {
    studentId,
  };
}

export async function requireStudent() {
  const session =
    await getStudentSession();

  if (!session?.studentId) {
    throw new Error(
      "Student authentication required."
    );
  }

  return session;
}