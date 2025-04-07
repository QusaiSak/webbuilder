"use Server"
import { clerkClient } from '@clerk/nextjs/server';

// Separate utility to create a Supabase ID for a user
// This should be called in a server action or API route
export async function setSupabaseIdForUser(userId: string) {
  const supabaseId = crypto.randomUUID(); // Modern alternative to uuid package
  
  try {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        supabase_id: supabaseId
      }
    });
    return supabaseId;
  } catch (error) {
    console.error("Error updating user metadata:", error);
    throw error;
  }
}

// Example webhook handler function
export async function handleUserCreated(userId: string) {
  return await setSupabaseIdForUser(userId);
}