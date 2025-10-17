import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Route pubbliche che non richiedono autenticazione
const publicRoutes = ["/login", "/api/auth"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permetti l'accesso alle route pubbliche
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Permetti l'accesso alle route statiche di Next.js
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Verifica se c'è un cookie di sessione
  const sessionToken = request.cookies.get("better-auth.session_token");

  // Se non c'è sessione, reindirizza al login
  if (!sessionToken && pathname !== "/") {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
