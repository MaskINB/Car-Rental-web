'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import PaletteCard from './palettecard';


const ForthSection = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/locations')
      .then(res => res.json())
      .then(setLocations)
      .catch(() => setLocations([]));
  }, []);

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0e1424 0%, #1a2332 100%)'
      }}
    >
      {/* Decorative blurred circles for glassmorphism */}
      <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
        {/* Left Content */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 uppercase tracking-wider bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Find Cars In<br />Your Locations
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed max-w-xl">
            Discover luxury and electric vehicles at your fingertips. Our network brings premium cars to your city with a seamless, secure, and high-tech experience. From downtown to the airport, find your next ride in seconds.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all">
            Find a Location
          </button>
          {/* Featured Locations */}
          <div className="mt-10">
            <h3 className="text-lg font-bold mb-4 text-white/80">Popular Cities</h3>
            <div className="flex flex-wrap gap-4">
              {locations.map(loc => (
                <div
                  key={loc.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md shadow border border-white/10 hover:bg-white/20 transition"
                >
                  <span className="font-bold text-blue-400">{loc.city}</span>
                  <span className="text-white/70 text-xs">{loc.carsAvailable} cars</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content - Map & Phone Mockup */}
        <div className="lg:w-1/2 flex flex-col items-center relative w-full max-w-md">
          {/* Glassy Map Card */}
          <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/10 backdrop-blur-lg">
            {/* Map Image */}
            <div className="relative w-full h-72">
              <Image
                src="/image/Vans.jpeg"
                alt="Location Map"
                fill
                className="object-cover"
                priority
              />
              {/* Animated Pins */}
              <div className="absolute top-1/4 left-1/3 z-10 animate-pulse">
                <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-white rounded-full shadow-lg"></div>
              </div>
              <div className="absolute bottom-1/4 right-1/3 z-10 animate-bounce">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-white rounded-full shadow-lg"></div>
              </div>
            </div>
            {/* Overlay phone mockup */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-20 w-44 h-80 rounded-2xl shadow-2xl border-4 border-white overflow-hidden">
              <PaletteCard/>
            </div>
          </div>
          {/* Optionally, show featured car in this city below the phone */}
          <div className="mt-24 w-full text-center">
            {locations.length > 0 && (
              <div className="inline-block bg-white/10 px-6 py-3 rounded-xl shadow border border-white/10">
                <span className="text-white/80 font-semibold">
                  Featured: <span className="text-blue-400">{locations[0].featuredCar}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Custom animation for pins */}
      <style jsx>{`
        .animate-bounce {
          animation: bounce 1.2s infinite;
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-10px);}
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 #fde04788; }
          50% { box-shadow: 0 0 0 12px #fde04744; }
        }
      `}</style>
    </section>
  );
};

export default ForthSection;
