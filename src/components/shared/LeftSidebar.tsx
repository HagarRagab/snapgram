import { Link, NavLink, useLocation } from "react-router";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { useSignout } from "@/lib/react-query/queries";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import logo from "/assets/images/logo.svg";
import logoutIcon from "/assets/icons/logout.svg";
import placeholderImg from "/assets/icons/profile-placeholder.svg";

function LeftSidebar() {
    const location = useLocation();
    const { user } = useAuthContext();
    const { mutate: signout } = useSignout();

    return (
        <nav className="leftsidebar">
            <div className="flex flex-col gap-10">
                <Link to="/">
                    <img src={logo} alt="logo" width={170} height={36} />
                </Link>
                <Link
                    to={`/profile/${user.id}`}
                    className="flex gap-3 items-center"
                >
                    <img
                        src={user.imageUrl || placeholderImg}
                        alt="profile"
                        className="w-8 h-8 rounded-full"
                    />
                    <div className="flex flex-col">
                        <p className="body-bold">{user.name}</p>
                        <p className="small-regular text-light-3">
                            {user.username}
                        </p>
                    </div>
                </Link>
            </div>

            <ul className="flex flex-col gap-3 flex-1">
                {sidebarLinks.map((link: INavLink) => {
                    const isActive = link.route === location.pathname;
                    return (
                        <li
                            key={link.label}
                            className={`leftsidebar-link group ${
                                isActive && "bg-primary-500"
                            }`}
                        >
                            <NavLink
                                to={link.route}
                                className="flex gap-4 items-center p-3"
                            >
                                <img
                                    src={link.imgURL}
                                    alt={link.label}
                                    className={`group-hover:invert-white ${
                                        isActive && "invert-white"
                                    }`}
                                />
                                {link.label}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>

            <Button
                variant="ghost"
                className="shad-button_ghost cursor-pointer"
                onClick={() => signout()}
            >
                <img src={logoutIcon} alt="logout" />
                <p className="small-medium lg:base-medium">Logout</p>
            </Button>
        </nav>
    );
}

export default LeftSidebar;
