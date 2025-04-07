import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/configs/supabase";

export async function POST(req: NextRequest) {
    const { userEmail, userName } = await req.json();
    
    // Check if user already exists
    const { data: existingUsers, error: queryError } = await supabase
        .from('users')
        .select('*')
        .eq('email', userEmail)
        .limit(1);
    
    if (queryError) {
        return NextResponse.json({ error: queryError.message }, { status: 500 });
    }

    if (existingUsers && existingUsers.length > 0) {
        return NextResponse.json(existingUsers[0]);
    }
    
    // Create new user
    const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([
            { 
                name: userName, 
                email: userEmail, 
                credits: 3 
            }
        ])
        .select()
        .limit(1);
    
    if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
    
    return NextResponse.json(newUser[0]);
}

export async function GET(req: Request) {
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const email = searchParams?.get('email');

    if (email) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .limit(1);
        
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        
        return NextResponse.json(data?.[0] || null);
    }
    
    return NextResponse.json({ error: "Email parameter is required" }, { status: 400 });
}