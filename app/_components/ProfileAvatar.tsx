"use client"
import React from 'react'
import { UserButton } from '@clerk/nextjs';

function ProfileAvatar() {
    return (
        <div>
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}

export default ProfileAvatar