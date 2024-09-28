import { Navigate, Outlet } from "react-router-dom";
import { getUserInfo } from "../utils/utlis";

export const ProtectedRoute = () => {
    const isAuthenticated = !!getUserInfo()

    if (!isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
}