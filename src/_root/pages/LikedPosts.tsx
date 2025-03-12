import GridPostList from "@/components/shared/GridPostList";
import { Models } from "appwrite";
import { useOutletContext } from "react-router";

type LikedPostsContext = {
    likedPosts: Models.Document[];
    showStats: boolean;
    showUser: boolean;
};

function LikedPosts() {
    const { likedPosts, showStats, showUser } =
        useOutletContext<LikedPostsContext>();

    return (
        <GridPostList
            posts={likedPosts}
            showStats={showStats}
            showUser={showUser}
        />
    );
}

export default LikedPosts;
