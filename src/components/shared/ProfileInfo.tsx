import { useParams } from "react-router";

import EditProfileButton from "@/components/shared/EditProfileButton";
import FollowButton from "@/components/shared/FollowButton";
import ProfileStats from "@/components/shared/ProfileStats";
import {
    useGetFollowers,
    useGetFollowings,
    useGetUserById,
} from "@/lib/react-query/queries";
import { IUser } from "@/types";
import { defaultProfileImageUrl, generateImageUrl } from "@/utils/utils";
import Loader from "./Loader";
import ProfileImage from "./ProfileImage";

type ProfileInfoProps = {
    loggedInUser: IUser;
};

function ProfileInfo({ loggedInUser }: ProfileInfoProps) {
    const { id } = useParams();

    const { data: user } = useGetUserById(id);

    const profileImage = generateImageUrl(user?.imageId, "profiles");
    const fallbackProfileImage = defaultProfileImageUrl(user?.name);

    const { data: followings, isPending: isLoadingFollowings } =
        useGetFollowings("followerId", id);

    const { data: followers, isPending: isLoadingFollowers } = useGetFollowers(
        "followingId",
        id
    );

    const isLoggedInUserProfile = id === loggedInUser.id;

    if (isLoadingFollowings || isLoadingFollowers) return <Loader />;

    return (
        <div className="flex gap-6">
            <ProfileImage
                profileImage={profileImage}
                fallbackProfileImage={fallbackProfileImage}
                size="w-20 h-20 md:w-38 md:h-38"
            />

            {/* User profile info */}
            <div className="flex flex-col gap-6">
                <div>
                    <div className="flex items-center gap-10">
                        <h1 className="h3-bold md:h1-semibold mb-1">
                            {user?.name}
                        </h1>
                        {!isLoggedInUserProfile ? (
                            <FollowButton
                                followerId={loggedInUser.id}
                                followingId={id}
                                followers={followers?.documents}
                            />
                        ) : (
                            <EditProfileButton
                                loggedInUserId={loggedInUser.id}
                            />
                        )}
                    </div>

                    <p className="small-regular text-light-3">
                        {user?.username}
                    </p>
                </div>

                <ProfileStats
                    postsCount={user?.posts.length}
                    followersCount={followers?.documents.length || 0}
                    followingsCount={followings?.documents.length || 0}
                />

                <p className="max-w-xl whitespace-pre-wrap">{user?.bio}</p>
            </div>
        </div>
    );
}

export default ProfileInfo;
