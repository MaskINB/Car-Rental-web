'use client';
import React, { useEffect, useRef, useState } from 'react';
import Seeallbutton from '../Buttons/seeallbutton';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SecondSection = () => {
  const [data, setData] = useState([]);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:4000/secondsectiondata`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (data.length) {
      ScrollTrigger.getAll().forEach(t => t.kill());

      // Simple smooth animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          scrub: false,
        },
      });

      // Container fade in
      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );

      // Title slide in from left
      tl.fromTo(
        titleRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

      // Description fade in
      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

      // Button scale in
      tl.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
        '-=0.2'
      );

      // Image slide in from right
      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );

      // Simple floating animation for image
      gsap.to(imageRef.current, {
        y: -10,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1,
      });
    }
  }, [data]);

  if (!data.length) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xl text-gray-300">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      id={`section-${data[0].id}`}
      className="pt-40 pb-20 px-5 lg:px-20 min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Glassmorphism Container - keeping your original colors */}
      <div
        ref={containerRef}
        className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 lg:p-12 border border-gray-700/50 shadow-2xl w-full max-w-7xl relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
          {/* Text Section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
            <h1 
              ref={titleRef}
              className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight"
            >
              {data[0].title}
            </h1>
            
            <p 
              ref={descriptionRef}
              className="text-base lg:text-xl leading-relaxed text-gray-300 max-w-2xl"
            >
              {data[0].description}
            </p>
            
            <div 
              ref={buttonRef}
              className="flex justify-center lg:justify-start mb-6 lg:mb-0"
            >
              <div className="transform hover:scale-105 transition-transform duration-300">
                <Seeallbutton />
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            <div 
              ref={imageRef}
              className="relative group"
            >
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/30 shadow-xl transform hover:scale-105 transition-all duration-500">
                <Image
                  src={data[0].image}
                  alt="Premium Car"
                  width={500}
                  height={300}
                  className="object-contain max-w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
