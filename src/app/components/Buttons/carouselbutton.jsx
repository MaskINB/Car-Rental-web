import React from 'react'
import { FaArrowDownLong } from "react-icons/fa6";

const carouselbutton = () => {
return (
    <div className="flex justify-center items-center bg-amber-400 border-10 border-white rounded-full pt-6 pb-6 pr-3 pl-3 shadow-lg transform transition-transform duration-300 hover:scale-120">
        <FaArrowDownLong className="text-black text-3xl hover:text-white"/>
    </div>
)
}

export default carouselbutton
