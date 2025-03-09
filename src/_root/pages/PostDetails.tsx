import { Link, useNavigate, useParams } from "react-router";

import { useAuthContext } from "@/context/AuthContext";
import PostCreatorInfo from "@/components/shared/PostCreatorInfo";
import { useDeletePost, useGetPostById } from "@/lib/react-query/queries";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import backIcon from "/assets/icons/back.svg";
import editIcon from "/assets/icons/edit.svg";
import deleteIcon from "/assets/icons/delete.svg";
import PostCaption from "@/components/shared/PostCaption";
import PostStats from "@/components/shared/PostStats";

function PostDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: post, isPending: isGettingPost } = useGetPostById(id);
    const { user } = useAuthContext();
    const { mutate: deletePost, isPending: isDeletingPost } = useDeletePost();

    const handleDeletePost = () => {
        deletePost({ postId: post?.$id, imageId: post?.imageId });
        navigate(-1);
    };

    return (
        <div className="post_details-container">
            {/* Returning back icon */}
            <div className="hidden md:flex max-w-5xl w-full">
                <Button
                    onClick={() => navigate(-1)}
                    className="cursor-pointer shad-button_ghost"
                    variant="ghost"
                >
                    <img src={backIcon} alt="back" width={24} height={24} />
                    <p className="small-medium lg:base-medium">Back</p>
                </Button>
            </div>

            {/* Loader || Post details */}
            {isGettingPost ? (
                <Loader />
            ) : (
                <div className="post_details-card">
                    {/* Post image */}
                    <img
                        src={post?.imageUrl}
                        alt="post"
                        className="post_details-img"
                    />

                    {/* Post creator info */}
                    <div className="post_details-info">
                        <div className="flex-between w-full">
                            <PostCreatorInfo post={post} />

                            {/* edit and delete */}
                            <div className="flex-center">
                                <Link
                                    to={`/update-post/${post?.$id}`}
                                    className={`${
                                        user.id !== post?.creator.$id
                                            ? "hidden"
                                            : ""
                                    }`}
                                >
                                    <img
                                        src={editIcon}
                                        alt="edit"
                                        width={24}
                                        height={24}
                                    />
                                </Link>
                                <Button
                                    className={`${
                                        user.id !== post?.creator.$id
                                            ? "hidden"
                                            : ""
                                    } cursor-pointer`}
                                    variant="ghost"
                                    onClick={handleDeletePost}
                                    disabled={isDeletingPost}
                                >
                                    {isDeletingPost ? (
                                        <Loader />
                                    ) : (
                                        <img
                                            src={deleteIcon}
                                            alt="delete"
                                            width={24}
                                            height={24}
                                        />
                                    )}
                                </Button>
                            </div>
                        </div>
                        <hr className="border w-full border-dark-4/80" />

                        {/* Post Caption */}
                        <PostCaption post={post} classes="flex-1" />

                        {/* Post Stats */}
                        <div className="w-full">
                            <PostStats post={post} userId={user.id} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostDetails;
