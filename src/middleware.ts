import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

import { Database } from "../types/supabase";

export async function middleware(req: NextRequest) {
    // refresh user session
    const res = NextResponse.next()
    const supabase = createMiddlewareClient<Database>({ req, res })

    supabase.auth.getSession()
        .then(data => data.data.session?.user ?? null)
        .then(async user => {

            // log a user's last read article
            if (user && req.nextUrl.pathname.startsWith('/article')) {


                const articleId = req.nextUrl.pathname
                    .split('/').filter(str => str.length)[1]

                await supabase
                    .from('profiles')
                    .update({ currently_reading: articleId })
                    .eq('id', user.id)
                    .select()
            }
        });

    return res;
}

