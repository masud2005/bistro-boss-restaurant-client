import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import featured from '../../../assets/home/featured.jpg';
import './Featured.css';

const Featured = () => {
    return (
        <section className="featured-item pt-1 mt-20 relative px-2">
            {/* overlay */}
            <div className='absolute inset-0 bg-black bg-opacity-50'></div>

            <div className='relative text-white'>
                {/* Section Title */}
                <SectionTitle heading={'From our menu'} subHeading={'Check it out'} />

                {/* Section Content */}
                <div className='md:flex items-center container mx-auto space-x-5 lg:space-x-10 pb-24 '>
                    <div>
                        <img src={featured} alt="Featured..." />
                    </div>
                    <div className='mt-5'>
                        <h5 className='text-lg'>March 20, 2023</h5>
                        <h4 className='uppercase text-xl'>Where can i get some?</h4>
                        <p className='text-gray-200'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus labore dolore minus eligendi. Optio, tenetur consectetur. Doloribus culpa qui illo sint, distinctio pariatur rerum! Exercitationem rerum ipsa id ducimus beatae nobis laboriosam asperiores velit recusandae nihil rem adipisci harum fugit enim reprehenderit explicabo nam praesentium aperiam, blanditiis eum doloremque ipsam.</p>

                        <button className='uppercase mt-5 py-2 px-5 border-b-4 border-white rounded-xl hover:bg-gray-800 transition font-semibold'>Read More</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;