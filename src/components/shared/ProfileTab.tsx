import { NavLink } from "react-router";

type ProfileTabProps = {
    icon: string;
    alt: string;
    path: string;
    end?: boolean;
    children: string;
};

function ProfileTab({ icon, alt, path, end, children }: ProfileTabProps) {
    return (
        <NavLink
            to={path}
            end={end && (path === "" || path === "/")}
            className={({ isActive }: { isActive: boolean }) =>
                isActive ? "profile-tab-active profile-tab" : "profile-tab"
            }
        >
            <img src={icon} alt={alt} width={20} height={20} />
            {children}
        </NavLink>
    );
}

export default ProfileTab;
