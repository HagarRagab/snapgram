import { Models } from "appwrite";
import { Link } from "react-router";

import { useAuthContext } from "@/context/AuthContext";
import PostStats from "./PostStats";
import imagePlaceholder from "/assets/icons/profile-placeholder.svg";
import editIcon from "/assets/icons/edit.svg";

type PostCardProp = {
    post: Models.Document;
};

function PostCard({ post }: PostCardProp) {
    const { user } = useAuthContext();

    return (
        <div className="post-card">
            <div className="flex-between">
                {/* Post creation details */}
                <div className="flex items-center gap-3">
                    <Link to={`/profile/${post.creator?.$id}`}>
                        <img
                            src={post.creator?.imageUrl || imagePlaceholder}
                            alt="creator"
                            className="rounded-full w-12 lg:h-12"
                        />
                    </Link>
                    <div className="flex flex-col">
                        <Link
                            to={`/profile/${post.creator?.$id}`}
                            className="base-medium lg:body-bold text-light-1"
                        >
                            {post.creator?.username}
                        </Link>
                        <div className="flex-center gap-2 text-light-3">
                            <span className="subtle-semibold lg:small-regular">
                                {post.$createdAt}
                            </span>
                            <span>-</span>
                            <span className="subtle-semibold lg:small-regular">
                                {post.location}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Updating post icon [show only if the current user is the creator] */}
                <Link
                    to={`/update-post/${post.$id}`}
                    className={user.id !== post.creator.$id ? "hidden" : ""}
                >
                    <img
                        src={editIcon}
                        alt="edit"
                        width={20}
                        height={20}
                        title="Edit"
                    />
                </Link>
            </div>

            {/* Post caption, tags and image */}
            <Link to={`/post/${post.$id}`}>
                {/* Post caption and tags */}
                <div className="small-medium lg:base-medium py-5">
                    <p>{post.caption}</p>
                    <ul className="flex gap-1 mt-2">
                        {post.tags.length > 0 &&
                            post.tags.map((tag: string, index: number) => (
                                <li
                                    key={tag + index}
                                    className="text-light-3 small-regular"
                                >
                                    #{tag}
                                </li>
                            ))}
                    </ul>
                </div>
                {/* Post image */}
                <img
                    src={post.imageUrl || imagePlaceholder}
                    alt={post.caption}
                    className="post-card_img"
                />
            </Link>

            {/* Post stats likes, saves */}
            <PostStats post={post} userId={user.id} />
        </div>
    );
}

export default PostCard;
