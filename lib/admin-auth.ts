import { cookies } from "next/headers";

export async function requireAdmin() {
  const cookieStore = await cookies();

  const session =
    cookieStore.get(
      "ajft_admin_session"
    );

  if (!session?.value) {
    return {
      authorized: false,
      admin: null,
    };
  }

  try {
    const admin =
      JSON.parse(session.value);

    if (
      !admin?.id ||
      !admin?.email ||
      admin?.role !== "admin"
    ) {
      return {
        authorized: false,
        admin: null,
      };
    }

    return {
      authorized: true,
      admin,
    };
  } catch {
    return {
      authorized: false,
      admin: null,
    };
  }
}