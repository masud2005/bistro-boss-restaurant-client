import React from 'react';

const MenuItem = ({item}) => {
    // console.log(item);
    const {category, image, name, price, recipe} = item;
    return (
        <div className='grid grid-cols-12 space-x-5'>
            <div className='col-span-2 w-[70px]  h-[80px] lg:w-[90px] xl:w-[110px] xl:h-[104px] 2xl:w-[112px]'>
                <img style={{borderRadius: '0px 200px 200px 200px'}} className='w-full h-full ' src={image} alt="Popular Menu..." />
            </div>
            <div className='col-span-8'>
                <h3 className='text-xl text-gray-600'>{name}-----------------</h3>
                <p className='text-gray-500'>{recipe}</p>
            </div>
            <div className='col-span-2'>
                <p className='text-[#BB8506]'>${price}</p>
            </div>
        </div>
    );
};

export default MenuItem;