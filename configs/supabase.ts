"use server"
import { createClient } from '@supabase/supabase-js';
import { clerkClient } from '@clerk/nextjs/server';
// Create a Supabase client without Clerk integration initially
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a basic client without auth
const supabase = createClient(supabaseUrl, supabaseKey);

// Export the basic client
export default supabase;

// Create a function to get an authenticated client within components
import { useSession } from '@clerk/nextjs';
import { v4 as uuidv4 } from 'uuid'
const supabaseId = uuidv4()
await clerkClient.users.updateUserMetadata(userId, {
  publicMetadata: {
    supabase_id: supabaseId
  }
})

export async function useSupabaseClient() {
  const { session } = useSession();
  
  // Create and return an authenticated client
  return createClient(
    supabaseUrl,
    supabaseKey,
    {
      global: {
        fetch: async (url, options = {}) => {
          const clerkToken = await session?.getToken({
            template: 'supabase',
          });

          // Insert the Clerk Supabase token into the headers
          const headers = new Headers(options?.headers);
          headers.set('Authorization', `Bearer ${clerkToken}`);

          // Call the default fetch
          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    },
  );
}