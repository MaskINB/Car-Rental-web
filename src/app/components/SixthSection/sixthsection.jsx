'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SixthSection() {
  const stories = [
    { id: 1, date: '25', month: 'December', year: '2023', title: 'Electrifying of the Experience', description: 'Integrating high performance techno into a new design.', image: '/image/pcar.jpeg' },
    { id: 2, date: '04', month: 'December', year: '2022', title: 'FLEXIBLE HIRE FOR BUSINESS', description: 'When we develop our cars, we always focus on the details.', image: '/image/Rcar.jpeg' },
    { id: 3, date: '18', month: 'November', year: '2022', title: 'Single vehicles to entire fleets', description: 'Get in touch if you need expert advice on anything.', image: '/image/cars.jpeg' }
  ];

  const brands = [
    { name: 'Land Rover', path: '/logos/LandRover.png' },
    { name: 'Audi', path: '/logos/Audi.png' },
    { name: 'Lamborghini', path: '/logos/Lamborgini.png' },
    { name: 'Ferrari', path: '/logos/Ferrari.png' },
    { name: 'BMW', path: '/logos/BMW.png' },
    { name: 'Honda', path: '/logos/Honda.png' },
    { name: 'Nissan', path: '/logos/Nissan.png' }
  ];

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const buttonRef = useRef(null);
  const brandsWrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'restart none restart none',
        }
      });

      // Title
      tl.from(titleRef.current, {
        opacity: 0,
        y: -40,
        duration: 1.2,
        ease: 'power4.out'
      })

      // Cards: slower & smoother animation
      .from(cardsRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 2,   // slower duration
        ease: 'power3.out',
        stagger: 0.4   // slower stagger
      }, '-=0.6')

      // Button
      .from(buttonRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power4.out'
      }, '-=1')

    }, sectionRef);

    // Brands carousel: move logos infinitely from right to left
    const logos = brandsWrapperRef.current;
    if (logos) {
      const totalWidth = logos.scrollWidth / 2; // because we'll duplicate logos
      gsap.to(logos, {
        x: -totalWidth,
        duration: 30, // slower scroll (increase to slow more)
        ease: 'linear',
        repeat: -1
      });
    }

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 max-w-7xl mx-auto px-4 font-sans">
      <h2
        ref={titleRef}
        className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center uppercase mb-12 leading-tight tracking-wider bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
      >
        STORIES BEHIND<br className="hidden md:block" /> THE WHEEL
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stories.map((story, idx) => (
          <div
            key={story.id}
            ref={el => cardsRef.current[idx] = el}
            className="flex flex-col bg-gray-900 rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="relative h-48 w-full">
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                {story.date} {story.month} {story.year}
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-semibold mb-2 text-white">{story.title}</h3>
              <p className="text-gray-400 text-sm flex-1">{story.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          ref={buttonRef}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition"
        >
          See all Reviews
        </button>
      </div>

      {/* Brands carousel */}
      <div className="overflow-hidden mt-12">
        <div ref={brandsWrapperRef} className="flex gap-6">
          {/* Duplicate logos for smooth loop */}
          {[...brands, ...brands].map((brand, idx) => (
            <div key={idx} className="w-20 h-20 flex items-center justify-center bg-gray-800 rounded-full p-2 shadow">
              <Image
                src={brand.path}
                alt={brand.name}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
