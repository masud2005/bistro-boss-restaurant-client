import React, { useEffect, useState } from 'react';
import { HiH1 } from 'react-icons/hi2';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu();
    // console.log(menu);

    const popularMenu = menu.filter(item => item.category === 'popular');

    return (
        <section className='container mx-auto px-2'>
            <SectionTitle heading={'From our menu'} subHeading={'Check it out'} />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {
                    popularMenu.map( item => <MenuItem key={item._id} item={item} />)
                }
            </div>
        </section>
    );
};

export default PopularMenu;