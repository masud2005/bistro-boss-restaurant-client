import React from 'react';
import { Link } from 'react-router-dom';

const MenuButton = ({ text }) => {
    return (
        <div className='text-center mt-3'>
            <Link to={`/order`}>
                <button className='uppercase mt-5 py-2 px-5 border-b-[3px] border-gray-700 rounded-lg hover:bg-gray-700 hover:text-white transition duration-300 font-semibold'>{text}</button>
            </Link>
        </div>
    );
};

export default MenuButton;