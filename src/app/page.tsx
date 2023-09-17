import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import ArticleList from './components/article-list';
import { cookies } from 'next/headers';

export default async function Home() {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.from('papers').select('*');
    return <ArticleList articles={data ?? []}></ArticleList >;
}
