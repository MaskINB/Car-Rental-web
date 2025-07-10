'use client';
import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VEHICLES = [
  { img: '/image/porsche.jpeg', label: 'Cars', link: '/cars' },
  { img: '/image/paris.jpg', label: 'SUVs', link: '/suvs' },
  { img: '/image/Vans.jpeg', label: 'Vans', link: '/vans' },
  { img: '/image/Ferrari-landon.jpg', label: 'Electric', link: '/electric' },
];

const ArrowIcon = () => (
  <span className="inline-flex items-center justify-center w-6 h-6 bg-white/10 rounded-full ml-2">
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
      <path
        d="M9 18l6-6-6-6"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const FifthSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Simple title animation - slide up with fade
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Simple cards stagger animation
      gsap.fromTo(cardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Simple hover animations
      cardsRef.current.forEach(card => {
        if (!card) return;

        card.addEventListener('mouseenter', () => {
          gsap.to(card, { 
            scale: 1.05, 
            duration: 0.3, 
            ease: 'power2.out' 
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, { 
            scale: 1, 
            duration: 0.3, 
            ease: 'power2.out' 
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 bg-[#0b1016] font-sans">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-center mb-12 leading-tight tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Wide Range of Vehicles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {VEHICLES.map((vehicle, idx) => (
            <Link href={vehicle.link} key={vehicle.label} className="group block">
              <div
                ref={(el) => (cardsRef.current[idx] = el)}
                className="relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-gray-900 cursor-pointer"
              >
                <Image
                  src={vehicle.img}
                  alt={vehicle.label}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute top-6 left-6 flex items-center z-10">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-xl sm:text-2xl font-semibold uppercase tracking-wider drop-shadow">
                    {vehicle.label}
                  </span>
                  <ArrowIcon />
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
