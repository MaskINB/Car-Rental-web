'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

const VEHICLES = [
  { img: '/image/porsche.jpeg', label: 'Cars', link: '/cars' },
  { img: '/image/paris.jpg', label: 'SUVs', link: '/suvs' },
  { img: '/image/Vans.jpeg', label: 'Vans', link: '/vans' },
  { img: '/image/Ecar.jpeg', label: 'Electric', link: '/electric' },
];

const FifthSection = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    gsap.from(cardRefs.current, {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-center mb-10 text-gray-800">
          Wide Range of Vehicles
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {VEHICLES.map((vehicle, idx) => (
            <Link href={vehicle.link} key={idx} className="block focus:outline-none">
              <div
                ref={el => (cardRefs.current[idx] = el)}
                className="
                  relative rounded-xl overflow-hidden shadow-md group
                  aspect-video transition-transform duration-300 hover:scale-105
                "
                style={{
                  backgroundImage: `url(${vehicle.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute top-3 left-3 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded">
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
