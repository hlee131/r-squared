import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { Database } from '../../../../types/supabase'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const supabase = createRouteHandlerClient<Database>({ cookies })

    const { error } = await supabase.auth.signOut()

    const redirectUrl = requestUrl.origin +
        `?type=${error != null ? 'error' : 'success'}` +
        `&message=${error != null ? error.message : 'Logout succeeded'}`

    return NextResponse.redirect(redirectUrl, {
        status: 301,
    })
}