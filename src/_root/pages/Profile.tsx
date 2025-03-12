import { Link, Outlet, useParams } from "react-router";

import { useAuthContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queries";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import ProfileStat from "@/components/shared/ProfileStat";
import placeholderImg from "/assets/icons/profile-placeholder.svg";
import editIcon from "/assets/icons/edit.svg";
import Filter from "@/components/shared/Filter";
import wallpaperIcon from "/assets/icons/wallpaper.svg";
import likeIcon from "/assets/icons/like.svg";
import ProfileTab from "@/components/shared/ProfileTab";

function Profile() {
    const { id } = useParams();
    const { data: user, isPending: isLoadingUser } = useGetUserById(id);
    const { user: loggedInUser } = useAuthContext();
    const isLoggedInUserProfile = user?.$id === loggedInUser.id;

    if (isLoadingUser) return <Loader />;

    return (
        <div className="profile-container">
            <div className="profile-inner_container">
                <div className="flex gap-6">
                    <img
                        src={user?.imageUrl || placeholderImg}
                        alt="profile"
                        className="w-20 h-20 rounded-full md:w-38 md:h-38"
                    />

                    {/* User profile info */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <div className="flex items-center gap-10">
                                <h1 className="h3-bold md:h1-semibold mb-1">
                                    {user?.username}
                                </h1>
                                {!isLoggedInUserProfile ? (
                                    <Button className="bg-primary-500">
                                        Follow
                                    </Button>
                                ) : (
                                    <Link
                                        to={`/update-profile/${loggedInUser.id}`}
                                        className="flex items-center gap-2 py-2 px-4 bg-dark-4 rounded-lg hover:bg-dark-3 text-xs md:text-base"
                                    >
                                        <img
                                            src={editIcon}
                                            alt="edit"
                                            width={20}
                                            height={20}
                                            className="hidden md:block"
                                        />
                                        Edit profile
                                    </Link>
                                )}
                            </div>

                            <p className="small-regular text-light-3">
                                @{user?.username.replace(/\s/g, "")}
                            </p>
                        </div>

                        <div className="flex gap-8">
                            <ProfileStat count={user?.posts.length}>
                                Posts
                            </ProfileStat>
                            <ProfileStat count={50}>Followers</ProfileStat>
                            <ProfileStat count={20}>Following</ProfileStat>
                        </div>

                        <p className="max-w-xl">
                            {user?.bio}
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Aliquam distinctio dolorum, praesentium
                            voluptatum rerum, dicta laudantium non nisi mollitia
                            consequatur
                        </p>
                    </div>
                </div>

                <div className="flex-between w-full">
                    {/* Profile tabs */}
                    {isLoggedInUserProfile && (
                        <div className="profile-tabs">
                            <ProfileTab
                                icon={wallpaperIcon}
                                alt="posts"
                                path=""
                                end={true}
                            >
                                Posts
                            </ProfileTab>
                            <ProfileTab
                                icon={likeIcon}
                                alt="likes"
                                path="liked-posts"
                            >
                                Likes
                            </ProfileTab>
                        </div>
                    )}

                    {/* Filter */}
                    <Filter />
                </div>

                <div>
                    {/* Profile Posts */}
                    <Outlet
                        context={{
                            likedPosts: user?.liked,
                            posts: user?.posts,
                            showStats: false,
                            showUser: false,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Profile;
