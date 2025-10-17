import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

// Route pubbliche che non richiedono autenticazione
const publicRoutes = ["/", "/login", "/api/auth", "/blog"];

export async function middleware(request: NextRequest) {
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

  // Verifica la sessione server-side usando Better Auth
  try {
    // Crea una Request standard per Better Auth usando l'URL e gli headers originali
    const requestForAuth = new Request(request.url, {
      headers: request.headers,
      method: request.method,
    });

    const session = await auth.api.getSession({
      headers: requestForAuth.headers,
    });

    // Better Auth restituisce un oggetto con { session, user } o null
    // Se non c'è sessione valida, reindirizza al login
    if (!session || !session.session) {
      console.log("No valid session found, redirecting to /login");
      const url = new URL("/login", request.url);
      return NextResponse.redirect(url);
    }
  } catch (error) {
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
