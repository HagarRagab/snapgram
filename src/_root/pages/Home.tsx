import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Models } from "appwrite";

import { useGetPosts } from "@/lib/react-query/queries";
import Loader from "../../components/shared/Loader";
import PostCard from "../../components/shared/PostCard";
import TopPage from "@/components/shared/TopPage";
import PageError from "@/components/shared/PageError";

function Home() {
    const {
        data: posts,
        isPending: isPostsLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useGetPosts({ limits: 6 });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) fetchNextPage();
    }, [inView, fetchNextPage]);

    const shouldShowPosts = !posts || posts?.pages[0]?.documents.length !== 0;

    if (isPostsLoading) return <Loader />;

    return (
        <div className="flex flex-1">
            <div className="home-container">
                <div className="home-posts">
                    <TopPage>Home Feed</TopPage>
                    {!isPostsLoading && !shouldShowPosts ? (
                        <PageError>No found posts</PageError>
                    ) : (
                        <ul className="flex flex-1 flex-col w-full gap-9">
                            {posts?.pages?.map((item) => {
                                return item?.documents.map(
                                    (post: Models.Document) => (
                                        <li
                                            key={post.$id}
                                            className="flex justify-center w-full"
                                        >
                                            <PostCard post={post} />
                                        </li>
                                    )
                                );
                            })}

                            {hasNextPage ? (
                                <div ref={ref}>
                                    {isFetchingNextPage && <Loader />}
                                </div>
                            ) : (
                                <p className="text-light-4 text-center">
                                    - End of posts -
                                </p>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
