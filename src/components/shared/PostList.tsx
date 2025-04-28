import { useAuthContext } from "@/context/AuthContext";
import { defaultProfileImageUrl, generateImageUrl } from "@/utils/utils";
import { Models } from "appwrite";
import { Link } from "react-router";
import Loader from "./Loader";
import PostStats from "./PostStats";
import ProfileImage from "./ProfileImage";

type PostListProps = {
    posts: Models.Document[] | undefined;
    showUser?: boolean;
    showStats?: boolean;
};

function PostList({ posts, showUser = true, showStats = true }: PostListProps) {
    const { user, isLoading } = useAuthContext();

    return posts?.map((post: Models.Document) => {
        const postImageUrl = generateImageUrl(post?.imageId, "media");
        const profileImage = generateImageUrl(user?.imageId, "profiles");
        const fallbackProfileImage = defaultProfileImageUrl(
            post?.creator?.name
        );

        return (
            <li key={post.$id} className="relative min-w-80 h-80">
                <Link to={`/posts/${post?.$id}`} className="grid-post_link">
                    <img
                        src={postImageUrl}
                        alt={post?.caption}
                        className="w-full h-full object-cover"
                    />
                </Link>

                <div className="grid-post_user">
                    {showUser && (
                        <div className="flex items-center gap-2 flex-1">
                            {isLoading ? (
                                <Loader />
                            ) : (
                                <ProfileImage
                                    profileImage={profileImage}
                                    fallbackProfileImage={fallbackProfileImage}
                                    size="w-8 h-8"
                                />
                            )}
                            <p>{post?.creator.name}</p>
                        </div>
                    )}
                    {showStats && <PostStats post={post} userId={user.id} />}
                </div>
            </li>
        );
    });
}

export default PostList;
