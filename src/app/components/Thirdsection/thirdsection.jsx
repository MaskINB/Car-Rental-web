'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const vehicleCategories = [
  {
    title: 'CARS',
    image: '/image/cars.jpeg',
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
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll('.vehicle-card');

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { autoAlpha: 0, y: 50 },
        {
          duration: 1,
          autoAlpha: 1,
          y: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse', // play on enter, reverse on leave back
          },
          delay: i * 0.2, // stagger delay based on index
        }
      );
    });

    // Cleanup function to kill all ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="p-10 bg-white text-center">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-gray-900">
        WIDE RANGE OF <br /> VEHICLES
      </h1>
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
      >
        {vehicleCategories.map((category, index) => (
          <div
            key={index}
            className="relative group rounded-xl overflow-hidden shadow-md vehicle-card"
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
