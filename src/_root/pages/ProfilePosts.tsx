import { Models } from "appwrite";
import { useOutletContext } from "react-router";

import GridPostList from "@/components/shared/GridPostList";
import PageError from "@/components/shared/PageError";

type ProfilePostsContext = {
    posts: Models.Document[];
};

function ProfilePosts() {
    const { posts } = useOutletContext<ProfilePostsContext>();

    return !posts.length ? (
        <PageError>No posts found</PageError>
    ) : (
        <GridPostList posts={posts} showStats={false} showUser={false} />
    );
}

export default ProfilePosts;
