'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';

gsap.registerPlugin(Draggable);

const carData = [
  {
    id: 1,
    name: 'Lamborghini Urus',
    subtitle: 'SUPER SUV',
    image: '/images/cars/green-lamborghini.png',
    price: 225,
    specs: {
      speed: '306 km/h',
      transmission: '6 speed',
      seats: '5 seats',
      fuel: '5 liters'
    },
    color: 'from-cyan-400 to-blue-600',
    bgGradient: 'from-cyan-900/20 to-blue-900/20'
  },
  {
    id: 2,
    name: 'Ferrari F8 Tributo',
    subtitle: 'SPORTS CAR',
    image: '/images/cars/yellow-sports.png',
    price: 350,
    specs: {
      speed: '340 km/h',
      transmission: '7 speed',
      seats: '2 seats',
      fuel: '4 liters'
    },
    color: 'from-purple-400 to-pink-600',
    bgGradient: 'from-purple-900/20 to-pink-900/20'
  },
  {
    id: 3,
    name: 'BMW X7',
    subtitle: 'LUXURY SUV',
    image: '/images/cars/blue-suv.png',
    price: 180,
    specs: {
      speed: '250 km/h',
      transmission: '8 speed',
      seats: '7 seats',
      fuel: '6 liters'
    },
    color: 'from-blue-400 to-cyan-600',
    bgGradient: 'from-blue-900/20 to-cyan-900/20'
  }
];

