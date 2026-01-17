'use client';
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';

interface City {
  img: string;
  name: string;
  slug: string;
}

const CITIES: City[] = [
  { img: '/image/paris.jpg', name: 'Paris', slug: '/car_services' },
  { img: '/image/london.jpeg', name: 'London', slug: '/car_services' },
  { img: '/image/Tokyo.jpg', name: 'Tokyo', slug: '/car_services' },
  { img: '/image/Newyork.jpg', name: 'New York', slug: '/car_services' }
];

export default function PaletteCard() {
  const swatchRefs = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInteraction = (idx: number, isEntering: boolean) => {
    if (isMobile) return;

    gsap.to(swatchRefs.current[idx], {
      width: isEntering ? 600 : 200,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  const handleMobileClick = (idx: number, slug: string) => {
    if (!isMobile) {
      router.push(slug);
      return;
    }

    // Expand the clicked one, shrink others using flexGrow
    swatchRefs.current.forEach((ref, i) => {
      gsap.to(ref, {
        flexGrow: i === idx ? 4 : 1, // The active one gets more space
        duration: 0.5,
        ease: 'power2.out'
      });
    });

    // Optional: Navigate on second tap or keep as expansion only
    // router.push(slug); 
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-[1200px] h-[600px] md:h-[500px] mx-auto overflow-hidden rounded-xl shadow-lg bg-black">
      {CITIES.map((city, idx) => (
        <div
          key={city.name}
          ref={(el) => { swatchRefs.current[idx] = el; }}
          onMouseEnter={() => handleInteraction(idx, true)}
          onMouseLeave={() => handleInteraction(idx, false)}
          onClick={() => handleMobileClick(idx, city.slug)}
          className="relative cursor-pointer flex items-center justify-center md:items-end overflow-hidden transition-all duration-500"
          style={{
            // flexGrow: 1 ensures they fill the container equally by default
            flexGrow: 1,
            width: isMobile ? '100%' : '200px',
            backgroundImage: `url(${city.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay to ensure text is readable regardless of image brightness */}
          <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors" />
          
          <div className="relative z-10 w-full py-4 text-center">
            <h3 className="text-white text-xl md:text-2xl font-bold uppercase tracking-tighter md:tracking-widest">
              {city.name}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}