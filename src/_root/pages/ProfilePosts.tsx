import GridPostList from "@/components/shared/GridPostList";
import { Models } from "appwrite";
import { useOutletContext } from "react-router";

type ProfilePostsContext = {
    posts: Models.Document[];
    showStats: boolean;
    showUser: boolean;
};

function ProfilePosts() {
    const { posts, showStats, showUser } =
        useOutletContext<ProfilePostsContext>();

    return (
        <GridPostList posts={posts} showStats={showStats} showUser={showUser} />
    );
}

export default ProfilePosts;
