import React from 'react';

const SectionTitle = ({subHeading, heading}) => {
    return (
        <div className="max-w-[424px] mx-auto mt-[70px] mb-10 px-2" bis_skin_checked="1">
            <p className="text-[#D99904] text-xl text-center pb-2">---{subHeading}---</p>
            <h1 className="text-4xl font-medium border-y-[3px] py-3 text-center uppercase">{heading}</h1>
        </div>
    );
};

export default SectionTitle;