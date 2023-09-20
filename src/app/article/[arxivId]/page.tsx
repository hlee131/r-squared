import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import Comment from "@/app/components/comment"


const WYSIWYG = dynamic(() => import('../../components/wysiwyg'),
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
        .select('*, profiles (username), papers (title, arxiv_id)')
        .eq('article', params.arxivId)
        .is('parent_comment', null);


    return (<div className="w-9/12 h-full flex flex-row my-1">
        {/* actual paper */}
        <div className="round-border w-1/2 h-full mr-1">

        </div>

        {/* comments and tools */}
        <div className="w-1/2 h-full round-border ml-1">
            {/* comment editor */}
            <WYSIWYG mode='primary' className="h-1/6" />

            {/* comments */}
            <div className="overflow-y-scroll h-5/6">
                {data?.map(comment => <Comment comment={comment} />)}
            </div>
        </div>
    </div >)
}