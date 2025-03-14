import { Models } from "appwrite";
import { Link } from "react-router";

import { useGetFollowers } from "@/lib/react-query/queries";
import { useAuthContext } from "@/context/AuthContext";
import FollowButton from "./FollowButton";
import Loader from "./Loader";
import EditProfileButton from "./EditProfileButton";

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
                <img
                    src={user.imageUrl}
                    alt={`${user.name}'s image`}
                    className="w-16 h-16 rounded-full"
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