const FifthSection = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const cursorRef = useRef(null);
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  // Custom cursor only for this component
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.to(cursorRef.current, {
          x: x,
          y: y,
          duration: 0.1,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseEnter = () => {
      setCursorVisible(true);
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3
        });
      }
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.3
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseenter', handleMouseEnter);
      section.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseenter', handleMouseEnter);
        section.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Draggable carousel setup
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = cardsRef.current.filter(Boolean);
    
    cards.forEach((card, index) => {
      const offset = (index - currentIndex) * 420;
      const scale = index === currentIndex ? 1 : 0.85;
      const opacity = index === currentIndex ? 1 : 0.5;
      const zIndex = index === currentIndex ? 10 : 1;

      gsap.set(card, {
        x: offset,
        scale: scale,
        opacity: opacity,
        zIndex: zIndex
      });
    });

    const dragInstance = Draggable.create(containerRef.current, {
      type: 'x',
      bounds: { minX: -200, maxX: 200 },
      inertia: true,
      onDragStart: () => {
        setIsDragging(true);
      },
      onDrag: function() {
        const progress = this.x / 100;
        if (Math.abs(progress) > 1) {
          const direction = progress > 0 ? -1 : 1;
          const newIndex = currentIndex + direction;
          if (newIndex >= 0 && newIndex < carData.length) {
            setCurrentIndex(newIndex);
            this.x = 0;
          }
        }
      },
      onDragEnd: () => {
        setIsDragging(false);
        gsap.to(containerRef.current, {
          x: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    })[0];

    return () => {
      if (dragInstance) dragInstance.kill();
    };
  }, [currentIndex]);

  const currentCar = carData[currentIndex];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-20 px-5 lg:px-20 relative overflow-hidden"
      style={{ cursor: cursorVisible ? 'none' : 'default' }}
    >
      {/* Custom VR Cursor - Only visible in this component */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-50"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        {/* VR Headset Style Cursor */}
        <div className="relative w-full h-full">
          {/* Outer VR Frame */}
          <div className="absolute inset-0 border-2 border-cyan-400 rounded-2xl bg-gray-900/80 backdrop-blur-sm">
            {/* VR Screen */}
            <div className="absolute inset-1 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-xl border border-cyan-300/50">
              {/* DRAG Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-cyan-300 text-[8px] font-bold tracking-wider">DRAG</span>
              </div>
            </div>
            
            {/* VR Side Elements */}
            <div className="absolute -left-1 top-1/2 w-2 h-4 bg-gray-700 rounded-l transform -translate-y-1/2"></div>
            <div className="absolute -right-1 top-1/2 w-2 h-4 bg-gray-700 rounded-r transform -translate-y-1/2"></div>
          </div>
          
          {/* Glowing effect */}
          <div className="absolute inset-0 border border-cyan-400/50 rounded-2xl animate-pulse"></div>
        </div>
      </div>

      {/* Background - Ready Player One Style */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent_70%)]"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(cyan 1px, transparent 1px),
          linear-gradient(90deg, cyan 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Ready Player One Style Title */}
        <div className="text-center mb-16">
          <div className="relative">
            {/* Glitch effect background */}
            <h1 className="absolute inset-0 text-5xl lg:text-7xl font-bold text-cyan-400/20 uppercase tracking-wider transform translate-x-1 translate-y-1">
              READY PLAYER<br />ONE CARS
            </h1>
            <h1 className="relative text-5xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent uppercase tracking-wider">
              READY PLAYER<br />ONE CARS
            </h1>
          </div>
          
          {/* Subtitle */}
          <p className="text-cyan-300 text-lg mt-4 font-mono">SELECT YOUR VEHICLE FOR THE OASIS</p>
          
          {/* Decorative line */}
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Car Card Showcase */}
        <div 
          ref={containerRef}
          className="relative h-[600px] flex items-center justify-center mb-12"
        >
          {carData.map((car, index) => (
            <div
              key={car.id}
              ref={el => cardsRef.current[index] = el}
              className="absolute w-96 h-[520px]"
            >
              {/* VR Gaming Card */}
              <div className="relative w-full h-full">
                {/* Holographic border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 to-blue-500/50 rounded-3xl blur-sm"></div>
                
                <div className="relative w-full h-full bg-gray-900/95 backdrop-blur-sm rounded-3xl overflow-hidden border-2 border-cyan-400/30 shadow-2xl">
                  
                  {/* VR Interface Header */}
                  <div className="absolute top-0 left-0 right-0 p-6 z-20">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                          <span className="text-cyan-400 text-xs font-mono tracking-wider">VEHICLE_DATA</span>
                        </div>
                        <p className="text-gray-400 text-sm font-mono tracking-wider">{car.subtitle}</p>
                        <h2 className="text-white text-2xl font-bold mt-1 font-mono">{car.name}</h2>
                      </div>
                      <div className="bg-green-500/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-green-400/30">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 text-xs font-mono">READY</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Holographic Car Display */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-80 h-48 mt-16">
                      {/* Hologram effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 to-transparent rounded-xl"></div>
                      <Image
                        src={car.image}
                        alt={car.name}
                        fill
                        className="object-contain filter drop-shadow-2xl"
                      />
                      {/* Scan lines effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent animate-pulse"></div>
                    </div>
                  </div>

                  {/* VR Specs Interface */}
                  <div className="absolute bottom-24 left-6 right-6">
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(car.specs).map(([key, value], specIndex) => (
                        <div key={key} className="bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 border border-cyan-400/20">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs">
                                {key === 'speed' && '⚡'}
                                {key === 'transmission' && '⚙️'}
                                {key === 'seats' && '👥'}
                                {key === 'fuel' && '⛽'}
                              </span>
                            </div>
                            <div>
                              <p className="text-cyan-400 text-xs uppercase font-mono">{key}</p>
                              <p className="text-white font-semibold text-sm font-mono">{value}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* VR Action Panel */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-black text-2xl font-bold font-mono">${car.price}</span>
                          <span className="text-black/70 text-sm font-mono">/day</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="bg-black/20 hover:bg-black/30 text-black px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm font-mono">
                            SCAN
                          </button>
                          <button className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 text-sm font-mono">
                            SELECT
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* VR Corner Elements */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-cyan-400/50 rounded-tr-lg"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-cyan-400/50 rounded-bl-lg"></div>
                  
                  {/* Data streams */}
                  <div className="absolute top-20 left-2 w-1 h-16 bg-gradient-to-b from-cyan-400 to-transparent opacity-50"></div>
                  <div className="absolute top-32 right-2 w-1 h-12 bg-gradient-to-b from-blue-400 to-transparent opacity-50"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* VR Navigation Interface */}
        <div className="flex justify-center space-x-6 mb-8">
          {carData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-cyan-400 border-cyan-400 scale-125' 
                  : 'bg-transparent border-gray-600 hover:border-cyan-400'
              }`}
            />
          ))}
        </div>

        {/* VR Instructions */}
        <div className="text-center">
          <p className="text-cyan-300 text-lg mb-2 font-mono">
            🎮 DRAG TO NAVIGATE • MOUSE OVER FOR VR CURSOR
          </p>
          <p className="text-gray-500 text-sm font-mono">
            OASIS VEHICLE SELECTION INTERFACE v2.0
          </p>
        </div>
      </div>
    </section>
  );
};

export default FifthSection;
