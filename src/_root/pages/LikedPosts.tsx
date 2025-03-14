import { Models } from "appwrite";
import { useOutletContext } from "react-router";

import GridPostList from "@/components/shared/GridPostList";

type LikedPostContext = {
    likedPosts: Models.Document[];
};

function LikedPosts() {
    const { likedPosts } = useOutletContext<LikedPostContext>();

    return (
        <GridPostList posts={likedPosts} showStats={false} showUser={false} />
    );
}

export default LikedPosts;
