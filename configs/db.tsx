import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a helper function to execute SQL queries
export const db = {
  async query(query: string, params?: any[]) {
    const { data, error } = await supabase.from('_supabase_drizzle_proxy').select('*');
    
    if (error) {
      throw error;
    }
    
    return data;
  }
};