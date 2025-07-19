'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Car3DViewer = dynamic(() => import('./Car3DViewer'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const Thirdsection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });
  const [selectedCardId, setSelectedCardId] = useState(null);

  const router = useRouter();
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const titleRef = useRef(null);

  // Fetch data from mock server
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://raw.githubusercontent.com/MaskINB/car-rental-mock-API/main/carcard.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const jsonData = await response.json();
        // Extract the carcard array from the response
        const carData = jsonData.carcard || jsonData;
        // Ensure we always set an array
        setData(Array.isArray(carData) ? carData : []);
        setError(null);
      } catch (err) {
        setError('Failed to load car data. Please try again later.');
        setData([]); // Ensure data is always an array
      } finally {
        setLoading(false);
      }
    };
    fetchCarData();
  }, []);

  // Entrance animations
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0 && !loading) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
      tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
      tl.fromTo(cardsContainerRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4');
    }
  }, [data, loading]);

  // Drag handlers
  const handleMouseDown = (e) => {
    if (!cardsContainerRef.current) return;
    setIsDragging(true);
    setDragStart({
      x: e.pageX - cardsContainerRef.current.offsetLeft,
      scrollLeft: cardsContainerRef.current.scrollLeft,
    });
    e.preventDefault();
  };
  const handleMouseMove = (e) => {
    if (!isDragging || !cardsContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - cardsContainerRef.current.offsetLeft;
    const walk = (x - dragStart.x) * 2;
    window.requestAnimationFrame(() => {
      if (cardsContainerRef.current) {
        cardsContainerRef.current.scrollLeft = dragStart.scrollLeft - walk;
      }
    });
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // Touch handlers
  const handleTouchStart = (e) => {
    if (!cardsContainerRef.current) return;
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].pageX - cardsContainerRef.current.offsetLeft,
      scrollLeft: cardsContainerRef.current.scrollLeft,
    });
  };
  const handleTouchMove = (e) => {
    if (!isDragging || !cardsContainerRef.current) return;
    const x = e.touches[0].pageX - cardsContainerRef.current.offsetLeft;
    const walk = (x - dragStart.x) * 2;
    window.requestAnimationFrame(() => {
      if (cardsContainerRef.current) {
        cardsContainerRef.current.scrollLeft = dragStart.scrollLeft - walk;
      }
    });
  };
  const handleTouchEnd = () => setIsDragging(false);

  // Card click handler for popup (only if not dragging)
  const handleCardClick = (car, e) => {
    if (!isDragging) {
      e.stopPropagation();
      setSelectedCardId(car.id);
    }
  };

  // Reserve button click handler for routing
  const handleReserveClick = (car, e) => {
    e.stopPropagation();
    router.push(`/car`);
  };

  // Close popup handler
  const closePopup = () => setSelectedCardId(null);
  const handlePopupBackdropClick = (e) => {
    if (e.target === e.currentTarget) closePopup();
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

  const selectedCar = Array.isArray(data) ? data.find(car => car.id === selectedCardId) : null;

  return (
    <section 
      ref={sectionRef}
      className="py-22 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0e1424 0%, #1a2332 100%)' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0/4 left-0/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto 1px-2 sm:px-4">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            PICK YOUR DREAM CAR
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base">
            Discover luxury vehicles with stunning performance
          </p>
        </div>

        {/* Draggable Cards Container */}
        <div 
          ref={cardsContainerRef}
          className={`overflow-x-auto scrollbar-hide pb-5 pt-4 ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex space-x-15 w-max">
            {Array.isArray(data) && data.map((car, index) => (
              <div
                key={car.id}
                className={`
                  flex-shrink-0
                  w-[90vw] sm:w-[380px] md:w-[420px] lg:w-[470px]
                  h-[520px] sm:h-[440px]
                  transition-all duration-300
                  ${selectedCardId 
                    ? (car.id === selectedCardId ? 'z-20 scale-105' : 'opacity-30 pointer-events-none') 
                    : (!isDragging ? 'hover:scale-105 cursor-pointer' : 'cursor-grabbing')
                  }
                `}
                onClick={(e) => handleCardClick(car, e)}
              >
                {/* Card Container */}
                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden flex flex-col h-full">
                  {/* Image Section */}
                  <div className="relative w-full aspect-[16/7] md:aspect-[16/6] lg:aspect-[16/5] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden rounded-t-xl">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-cover object-center pointer-events-none"
                      priority={index === 0}
                      draggable={false}
                    />
                    {/* Availability Badge */}
                    <div className="absolute top-2 left-2">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {car.availability}
                      </span>
                    </div>
                  </div>
                  {/* Content Section */}
                  <div className="flex-1 flex flex-col p-4">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-blue-600 text-xs font-semibold uppercase">{car.category}</span>
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{car.name}</h3>
                          <div className="flex items-center mb-1">
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
                          <div className="text-lg font-bold text-gray-900">${car.price}</div>
                          <div className="text-gray-600 text-xs">per day</div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2 text-xs sm:text-sm line-clamp-2">
                        {car.description}
                      </p>
                      {/* Specs */}
                      <div className="grid grid-cols-4 gap-2 mb-2">
                        <div className="bg-blue-50 rounded p-1 text-center">
                          <div className="text-blue-600 text-[10px] font-semibold">SEATS</div>
                          <div className="text-gray-900 text-xs font-bold">{car.specs.seats}</div>
                        </div>
                        <div className="bg-green-50 rounded p-1 text-center">
                          <div className="text-green-600 text-[10px] font-semibold">MPG</div>
                          <div className="text-gray-900 text-xs font-bold">{car.specs.mpg}</div>
                        </div>
                        <div className="bg-purple-50 rounded p-1 text-center">
                          <div className="text-purple-600 text-[10px] font-semibold">ENGINE</div>
                          <div className="text-gray-900 text-xs font-bold">{car.specs.engine || 'V6'}</div>
                        </div>
                        <div className="bg-orange-50 rounded p-1 text-center">
                          <div className="text-orange-600 text-[10px] font-semibold">YEAR</div>
                          <div className="text-gray-900 text-xs font-bold">{car.specs.year || '2024'}</div>
                        </div>
                      </div>
                      {/* Features */}
                      <div className="mb-2">
                        <div className="flex flex-wrap gap-1">
                          {car.features.slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Button Row */}
                    <div className="flex space-x-2 mt-auto">
                      <button 
                        onClick={(e) => handleReserveClick(car, e)}
                        className="flex-1 bg-blue-600 text-white py-2 px-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-all"
                      >
                        Reserve Now
                      </button>
                      <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-50 transition-all">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center -mt-2">
          <div className="text-white/60 text-sm">
            Showing {Array.isArray(data) ? data.length : 0} premium vehicles
          </div>
        </div>
      </div>

      {/* Car Details Popup */}
      {selectedCardId && selectedCar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 "
          onClick={handlePopupBackdropClick}
        >
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300">
            {/* Close Button */}
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Popup Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-10">
                {/* 3D Car Viewer */}
                <div className="flex flex-col items-center justify-center">
                  {selectedCar.model3d ? (
                    <Car3DViewer modelUrl={selectedCar.model3d} />
                  ) : (
                    <div className="relative w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center">
                      <span className="text-gray-400">3D Model Not Available</span>
                    </div>
                  )}
                </div>
                {/* Car Details */}
                <div>
                  <div className="mb-6">
                    <span className="text-blue-600 text-sm font-semibold uppercase">{selectedCar.category}</span>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedCar.name}</h2>
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400 mr-3">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-600 font-medium">{selectedCar.rating} ({selectedCar.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-gray-400 text-lg line-through">${selectedCar.originalPrice}</div>
                      <div className="text-4xl font-bold text-gray-900">${selectedCar.price}</div>
                      <div className="text-gray-600">per day</div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 text-base leading-relaxed">
                    {selectedCar.description}
                  </p>
                  {/* Enhanced Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-blue-600 text-sm font-semibold">SEATS</div>
                      <div className="text-gray-900 text-2xl font-bold">{selectedCar.specs.seats}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-green-600 text-sm font-semibold">MPG</div>
                      <div className="text-gray-900 text-2xl font-bold">{selectedCar.specs.mpg}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <div className="text-purple-600 text-sm font-semibold">ENGINE</div>
                      <div className="text-gray-900 text-lg font-bold">{selectedCar.specs.engine || 'V6'}</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <div className="text-orange-600 text-sm font-semibold">YEAR</div>
                      <div className="text-gray-900 text-2xl font-bold">{selectedCar.specs.year || '2024'}</div>
                    </div>
                  </div>
                  {/* All Features */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCar.features.map((feature, idx) => (
                        <span key={idx} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-2 rounded-full text-sm font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button 
                      onClick={(e) => handleReserveClick(selectedCar, e)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg"
                    >
                      Reserve Now
                    </button>
                    <button 
                      onClick={closePopup}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl text-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all transform hover:scale-105"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for hiding scrollbar and clamping */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-in {
          from { transform: scale(0.9); }
          to { transform: scale(1); }
        }
        .animate-in {
          animation: fade-in 0.3s ease-out, zoom-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Thirdsection;
