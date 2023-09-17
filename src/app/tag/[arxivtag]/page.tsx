import ArticleList from "@/app/components/article-list";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";

export default async function Page({ params }: {
    params: {
        arxivtag: string
    }
}) {
    // TODO: 404 redirecter
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.from('papers').select('*').contains('arxiv_tags', [params.arxivtag])
    return <ArticleList articles={data ?? []}></ArticleList>
}