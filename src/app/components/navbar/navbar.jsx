'use client';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const navData = {
  logo: {
    text: "Trizent",
    url: "/"
  },
  navigation: [
    { text: "Home", url: "/" },
    { text: "Service", url: "/service" },
    { text: "Fleet", url: "/fleet" },
    { text: "FAQ", url: "/faq" },
    { text: "Contact", url: "/contact" }
  ]
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Check if scrolled past threshold
      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down - hide navbar
        gsap.to(navRef.current, {
          y: -100,
          duration: 0.3,
          ease: "power2.out"
        });
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up - show navbar
        gsap.to(navRef.current, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }

      // Show navbar when user stops scrolling
      scrollTimeout.current = setTimeout(() => {
        gsap.to(navRef.current, {
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      }, 150); // Show after 150ms of no scrolling

      lastScrollY.current = currentScrollY;
    };

    // Initial animation
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  // Animate mobile menu
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.mobile-menu',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  return (
    <nav 
      ref={navRef}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'w-auto max-w-2xl' 
          : 'w-auto max-w-4xl'
      }`}
    >
      <div className={`${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-full px-6 py-3' 
          : 'bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-4'
      } transition-all duration-300 shadow-2xl`}>
        
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={navData.logo.url} className="flex items-center space-x-2">
              <div className={`${
                isScrolled ? 'w-6 h-6' : 'w-8 h-8'
              } bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center transition-all duration-300`}>
                <span className={`text-white font-bold ${isScrolled ? 'text-xs' : 'text-sm'}`}>T</span>
              </div>
              <span className={`text-white font-bold ${
                isScrolled ? 'text-lg' : 'text-xl'
              } transition-all duration-300`}>
                {navData.logo.text}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className={`flex items-center ${isScrolled ? 'space-x-4' : 'space-x-8'} transition-all duration-300`}>
              {navData.navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className={`text-white hover:text-blue-400 px-3 py-2 ${
                    isScrolled ? 'text-xs' : 'text-sm'
                  } font-medium transition-all duration-300 hover:scale-105`}
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Search and Profile - Hidden when scrolled for compact design */}
          {!isScrolled && (
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 transition-all duration-300"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <button className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          )}

          {/* Compact search icon when scrolled */}
          {isScrolled && (
            <div className="hidden md:flex items-center space-x-2">
              <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-200">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-400 focus:outline-none focus:text-blue-400 transition-transform duration-200 hover:scale-110"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mobile-menu">
            <div className="px-2 pt-4 pb-3 space-y-1 border-t border-white/20 mt-4">
              {navData.navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className="text-white hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
