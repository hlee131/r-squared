'use client'

import { Fragment, useEffect, useState } from "react"
import AuthModal from "./auth-modal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../types/supabase";

export default function SideBar() {
    // let { data: tags, error } = await supabase
    //     .from('papers')
    //     .select('arxiv_tags');

    // console.log(tags)
    const [showAuth, setShowAuth] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const supabase = createClientComponentClient<Database>();

    useEffect(() => {
        supabase.auth.getSession().then((res) => setAuthenticated(res.data.session != null))
    }, [])

    return (
        <Fragment>
            <div className="relative text-center border border-solid border-black w-3/12 h-screen">
                {/* friends */}
                <h1 className="text-lg">Following</h1>

                {/* filter by ai tags  */}
                <h1 className="text-lg">AI Tags</h1>

                {/* filter by arxiv tags */}
                <h1 className="text-lg">Arxiv Tags</h1>

                <h1 className="text-lg">Misc Selectors</h1>
                {/* get most clicked articles  */}


                {/* get most voted articles */}


                {/* Auth buttons */}
                <form action='/auth/logout' method='post' className="absolute bottom-0 left-0 w-full">
                    {authenticated ?
                        <button type='submit' className="m-3 round-border p-2">Sign out</button> :
                        <button onClick={(e) => { e.preventDefault(); setShowAuth(true) }}
                            className="m-3 round-border p-2">Login / Register</button>
                    }
                </form>
            </div>
            {showAuth ? <AuthModal closeModal={() => setShowAuth(false)}></AuthModal> : ''}
        </Fragment>
    )
}