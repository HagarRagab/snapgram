import { Link } from "react-router";
import editIcon from "/assets/icons/edit.svg";

type EditProfileButtonProps = {
    loggedInUserId: string;
    showIcon?: boolean;
    style?: string;
};

function EditProfileButton({
    loggedInUserId,
    showIcon = true,
    style,
}: EditProfileButtonProps) {
    return (
        <Link
            to={`/update-profile/${loggedInUserId}`}
            className={`${
                style
                    ? style
                    : "flex items-center gap-2 py-2 px-4 bg-dark-4 rounded-lg hover:bg-dark-3 text-xs md:text-base"
            }`}
        >
            {showIcon && (
                <img
                    src={editIcon}
                    alt="edit"
                    width={20}
                    height={20}
                    className="hidden md:block"
                />
            )}
            Edit profile
        </Link>
    );
}

export default EditProfileButton;
