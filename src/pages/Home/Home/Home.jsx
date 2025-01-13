import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularMenu from '../PopularMenu/PopularMenu';
import Featured from '../Featured/Featured';
import Testimonials from '../Testimonials/Testimonials';
import MenuButton from '../../../components/MenuButton/MenuButton';

const Home = () => {
    return (
        <div>
            <Banner />
            <Category />
            <PopularMenu />
            <MenuButton text={'View full menu'} />
            <Featured />
            <Testimonials />
        </div>
    );
};

export default Home;