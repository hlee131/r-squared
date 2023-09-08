import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../../../types/supabase";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    const requestUrl = new URL(request.url);
    const formData = await request.formData();
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));
    const username = String(formData.get('username'));
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${requestUrl.origin}/auth/callback`,
            data: { username }
        }
    })

    const redirectUrl = requestUrl.origin +
        `?type=${error != null ? 'error' : 'success'}` +
        `&message=${error != null ? error.message : 'Registration succeeded'}`

    return NextResponse.redirect(redirectUrl, { status: 301 });
}