import React from 'react';
import Cover from '../../Shared/Cover/Cover';
import bannerMenu from '../../../assets/menu/banner3.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import MenuCategory from '../MenuCategory/MenuCategory';
import dessertBg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaBg from '../../../assets/menu/pizza-bg.jpg';
import saladBg from '../../../assets/menu/salad-bg.jpg';
import soupBg from '../../../assets/menu/soup-bg.jpg';

const OurMenu = () => {
    const [menu] = useMenu();
    const todayOffered = menu.filter(item => item.category === 'offered');
    const dessert = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
    // console.log(dessert);

    return (
        <div>
            <Cover img={bannerMenu} title={'Our Menu'} des={'Would you like to try a dish?'} />

            {/* Main Cover */}
            <SectionTitle heading={"Today's offer"} subHeading={"Don't miss"} />

            {/* Offered Menu Items */}
            <MenuCategory items={todayOffered} />

            {/* Dessert Menu Items */}
            <MenuCategory img={dessertBg} title={'desserts'} des={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet aliquam ipsum veniam, sunt vitae officia rerum. Aut ad natus consectetur!'} items={dessert} />

            {/* Pizza Menu Items */}
            <MenuCategory img={pizzaBg} title={'pizza'} des={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet aliquam ipsum veniam, sunt vitae officia rerum. Aut ad natus consectetur!'} items={pizza} />

            {/* Salad Menu Items */}
            <MenuCategory img={saladBg} title={'salad'} des={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet aliquam ipsum veniam, sunt vitae officia rerum. Aut ad natus consectetur!'} items={salad} />

            {/* Soup Menu Items */}
            <div className='mb-10'>
                <MenuCategory img={soupBg} title={'soups'} des={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet aliquam ipsum veniam, sunt vitae officia rerum. Aut ad natus consectetur!'} items={soup} />
            </div>
        </div>
    );
};

export default OurMenu;