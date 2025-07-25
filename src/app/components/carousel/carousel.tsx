"use client";
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from "../navbar/navbar";
import BookingForm from '../BookingForm/bookingform';
import Link from 'next/link';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface FeatureCard {
  id: string | number;
  title: string;
  description: string;
  icon: string;
  color?: string;
  badge?: string;
}

const Carousel: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bookingFormRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<HTMLDivElement>(null);
  const seeMoreButtonRef = useRef<HTMLDivElement>(null);

  // State for feature cards
  const [featureCards, setFeatureCards] = useState<FeatureCard[]>([]);
  const [isLoadingFeatures, setIsLoadingFeatures] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load feature cards from API
  useEffect(() => {
    const fetchFeatureCards = async () => {
      try {
        setIsLoadingFeatures(true);
        const response = await fetch('https://raw.githubusercontent.com/MaskINB/car-rental-mock-API/main/featureCards.json');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Debug: Check API response structure

        // Extract the featureCards array from the response
        const cards = data.featureCards || data;
        setFeatureCards(Array.isArray(cards) ? cards : []);
        setError(null);
      } catch (err) {
        console.error('Failed to load feature cards:', err);
        setError(err.message);
        // Fallback data
        setFeatureCards([
          { id: 1, title: "High Speed", description: "Experience lightning-fast performance", icon: "⚡" },
          { id: 2, title: "Reliability", description: "99.9% uptime guaranteed", icon: "🛡️" },
          { id: 3, title: "Security", description: "Advanced security features", icon: "🔒" },
          { id: 4, title: "Support", description: "24/7 customer support", icon: "💬" }
        ]);
      } finally {
        setIsLoadingFeatures(false);
      }
    };

    fetchFeatureCards();
  }, []);

  // GSAP animations
  useEffect(() => {
    if (isLoadingFeatures) return;

    const tl = gsap.timeline();

    if (heroRef.current && heroRef.current.children.length > 0) {
      tl.fromTo(heroRef.current.children, 
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.3, ease: "power3.out" }
      );
    }

    if (bookingFormRef.current) {
      tl.fromTo(bookingFormRef.current, 
        { opacity: 0, y: 80, scale: 0.9, rotationX: -15 },
        { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 1, ease: "back.out(1.7)" },
        "-=0.5"
      );
    }

    if (featureCardsRef.current && featureCardsRef.current.children.length > 0) {
      tl.fromTo(featureCardsRef.current.children, 
        { opacity: 0, y: 60, x: -30, scale: 0.5, rotation: -5 },
        { opacity: 1, y: 0, x: 0, scale: 1, rotation: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
        "-=0.3"
      );
    }

    if (seeMoreButtonRef.current) {
      tl.fromTo(seeMoreButtonRef.current, 
        { opacity: 0, scale: 0, rotation: 180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2)" },
        "-=0.2"
      );
    }

    if (bookingFormRef.current) {
      ScrollTrigger.create({
        trigger: bookingFormRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(bookingFormRef.current, {
            boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoadingFeatures]);

  // Handle See More button click
  const handleSeeMore = () => {
    if (seeMoreButtonRef.current) {
      gsap.to(seeMoreButtonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }

    console.log("See more features clicked!");
    // Add navigation logic if needed
  };

  return (
    <>
      <div 
        className="min-h-screen relative overflow-hidden"
        style={{
          backgroundImage: `url('/image/carousel.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative">
          <Navbar />

          <div className="flex flex-col items-start justify-center min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
            <div ref={heroRef} className="mb-8 sm:mb-10 -mt-16 pt-15 sm:-mt-20 max-w-full sm:max-w-2xl">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-2 sm:mb-4 leading-tight">
                The glorious
              </h1>
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                Speed
              </h2>
            </div>

            <div ref={bookingFormRef} className="w-full max-w-xs sm:max-w-2xl lg:max-w-4xl mb-8 sm:mb-12 transform-gpu">
              <BookingForm />
            </div>

            <div className="w-full max-w-full sm:max-w-6xl lg:max-w-7xl mb-5 -mt-2 sm:-mt-4">
              {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-100 px-3 sm:px-4 py-2 sm:py-3 rounded mb-3 sm:mb-4 text-sm sm:text-base">
                  <p>⚠️ Failed to load features: {error}</p>
                  <p className="text-xs sm:text-sm">Showing fallback content.</p>
                </div>
              )}

              {isLoadingFeatures ? (
                <div className="flex justify-center items-center py-8 sm:py-12">
                  <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-white"></div>
                  <span className="ml-3 sm:ml-4 text-white text-base sm:text-lg">Loading features...</span>
                </div>
              ) : (
                <div ref={featureCardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {featureCards.map((card) => (
                    <div key={card.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-5 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                      {/* Simple Badge */}
                      {card.badge && (
                        <div className="mb-3">
                          <span className="text-xs font-medium text-blue-300 bg-blue-500/20 px-2 py-1 rounded">
                            {card.badge}
                          </span>
                        </div>
                      )}
                      
                      {/* Simple Title */}
                      <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors">
                        {card.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for line-clamp */}
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  )
}

export default Carousel;
