"use client"
import { SignInButton } from '@clerk/nextjs';
import React from 'react'
import { AuthButtons } from './AuthButtons';
import { Button } from '@/components/ui/button';

function Authentication({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <SignInButton mode="modal">
                <Button variant="ghost" className="p-0 hover:bg-transparent">
                    {children}
                </Button>
            </SignInButton>
        </div>
    )
}

export default Authentication