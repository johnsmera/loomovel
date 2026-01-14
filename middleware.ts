import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("pathname", pathname);
  const authCookie = request.cookies.get("auth");


  // Se for a rota "/" ou "/login" e tiver cookie de autenticação, redirecionar para dash
  if ((pathname === "/" || pathname === "/login") && authCookie) {
    console.log("authCookie", authCookie);
    const dashUrl = new URL("/dash", request.url);
    return NextResponse.redirect(dashUrl);
  }
  
  // Proteger todas as rotas que começam com /dash
  if (pathname.startsWith("/dash")) {
    // Se não tiver cookie de autenticação, redirecionar para login
    if (!authCookie) {
      const loginUrl = new URL("/", request.url);
      return NextResponse.redirect(loginUrl);
    }

  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dash/:path*"],
};
