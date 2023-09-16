import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { EditorProps, RawDraftContentState } from "draft-js"
import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import draftToHtml from 'draftjs-to-html';
import sanitize from "sanitize-html";

const WYSIWYG = dynamic<EditorProps>(() => import('../../components/wysiwyg'),
    { ssr: false })

export default async function Page({ params }: {
    params: {
        arxivId: string
    }
}) {
    const supabase = createServerComponentClient({ cookies });

    // get all top level comments
    const { data } = await supabase
        .from('comments')
        .select('*, profiles (username)')
        .eq('article', params.arxivId)
        .is('parent_comment', null);

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

    return (<div className="w-9/12 h-full flex flex-row mt-1">
        {/* actual paper */}
        <div className="round-border w-1/2 h-full mr-1">

        </div>

        {/* comments and tools */}
        <div className="w-1/2 h-full round-border ml-1">
            {/* comment editor */}
            <WYSIWYG />

            {/* comments */}
            <div>
                {data?.map(comment => {
                    const rawContentState: RawDraftContentState = JSON.parse(comment.content);
                    const markup = draftToHtml(rawContentState);
                    return <div className="round-border p-1 m-3">
                        <p>{comment.profiles.username.slice(1, -1)} - {getTimeString(comment.posted_at)}</p>
                        <hr className="h-0.5 bg-gray-500 border-0 m-1" />
                        <div dangerouslySetInnerHTML={{
                            __html: sanitize(markup)
                        }}>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </div>)
}