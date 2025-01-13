import React from 'react';
import { Parallax, Background } from 'react-parallax';

const Cover = ({ title, des, img }) => {
    return (
        <div>
            <Parallax
                blur={{ min: -15, max: 15 }}
                bgImage={img}
                bgImageAlt="The menu..."
                strength={-200}
            >
                <div
                    className="hero h-[320px] md:h-[500px] 2xl:h-[650px]">
                    <div className="hero-overlay bg-opacity-30"></div>
                    <div className="hero-content text-neutral-content text-center bg-black bg-opacity-50 md:min-w-[576px] lg:min-w-[768px] xl:min-w-[1024px]">
                        <div className="md:py-[50px] 2xl:py-[100px] ">
                            <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                            <p className="mb-5 max-w-[768px] mx-auto">
                                {des}
                            </p>
                        </div>
                    </div>
                </div>
            </Parallax>
        </div>
    );
};

export default Cover;