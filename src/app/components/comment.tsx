'use client'

import { RawDraftContentState } from "draft-js"
import draftToHtml from 'draftjs-to-html';
import sanitize from "sanitize-html";
import { Database } from "../../../types/supabase";
import { useEffect, useRef, useState } from "react";
import { UserType } from "../providers";
import WYSIWYG from "./wysiwyg";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import User from "./user";

export type CommentType = Database['public']['Tables']['comments']['Row'];
export type PaperType = Database['public']['Tables']['papers']['Row'];

type JoinedType = CommentType
    & { profiles: UserType }
    & { papers: PaperType }

export default function Comment({ comment, indented }: { comment: JoinedType, indented?: boolean }) {
    const rawContentState: RawDraftContentState = JSON.parse(comment.content as string);
    const markup = draftToHtml(rawContentState);
    const supabase = createClientComponentClient<Database>();
    const markupContainer = useRef<HTMLDivElement | null>(null);

    const [showReplyBox, setShowReplyBox] = useState(false);
    const [replies, setReplies] = useState<JoinedType[]>([]);
    const [truncated, setTruncated] = useState(true);
    const [showProfile, setShowProfile] = useState(false);

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

    useEffect(() => console.log(replies), [replies])

    useEffect(() => {
        const containerHeight = markupContainer.current?.offsetHeight ?? 0;
        const childrenHeight = Array.from(markupContainer.current?.children ?? [])
            .reduce((acc: number, curr: Element) => acc + (curr as HTMLElement).offsetHeight, 0)

        setTruncated(childrenHeight > containerHeight);
    }, [])


    useEffect(() => {
        supabase
            .from('comments')
            .select('*, profiles (username, id), papers (title, arxiv_id)')
            .eq('parent_comment', comment.id)
            .then(res => setReplies(res.data as JoinedType[] ?? []))
    }, []);

    return <div>
        <div className={`round-border p-1 m-3 ${indented ? 'ml-0 ' : ''}`}>
            <div className="flex flex-row justify-between mx-2">
                <div className="relative">
                    <p onClick={() => setShowProfile(true)}
                        className="cursor-pointer">{comment.profiles.username.slice(1, -1)} - {getTimeString(comment.posted_at)}</p>
                    {showProfile ? <User user={comment.profiles} closeFn={() => setShowProfile(false)} currentPaper={comment.papers} /> : ''}
                </div>
                <div className="cursor-pointer">
                    <span className="mr-3" onClick={() => setShowReplyBox(true)}>Reply</span>
                    <span>Share</span>
                </div>
            </div>
            <hr className="h-0.5 bg-gray-400 border-0 m-1" />
            <div dangerouslySetInnerHTML={{
                __html: sanitize(markup)
            }}
                className={`m-3 ${truncated ? 'max-h-14 overflow-clip' : ''}`}
                ref={markupContainer}>
            </div>
            {truncated ? <p className="ml-3 cursor-pointer"
                onClick={() => setTruncated(false)}>
                Read more</p> : ''}
            <hr className="h-0.5 bg-gray-400 border-0 m-1" />
        </div>

        <div className="indent">
            {showReplyBox ? <WYSIWYG mode='reply' closeFn={() => setShowReplyBox(false)} parent_comment={comment.id} /> : ''}
            {replies.map(reply => <Comment comment={reply} key={reply.id} indented={true} />)}
        </div>
    </div>
}