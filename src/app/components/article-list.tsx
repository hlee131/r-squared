import Article, { ArticleType } from "./article";

export default async function ArticleList({ articles }: { articles: ArticleType[] }) {
    return (
        <div className="flex flex-col w-full items-center">
            {articles.map(row => <Article key={row.arxiv_id} row={row}></Article>)}
        </div>
    )
}