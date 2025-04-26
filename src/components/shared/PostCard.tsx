import { Models } from "appwrite";
import { Link } from "react-router";

import { useAuthContext } from "@/context/AuthContext";
import PostStats from "./PostStats";
import imagePlaceholder from "/assets/icons/profile-placeholder.svg";
import editIcon from "/assets/icons/edit.svg";
import PostCreatorInfo from "./PostCreatorInfo";
import PostCaption from "./PostCaption";

type PostCardProp = {
    post: Models.Document;
};

function PostCard({ post }: PostCardProp) {
    const { user } = useAuthContext();

    const postImageUrl = `${
        import.meta.env.VITE_APPWRITE_URL
    }/storage/buckets/${import.meta.env.VITE_APPWRITE_STORAGE_ID}/files/${
        post.imageId
    }/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;

    return (
        <div className="post-card">
            <div className="flex-between">
                {/* Post creation details */}
                <PostCreatorInfo post={post} />

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
            <Link to={`/posts/${post.$id}`}>
                {/* Post caption and tags */}
                <PostCaption post={post} />
                {/* Post image */}
                <img
                    src={postImageUrl || imagePlaceholder}
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
