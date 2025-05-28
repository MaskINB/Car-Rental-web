import React from 'react'
import Navbar from "../navbar/navbar";
import Carouselbutton from '../Buttons/carouselbutton';
import BookingForm from '../BookingForm/bookingform';
import Link from 'next/link';

const carousel = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        {/* Background Cars */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-10 w-96 h-48 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl"></div>
          <div className="absolute bottom-32 left-10 w-80 h-40 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg blur-xl"></div>
        </div>
        
        <Navbar />
        
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20">
          {/* Hero Text */}
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
              The glorious
            </h1>
            <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Speed
            </h2>
          </div>
          
          {/* Booking Form */}
          <div className="w-full max-w-6xl px-4 mb-12">
            <BookingForm />
          </div>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4 mt-16">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">Do more from home</h3>
              <p className="text-gray-300 text-sm">
                Price excludes tax, title, tags and $399 CarMax processing fee 
                (not required by law). Price assumes that final purchase will be 
                made in the State of Vehicle subject to prior sale.
              </p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
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
        
        {/* Car Silhouettes */}
        <div className="absolute bottom-0 right-0 w-full h-96 opacity-40">
          <div className="absolute bottom-10 right-20 w-96 h-32 bg-gradient-to-l from-white/10 to-transparent rounded-full blur-sm"></div>
        </div>
      </div>
    </>
  )
}

export default carousel
