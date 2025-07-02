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
    gsap.to(swatchRefs.current[i], { width: 600, duration: 0.3, ease: 'power1.out' });
    gsap.fromTo(
      iconRefs.current[i],
      { scale: 0, rotate: 0 },
      { scale: 1, rotate: 360, duration: 0.6, ease: 'back.out(1.1)' }
    );
  };

  const handleLeave = (i) => {
    gsap.to(swatchRefs.current[i], { width: 200, duration: 0., ease: 'power2.inOut' });
    gsap.to(iconRefs.current[i], { scale: 0, rotate: 0, duration: 0.6, ease: 'power2.in' });
  };

  return (
    <div className="relative w-[800px] h-[500px] rounded-xl shadow-lg overflow-hidden flex">
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
          {/* City name */}
          <div className="absolute bottom-0 w-full bg-black/60 text-white text-center text-[14px] font-semibold py-2">
            {city.name}
          </div>
        </div>
      ))}
    </div>
  );
}
