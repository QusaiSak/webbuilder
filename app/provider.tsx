"use client"
import { AuthProvider, useAuthContext as useNewAuthContext } from '@/lib/auth-context';
import React from 'react'

function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            {children}
        </div>
    )
}

// Redirect to the new auth context
export const useAuthContext = useNewAuthContext;

export default Provider

