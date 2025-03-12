import { Models } from "appwrite";
import { Link } from "react-router";

import { useAuthContext } from "@/context/AuthContext";
import PostStats from "./PostStats";
import placeholderImage from "/assets/icons/profile-placeholder.svg";
import { appwriteInfiniteData } from "@/types";

type GridPostListProps = {
    posts: appwriteInfiniteData | Models.Document | Models.Document[];
    showUser?: boolean;
    showStats?: boolean;
};

function GridPostList({
    posts,
    showUser = true,
    showStats = true,
}: GridPostListProps) {
    const { user } = useAuthContext();

    const postList = (posts: Models.Document[]) => {
        return posts.map((post: Models.Document) => (
            <li key={post.$id} className="relative min-w-80 h-80">
                <Link to={`/posts/${post.$id}`} className="grid-post_link">
                    <img
                        src={post.imageUrl}
                        alt={post.caption}
                        className="w-full h-full object-cover"
                    />
                </Link>

                <div className="grid-post_user">
                    {showUser && (
                        <div className="flex items-center gap-2 flex-1">
                            <img
                                src={post.creator?.imageUrl || placeholderImage}
                                alt={`${post.creator.name}'s image`}
                                className="w-8 h-8 rounded-full"
                            />
                            <p>{post.creator.name}</p>
                        </div>
                    )}
                    {showStats && <PostStats post={post} userId={user.id} />}
                </div>
            </li>
        ));
    };

    return (
        <ul className="grid-container mb-10">
            {Array.isArray(posts)
                ? postList(posts)
                : posts.pages.map((item: Models.Document) =>
                      postList(item.documents)
                  )}
        </ul>
    );
}

export default GridPostList;
