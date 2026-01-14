import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteger todas as rotas que começam com /dash
  if (pathname.startsWith("/dash")) {
    const authCookie = request.cookies.get("auth");

    // Se não tiver cookie de autenticação, redirecionar para login
    if (!authCookie) {
      const loginUrl = new URL("/", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dash/:path*",
};
