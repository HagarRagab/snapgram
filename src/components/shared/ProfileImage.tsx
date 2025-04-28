import { useState } from "react";

import placeholderImg from "/assets/icons/profile-placeholder.svg";

type ProfileImageProps = {
    profileImage?: string;
    fallbackProfileImage: string;
    size: string;
};

function ProfileImage({
    profileImage,
    fallbackProfileImage,
    size,
}: ProfileImageProps) {
    const [imgSrc, setImgSrc] = useState(profileImage || fallbackProfileImage);

    return (
        <img
            onError={() => setImgSrc(fallbackProfileImage)}
            src={imgSrc || placeholderImg}
            alt="profile"
            className={`${size} rounded-full object-cover`}
        />
    );
}

export default ProfileImage;
