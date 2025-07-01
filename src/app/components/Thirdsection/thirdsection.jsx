'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FifthSection = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Fetch data from mock server
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:4000/carcard');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        console.error('Error fetching car data:', err);
        setError('Failed to load car data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, []);

  // Smooth entrance animations
  useEffect(() => {
    if (data.length > 0 && !loading) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );

      tl.fromTo(cardsContainerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );
    }
  }, [data, loading]);

  // Card positioning
  useEffect(() => {
    if (data.length > 0 && cardsRef.current.length > 0) {
      updateCardPositions();
    }
  }, [currentIndex, data]);

  const updateCardPositions = () => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const isActive = index === currentIndex;
      const isPrev = index === currentIndex - 1;
      const isNext = index === currentIndex + 1;
      
      let x = 0;
      let opacity = 0;
      let scale = 0.85;

      if (isActive) {
        x = 0;
        opacity = 1;
        scale = 1;
      } else if (isPrev) {
        x = -80;
        opacity = 0.5;
        scale = 0.9;
      } else if (isNext) {
        x = 80;
        opacity = 0.5;
        scale = 0.9;
      } else {
        x = index < currentIndex ? -150 : 150;
        opacity = 0;
        scale = 0.8;
      }
      
      gsap.to(card, {
        x: `${x}%`,
        opacity,
        scale,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  };

  // Navigation functions
  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % data.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleDotClick = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-20 flex items-center justify-center" style={{ background: '#0e1424' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-sm">Loading cars...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 flex items-center justify-center" style={{ background: '#0e1424' }}>
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="py-16 relative overflow-hidden mt-3"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        
        {/* Compact Section Title */}
        <div ref={titleRef} className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Premium Car Collection
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Discover luxury vehicles with stunning performance
          </p>
        </div>

        {/* Compact Cards Container */}
        <div 
          ref={cardsContainerRef}
          className="relative h-[350px] mb-8"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {data.map((car, index) => (
              <div
                key={car.id}
                ref={el => cardsRef.current[index] = el}
                className="absolute w-full max-w-2xl"
              >
                {/* Compact Car Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
                  <div className="grid md:grid-cols-5 gap-0">
                    
                    {/* Compact Image Side */}
                    <div className="md:col-span-2 relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                      <div className="relative w-full h-32">
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          className="object-contain"
                          priority={index === 0}
                        />
                      </div>
                      
                      {/* Availability Badge */}
                      <div className="absolute top-2 left-2">
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {car.availability}
                        </span>
                      </div>
                    </div>

                    {/* Compact Content Side */}
                    <div className="md:col-span-3 p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-blue-600 text-xs font-semibold uppercase">{car.category}</span>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{car.name}</h3>
                          <div className="flex items-center mb-2">
                            <div className="flex text-yellow-400 mr-2">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                </svg>
                              ))}
                            </div>
                            <span className="text-gray-600 text-xs">{car.rating} ({car.reviews})</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-400 text-xs line-through">${car.originalPrice}</div>
                          <div className="text-xl font-bold text-gray-900">${car.price}</div>
                          <div className="text-gray-600 text-xs">per day</div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                        {car.description}
                      </p>

                      {/* Compact Specs */}
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        <div className="bg-blue-50 rounded p-2 text-center">
                          <div className="text-blue-600 text-xs font-semibold">SEATS</div>
                          <div className="text-gray-900 text-sm font-bold">{car.specs.seats}</div>
                        </div>
                        <div className="bg-green-50 rounded p-2 text-center">
                          <div className="text-green-600 text-xs font-semibold">MPG</div>
                          <div className="text-gray-900 text-sm font-bold">{car.specs.mpg}</div>
                        </div>
                        <div className="bg-purple-50 rounded p-2 text-center">
                          <div className="text-purple-600 text-xs font-semibold">ENGINE</div>
                          <div className="text-gray-900 text-xs font-bold">{car.specs.engine || 'V6'}</div>
                        </div>
                        <div className="bg-orange-50 rounded p-2 text-center">
                          <div className="text-orange-600 text-xs font-semibold">YEAR</div>
                          <div className="text-gray-900 text-sm font-bold">{car.specs.year || '2024'}</div>
                        </div>
                      </div>

                      {/* Compact Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {car.features.slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Compact Action Buttons */}
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all">
                          Reserve Now
                        </button>
                        <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compact Navigation */}
        <div className="flex items-center justify-center space-x-6">
          
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={isTransitioning}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex space-x-2">
            {data.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                disabled={isTransitioning}
                className={`transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-6 h-2 bg-white rounded-full' 
                    : 'w-2 h-2 bg-white/40 hover:bg-white/60 rounded-full'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={isTransitioning}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Car Counter */}
        <div className="text-center mt-4">
          <div className="text-white/80 text-sm">
            <span className="text-blue-400 font-bold">{currentIndex + 1}</span> of <span className="text-purple-400 font-bold">{data.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FifthSection;
