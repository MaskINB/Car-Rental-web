'use client';
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';

gsap.registerPlugin(Draggable);

const VEHICLES = [
  {
    img: '/image/car.jpg', // Replace with your actual image path
    label: 'Cars',
    link: '/cars',
  },
  {
    img: '/image/suv.jpg',
    label: 'SUVs',
    link: '/suvs',
  },
  {
    img: '/image/van.jpg',
    label: 'Vans',
    link: '/vans',
  },
  {
    img: '/image/electric.jpg',
    label: 'Electric',
    link: '/electric',
  },
];

const FifthSection = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    gsap.from(cardRefs.current, {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out',
    });

    return () => {
      gsap.killTweensOf(cardRefs.current);
    };
  }, []);

  return (
    <section className="w-full py-12 bg-gray-900">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Wide Range of Vehicles
        </h2>
        <div
          className="
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6
            sm:overflow-x-auto
          "
        >
          {VEHICLES.map((vehicle, idx) => (
            <Link href={vehicle.link} key={idx} className="block focus:outline-none">
              <div
                ref={el => (cardRefs.current[idx] = el)}
                className="
                  relative rounded-xl shadow-lg overflow-hidden h-56 flex items-end
                  transition-transform duration-300 hover:scale-105
                  group
                "
                style={{
                  backgroundImage: `url(${vehicle.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute bottom-0 w-full bg-black/60 text-white text-center text-lg font-semibold py-3 group-hover:bg-black/80 transition-colors">
                  {vehicle.label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FifthSection;
