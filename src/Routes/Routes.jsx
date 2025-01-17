import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import OurMenu from "../pages/OurMenu/OurMenu/OurMenu";
import OurShop from "../pages/OurShop/OurShop/OurShop";
import SignIn from "../pages/Login/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import AdminRoute from "./AdminRoute";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../pages/Dashboard/UserHome/UserHome";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/our-menu',
                element: <OurMenu />
            },
            {
                path: '/our-shop/:category',
                element: <OurShop />
            },
            {
                path: '/sign-in',
                element: <SignIn />
            },
            {
                path: '/sign-up',
                element: <SignUp />
            },
        ]
    },

    // Dashboard 
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: '/dashboard/userHome',
                element: <UserHome />
            },
            {
                path: '/dashboard/cart',
                element: <Cart />
            },
            {
                path: '/dashboard/payment',
                element: <Payment />
            },
            {
                path: '/dashboard/paymentHistory',
                element: <PaymentHistory />
            },

            // Admin only routes
            {
                path: '/dashboard/adminHome',
                element: <AdminRoute><AdminHome /></AdminRoute>
            },
            {
                path: '/dashboard/addItems',
                element: <AdminRoute><AddItems /></AdminRoute>
            },
            {
                path: '/dashboard/manageItems',
                element: <AdminRoute><ManageItems /></AdminRoute>
            },
            {
                path: '/dashboard/updateItem/:id',
                element: <AdminRoute><UpdateItem /></AdminRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/our-menu/${params.id}`)
            },
            {
                path: '/dashboard/users',
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
        ]
    }
])

export default router;