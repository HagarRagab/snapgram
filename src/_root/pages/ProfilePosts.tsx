import { Models } from "appwrite";
import { useOutletContext } from "react-router";

import GridPostList from "@/components/shared/GridPostList";

type ProfilePostsContext = {
    posts: Models.Document[];
};

function ProfilePosts() {
    const { posts } = useOutletContext<ProfilePostsContext>();

    return <GridPostList posts={posts} showStats={false} showUser={false} />;
}

export default ProfilePosts;
