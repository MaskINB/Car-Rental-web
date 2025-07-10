'use client';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PaletteCard from './palettecard';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ForthSection() {
  const [locations, setLocations] = useState([]);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const btnRef = useRef(null);
  const popularCitiesRef = useRef(null);
  const citiesContainerRef = useRef(null);
  const paletteCardRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:4000/locations')
      .then(res => res.json())
      .then(setLocations)
      .catch(() => setLocations([]));
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation - slide up with fade
      gsap.fromTo(titleRef.current,
        { y: 60, opacity: 0 },
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

      // Description animation - fade in with slight delay
      gsap.fromTo(descriptionRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Button animation - scale up with bounce effect
      gsap.fromTo(btnRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.4,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: btnRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Popular cities title animation
      gsap.fromTo(popularCitiesRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: popularCitiesRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // City badges stagger animation
      const cityBadges = citiesContainerRef.current?.children;
      if (cityBadges && cityBadges.length > 0) {
        gsap.fromTo(cityBadges,
          { y: 20, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: citiesContainerRef.current,
              start: 'top 90%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // PaletteCard animation - slide in from right with scale
      gsap.fromTo(paletteCardRef.current,
        { x: 100, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: paletteCardRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Interactive hover animations for button
      btnRef.current?.addEventListener('mouseenter', () => {
        gsap.to(btnRef.current, { 
          scale: 1.05, 
          duration: 0.3, 
          ease: 'power2.out' 
        });
      });

      btnRef.current?.addEventListener('mouseleave', () => {
        gsap.to(btnRef.current, { 
          scale: 1, 
          duration: 0.3, 
          ease: 'power2.out' 
        });
      });

      // City badges hover animations
      if (cityBadges) {
        Array.from(cityBadges).forEach(badge => {
          badge.addEventListener('mouseenter', () => {
            gsap.to(badge, { 
              scale: 1.05, 
              y: -2,
              duration: 0.3, 
              ease: 'power2.out' 
            });
          });
          badge.addEventListener('mouseleave', () => {
            gsap.to(badge, { 
              scale: 1, 
              y: 0,
              duration: 0.3, 
              ease: 'power2.out' 
            });
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [locations]);

  return (
    <section
      ref={sectionRef}
      className="relative py-30 bg-[#0b1016] overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-indigo-500 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
        {/* Left content */}
        <div className="lg:w-1/2">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl font-extrabold mb-8 uppercase tracking-wider bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Find Cars In<br />Your Locations
          </h2>
          <p 
            ref={descriptionRef}
            className="text-gray-300 mb-8 leading-relaxed max-w-xl"
          >
            Discover luxury and electric vehicles at your fingertips. From downtown to the airport, find your next ride in seconds.
          </p>
          <button
            ref={btnRef}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 group"
          >
            <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
              Find a Location
            </span>
          </button>
          <div className="mt-10">
            <h3
              ref={popularCitiesRef}
              className="text-lg font-bold mb-4 text-white/80"
            >
              Popular Cities
            </h3>
            <div 
              ref={citiesContainerRef}
              className="flex flex-wrap gap-4"
            >
              {locations.map(loc => (
                <div
                  key={loc.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur shadow border border-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <span className="font-bold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                    {loc.city}
                  </span>
                  <span className="text-white/70 text-xs group-hover:text-white/90 transition-colors duration-300">
                    {loc.carsAvailable} cars
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right content */}
        <div
          ref={paletteCardRef}
          className="w-[1200px] max-w-full relative h-[500px] rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row backdrop-blur-sm bg-white/5 border border-white/10"
        >
          <PaletteCard />
        </div>
      </div>
    </section>
  );
}
