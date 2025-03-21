import { Link } from "react-router";
import { Button } from "../ui/button";
import { useSignout } from "@/lib/react-query/queries";
import { useAuthContext } from "@/context/AuthContext";
import logo from "/assets/images/logo.svg";
import logoutIcon from "/assets/icons/logout.svg";

function Topbar() {
    const { user } = useAuthContext();

    const { mutate: signout } = useSignout();

    // topbar class it a custom utility in globals.css
    return (
        <header className="topbar">
            <div className="flex-between gap-3 px-5 py-4">
                <Link to="/">
                    <img src={logo} alt="logo" width={130} height={325} />
                </Link>

                <div className="flex">
                    <Button
                        variant="ghost"
                        className="shad-button_ghost cursor-pointer"
                        onClick={() => signout()}
                    >
                        <img src={logoutIcon} alt="logout icon" />
                    </Button>
                    <Link to={`/profile/${user.id}`} className="flex-center">
                        <img
                            src={user.imageUrl || "assets/images/profile.png"}
                            alt="profile"
                            className="w-8 h-8 rounded-full"
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Topbar;
