import { cookies } from "next/headers";

export async function requireAdmin() {
  const cookieStore = await cookies();

  const sessionCookie =
    cookieStore.get("ajft_admin_session");

  if (!sessionCookie?.value) {
    return {
      authorized: false,
      admin: null,
    };
  }

  try {
    const admin = JSON.parse(
      sessionCookie.value
    );

    if (
      !admin?.id ||
      !admin?.email
    ) {
      return {
        authorized: false,
        admin: null,
      };
    }

    const allowedRoles = [
      "admin",
      "superadmin",
    ];

    if (
      !allowedRoles.includes(
        String(admin.role || "").toLowerCase()
      )
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
  } catch (error) {
    console.error(
      "ADMIN SESSION PARSE ERROR:",
      error
    );

    return {
      authorized: false,
      admin: null,
    };
  }
}