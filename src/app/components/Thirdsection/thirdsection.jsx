import React from 'react';
import Image from 'next/image';

const vehicleCategories = [
  {
    title: 'CARS',
    image: '/image/cars.jpeg', // Replace with your actual image paths
  },
  {
    title: 'SUVS',
    image: '/image/new.png',
  },
  {
    title: 'VANS',
    image: '/image/Vans.jpeg',
  },
  {
    title: 'ELECTRIC',
    image: '/image/Ecar.jpeg',
  },
];

const ThirdSection = () => {
  return (
    <div className="p-10 bg-white text-center">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-gray-900">
        WIDE RANGE OF <br /> VEHICLES
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {vehicleCategories.map((category, index) => (
          <div
            key={index}
            className="relative group rounded-xl overflow-hidden shadow-md"
          >
            <Image
              src={category.image}
              alt={category.title}
              width={500}
              height={400}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-start justify-end p-8">
              <h2 className="text-white text-2xl font-semibold mb-2">
                {category.title}
              </h2>
              <button className="text-white text-lg group-hover:translate-x-2 transition-transform">
                →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThirdSection;
