"use client"
import { useAuth, useUser } from '@clerk/nextjs';
import { createContext, useContext } from 'react';

interface AuthContextType {
  isSignedIn: boolean;
  isLoading: boolean;
  user: any | null;
}

const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  isLoading: true,
  user: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();

  const isLoading = !authLoaded || !userLoaded;

  return (
    <AuthContext.Provider value={{ 
      isSignedIn: isSignedIn ?? false, 
      isLoading, 
      user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext); 