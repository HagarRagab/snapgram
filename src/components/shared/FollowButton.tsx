import { Models } from "appwrite";
import { useFollowUser, useUnFollowUser } from "@/lib/react-query/queries";
import { Button } from "../ui/button";

type FollowButtonProps = {
    followerId: string;
    followingId?: string;
    followers?: Models.Document[];
};

function FollowButton({
    followerId,
    followingId,
    followers,
}: FollowButtonProps) {
    const { mutate: followUser } = useFollowUser();
    const { mutate: unFollowUser } = useUnFollowUser();

    const isFollowed = followers?.some(
        (item) => item.followerId === followerId
    );

    function handleFollow() {
        followUser({ followerId, followingId });
    }

    function handleUnFollow() {
        const deletedDocumentId = followers?.find(
            (item: Models.Document) => item.followerId === followerId
        )?.$id;

        unFollowUser({ documentId: deletedDocumentId });
    }

    return isFollowed ? (
        <Button className="shad-button_dark_4" onClick={handleUnFollow}>
            Following
        </Button>
    ) : (
        <Button className="shad-button_primary" onClick={handleFollow}>
            Follow
        </Button>
    );
}

export default FollowButton;
