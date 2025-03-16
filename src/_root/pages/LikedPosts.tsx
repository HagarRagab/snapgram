import { Models } from "appwrite";
import { useOutletContext } from "react-router";

import GridPostList from "@/components/shared/GridPostList";
import PageError from "@/components/shared/PageError";

type LikedPostContext = {
    likedPosts: Models.Document[];
};

function LikedPosts() {
    const { likedPosts } = useOutletContext<LikedPostContext>();

    return !likedPosts.length ? (
        <PageError>No Liked posts</PageError>
    ) : (
        <GridPostList posts={likedPosts} showStats={false} showUser={false} />
    );
}

export default LikedPosts;
