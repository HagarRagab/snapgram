import { useAuthContext } from "@/context/AuthContext";
import { JSX } from "react";
import { Navigate, useParams } from "react-router";

type ProtectedRouteProps = {
    children: JSX.Element;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user } = useAuthContext();
    const { id } = useParams();

    return user.id === id ? (
        children
    ) : (
        <Navigate to={`/profile/${id}`} replace />
    );
}

export default ProtectedRoute;
