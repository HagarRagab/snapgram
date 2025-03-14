import ProfileTab from "./ProfileTab";
import wallpaperIcon from "/assets/icons/wallpaper.svg";
import likeIcon from "/assets/icons/like.svg";

function ProfileTabs() {
    return (
        <div className="profile-tabs">
            <ProfileTab icon={wallpaperIcon} alt="posts" path="" end={true}>
                Posts
            </ProfileTab>
            <ProfileTab icon={likeIcon} alt="likes" path="liked-posts">
                Likes
            </ProfileTab>
        </div>
    );
}

export default ProfileTabs;
