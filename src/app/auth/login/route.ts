import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { Database } from '../../../../types/supabase'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()
    const email = String(formData.get('email'))
    const password = String(formData.get('password'))
    const supabase = createRouteHandlerClient<Database>({ cookies })

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    const redirectUrl = requestUrl.origin +
        `?type=${error ? 'error' : 'success'}` +
        `&message=${error ? 'Login failed' : 'Login succeeded'}`

    return NextResponse.redirect(redirectUrl, {
        status: 301,
    })
}