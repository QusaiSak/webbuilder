declare module '@clerk/nextjs' {
  import { User } from '@clerk/backend';
  
  export interface UserResource {
    id: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    imageUrl?: string;
    email?: string;
  }
  
  export interface Auth {
    isLoaded: boolean;
    isSignedIn?: boolean;
    userId?: string;
  }
  
  export function useAuth(): Auth;
  export function useUser(): { user: UserResource | null; isLoaded: boolean };
  export function SignInButton(props: any): JSX.Element;
  export function SignUpButton(props: any): JSX.Element;
  export function UserButton(props: any): JSX.Element;
  export function ClerkProvider(props: any): JSX.Element;
  export function useSignIn(): any;
  export function useClerk(): any;
} 