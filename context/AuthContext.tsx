
import { User } from "@supabase/supabase-js";
import { createContext } from "react";

interface AuthContextType {
    user: User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);