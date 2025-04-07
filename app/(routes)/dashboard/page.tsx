"use client"
import React from 'react'
import ImageUpload from './_components/ImageUpload'
import { RequireAuth } from '@/app/_components/RequireAuth'

function Dashboard() {
    return (
        <RequireAuth
            title="Dashboard Access"
            message="You need to sign in to access your dashboard."
            features={[
                "Convert wireframes to code",
                "Manage your projects",
                "Download source code"
            ]}
        >
            <div className='xl:px-20'>
                <h2 className='font-bold text-3xl'>Convert Wireframe to Code</h2>
                <ImageUpload />
            </div>
        </RequireAuth>
    )
}

export default Dashboard