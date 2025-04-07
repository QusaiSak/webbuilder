"use client"
import React, { useEffect } from 'react'
import { useAuthContext } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import axios from "axios";
import AppHeader from '../_components/AppHeader';
import { AppSidebar } from '../_components/AppSidebar';

function DashboardProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user, isSignedIn } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!isSignedIn) {
            router.replace('/');
            return;
        }
        
        if (user) {
            checkUser();
        }
    }, [isSignedIn, user, router]);

    const checkUser = async () => {
        if (!user?.email) return;
        
        try {
            const result = await axios.post('/api/user', {
                userName: user?.firstName || user?.fullName || 'User',
                userEmail: user?.email
            });
            console.log(result.data);
        } catch (error) {
            console.error("Error checking user:", error);
        }
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className='w-full'>
                <AppHeader />
                {/* <SidebarTrigger /> */}
                <div className='p-10'>{children}</div>
            </main>
        </SidebarProvider>
    )
}

export default DashboardProvider