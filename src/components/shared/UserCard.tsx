import { Models } from "appwrite";
import { Button } from "../ui/button";

type UserCardProps = {
    user: Models.Document;
};

function UserCard({ user }: UserCardProps) {
    console.log(user);
    return (
        <div className="user-card min-w-72">
            <img
                src={user.imageUrl}
                alt={`${user.name}'s image`}
                className="w-16 h-16 rounded-full"
            />
            <h3 className="h3-bold">{user.username}</h3>
            <p className="text-light-3 small-regular">@{user.name}</p>
            <Button
                variant="default"
                className="bg-primary-500 cursor-pointer hover:bg-primary-600"
            >
                Follow
            </Button>
        </div>
    );
}

export default UserCard;
