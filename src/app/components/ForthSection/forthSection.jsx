'use client';
import React, { useEffect, useState } from 'react';
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
    <section className="relative py-30 bg-[#0b1016] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
        {/* Left content */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 uppercase tracking-wider bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Find Cars In<br />Your Locations
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed max-w-xl">
            Discover luxury and electric vehicles at your fingertips. From downtown to the airport, find your next ride in seconds.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition">
            Find a Location
          </button>
          <div className="mt-10">
            <h3 className="text-lg font-bold mb-4 text-white/80">Popular Cities</h3>
            <div className="flex flex-wrap gap-4">
              {locations.map(loc => (
                <div
                  key={loc.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur shadow border border-white/10 hover:bg-white/20 transition"
                >
                  <span className="font-bold text-blue-400">{loc.city}</span>
                  <span className="text-white/70 text-xs">{loc.carsAvailable} cars</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right content */}
        <div className="">
          <PaletteCard carImage="/mnt/data/108d1467-9b1b-42e2-893d-493cebd0a5b0.png" location="Colombo" />
        </div>
      </div>
    </section>
  );
};

export default ForthSection;
