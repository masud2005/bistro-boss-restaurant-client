import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Rating } from '@smastrom/react-rating';

import '@smastrom/react-rating/style.css';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Import Swiper modules
import { Navigation, Autoplay } from 'swiper/modules'; // Autoplay module ইমপোর্ট করুন
import { BiSolidQuoteSingleLeft } from 'react-icons/bi';

const Testimonials = () => {
    const [reviews, setReviews0] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => {
                setReviews0(data);
            });
    }, []);

    return (
        <div className='container mx-auto mb-24'>
            {/* Section Title */}
            <SectionTitle heading={'Testimonials'} subHeading={'What Our Clients Say'} />

            {/* Slider */}
            <Swiper
                navigation={true}
                autoplay={{
                    delay: 3000, // 3 সেকেন্ড পর স্লাইড পরিবর্তন হবে
                    // disableOnInteraction: false, // ইন্টারঅ্যাকশনের পরও autoplay চালু থাকবে
                }}
                modules={[Navigation, Autoplay]} // Autoplay মডিউল যোগ করুন
                className="mySwiper"
            >
                {
                    reviews.map(item => (
                        <SwiperSlide key={item._id}>
                            <div className='px-14 md:px-20 text-center '>
                                <div className='flex justify-center mb-5'>
                                    <Rating
                                        style={{ maxWidth: 180 }}
                                        value={item.rating}
                                    />
                                </div>
                                <div className='flex justify-center mb-5'>
                                    <BiSolidQuoteSingleLeft size={90} width={0} color='black' />
                                    <BiSolidQuoteSingleLeft size={90} className='-ml-10' color='black' />
                                </div>
                                <p className='text-gray-700'>{item.details}</p>
                                <h1 className='text-3xl text-[#CD9003] uppercase mt-2'>{item.name}</h1>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default Testimonials;
