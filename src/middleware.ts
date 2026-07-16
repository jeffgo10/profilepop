import { NextRequest, NextResponse } from "next/server";

function unauthorized(): NextResponse {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="ProfilePop", charset="UTF-8"',
    },
  });
}

export function middleware(request: NextRequest) {
  const password = process.env.SITE_PASSWORD;

  // Allow local next dev without a password; production must set SITE_PASSWORD.
  if (!password) {
    return NextResponse.next();
  }

  const username = process.env.SITE_USERNAME ?? "portfolio";
  const header = request.headers.get("authorization");

  if (!header?.startsWith("Basic ")) {
    return unauthorized();
  }

  let decoded: string;
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized();
  }

  const separator = decoded.indexOf(":");
  if (separator === -1) {
    return unauthorized();
  }

  const user = decoded.slice(0, separator);
  const pass = decoded.slice(separator + 1);

  if (user !== username || pass !== password) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
