import { Models } from "appwrite";
import Loader from "../../components/shared/Loader";
import PostCard from "../../components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queries";

function Home() {
    const { data: posts, isPending: isPostsLoading } = useGetRecentPosts();

    return (
        <div className="flex flex-1">
            <div className="home-container">
                <div className="home-posts">
                    <h2 className="h3-bold md:h2-bold text-left w-full">
                        Home Feed
                    </h2>
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
