"use server"
import supabase from "@/configs/supabase";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { uid, description, imageUrl, model, email } = body

        // Check if user exists and has enough credits
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('credits')
            .eq('email', email)
            .single()

        if (userError || !userData) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        if (userData.credits <= 0) {
            return NextResponse.json({ error: 'Not enough credits' }, { status: 400 })
        }

        // Insert the design into the database
        const { error: designError } = await supabase
            .from('wireframetocode')
            .insert({
                id: uid,
                description,
                image_url: imageUrl,
                model,
                created_by: email
            })

        if (designError) {
            console.error('Error inserting design:', designError)
            return NextResponse.json({ error: 'Failed to save design' }, { status: 500 })
        }

        // Deduct one credit from the user
        const { error: creditError } = await supabase
            .from('users')
            .update({ credits: userData.credits - 1 })
            .eq('email', email)

        if (creditError) {
            console.error('Error updating credits:', creditError)
            return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error processing request:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function GET(req: Request) {
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const uid = searchParams?.get('uid');
    const email = searchParams?.get('email');
    try {
        if (uid) {
            const { data, error } = await supabase
                .from('wireframetocode')
                .select('*') // Select all columns or specify needed columns
                .eq('id', uid) // Assuming 'uid' from frontend matches the 'id' column (UUID) in DB
                .single(); // Fetch a single record

            if (error) throw error;
            return NextResponse.json(data);
        }
        else if (email) {
            const { data, error } = await supabase
                .from('wireframetocode')
                .select('*') // Select all columns or specify needed columns
                .eq('created_by', email)
                .order('created_at', { ascending: false }); // Assuming you have a created_at timestamp

            if (error) throw error;
            return NextResponse.json(data);
        }

        return NextResponse.json({ error: 'Missing uid or email parameter' }, { status: 400 })

    } catch (error: any) {
        console.error('Error fetching designs:', error)
        return NextResponse.json({ error: error.message || 'Failed to fetch designs' }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { uid, codeResp } = await req.json();

        if (!uid || !codeResp) {
            return NextResponse.json({ error: 'Missing uid or codeResp' }, { status: 400 })
        }

        const { data, error } = await supabase
            .from('wireframetocode')
            .update({ code: codeResp })
            .eq('id', uid) // Assuming 'uid' from frontend matches the 'id' column (UUID) in DB
            .select('id') // Select the id to return
            .single();

        if (error) {
            console.error('Error updating design code:', error)
            // Handle specific errors e.g., RLS violation or not found
            return NextResponse.json({ error: error.message || 'Failed to update design' }, { status: 500 })
        }

        if (!data) {
             return NextResponse.json({ error: 'Design not found or update failed' }, { status: 404 })
        }

        return NextResponse.json({ uid: data.id }); // Return the updated record's id

    } catch (error: any) {
        console.error('Error processing PUT request:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}