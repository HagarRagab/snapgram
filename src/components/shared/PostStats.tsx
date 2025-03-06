import { Models } from "appwrite";

import likeIcon from "/assets/icons/like.svg";
import likedIcon from "/assets/icons/liked.svg";
import saveIcon from "/assets/icons/save.svg";

type PostStatsProp = {
    post: Models.Document;
    userId: string;
};

function PostStats({ post, userId }: PostStatsProp) {
    return (
        <div className="flex-between z-20">
            {/* Likes */}
            <div className="flex items-center gap-2">
                <img
                    src={likeIcon}
                    alt="like"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    title={"like"}
                />
                <span className="small-medium lg:base-medium">
                    {post.likes.length}
                </span>
            </div>

            {/* save */}
            <div>
                <img
                    src={saveIcon}
                    alt="like"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                />
            </div>
        </div>
    );
}

export default PostStats;
