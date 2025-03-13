import TopPage from "@/components/shared/TopPage";
import Loader from "@/components/shared/Loader";
import ProfileForm from "@/components/forms/ProfileForm";
import editIcon from "/assets/icons/edit.svg";
import { useGetCurrentUser } from "@/lib/react-query/queries";

function UpdateProfile() {
    const { data: user, isPending: isUserInfoLoading } = useGetCurrentUser();

    return (
        <div className="common-container">
            <TopPage icon={editIcon} alt="edit">
                Edit Profile
            </TopPage>

            {isUserInfoLoading || !user ? (
                <Loader />
            ) : (
                <ProfileForm user={user} />
            )}
        </div>
    );
}

export default UpdateProfile;
