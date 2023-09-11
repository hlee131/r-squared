'use client'

import { mappings } from "../utils/arxiv-tags"
import { useParams } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../types/supabase";
import { MessageContext, UserDataContext } from "../providers";
import React, { useContext, useState, useEffect } from "react";
import { Message, MessageType } from "./message";

export default function Breadcrumbs() {
    const params = useParams();
    const [tag, setTag] = useState<string | ''>();
    const [following, setFollowing] = useState(false);
    const supabase = createClientComponentClient<Database>();
    const { userData, updateUserData } = useContext(UserDataContext);
    const { setMessages } = useContext(MessageContext);

    useEffect(() => {
        if (params.arxivtag) {
            setTag(typeof params.arxivtag == 'string' ?
                params.arxivtag : params.arxivtag[0]);
        } else setTag('');

        setFollowing(userData?.following_tags.includes(tag || '') || false);

    }, [params]);

    const onClick = () => {
        if (!tag) return;
        else if (!userData) {
            let message: Message = {
                type: MessageType.ERROR,
                message: 'Please login to follow tags'
            }
            setMessages(prev => [...prev, message]);
        }

        supabase.rpc(following ? 'unfollow_tag' : 'follow_tag', {
            tag_name: tag
        }).then(() => {
            setFollowing(prev => !prev)
            updateUserData();
        });
    }

    return (
        params.arxivtag ?
            <div className="absolute bottom-4 right-4">
                <h1 className="text-xl m-1">{mappings[tag || '']} ({tag})</h1>
                <button onClick={onClick} className={`${following ? 'selected' : ''} text-xl round-border p-1 m-1 w-full`}>
                    {following ? 'Unfollow' : 'Follow'}
                </button>
            </div> : ''
    )
}