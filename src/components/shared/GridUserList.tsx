import { Models } from "appwrite";
import UserCard from "./UserCard";
import { appwriteInfiniteData } from "@/types";

type GridUserListProps = {
    users: appwriteInfiniteData | Models.Document;
};

function GridUserList({ users }: GridUserListProps) {
    return (
        <div className="flex-center flex-wrap w-full max-w-5xl gap-8 mb-8">
            {users.pages.map((item: Models.Document) => {
                return item.documents.map((user: Models.Document) => (
                    <UserCard user={user} key={user.$id} />
                ));
            })}
        </div>
    );
}

export default GridUserList;
