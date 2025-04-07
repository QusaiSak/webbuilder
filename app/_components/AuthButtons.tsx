import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/lib/auth-context';
import { LogIn } from 'lucide-react';

export function AuthButtons() {
  const { isSignedIn } = useAuthContext();
  
  if (isSignedIn) {
    return (
      <div className="flex items-center space-x-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    );
  }
  
  return (
    <div className="flex items-center space-x-4">
      <SignInButton mode="modal">
        <Button variant="outline" className="flex items-center gap-2">
          <LogIn className="h-4 w-4" />
          Sign In
        </Button>
      </SignInButton>
      <SignUpButton mode="modal">
        <Button>Sign Up</Button>
      </SignUpButton>
    </div>
  );
} 