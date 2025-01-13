// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import slide5 from '../../../assets/home/slide5.jpg'

// import required modules
import { Pagination } from 'swiper/modules';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <div className='container mx-auto '>
            {/* Section Title */}
            <SectionTitle
                subHeading={'From 11:00am to 10:00pm'}
                heading={'Order online'}
            />

            <Swiper
                slidesPerView={5}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide className=''>
                    <img className='w-full xl:h-[400px]' src={slide1} alt="Category Image" />
                    <h2 className='text-center md:text-xl lg:text-3xl text-white absolute bottom-10 left-1/2 transform -translate-x-1/2 uppercase'>Salade</h2>
                </SwiperSlide>
                <SwiperSlide className=''>
                    <img className='w-full xl:h-[400px]' src={slide2} alt="Category Image" />
                    <h2 className='text-center md:text-xl lg:text-3xl text-white absolute bottom-10 left-1/2 transform -translate-x-1/2 uppercase'>Soups</h2>
                </SwiperSlide>
                <SwiperSlide className=''>
                    <img className='w-full xl:h-[400px]' src={slide3} alt="Category Image" />
                    <h2 className='text-center md:text-xl lg:text-3xl text-white absolute bottom-10 left-1/2 transform -translate-x-1/2 uppercase'>Pizzas</h2>
                </SwiperSlide>
                <SwiperSlide className=''>
                    <img className='w-full xl:h-[400px]' src={slide4} alt="Category Image" />
                    <h2 className='text-center md:text-xl lg:text-3xl text-white absolute bottom-10 left-1/2 transform -translate-x-1/2 uppercase'>Desserts</h2>
                </SwiperSlide>
                <SwiperSlide className=''>
                    <img className='w-full xl:h-[400px]' src={slide5} alt="Category Image" />
                    <h2 className='text-center md:text-xl lg:text-3xl text-white absolute bottom-10 left-1/2 transform -translate-x-1/2 uppercase'>Salade</h2>
                </SwiperSlide>
                <SwiperSlide className=''>
                    <img className='w-full xl:h-[400px]' src={slide3} alt="Category Image" />
                    <h2 className='text-center md:text-xl lg:text-3xl text-white absolute bottom-10 left-1/2 transform -translate-x-1/2 uppercase'>Pizzas</h2>
                </SwiperSlide>
            </Swiper>
        </div>
    );  
};

export default Category;