import React, { useState } from 'react';
import Cover from '../../Shared/Cover/Cover';
import bannerShop from '../../../assets/shop/banner2.jpg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';
import OurShopTab from '../OurShopTab/OurShopTab';
import { useParams } from 'react-router-dom';

const OurShop = () => {
    const categories = ['salad', 'pizza', 'soups', 'desserts', 'drinks'];
    const {category} = useParams();
    // console.log(category);
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();
    const drinks = menu.filter(item => item.category === 'drinks');
    const dessert = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
    return (
        <div>
            <Cover img={bannerShop} title={'Our Shop'} des={'Would you like to try a dish?'} />
            <div className='container mx-auto px-2 my-10 md:my-16 lg:my-20'>
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>SALAD</Tab>
                        <Tab>PIZZA</Tab>
                        <Tab>SOUPS</Tab>
                        <Tab>DESSERTS</Tab>
                        <Tab>DRINKS</Tab>
                    </TabList>

                    <TabPanel>
                        <OurShopTab items={salad} />
                    </TabPanel>
                    <TabPanel>
                        <OurShopTab items={pizza} />
                    </TabPanel>
                    <TabPanel>
                        <OurShopTab items={soup} />
                    </TabPanel>
                    <TabPanel>
                        <OurShopTab items={dessert} />
                    </TabPanel>
                    <TabPanel>
                        <OurShopTab items={drinks} />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default OurShop;