"use client";
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from "../navbar/navbar";
import Carouselbutton from '../Buttons/carouselbutton';
import BookingForm from '../BookingForm/bookingform';
import Link from 'next/link';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const carousel = () => {
  const heroRef = useRef(null);
  const bookingFormRef = useRef(null);
  const featureCardsRef = useRef(null);
  const seeMoreButtonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Hero text animation
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

    // BookingForm animation - comes in from bottom with bounce
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
      "-=0.5" // Start 0.5 seconds before previous animation ends
    );

    // Feature Cards animation with stagger effect
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
        duration: 0.2,
        stagger: 0.1,
        ease: "power2.out"
      }, 
      "-=0.3"
    );

    // See More button animation - bouncy entrance
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

    // Add scroll-triggered animations for better UX
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

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle See More button click
  const handleSeeMore = () => {
    // Add a subtle animation when clicked
    gsap.to(seeMoreButtonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
    
    // Navigate to features page or show more content
    // You can replace this with your desired navigation
    console.log("See more features clicked!");
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
            {/* Hero Text - Positioned to the left like in your image */}
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
            
            {/* Animated Feature Cards */}
            <div 
              ref={featureCardsRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-4xl -mt-2 mb-8"
            >
              <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 hover:bg-gray-900/80 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <h3 className="text-xl font-semibold text-white mb-3">Do more from home</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Price excludes tax, title, tags and $399 CarMax processing fee 
                  (not required by law). Price assumes that final purchase will be 
                  made in the State of Vehicle subject to prior sale.
                </p>
              </div>
              
              <div className="bg-gray-900/70 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 hover:bg-gray-900/80 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <h3 className="text-xl font-semibold text-white mb-3">Test drives for real life</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Price excludes tax, title, tags and $399 CarMax processing 
                  made in the State of Vehicle subject to prior sale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default carousel
