import React, { useEffect, useState } from "react";
import { Models } from "appwrite";

import { useGetCurrentUser, useLikePost } from "@/lib/react-query/queries";
import { useSavePost } from "@/lib/react-query/queries";
import { useUnSavePost } from "@/lib/react-query/queries";
import likeIcon from "/assets/icons/like.svg";
import likedIcon from "/assets/icons/liked.svg";
import saveIcon from "/assets/icons/save.svg";
import savedIcon from "/assets/icons/saved.svg";
import Loader from "./Loader";

type PostStatsProp = {
    post: Models.Document;
    userId: string;
};

function PostStats({ post, userId }: PostStatsProp) {
    const { data: currentUser } = useGetCurrentUser(); // Contains all user's info and documents related to this user => posts, likes, saves, ...
    const { mutate: likePost } = useLikePost();
    const { mutate: savePost, isPending: isSaving } = useSavePost();
    const { mutate: unSavePost, isPending: isUnSaving } = useUnSavePost();

    const savedPostRecord = currentUser?.save.find(
        (record: Models.Document) => record.post.$id === post.$id
    );
    const [likes, setLikes] = useState(() =>
        post.likes.map((user: Models.Document) => user.$id)
    );
    const [isSaved, setIsSaved] = useState(() => false);
    const isLiked = likes.includes(userId);

    useEffect(() => {
        setIsSaved(!!savedPostRecord);
    }, [savedPostRecord]);

    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation();

        let updatedLikes: string[] = [...likes];
        if (isLiked) {
            updatedLikes = likes.filter((id: string) => id !== userId);
        } else {
            updatedLikes.push(userId);
        }

        likePost({ postId: post.$id, likesArray: updatedLikes });
        setLikes(updatedLikes);
    };

    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (isSaved) {
            unSavePost({ savedRecordId: savedPostRecord.$id });
            setIsSaved(false);
        } else {
            savePost({ postId: post.$id, userId });
            setIsSaved(true);
        }
    };

    return (
        <div className="flex-between z-20">
            {/* Likes */}
            <div className="flex items-center gap-2">
                <img
                    src={isLiked ? likedIcon : likeIcon}
                    alt="like"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    title={"like"}
                    onClick={handleLikePost}
                />
                <span className="small-medium lg:base-medium">
                    {likes.length}
                </span>
            </div>

            {/* save */}
            <div>
                {isSaving || isUnSaving ? (
                    <Loader />
                ) : (
                    <img
                        src={isSaved ? savedIcon : saveIcon}
                        alt="like"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                        onClick={handleSavePost}
                    />
                )}
            </div>
        </div>
    );
}

export default PostStats;
