import { Models } from "appwrite";
import { Link } from "react-router";

import { useAuthContext } from "@/context/AuthContext";
import { Button } from "../ui/button";

type UserCardProps = {
    user: Models.Document;
};

function UserCard({ user }: UserCardProps) {
    const { user: currentUser } = useAuthContext();

    return (
        <div className="user-card min-w-72">
            <img
                src={user.imageUrl}
                alt={`${user.name}'s image`}
                className="w-16 h-16 rounded-full"
            />
            <h3 className="h3-bold">{user.name}</h3>
            <p className="text-light-3 small-regular">{user.username}</p>
            {user.$id !== currentUser.id ? (
                <Button
                    variant="default"
                    className="bg-primary-500 cursor-pointer hover:bg-primary-600"
                >
                    Follow
                </Button>
            ) : (
                <Link
                    to={`/update-profile/${user.id}`}
                    className="cursor-pointer py-2 px-4 border-light-1 border-2 rounded-md text-sm font-medium hover:border-light-3"
                >
                    Edit profile
                </Link>
            )}
        </div>
    );
}

export default UserCard;
