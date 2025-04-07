import React from 'react'
import DashboardProvider from './provider';
import { ClerkProvider } from '@clerk/nextjs'
import SupabaseAuthSyncer from '@/components/SupabaseAuthSyncer';


function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <ClerkProvider>
            <SupabaseAuthSyncer />
            <DashboardProvider>
                {children}
            </DashboardProvider>
        </ClerkProvider>
    )
}

export default DashboardLayout