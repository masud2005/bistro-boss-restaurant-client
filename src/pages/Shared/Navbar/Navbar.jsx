import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import useCart from '../../../hooks/useCart';
import { FaCartPlus } from 'react-icons/fa';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [cart] = useCart();

    // Theme Loaded localStorage 
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    // Theme Changes
    const toggleTheme = () => {
        const newTheme = !isDarkMode ? 'dark' : 'light';
        setIsDarkMode(!isDarkMode);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Sign Out Successfully!',
                    text: 'You have been Sign out. See you soon!',
                    timer: 3000,
                    customClass: {
                        confirmButton: 'bg-teal-400 text-white'
                    }
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Sign Out Failed',
                    text: `Something went wrong: ${error.code}. Please try again.`,
                    timer: 3000,
                    customClass: {
                        confirmButton: 'bg-red-400 text-white'
                    }
                });
            })
    }

    return (
        <nav className="h-[75px] md:h-[90px] fixed z-10 left-0 right-0 place-content-center bg-black bg-opacity-50 text-white uppercase">
            <div className="container mx-auto flex justify-between items-center  py-4 px-2">
                {/* Left Section: Logo */}
                <div className="flex items-center">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-teal-500 text-transparent bg-clip-text uppercase">Bistro Boss</h1>
                </div>

                <div className='flex  gap-6'>
                    {/* Center Section: Navigation Links */}
                    <div className="hidden lg:flex items-center justify-end gap-6">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'text-base hover:text-yellow-400'}>Home</NavLink>
                        <NavLink to="/our-menu" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'text-base hover:text-yellow-400'}>Our Menu</NavLink>
                        <NavLink to="/our-shop/salad" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'text-base hover:text-yellow-400'}>Our Shop</NavLink>
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'text-base hover:text-yellow-400'}>Dashboard</NavLink>
                        {/* {
                            user && <>
                                <NavLink to="/add-equipment" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'text-base hover:text-yellow-400'}>Add Equipment</NavLink>
                                <NavLink to="/my-equipment-list" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'text-base hover:text-yellow-400'}>My Equipment List</NavLink>
                            </>
                        } */}
                        <NavLink to="/about-us" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'text-base hover:text-yellow-400'}>About Us</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'text-base hover:text-yellow-400'}>Contact</NavLink>
                        <button className="flex justify-center gap-2 ">
                            <FaCartPlus size={28} />
                            <div className="badge badge-secondary -ml-4 -mt-2">{cart.length}</div>
                        </button>
                    </div>

                    {/* Right Section: Login/Register Buttons */}
                    <div className="hidden lg:flex gap-3 items-center">
                        {
                            user ? <div className="flex items-center gap-3">

                                <button onClick={handleSignOut} className='uppercase text-base hover:text-yellow-400'>Sign Out</button>
                                <div>
                                    <img data-tooltip-id="my-tooltip-1" className="rounded-full w-12 h-12 border border-teal-600 shadow-md transition-transform transform hover:scale-110" src={user?.photoURL || 'https://img.icons8.com/?size=48&id=z-JBA_KtSkxG&format=png'} alt="" />
                                </div>

                            </div> :
                                <div className='flex gap-6 items-center'>
                                    <NavLink to="/sign-in" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'text-base hover:text-yellow-400'}>Sign in</NavLink>
                                    {/* <NavLink to="/register" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'text-base hover:text-yellow-400'}>Register</NavLink> */}
                                </div>
                        }
                        <button
                            onClick={toggleTheme}
                            className={`w-10 h-10 flex items-center justify-center rounded-full border  shadow-md transition-transform transform hover:scale-110`}
                        >
                            {isDarkMode ? (
                                <MdOutlineLightMode size={24} />
                            ) : (
                                <MdOutlineDarkMode size={24} />
                            )}
                        </button>
                    </div>

                </div>
                {/* Hamburger Menu for Mobile */}
                <div onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden bg-gradient-to-r from-indigo-300 to-teal-300 p-2 rounded-md text-2xl cursor-pointer">
                    {menuOpen ? <IoMdClose /> : <IoMdMenu />}
                </div>
            </div>


            {/* Mobile Menu */}
            <button className={`w-10 h-10 flex items-center justify-center rounded-full border shadow-md transition-transform transform hover:scale-110 absolute top-6 right-28 lg:hidden -mt-[5px] md:mt-[2px]`}>
                <FaCartPlus size={28} />
                <div className="badge badge-secondary -ml-4 -mt-10">{cart.length}</div>
            </button>
            <button
                onClick={toggleTheme}
                className={`w-10 h-10 flex items-center justify-center rounded-full border shadow-md transition-transform transform hover:scale-110 absolute top-6 right-14 lg:hidden -mt-[5px] md:mt-[2px]`}
            >
                {isDarkMode ? (
                    <MdOutlineLightMode size={24} />
                ) : (
                    <MdOutlineDarkMode size={24} />
                )}
            </button>

            <div className={`${menuOpen ? 'left-0' : '-left-[100%]'} absolute duration-500 w-full bg-black bg-opacity-70`}>
                <div className={`flex-col lg:hidden gap-4 py-4 px-4`}>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/our-menu" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>Our Menu</NavLink>
                    <NavLink to="/our-shop/salad" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>Our Shop</NavLink>
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
                    {
                        user && <>
                            <NavLink to="/add-equipment" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>Add Equipment</NavLink>
                            <NavLink to="/my-equipment-list" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>My Equipment List</NavLink>
                        </>
                    }
                    <NavLink to="/about-us" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>About Us</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>Contact</NavLink>

                    {/* <NavLink to="/add-equipment" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>Add Equipment</NavLink>
                    <NavLink to="/my-equipment-list" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>My Equipment List</NavLink> */}
                    <div className='flex gap-10 justify-around pt-5 mt-4 border-t-2'>
                        {
                            user ? <div className="flex items-center gap-3">
                                <div>
                                    <img data-tooltip-id="my-tooltip-1" className="rounded-full w-14 h-14 border border-teal-600 shadow-md transition-transform transform hover:scale-110" src={user?.photoURL || 'https://img.icons8.com/?size=48&id=z-JBA_KtSkxG&format=png'} alt="" />
                                </div>
                                <button onClick={handleSignOut} className='uppercase text-base hover:text-yellow-400'>Sign Out</button>
                            </div> :
                                <div className='flex gap-10'>
                                    <NavLink to="/sign-in" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'block text-base hover:text-teal-600'} onClick={() => setMenuOpen(false)}>Sign In</NavLink>
                                    {/* <NavLink to="/register" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-yellow-400 text-yellow-300' : 'block text-base hover:text-teal-600'} onClick={() => setMenuOpen(false)}>Register</NavLink> */}
                                </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;