import { useAuthContext } from '@/lib/auth-context';
import AccessDenied from './AccessDenied';

interface RequireAuthProps {
  children: React.ReactNode;
  title?: string;
  message?: string;
  features?: string[];
}

export function RequireAuth({ 
  children,
  title,
  message,
  features
}: RequireAuthProps) {
  const { isSignedIn, isLoading } = useAuthContext();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!isSignedIn) {
    return (
      <AccessDenied 
        title={title} 
        message={message} 
        features={features} 
      />
    );
  }
  
  return <>{children}</>;
} 