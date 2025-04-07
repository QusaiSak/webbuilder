import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Lock, Shield } from 'lucide-react';

interface AccessDeniedProps {
  title?: string;
  message?: string;
  features?: string[];
}

export default function AccessDenied({ 
  title = "Access Denied", 
  message = "You need to be signed in to access this content.",
  features = []
}: AccessDeniedProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-4">
          <Lock className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground mb-6">{message}</p>
        
        {features.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Features you'll get access to:</h3>
            <ul className="list-disc list-inside space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="text-muted-foreground">{feature}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <SignInButton mode="modal">
            <Button variant="outline" className="w-full sm:w-auto">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="w-full sm:w-auto">
              Sign Up
            </Button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
} 