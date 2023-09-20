'use client'

import { Fragment, useContext, useEffect, useState } from "react"
import { MessageContext, UserDataContext, UserType } from "../providers"
import { Message, MessageType } from "./message";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../types/supabase";
import Link from "next/link";
import { PaperType } from "./comment";

export default function User({ user, currentPaper, closeFn, }:
    { user: UserType, currentPaper: PaperType, closeFn: () => void }) {
    const [following, setFollowing] = useState(false);
    const { userData, updateUserData } = useContext(UserDataContext);
    const { setMessages } = useContext(MessageContext);
    const supabase = createClientComponentClient<Database>();

    useEffect(() => {
        setFollowing(userData?.following_users.includes(user.id) ?? false);
        console.log(user)
    }, [])

    const onClick = () => {
        if (!userData) {
            let message: Message = {
                type: MessageType.ERROR,
                message: 'Please login to follow people'
            }
            setMessages(prev => [...prev, message])
        } else {
            supabase.rpc(following ? 'unfollow_user' : 'follow_user', {
                user_id: user.id
            }).then(() => {
                setFollowing(following => !following);
                updateUserData();
            })
        }
    }

    return (<div className="max-w-half h-fit w-96 p-1 absolute flex flex-row left-0 bottom-full absolute bg-white round-border">
        <p className="m-1 cursor-pointer absolute top-0 right-0 " onClick={closeFn}>X</p>

        {/* profile picture */}
        <img className="w-1/3 aspect-square m-1 circle round-border"
            src="https://avatars.githubusercontent.com/u/59949027?v=4" />

        <div className="ml-2">
            {/* username and status */}
            <div className="mb-0.5">
                <button onClick={onClick}
                    className={`${following ? 'selected' : ''} round-border p-0.5 mr-1`}>
                    {following ? 'Unfollow' : 'Follow'}
                </button>
                {user.username.slice(1, -1)}
                <span className="round-border ml-1 h-2.5 aspect-square circle inline-block"></span>
            </div>

            {/* Currently */}
            <p className="text-sm text-slate-500 bottom-0">
                {currentPaper ?
                    // TODO: being cached?
                    <Fragment>Reading{' '}
                        <Link href={`/article/${currentPaper.arxiv_id}`}>
                            <i>{currentPaper.title}</i>
                        </Link>
                    </Fragment> : <i>Currently browsing...</i>}
            </p>
        </div>
    </div>)
}