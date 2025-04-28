import { InfiniteData } from "@tanstack/react-query";
import { Models } from "appwrite";

import PostList from "./PostList";

type GridPostListProps = {
    posts:
        | InfiniteData<Models.DocumentList<Models.Document>>
        | Models.Document[]
        | undefined;
    showUser?: boolean;
    showStats?: boolean;
};

function GridPostList({
    posts,
    showUser = true,
    showStats = true,
}: GridPostListProps) {
    return (
        <ul className="grid-container mb-10">
            {Array.isArray(posts) ? (
                <PostList
                    posts={posts}
                    showUser={showUser}
                    showStats={showStats}
                />
            ) : (
                posts?.pages?.map((page, i) => (
                    <PostList
                        key={i}
                        posts={page.documents}
                        showUser={showUser}
                        showStats={showStats}
                    />
                ))
            )}
        </ul>
    );
}

export default GridPostList;
