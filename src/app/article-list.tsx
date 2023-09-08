import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Article from "./article";
import { cookies } from "next/headers";

export default async function ArticleList() {
    const supabase = createServerComponentClient({ cookies });
    const { data: papers, error } = await supabase
        .from('papers')
        .select('*, arxiv_tags');

    return (
        <div className="flex flex-col w-full items-center">
            {papers?.map(row => <Article key={row.arxiv_id} row={row}></Article>)}
        </div>
    )
}