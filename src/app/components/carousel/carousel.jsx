import React from 'react'
import Navbar from "../navbar/navbar";
import Carouselbutton from '../Buttons/carouselbutton';
import Link from 'next/link';

const carousel = () => {
  return (
    <>
    <div className="bg-gradient-to-t from-yellow-500 from-0% to-slate-200 to-100% pt-0 pb-145 relative">
      <Navbar />
      <div className="relative top-148 bottom-0 bg-gray-300 flex justify-center items-center">
        {/* Your carousel content */}

        {/* Button positioned at the bottom-middle (50% inside, 50% outside) */}
        <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2">
          <Link href="/car"><Carouselbutton /></Link>
        </div>
      </div>
    </div>
  </>
  )
}

export default carousel