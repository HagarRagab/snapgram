import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../context/AuthContext";

function AuthLayout() {
    const { isAuthenticated } = useAuthContext();

    return (
        <>
            {isAuthenticated ? (
                <Navigate to="/" />
            ) : (
                <>
                    <section className="flex flex-col py-10 justify-center items-center flex-1">
                        <Outlet />
                    </section>
                    <img
                        src="/assets/images/side-img.svg"
                        alt="Branding logo image"
                        className="hidden lg:block w-1/2 h-screen bg-no-repeat object-cover"
                    />
                </>
            )}
        </>
    );
}

export default AuthLayout;
