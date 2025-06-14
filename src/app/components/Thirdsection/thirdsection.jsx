'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const vehicleCategories = [
  {
    title: 'CARS',
    image: '/image/Ecar.jpeg',
    description: 'Luxury sedans and sports cars',
  },
  {
    title: 'SUVS',
    image: '/image/Ecar.jpeg',
    description: 'Spacious and powerful SUVs',
  },
  {
    title: 'VANS',
    image: '/image/Ecar.jpeg',
    description: 'Family and commercial vans',
  },
  {
    title: 'ELECTRIC',
    image: '/image/Ecar.jpeg',
    description: 'Eco-friendly electric vehicles',
  },
];

const ThirdSection = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());

    // Simple fade-in for title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Simple fade-in for cards without stagger
    const cards = containerRef.current.querySelectorAll('.vehicle-card');
    gsap.fromTo(
      cards,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Wide Range of Vehicles
          </h1>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {vehicleCategories.map((category, index) => (
            <div
              key={index}
              className="vehicle-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative w-full h-64">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {category.title}
                </h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThirdSection;
