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

  // Simple entrance animations
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
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );

      tl.fromTo(cardsContainerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );
    }
  }, [data, loading]);

  // Simple card positioning
  useEffect(() => {
    if (data.length > 0 && cardsRef.current.length > 0) {
      updateCardPositions();
    }
  }, [currentIndex, data]);

  const updateCardPositions = () => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const isActive = index === currentIndex;
      const offset = (index - currentIndex) * 100;
      
      gsap.to(card, {
        x: `${offset}%`,
        opacity: isActive ? 1 : 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % data.length);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const handleDotClick = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  // Loading state
  if (loading) {
    return (
      <section className="h-screen flex items-center justify-center" style={{ background: '#0e1424' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading premium cars...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="h-screen flex items-center justify-center" style={{ background: '#0e1424' }}>
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  const currentCard = data[currentIndex];

  return (
    <section 
      ref={sectionRef}
      className="h-screen relative overflow-hidden flex items-center"
      style={{ background: '#0e1424' }}
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Premium Car Rentals
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Choose from our fleet of luxury vehicles
          </p>
        </div>

        {/* Compact Cards Container */}
        <div 
          ref={cardsContainerRef}
          className="relative h-[400px] mb-6"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {data.map((car, index) => (
              <div
                key={car.id}
                ref={el => cardsRef.current[index] = el}
                className="absolute w-full max-w-3xl"
              >
                {/* Compact Car Card */}
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-0">
                    
                    {/* Image Side */}
                    <div className="relative bg-gray-50 flex items-center justify-center p-4">
                      <div className="relative w-full h-40">
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
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {car.availability}
                        </span>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="md:col-span-2 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-blue-600 text-sm font-medium">{car.category}</span>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{car.name}</h3>
                          <div className="flex items-center mb-2">
                            <div className="flex text-yellow-400 mr-2">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                </svg>
                              ))}
                            </div>
                            <span className="text-gray-600 text-sm">{car.rating} ({car.reviews})</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-400 text-sm line-through">${car.originalPrice}</div>
                          <div className="text-2xl font-bold text-gray-900">${car.price}</div>
                          <div className="text-gray-600 text-xs">per day</div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {car.description}
                      </p>

                      {/* Compact Specs */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-gray-50 rounded p-2">
                          <div className="text-gray-500 text-xs">Seats</div>
                          <div className="text-gray-900 text-sm font-medium">{car.specs.seats}</div>
                        </div>
                        <div className="bg-gray-50 rounded p-2">
                          <div className="text-gray-500 text-xs">Fuel</div>
                          <div className="text-gray-900 text-sm font-medium">{car.specs.mpg}</div>
                        </div>
                      </div>

                      {/* Compact Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {car.features.slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                          Reserve
                        </button>
                        <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
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

        {/* Simple Navigation */}
        <div className="flex items-center justify-center space-x-6">
          
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={isTransitioning}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200 disabled:opacity-50"
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
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={isTransitioning}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200 disabled:opacity-50"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Car Counter */}
        <div className="text-center mt-4">
          <div className="text-white/60 text-sm">
            {currentIndex + 1} of {data.length}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FifthSection;
