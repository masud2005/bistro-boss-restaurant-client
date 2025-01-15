import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <h1 className='text-5xl font-bold'>Loading...</h1>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to={'/'} state={location.pathname}></Navigate>

};

export default AdminRoute;