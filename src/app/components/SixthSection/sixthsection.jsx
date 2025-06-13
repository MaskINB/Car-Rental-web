'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const SixthSection = () => {
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
  const storyRefs = useRef([]);
  const brandRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stories with stagger
      gsap.fromTo(
        storyRefs.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate brands with stagger
      gsap.fromTo(
        brandRefs.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className='py-16 px-8 bg-white max-w-7xl mx-auto relative overflow-hidden'>
      {/* Optional: Add SVG background shapes */}
      <svg className='absolute top-0 left-0 w-full h-full pointer-events-none' style={{ zIndex: 0 }}>
        <circle cx="20%" cy="10%" r="100" fill="rgba(255, 230, 230, 0.2)" />
        <circle cx="80%" cy="30%" r="150" fill="rgba(230, 230, 255, 0.2)" />
      </svg>

      <h2 className='text-4xl font-bold text-center mb-12 relative z-10'>STORIES BEHIND THE WHEEL</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10'>
        {stories.map((story, index) => (
          <div
            key={story.id}
            ref={el => storyRefs.current[index] = el}
            className='flex flex-col story-card group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6 rounded-2xl backdrop-blur-sm bg-white/90 border border-white/20'
          >
            <div className='flex items-start mb-6'>
              <div className='mr-4'>
                <span className='text-3xl font-bold block'>{story.date}</span>
                <span className='text-sm text-gray-600 block'>{story.month} {story.year}</span>
              </div>
            </div>
            <h3 className='text-xl font-bold uppercase mb-3'>{story.title}</h3>
            <p className='text-gray-600 mb-4'>{story.description}</p>
            <div className='mt-auto'>
              <div className='h-64 w-full relative rounded-xl overflow-hidden group-hover:scale-105 transition-transform'>
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className='group-hover:brightness-110 transition-all'
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-12 flex justify-center relative z-10'>
        <button className='px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition transform hover:scale-105'>
          See all Reviews
        </button>
      </div>

      <div className='mt-16 flex flex-wrap justify-center gap-8 relative z-10'>
        {brands.map((brand, index) => (
          <div
            key={brand.name}
            ref={el => brandRefs.current[index] = el}
            className='w-20 h-20 opacity-70 hover:opacity-100 transition hover:scale-110'
          >
            <Image
              src={brand.path}
              alt={brand.name}
              width={80}
              height={80}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SixthSection;
