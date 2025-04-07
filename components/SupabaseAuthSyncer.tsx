"use client";

import { useAuth } from "@clerk/nextjs";// Adjust path if needed based on your structure
import { useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "@/configs/supabase";

function SupabaseAuthSyncer() {
  // @ts-ignore - Temp ignore for potential type mismatch
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted component

    const syncSupabaseSession = async () => {
      console.log("Sync triggered. IsSignedIn:", isSignedIn); // Debug log
      if (isSignedIn) {
        try {
          const token = await getToken({ template: "supabase" });
          console.log("Clerk token obtained:", !!token); // Debug log

          if (!token) {
             console.error("Failed to get Supabase token from Clerk.");
             // Optionally try to clear Supabase session if token is missing unexpectedly
             await supabase.auth.signOut();
             return;
          }
          
          if (!isMounted) return; // Don't proceed if component unmounted

          // Set the Supabase session using the token from Clerk
          // Note: setSession expects an object matching Supabase Session structure
          // Using the same token for access and refresh is common with Clerk short-lived tokens
          // but confirm this matches your Clerk token template setup.
          // const sessionData: Partial<Session> & { access_token: string } = { // Old type
          //    access_token: token,
          //    refresh_token: token, // May need adjustment based on actual token contents/expiry
          //    // Supabase types require other fields, but setSession seems to work with just tokens
          //    // Add dummy/default values if strict type checking causes issues here
          //    // user: null, // Example if needed
          //    // token_type: 'bearer', // Example if needed
          //    // expires_in: 3600, // Example: Set based on Clerk token expiry if known
          //    // expires_at: Date.now() / 1000 + 3600 // Example
          // };

          // Correct object structure for setSession
          const sessionCredentials = { 
            access_token: token,
            refresh_token: token 
          };


          console.log("Attempting to set Supabase session..."); // Debug log
          const { data, error } = await supabase.auth.setSession(sessionCredentials); // Use corrected object
          
          if (!isMounted) return; // Check again after await

          if (error) {
            console.error("Error setting Supabase session:", error);
          } else {
            console.log("Supabase session synchronized with Clerk.", data.session); // Log session details
             // You might want to fetch the Supabase user here to confirm
             const { data: { user } } = await supabase.auth.getUser();
             console.log("Supabase user after setSession:", user);
          }
        } catch (e) {
           if (isMounted) {
             console.error("Exception during Supabase session sync:", e);
           }
        }
      } else {
        // Handle sign-out: Clear the Supabase session
        console.log("User not signed in (Clerk), signing out Supabase."); // Debug log
        const { error } = await supabase.auth.signOut();
         if (error) {
            console.error("Error signing out Supabase session:", error);
          } else {
             console.log("Supabase session signed out.");
          }
      }
    };

    syncSupabaseSession();

    // Cleanup function to set the mounted flag to false
    return () => {
      isMounted = false;
      console.log("SupabaseAuthSyncer unmounted."); // Debug log
    };

  }, [isSignedIn, getToken]); // Re-run when auth state changes or getToken function reference changes

  return null; // This component doesn't render anything visible
}

export default SupabaseAuthSyncer; 