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
    description: 'Luxury sedans and sports cars',
  },
  {
    title: 'SUVS',
    image: '/image/new.png',
    description: 'Spacious and powerful SUVs',
  },
  {
    title: 'VANS',
    image: '/image/Vans.jpeg',
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
  const sectionRef = useRef(null);

  useEffect(() => {
    // Kill previous triggers
    ScrollTrigger.getAll().forEach(t => t.kill());

    // Simple fade in for section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );

    // Simple title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );

    // Simple staggered cards animation
    const cards = containerRef.current.querySelectorAll('.vehicle-card');
    
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="">
      {/* Background gradient */}
      <div
        ref={sectionRef}
        className="bg-gray-900/80 backdrop-blur-lg  p-8 lg:p-12 border border-gray-700/50 shadow-2xl relative z-10"
      >
        {/* Title */}
        <div className="text-center mb-16">
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight"
          >
            WIDE RANGE OF <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              VEHICLES
            </span>
          </h1>
        </div>

        {/* Cards Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {vehicleCategories.map((category, index) => (
            <div
              key={index}
              className="relative group rounded-2xl overflow-hidden vehicle-card cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-600/30 shadow-xl overflow-hidden">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    width={500}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-2 tracking-wider">
                    {category.title}
                  </h2>
                  
                  <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                    <span className="text-lg font-medium">Explore</span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue-500/30 transition-all duration-300 group-hover:translate-x-1">
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThirdSection;
