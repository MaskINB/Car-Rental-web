import React from 'react'
import { FaArrowDownLong } from "react-icons/fa6";

const carouselbutton = () => {
return (
    <div className="flex justify-center items-center bg-amber-400 border-6 border-white rounded-full pt-5 pb-5 pr-2 pl-2 shadow-lg transform transition-transform duration-300 hover:scale-120">
        <FaArrowDownLong className="text-black text-2xl hover:text-white"/>
    </div>
)
}

export default carouselbutton
