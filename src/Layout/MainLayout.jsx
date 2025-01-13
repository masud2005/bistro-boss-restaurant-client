import React from 'react';
import Navbar from '../pages/Shared/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';

const MainLayout = () => {
    const location = useLocation();
    // console.log(location);
    const noHeaderFooter = location.pathname.includes('sign-in') || location.pathname.includes('sign-up');
    // console.log(noHeaderFooter);
    return (
        <div>
            {noHeaderFooter || <Navbar />}
            <div className='min-h-[calc(100vh-288px)]'>
                <Outlet />
            </div>
            {noHeaderFooter || <Footer />}
        </div>
    );
};

export default MainLayout;