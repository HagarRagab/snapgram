import { Link } from "react-router";
import { Models } from "appwrite";

import imagePlaceholder from "/assets/icons/profile-placeholder.svg";
import { multiFormatDateString } from "@/utils/utils";

type PostCreatorInfoProp = {
    post?: Models.Document;
};

function PostCreatorInfo({ post }: PostCreatorInfoProp) {
    const postCreatorImageUrl = `${
        import.meta.env.VITE_APPWRITE_URL
    }/avatars/initials?name=${post?.creator.name}&project=${
        import.meta.env.VITE_APPWRITE_PROJECT_ID
    }`;

    return (
        <div className="flex items-center gap-3">
            <Link to={`/profile/${post?.creator?.$id}`}>
                <img
                    src={postCreatorImageUrl || imagePlaceholder}
                    alt="creator"
                    className="rounded-full w-12 lg:h-12"
                />
            </Link>
            <div className="flex flex-col">
                <Link
                    to={`/profile/${post?.creator?.$id}`}
                    className="base-medium lg:body-bold text-light-1"
                >
                    {post?.creator?.name}
                </Link>
                <div className="flex-center gap-2 text-light-3">
                    <span className="subtle-semibold lg:small-regular">
                        {multiFormatDateString(post?.$createdAt)}
                    </span>
                    <span>-</span>
                    <span className="subtle-semibold lg:small-regular">
                        {post?.location}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default PostCreatorInfo;
