import { Models } from "appwrite";

import { useGetPosts, useGetRecentPosts } from "@/lib/react-query/queries";
import Loader from "../../components/shared/Loader";
import PostCard from "../../components/shared/PostCard";
import TopPage from "@/components/shared/TopPage";

function Home() {
    const { data: posts, isPending: isPostsLoading } = useGetRecentPosts();
    useGetPosts();

    return (
        <div className="flex flex-1">
            <div className="home-container">
                <div className="home-posts">
                    <TopPage>Home Feed</TopPage>
                    {isPostsLoading ? (
                        <Loader />
                    ) : (
                        <ul className="flex flex-1 flex-col w-full gap-9">
                            {posts?.documents?.map((post: Models.Document) => (
                                <li
                                    key={post.$id}
                                    className="flex justify-center w-full"
                                >
                                    <PostCard post={post} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
