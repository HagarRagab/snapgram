import { Models } from "appwrite";
import UserCard from "./UserCard";

type GridUserListProps = {
    users?: Models.DocumentList<Models.Document>[];
};

function GridUserList({ users }: GridUserListProps) {
    return (
        <div className="flex-center flex-wrap w-full max-w-5xl gap-8 mb-8">
            {users?.map((item) => {
                return item.documents.map((user: Models.Document) => (
                    <UserCard user={user} key={user.$id} />
                ));
            })}
        </div>
    );
}

export default GridUserList;
