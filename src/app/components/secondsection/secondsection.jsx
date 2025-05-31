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
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:4000/secondsectiondata`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (data.length) {
      // Kill previous triggers to prevent duplicates on hot reload
      ScrollTrigger.getAll().forEach(t => t.kill());

      // Create a timeline for coordinated animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
          scrub: false,
          markers: false,
        },
      });

      // Animate container with glassmorphism effect
      tl.fromTo(
        containerRef.current,
        { 
          opacity: 0, 
          y: 80,
          scale: 0.9,
          backdropFilter: 'blur(0px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          backdropFilter: 'blur(16px)',
          duration: 1.2,
          ease: 'power3.out',
        }
      );

      // Animate title with stagger effect
      tl.fromTo(
        titleRef.current,
        { 
          opacity: 0, 
          y: 50,
          rotationX: 90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
        },
        '-=0.8'
      );

      // Animate description
      tl.fromTo(
        descriptionRef.current,
        { 
          opacity: 0, 
          y: 30,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.5'
      );

      // Animate button
      tl.fromTo(
        buttonRef.current,
        { 
          opacity: 0, 
          scale: 0.5,
          rotation: 180,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.8)',
        },
        '-=0.3'
      );

      // Animate Image with magnetic effect
      tl.fromTo(
        imageRef.current,
        { 
          opacity: 0, 
          scale: 0.6, 
          x: 150,
          rotation: 15,
          filter: 'blur(20px)',
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          rotation: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'elastic.out(1, 0.6)',
        },
        '-=1'
      );

      // Add floating animation for image
      gsap.to(imageRef.current, {
        y: -20,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });

      // Add subtle parallax effect
      gsap.to(containerRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
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
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900/20 pointer-events-none"></div>
      
      {/* Glassmorphism Container */}
      <div
        ref={containerRef}
        className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 lg:p-12 border border-gray-700/50 shadow-2xl w-full max-w-7xl relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
          {/* Text Section */}
          <div ref={textRef} className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
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
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
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
