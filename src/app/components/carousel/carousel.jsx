import React from 'react'
import Navbar from "../navbar/navbar";
import Carouselbutton from '../Buttons/carouselbutton';
import BookingForm from '../BookingForm/bookingform';
import Link from 'next/link';

const carousel = () => {
  return (
    <>
      <div 
        className="min-h-screen relative overflow-hidden"
        style={{
          backgroundImage: `url('/image/carousel.jpg')`, // Place your image in public/images/
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10">
          <Navbar />
          
          {/* Main Content */}
          <div className="flex flex-col items-start justify-center min-h-screen pt-20 px-8">
            {/* Hero Text - Positioned to the left like in your image */}
            <div className="mb-12 max-w-2xl">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
                The glorious
              </h1>
              <h2 className="text-6xl md:text-8xl font-bold text-white">
                Speed
              </h2>
            </div>
            
            {/* Booking Form - Positioned below text */}
            <div className="w-full max-w-4xl mb-12">
              <BookingForm />
            </div>
            
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mt-16">
              <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-semibold text-white mb-3">Do more from home</h3>
                <p className="text-gray-300 text-sm">
                  Price excludes tax, title, tags and $399 CarMax processing fee 
                  (not required by law). Price assumes that final purchase will be 
                  made in the State of Vehicle subject to prior sale.
                </p>
              </div>
              
              <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-semibold text-white mb-3">Test drives for real life</h3>
                <p className="text-gray-300 text-sm">
                  Price excludes tax, title, tags and $399 CarMax processing 
                  made in the State of Vehicle subject to prior sale.
                </p>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="mt-12">
              <Link href="/car">
                <Carouselbutton/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default carousel
