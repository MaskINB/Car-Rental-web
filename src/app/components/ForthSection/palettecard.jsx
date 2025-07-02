'use client';
import React, { useRef } from 'react';
import { gsap } from 'gsap';

const CITIES = [
  { img: '/image/pcar.jpeg', name: 'Paris' },
  { img: '/image/new.png', name: 'London' },
  { img: '/image/porsche.jpeg', name: 'Tokyo' },
  { img: '/image/Vans.jpeg', name: 'New York' }
];

export default function PaletteCard() {
  const swatchRefs = useRef([]);
  const iconRefs = useRef([]);

  const handleEnter = (i) => {
    gsap.to(swatchRefs.current[i], { width: 280, duration: 0.5, ease: 'power2.out' });
    gsap.fromTo(
      iconRefs.current[i],
      { scale: 0, rotate: 0 },
      { scale: 1, rotate: 360, duration: 0.6, ease: 'back.out(1.7)' }
    );
  };

  const handleLeave = (i) => {
    gsap.to(swatchRefs.current[i], { width: 200, duration: 0.5, ease: 'power2.inOut' });
    gsap.to(iconRefs.current[i], { scale: 0, rotate: 0, duration: 0.6, ease: 'power2.in' });
  };

  return (
    <div className="relative w-[900px] h-[320px] rounded-xl shadow-lg overflow-hidden flex">
      {CITIES.map((city, idx) => (
        <div
          key={idx}
          ref={el => swatchRefs.current[idx] = el}
          onMouseEnter={() => handleEnter(idx)}
          onMouseLeave={() => handleLeave(idx)}
          className={`
            relative h-full cursor-pointer flex items-end transition-all
            ${idx === 0 ? 'rounded-bl-xl' : ''} ${idx === CITIES.length - 1 ? 'rounded-br-xl' : ''}
          `}
          style={{
            width: 200,
            backgroundImage: `url(${city.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Hover tire icon */}
          <div
            ref={el => iconRefs.current[idx] = el}
            className="absolute top-4 left-1/2 -translate-x-1/2 w-[60px] h-[60px] rounded-full shadow bg-white flex items-center justify-center z-20"
          >
            <TireIcon />
          </div>

          {/* City name */}
          <div className="absolute bottom-0 w-full bg-black/60 text-white text-center text-[14px] font-semibold py-2">
            {city.name}
          </div>
        </div>
      ))}
    </div>
  );
}

// 🛞 Flat tire icon SVG
function TireIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="28" height="28">
      <circle cx="32" cy="32" r="30" fill="#333" />
      <circle cx="32" cy="32" r="22" fill="#555" />
      <circle cx="32" cy="32" r="8" fill="#222" />
      <path fill="none" stroke="#fff" strokeWidth="2" d="
        M32 10 L32 0 
        M32 64 L32 54 
        M10 32 L0 32 
        M64 32 L54 32 
        M50 50 L58 58 
        M14 14 L6 6 
        M50 14 L58 6 
        M14 50 L6 58" />
    </svg>
  );
}
