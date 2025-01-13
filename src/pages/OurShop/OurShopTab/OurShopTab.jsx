import React from 'react';
import ProductCard from '../../../components/ProductCard/ProductCard';

const OurShopTab = ({ items }) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8'>
            {
                items.map((item) => <ProductCard item={item} key={item._id} />)
            }
        </div>
    );
};

export default OurShopTab;