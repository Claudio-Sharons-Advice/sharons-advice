// middleware.ts
import { NextResponse } from "next/server";

export function middleware(req: Request) {
  // allow Next assets/APIs to pass if you want (optional)
  const url = new URL(req.url);
  const isAsset = url.pathname.startsWith("/_next") || url.pathname.startsWith("/favicon");
  if (isAsset) return NextResponse.next();

  const auth = process.env.BASIC_AUTH || ""; // format: user:pass
  if (!auth) return NextResponse.next(); // if unset, no auth

  const header = (req.headers.get("authorization") || "").split(" ")[1] || "";
  const [user, pass] = Buffer.from(header, "base64").toString().split(":");
  const [u, p] = auth.split(":");

  if (user === u && pass === p) return NextResponse.next();

  return new Response("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Sharon\'s Advice (private)"' },
  });
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"], // protect everything except Next's internals
};
