'use client';
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';

const CITIES = [
  { img: '/image/paris.jpg', name: 'Paris', slug: '/car_services' },
  { img: '/image/london.jpeg', name: 'London', slug: '/car_services' },
  { img: '/image/Tokyo.jpg', name: 'Tokyo', slug: '/car_services' },
  { img: '/image/Newyork.jpg', name: 'New York', slug: '/car_services' }
];

export default function PaletteCard() {
  const swatchRefs = useRef([]);
  const router = useRouter();

  const handleEnter = (i) => {
    gsap.to(swatchRefs.current[i], {
      width: 600,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  const handleLeave = (i) => {
    gsap.to(swatchRefs.current[i], {
      width: 200,
      duration: 0.5,
      ease: 'power2.inOut'
    });
  };

  const handleClick = (slug) => {
    router.push(slug);
  };

  return (
    <div className="relative w-[1200px] h-[500px] rounded-xl shadow-lg overflow-hidden flex max-w-full flex-col md:flex-row">
      {CITIES.map((city, idx) => (
        <div
          key={idx}
          ref={el => {
            if (el) swatchRefs.current[idx] = el;
          }}
          onMouseEnter={() => handleEnter(idx)}
          onMouseLeave={() => handleLeave(idx)}
          onClick={() => handleClick(city.slug)}
          className={`
            relative cursor-pointer flex items-end transition-all
            ${idx === 0 ? 'rounded-tl-xl md:rounded-bl-xl' : ''} 
            ${idx === CITIES.length - 1 ? 'rounded-tr-xl md:rounded-br-xl' : ''}
          `}
          style={{
            width: 200,
            height: '100%',
            backgroundImage: `url(${city.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute bottom-0 w-full bg-black/60 text-white text-center text-[14px] font-semibold py-2">
            {city.name}
          </div>
        </div>
      ))}
    </div>
  );
}
