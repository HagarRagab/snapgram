import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { useSignout } from "@/lib/react-query/queries";
import { useAuthContext } from "@/context/AuthContext";

function Topbar() {
    const navigate = useNavigate();

    const { user } = useAuthContext();

    const { mutate: signout, isSuccess } = useSignout();

    // We used useEffect because isSuccess is an asynchronous state change.
    useEffect(() => {
        if (isSuccess) navigate(0);
    }, [isSuccess, navigate]);

    // topbar class it a custom utility in globals.css
    return (
        <header className="topbar">
            <div className="flex-between gap-3 px-5 py-4">
                <Link to="/">
                    <img
                        src="assets/images/logo.svg"
                        alt="logo"
                        width={130}
                        height={325}
                    />
                </Link>

                <div className="flex gap-4">
                    <Button
                        variant="ghost"
                        className="shad-button_ghost cursor-pointer"
                        onClick={() => signout()}
                    >
                        <img src="assets/icons/logout.svg" alt="logout icon" />
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
