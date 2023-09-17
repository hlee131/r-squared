'use client'

import { RawDraftContentState } from "draft-js"
import draftToHtml from 'draftjs-to-html';
import sanitize from "sanitize-html";
import { Database } from "../../../types/supabase";
import { useEffect, useState } from "react";
import { UserType } from "../providers";
import WYSIWYG from "./wysiwyg";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export type CommentType = Database['public']['Tables']['comments']['Row']
type CommentProfileJoinType = CommentType & { profiles: UserType }

export default function Comment({ comment, indented }: { comment: CommentProfileJoinType, indented?: boolean }) {
    const rawContentState: RawDraftContentState = JSON.parse(comment.content as string);
    const markup = draftToHtml(rawContentState);
    const supabase = createClientComponentClient<Database>();

    const [showReplyBox, setShowReplyBox] = useState(false);
    const [replies, setReplies] = useState<CommentProfileJoinType[]>([]);

    const getTimeString = (posted_at: string) => {
        let post_dt = new Date(posted_at);
        let now = new Date();
        let mins = (now.valueOf() - post_dt.valueOf()) / 1000 / 60;

        if (mins < 1) return "Just now";

        let number = 0;
        let unit = '';
        let hrs = mins / 60;
        let days = hrs / 24;
        let months = now.getUTCMonth() - post_dt.getUTCMonth();
        let years = months / 12;

        if (hrs < 1) { number = Math.floor(mins); unit = " minute"; }
        else if (days < 1) { number = Math.floor(hrs); unit = " hour"; }
        else if (months < 1) { number = Math.floor(days); unit = " day"; }
        else if (years < 1) { number = Math.floor(months); unit = " month"; }
        else { number = Math.floor(years); unit = " year"; }

        return `${number} ${unit}${number == 1 ? '' : 's'} ago`;
    }


    useEffect(() => {
        supabase
            .from('comments')
            .select('*, profiles (username)')
            .eq('parent_comment', comment.id)
            .then(res => setReplies(res.data as CommentProfileJoinType[] ?? []))
    }, []);

    return <div>
        <div className={`round-border p-1 w-3/4 m-3 ${indented ? 'ml-0 ' : ''}`}>
            <div className="flex flex-row justify-between mx-2">
                <p>{comment.profiles.username.slice(1, -1)} - {getTimeString(comment.posted_at)}</p>
                <div className="cursor-pointer">
                    <span className="mr-3" onClick={() => setShowReplyBox(true)}>Reply</span>
                    <span>Share</span>
                </div>
            </div>
            <hr className="h-0.5 bg-gray-400 border-0 m-1" />
            <div dangerouslySetInnerHTML={{
                __html: sanitize(markup)
            }}
                className="m-3">
            </div>
            <hr className="h-0.5 bg-gray-400 border-0 m-1" />
        </div>

        <div className="indent">
            {showReplyBox ? <WYSIWYG mode='reply' closeFn={() => setShowReplyBox(false)} parent_comment={comment.id} /> : ''}
            {replies.map(reply => <Comment comment={reply} key={reply.id} indented={true} />)}
        </div>
    </div>
}