// This file contains configuration for Clerk

export const clerkConfig = {
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
  
  // Allowed redirect URLs after authentication
  redirectUrls: [
    "/",
    "/dashboard",
    "/sso-callback"
  ],
  
  // Authentication configuration
  authConfig: {
    // Public routes that don't require authentication
    publicRoutes: ["/", "/api/webhook"],
  }
};

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 