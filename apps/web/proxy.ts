import { NextResponse, type NextRequest } from "next/server";

const challenge = () =>
  new NextResponse("Authentication required", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="admin"' } });

async function sha256(s: string): Promise<string> {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Buffer.from(d).toString("hex");
}

// /admin needs HTTP Basic auth with any user name and ADMIN_PASSWORD.
// Comparing digests keeps the comparison time independent of the password.
export async function proxy(req: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return new NextResponse("Admin is disabled: ADMIN_PASSWORD is not set", { status: 503 });
  const header = req.headers.get("authorization") ?? "";
  if (!header.startsWith("Basic ")) return challenge();
  const decoded = Buffer.from(header.slice(6), "base64").toString();
  const given = decoded.slice(decoded.indexOf(":") + 1);
  if ((await sha256(given)) !== (await sha256(password))) return challenge();
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/admin"] };
