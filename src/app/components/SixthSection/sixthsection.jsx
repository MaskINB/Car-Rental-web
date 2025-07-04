'use client';
import React from 'react';
import Image from 'next/image';

export default function SixthSection() {
  const stories = [
    { id: 1, date: '25', month: 'December', year: '2023', title: 'Electrifying of the Experience', description: 'Integrating high performance techno into a new design.', image: '/image/pcar.jpeg' },
    { id: 2, date: '04', month: 'December', year: '2022', title: 'FLEXIBLE HIRE FOR BUSINESS', description: 'When we develop our cars, we always focus on the details.', image: '/image/Rcar.jpeg' },
    { id: 3, date: '18', month: 'November', year: '2022', title: 'Single vehicles to entire fleets', description: 'Get in touch if you need expert advice on anything.', image: '/image/cars.jpeg' }
  ];

  const brands = [
    { name: 'Land Rover', path: '/logos/LandRover.png' },
    { name: 'Audi', path: '/logos/Audi.png' },
    { name: 'Lamborghini', path: '/logos/Lamborgini.png' },
    { name: 'Ferrari', path: '/logos/Ferrari.png' },
    { name: 'BMW', path: '/logos/BMW.png' },
    { name: 'Honda', path: '/logos/Honda.png' },
    { name: 'Nissan', path: '/logos/Nissan.png' }
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-center uppercase mb-12">
        STORIES BEHIND<br className="hidden md:block"/> THE WHEEL
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stories.map(story => (
          <div key={story.id} className="flex flex-col border border-gray-200 rounded-md overflow-hidden">
            <div className="p-4 text-center">
              <div className="text-3xl font-bold">{story.date}</div>
              <div className="text-xs text-gray-500">{story.month} {story.year}</div>
            </div>
            <div className="px-4 mb-4 text-center">
              <h3 className="font-semibold mb-1">{story.title}</h3>
              <p className="text-gray-600 text-sm">{story.description}</p>
            </div>
            <div className="relative h-48 w-full">
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition">
          See all Reviews
        </button>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-6">
        {brands.map(brand => (
          <div key={brand.name} className="w-20 h-20 flex items-center justify-center">
            <Image
              src={brand.path}
              alt={brand.name}
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
