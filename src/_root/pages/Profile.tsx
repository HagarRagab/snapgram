import { Outlet, useParams } from "react-router";

import { useAuthContext } from "@/context/AuthContext";
import Loader from "@/components/shared/Loader";
import ProfileTabs from "@/components/shared/ProfileTabs";
import ProfileInfo from "@/components/shared/ProfileInfo";
import { useGetUserById } from "@/lib/react-query/queries";

function Profile() {
    const { id } = useParams();

    const { user: loggedInUser, isLoading: isLoadingLoggedInUser } =
        useAuthContext();

    const { data: user, isPending: isLoadingUser } = useGetUserById(id);

    const isLoggedInUserProfile = id === loggedInUser.id;

    if (isLoadingLoggedInUser || isLoadingUser) return <Loader />;

    return (
        <div className="profile-container">
            <div className="profile-inner_container">
                {/* Profile Info */}
                <ProfileInfo loggedInUser={loggedInUser} />

                <div className="flex-start w-full">
                    {/* Profile tabs */}
                    {isLoggedInUserProfile && <ProfileTabs />}
                </div>

                {/* Profile Posts */}
                <div>
                    <Outlet
                        context={{
                            likedPosts: user?.liked,
                            posts: user?.posts,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Profile;
