import SideBar from './side-bar';
import ArticleList from './article-list';
import Message from './message';

export default async function Home() {
    return (
        <div className="flex flex-row relative">
            <SideBar></SideBar>
            <ArticleList></ArticleList>
            <Message></Message>
        </div>
    )
}
