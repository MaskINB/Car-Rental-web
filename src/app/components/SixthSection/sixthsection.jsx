'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const buttonRef = useRef(null);
  const brandsWrapperRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation - slide up with fade
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

      // Cards stagger animation - Fixed to work properly
      gsap.fromTo(cardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Button animation - scale up with bounce
      gsap.fromTo(buttonRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: buttonRef.current,
            start: 'top 90%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Brands section animation
      gsap.fromTo(brandsWrapperRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: brandsWrapperRef.current,
            start: 'top 95%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Continuous carousel animation for brands
      const logos = brandsWrapperRef.current;
      if (logos) {
        const totalWidth = logos.scrollWidth / 2;
        gsap.to(logos, {
          x: -totalWidth,
          duration: 30,
          ease: 'linear',
          repeat: -1
        });
      }

      // Interactive hover animations for cards
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

      // Button hover animation
      buttonRef.current?.addEventListener('mouseenter', () => {
        gsap.to(buttonRef.current, { 
          scale: 1.05, 
          duration: 0.3, 
          ease: 'power2.out' 
        });
      });

      buttonRef.current?.addEventListener('mouseleave', () => {
        gsap.to(buttonRef.current, { 
          scale: 1, 
          duration: 0.3, 
          ease: 'power2.out' 
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black">
      <section ref={sectionRef} className="py-16 md:py-24 max-w-7xl mx-auto px-4 font-sans">
      <h2
        ref={titleRef}
        className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center uppercase mb-12 leading-tight tracking-wider bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
      >
        STORIES BEHIND<br className="hidden md:block" /> THE WHEEL
      </h2>

      <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stories.map((story, idx) => (
          <div
            key={story.id}
            ref={el => cardsRef.current[idx] = el}
            className="flex flex-col bg-gray-900 rounded-2xl shadow-lg overflow-hidden cursor-pointer backdrop-blur-sm border border-white/10"
          >
            <div className="relative h-48 w-full">
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
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
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
        >
          See all Reviews
        </button>
      </div>

      <div className="overflow-hidden mt-12 flex justify-center">
        <div ref={brandsWrapperRef} className="flex gap-12 items-center">
          {[...brands, ...brands].map((brand, idx) => (
            <div key={idx} className="flex-shrink-0">
              <Image
                src={brand.path}
                alt={brand.name}
                width={80}
                height={80}
                className="object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}
