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
    image: '/image/new.png',
    price: 225,
    specs: {
      speed: '306 km/h',
      transmission: '6 speed',
      seats: '5 seats',
      fuel: '5 liters'
    },
    color: 'from-green-400 to-emerald-600',
    bgGradient: 'from-green-900/20 to-emerald-900/20'
  },
  {
    id: 2,
    name: 'Ferrari F8 Tributo',
    subtitle: 'SPORTS CAR',
    image: '/image/WhatsApp Image 2025-03-29 at 8.18.07 PM (1).jpeg',
    price: 350,
    specs: {
      speed: '340 km/h',
      transmission: '7 speed',
      seats: '2 seats',
      fuel: '4 liters'
    },
    color: 'from-yellow-400 to-orange-600',
    bgGradient: 'from-yellow-900/20 to-orange-900/20'
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
  },
  {
    id: 4,
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
  },
  {
    id: 5,
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
  },{
    id: 6,
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
  },{
    id: 7,
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
  },
  {
    id: 8,
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
  const cursorTextRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3
        });
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.3
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Draggable carousel setup
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = cardsRef.current.filter(Boolean);
    
    // Position cards
    cards.forEach((card, index) => {
      const offset = (index - currentIndex) * 400;
      const scale = index === currentIndex ? 1 : 0.8;
      const opacity = index === currentIndex ? 1 : 0.6;
      const zIndex = index === currentIndex ? 10 : 1;

      gsap.set(card, {
        x: offset,
        scale: scale,
        opacity: opacity,
        zIndex: zIndex
      });
    });

    // Create draggable
    const dragInstance = Draggable.create(containerRef.current, {
      type: 'x',
      bounds: { minX: -200, maxX: 200 },
      inertia: true,
      onDragStart: () => {
        setIsDragging(true);
        if (cursorTextRef.current) {
          gsap.to(cursorTextRef.current, {
            scale: 1.2,
            duration: 0.2
          });
        }
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
        if (cursorTextRef.current) {
          gsap.to(cursorTextRef.current, {
            scale: 1,
            duration: 0.2
          });
        }
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
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-20 h-20 pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="relative w-full h-full">
          {/* Outer circle */}
          <div className="absolute inset-0 border-2 border-white rounded-full animate-pulse"></div>
          
          {/* Inner circle */}
          <div className="absolute inset-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/50"></div>
          
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          
          {/* Drag text */}
          <div 
            ref={cursorTextRef}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold tracking-wider"
          >
            DRAG
          </div>
        </div>
      </div>

      <section className="min-h-screen py-20 px-5 lg:px-20 relative overflow-hidden cursor-none">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br"></div>
        <div className={`absolute inset-0 bg-gradient-to-br ${currentCar.bgGradient}`}></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Main Container */}
        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* Title */}
          <div className="text-center mb-16">
            <h1 className="text-2xl lg:text-7xl text-black  uppercase tracking-wider mb-4">
              PICK YOUR DREAM<br />CAR TODAY
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
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
                className="absolute w-96 h-[500px]"
              >
                {/* Gaming Card */}
                <div className={`relative w-full h-full bg-gradient-to-br ${car.color} rounded-3xl p-1 shadow-2xl`}>
                  <div className="w-full h-full bg-gray-900/95 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-600/30 relative">
                    
                    {/* Card Header */}
                    <div className="absolute top-0 left-0 right-0 p-6 z-20">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-400 text-sm font-medium tracking-wider">{car.subtitle}</p>
                          <h2 className="text-white text-2xl font-bold mt-1">{car.name}</h2>
                        </div>
                        <div className="bg-green-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-green-400/30">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-400 text-xs font-medium">AVAILABLE</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Car Image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-80 h-48 mt-16">
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          className="object-contain filter drop-shadow-2xl"
                        />
                      </div>
                    </div>

                    {/* Specs Grid */}
                    <div className="absolute bottom-20 left-6 right-6">
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(car.specs).map(([key, value], specIndex) => (
                          <div key={key} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 border border-gray-600/20">
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 bg-gradient-to-r ${car.color} rounded-lg flex items-center justify-center`}>
                                <span className="text-white text-xs">
                                  {key === 'speed' && '⚡'}
                                  {key === 'transmission' && '⚙️'}
                                  {key === 'seats' && '👥'}
                                  {key === 'fuel' && '⛽'}
                                </span>
                              </div>
                              <div>
                                <p className="text-gray-400 text-xs uppercase">{key}</p>
                                <p className="text-white font-semibold text-sm">{value}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className={`bg-gradient-to-r ${car.color} rounded-xl p-4`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-black text-2xl font-bold">${car.price}</span>
                            <span className="text-black/70 text-sm">/day</span>
                          </div>
                          <div className="flex space-x-2">
                            <button className="bg-black/20 hover:bg-black/30 text-black px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm">
                              Details
                            </button>
                            <button className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 text-sm">
                              Rent Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-blue-400/50 rounded-tr-lg"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-blue-400/50 rounded-bl-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-3 mb-8">
            {carData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? `bg-gradient-to-r ${currentCar.color} scale-125` 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Instructions */}
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-2">
              🎮 Drag horizontally to explore different cars
            </p>
            <p className="text-gray-500 text-sm">
              Move your mouse over the cards to see the custom cursor
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default FifthSection;

