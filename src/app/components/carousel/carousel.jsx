"use client";
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from "../navbar/navbar";
import Carouselbutton from '../Buttons/carouselbutton';
import BookingForm from '../BookingForm/bookingform';
import Link from 'next/link';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Carousel = () => {
  const heroRef = useRef(null);
  const bookingFormRef = useRef(null);
  const featureCardsRef = useRef(null);
  const seeMoreButtonRef = useRef(null);
  
  // State for feature cards
  const [featureCards, setFeatureCards] = useState([]);
  const [isLoadingFeatures, setIsLoadingFeatures] = useState(true);
  const [error, setError] = useState(null);

  // Load feature cards from API
  useEffect(() => {
    const fetchFeatureCards = async () => {
      try {
        setIsLoadingFeatures(true);
        const response = await fetch('http://localhost:4000/featureCards');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setFeatureCards(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load feature cards:', err);
        setError(err.message);
        // Fallback data in case API fails
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
    if (isLoadingFeatures) return; // Wait for data to load

    const tl = gsap.timeline();

    // Hero text animation
    if (heroRef.current && heroRef.current.children.length > 0) {
      tl.fromTo(heroRef.current.children, 
        { 
          opacity: 0, 
          y: 100,
          scale: 0.8
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.3,
          ease: "power3.out"
        }
      );
    }

    // BookingForm animation - comes in from bottom with bounce
    if (bookingFormRef.current) {
      tl.fromTo(bookingFormRef.current, 
        { 
          opacity: 0, 
          y: 80,
          scale: 0.9,
          rotationX: -15
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1,
          ease: "back.out(1.7)"
        }, 
        "-=0.5"
      );
    }

    // Feature Cards animation with stagger effect
    if (featureCardsRef.current && featureCardsRef.current.children.length > 0) {
      tl.fromTo(featureCardsRef.current.children, 
        { 
          opacity: 0, 
          y: 60,
          x: -30,
          scale: 0.5,
          rotation: -5
        },
        { 
          opacity: 1, 
          y: 0,
          x: 0,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        }, 
        "-=0.3"
      );
    }

    // See More button animation - bouncy entrance
    if (seeMoreButtonRef.current) {
      tl.fromTo(seeMoreButtonRef.current, 
        { 
          opacity: 0, 
          scale: 0,
          rotation: 180
        },
        { 
          opacity: 1, 
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(2)"
        }, 
        "-=0.2"
      );
    }

    // Add scroll-triggered animations for better UX
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

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoadingFeatures]); // Re-run when loading state changes

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
    // Add your navigation logic here
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
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10">
          <Navbar />
          
          {/* Main Content */}
          <div className="flex flex-col items-start justify-center min-h-screen pt-20 px-8">
            {/* Hero Text */}
            <div ref={heroRef} className="mb-10 -mt-20 max-w-2xl">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
                The glorious
              </h1>
              <h2 className="text-6xl md:text-8xl font-bold text-white">
                Speed
              </h2>
            </div>
            
            {/* Animated Booking Form */}
            <div 
              ref={bookingFormRef}
              className="w-full max-w-4xl mb-12 transform-gpu"
            >
              <BookingForm />
            </div>
            
            {/* Feature Cards Section */}
            <div className="w-full max-w-9xl mb-5 -mt-4">
              {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded mb-4">
                  <p>⚠️ Failed to load features: {error}</p>
                  <p className="text-sm">Showing fallback content.</p>
                </div>
              )}
              
              {isLoadingFeatures ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                  <span className="ml-4 text-white text-lg">Loading features...</span>
                </div>
              ) : (
                <div 
                  ref={featureCardsRef}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {featureCards.map((card) => (
                    <div 
                      key={card.id}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-white hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="text-4xl mb-1 group-hover:scale-110 transition-transform duration-300">
                        {card.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-red-400">{card.title}</h3>
                      <p className="text-gray-200 text-sm">{card.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Carousel;
