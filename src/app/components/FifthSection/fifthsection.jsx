import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FifthSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-5xl font-bold text-center mb-16 uppercase tracking-wider">
          PICK YOUR DREAM<br />CAR TODAY
        </h2>
        
        {/* Car Showcase */}
        <div className="relative mb-12">
          {/* Car Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-4xl">
              <img 
                src="/images/cars/green-lamborghini.png" 
                alt="Lamborghini Urus" 
                className="w-full h-auto"
              />
              
              {/* You can add partial views of other cars on the sides */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/4 opacity-70">
                <img 
                  src="/images/cars/yellow-sports.png" 
                  alt="Yellow Sports Car" 
                  className="w-48 h-auto"
                />
              </div>
              
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/4 opacity-70">
                <img 
                  src="/images/cars/blue-suv.png" 
                  alt="Blue SUV" 
                  className="w-48 h-auto"
                />
              </div>
            </div>
          </div>
          
          {/* Car Specifications */}
          <div className="flex justify-center mt-8">
            <div className="grid grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 mb-2">
                  <img src="/images/icons/speed.svg" alt="Speed" className="w-full h-full" />
                </div>
                <p className="font-bold">306 km/h</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 mb-2">
                  <img src="/images/icons/transmission.svg" alt="Transmission" className="w-full h-full" />
                </div>
                <p className="font-bold">6 speed</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 mb-2">
                  <img src="/images/icons/seat.svg" alt="Seats" className="w-full h-full" />
                </div>
                <p className="font-bold">5 seats</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 mb-2">
                  <img src="/images/icons/fuel.svg" alt="Fuel" className="w-full h-full" />
                </div>
                <p className="font-bold">5 liters</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pricing and Action Buttons */}
        <div className="flex justify-center">
          <div className="bg-white shadow-lg rounded-md p-4 flex items-center justify-between w-full max-w-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 mr-2">
                <img src="/images/icons/price-tag.svg" alt="Price" className="w-full h-full" />
              </div>
              <p className="text-2xl font-bold">
                <span className="text-yellow-500">$</span>225<span className="text-sm text-gray-500">/day</span>
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Link href="/cars/details" 
                className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors">
                View Details
              </Link>
              
              <Link href="/cars/rent" 
                className="bg-yellow-400 text-black px-6 py-2 rounded-md font-medium hover:bg-yellow-500 transition-colors">
                Rent Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FifthSection;
