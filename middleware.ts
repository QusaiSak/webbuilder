import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This middleware provides a simple route protection system
// When Clerk is properly installed, you should import { authMiddleware } from "@clerk/nextjs"
export default function middleware(request: NextRequest) {
  // Public routes that don't require authentication
  const publicRoutes = ["/", "/api/webhook"];
  const path = request.nextUrl.pathname;
  
  // If it's a public route, allow access
  if (publicRoutes.includes(path) || path.startsWith("/_next") || path.includes(".")) {
    return NextResponse.next();
  }

  // Check for authentication (simplified version)
  // In a real implementation with Clerk installed, you would use authMiddleware
  // or check for authentication cookies/headers
  const authCookie = request.cookies.get("__session");
  
  // If no auth cookie is present and this is a protected route,
  // redirect to the home page
  if (!authCookie && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except those that start with:
    // - _next
    // - static files (files with an extension)
    "/((?!_next/|.*\\..*).*)",
    // Match API routes
    "/api/:path*",
  ],
}; 