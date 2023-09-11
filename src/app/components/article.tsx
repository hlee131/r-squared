'use client'

import Link from "next/link";
import { Database } from "../../../types/supabase"
import { mappings } from "../utils/arxiv-tags";
import { useEffect, useState } from "react";

export type ArticleType = Database['public']['Tables']['papers']['Row'];

export default function Article({ row }: { row: ArticleType }) {
    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('en-us',
            { month: 'short', year: 'numeric', day: 'numeric' })

    const formatAuthors = (authors: string[]) =>
        authors.slice(0, 3).join(', ') + (authors.length > 3 ? ', ...' : '')

    const [currentTag, setCurrentTag] = useState('');
    const [singleAuthor, setSingleAuthor] = useState(false);

    useEffect(() => {
        setSingleAuthor(window.innerWidth <= 768);
    }, []);

    return (
        <div className="relative w-9/12 flex flex-row justify-between round-border m-2 mb-3 p-3 h-fit">
            {/* Article title, date, and authors */}
            <div>
                <Link href={`/article/${row.arxiv_id}`} className="text-lg w-3/4">{row.title}</Link>
                <div className="flex flex-row text-gray-600">
                    <p>{formatDate(row.submitted_on)}</p>
                    <p className="ml-5">{formatAuthors(row.authors)}</p>
                </div>
            </div>

            {/* Tags */}
            <div className={`flex flex-row flex-wrap gap-y-1 justify-end text-right w-1/3 h-${currentTag == '' ? 'fit' : 'full'}`}
                onMouseLeave={() => setCurrentTag('')}>
                {row.arxiv_tags.slice(0, singleAuthor ? 1 : undefined).map(tag =>
                    <Link onMouseEnter={() => setCurrentTag(tag)}
                        key={tag}
                        style={{ display: currentTag == tag || currentTag == '' ? 'block' : 'none' }}
                        className="round-border mr-1 p-1 w-fit h-fit"
                        href={`/tag/${tag}`}>
                        {currentTag == tag ? mappings[tag] : tag}
                    </Link>)}
            </div>
        </div>
    )
}