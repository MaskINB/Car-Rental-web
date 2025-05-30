import React from 'react'
import { FaArrowDownLong } from "react-icons/fa6";

const CarouselButton = () => {
  return (
    <div className="">
      {/* Gradient Border Wrapper */}
      <div className="p-[3px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-xl hover:scale-110 transition-transform duration-300">
        {/* Inner Button with glass effect */}
        <div className=" bg-gray-900/80 backdrop-blur-lg rounded-full p-4">
          <FaArrowDownLong className="text-white text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default CarouselButton;
