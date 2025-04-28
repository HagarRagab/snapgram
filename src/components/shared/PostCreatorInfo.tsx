import { Models } from "appwrite";
import { Link } from "react-router";

import {
    defaultProfileImageUrl,
    generateImageUrl,
    multiFormatDateString,
} from "@/utils/utils";
import ProfileImage from "./ProfileImage";

type PostCreatorInfoProp = {
    post?: Models.Document;
};

function PostCreatorInfo({ post }: PostCreatorInfoProp) {
    return (
        <div className="flex items-center gap-3">
            <Link to={`/profile/${post?.creator?.$id}`}>
                <ProfileImage
                    profileImage={generateImageUrl(
                        post?.creator.imageId,
                        "profiles"
                    )}
                    fallbackProfileImage={defaultProfileImageUrl(
                        post?.creator.name
                    )}
                    size="w-12 h-12"
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
