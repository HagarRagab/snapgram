import { Models } from "appwrite";
import { Link } from "react-router";

import { useAuthContext } from "@/context/AuthContext";
import { useGetFollowers } from "@/lib/react-query/queries";
import { defaultProfileImageUrl, generateImageUrl } from "@/utils/utils";
import EditProfileButton from "./EditProfileButton";
import FollowButton from "./FollowButton";
import Loader from "./Loader";
import ProfileImage from "./ProfileImage";

type UserCardProps = {
    user: Models.Document;
};

function UserCard({ user }: UserCardProps) {
    const { user: currentUser } = useAuthContext();
    const { data: followers, isPending: isLoadingFollowers } = useGetFollowers(
        "followingId",
        user.$id
    );

    const displayFollowButton = isLoadingFollowers ? (
        <Loader />
    ) : (
        <FollowButton
            followerId={currentUser.id}
            followingId={user.$id}
            followers={followers?.documents}
        />
    );

    return (
        <div className="user-card min-w-72">
            <Link
                to={`/profile/${user.$id}`}
                className="flex-center flex-col gap-2"
            >
                <ProfileImage
                    profileImage={generateImageUrl(user.imageId, "profiles")}
                    fallbackProfileImage={defaultProfileImageUrl(user.name)}
                    size="w-16 h-16"
                />
                <h3 className="h3-bold">{user.name}</h3>
                <p className="text-light-3 small-regular">{user.username}</p>
            </Link>
            {user.$id !== currentUser.id ? (
                displayFollowButton
            ) : (
                <EditProfileButton
                    loggedInUserId={user.id}
                    showIcon={false}
                    style="button_outlined"
                />
            )}
        </div>
    );
}

export default UserCard;
