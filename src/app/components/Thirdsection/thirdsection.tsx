'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Car {
  id: string | number;
  name: string;
  image: string;
  category: string;
  availability: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  description: string;
  features: string[];
  specs: {
    seats: string | number;
    mpg: string | number;
    engine?: string;
    year?: string | number;
  };
}

const Thirdsection = () => {
  const [data, setData] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });

  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/MaskINB/car-rental-mock-API/main/carcard.json');
        const jsonData = await response.json();
        setData(jsonData.carcard || jsonData);
      } catch (err) {
        console.error('Failed to load car data');
      } finally {
        setLoading(false);
      }
    };
    fetchCarData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && !loading) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
      tl.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 });
      tl.fromTo(cardsContainerRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');
    }
  }, [data, loading]);

  // Unified Drag Handler for Mouse & Touch
  const startDragging = (clientX: number) => {
    if (!cardsContainerRef.current) return;
    setIsDragging(true);
    setDragStart({
      x: clientX - cardsContainerRef.current.offsetLeft,
      scrollLeft: cardsContainerRef.current.scrollLeft,
    });
  };

  const moveDragging = (clientX: number) => {
    if (!isDragging || !cardsContainerRef.current) return;
    const x = clientX - cardsContainerRef.current.offsetLeft;
    const walk = (x - dragStart.x) * 1.5;
    cardsContainerRef.current.scrollLeft = dragStart.scrollLeft - walk;
  };

  const stopDragging = () => setIsDragging(false);

  if (loading) return null;

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden bg-black">
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent uppercase">
            Pick Your Dream Car
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Discover luxury vehicles with stunning performance and comfort.
          </p>
        </div>

        {/* Draggable Area */}
        <div 
          ref={cardsContainerRef}
          className={`overflow-x-auto scrollbar-hide flex space-x-6 pb-8 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={(e) => startDragging(e.pageX)}
          onMouseMove={(e) => moveDragging(e.pageX)}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onTouchStart={(e) => startDragging(e.touches[0].pageX)}
          onTouchMove={(e) => moveDragging(e.touches[0].pageX)}
          onTouchEnd={stopDragging}
          style={{ scrollSnapType: 'x proximity' }}
        >
          {data.map((car, index) => (
            <div
              key={car.id}
              className="flex-shrink-0 w-[85vw] sm:w-[350px] md:w-[400px] h-full scroll-snap-align-start transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
                {/* Image Section */}
                <div className="relative w-full h-48 bg-gray-100">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover"
                    draggable={false}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                      {car.availability}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-blue-600 text-[10px] font-bold uppercase tracking-wider">{car.category}</span>
                      <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-400 text-xs line-through">${car.originalPrice}</div>
                      <div className="text-xl font-black text-gray-900">${car.price}</div>
                      <div className="text-gray-500 text-[10px]">/ day</div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {car.description}
                  </p>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {[
                      { label: 'SEATS', val: car.specs.seats, bg: 'bg-blue-50', text: 'text-blue-600' },
                      { label: 'MPG', val: car.specs.mpg, bg: 'bg-green-50', text: 'text-green-600' },
                      { label: 'ENGINE', val: car.specs.engine || 'V6', bg: 'bg-purple-50', text: 'text-purple-600' },
                      { label: 'YEAR', val: car.specs.year || '2024', bg: 'bg-orange-50', text: 'text-orange-600' }
                    ].map((spec, i) => (
                      <div key={i} className={`${spec.bg} rounded-lg p-2 text-center`}>
                        <div className={`${spec.text} text-[9px] font-bold`}>{spec.label}</div>
                        <div className="text-gray-900 text-xs font-black">{spec.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="mt-auto flex gap-3">
                    <button 
                      onClick={() => router.push('/car')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-bold transition-all shadow-lg active:scale-95"
                    >
                      Reserve Now
                    </button>
                    <button className="px-4 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all text-sm font-bold">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default Thirdsection;