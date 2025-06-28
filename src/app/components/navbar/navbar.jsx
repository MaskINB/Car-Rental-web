'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SignInForm from './forms/SignInForm';
import SignUpForm from './forms/SignUpForm';

const navData = {
  logo: {
    text: "Trizent",
    url: "/",
    image: "/image/car-service-logo-design.png"
  },
  navigation: [
    { text: "Home", url: "/" },
    { text: "Service", url: "/car_services" },
    { text: "Booking", url: "/booking" },
    { text: "Car", url: "/car" },
    { text: "Contact", url: "/contact_us" },
  ]
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [isHidden, setIsHidden] = useState(false);
  const [showPopupMenu, setShowPopupMenu] = useState(false);
  
  const scrollTimeout = useRef(null);
  const lastScrollY = useRef(0);
  const navRef = useRef(null);
  const triggerRef = useRef(null);
  const popupMenuRef = useRef(null);

  useEffect(() => {
    // Initial animation
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Clear existing timeout
      if(scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Hide trigger button when scrolling
      if(triggerRef.current) {
        gsap.to(triggerRef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.2,
          ease: "power2.out"
        });
      }

      if(currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // Scrolling down - hide navbar
        if(!isHidden) {
          setIsHidden(true);
          setShowPopupMenu(false);
          gsap.to(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      } else if(currentScrollY < lastScrollY.current) {
        // Scrolling up - show navbar immediately
        if(isHidden) {
          setIsHidden(false);
          setShowPopupMenu(false);
          gsap.to(navRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      }

      // Show popup trigger after scroll stops (800ms delay)
      scrollTimeout.current = setTimeout(() => {
        if(isHidden && triggerRef.current) {
          gsap.fromTo(triggerRef.current, 
            { opacity: 0, scale: 0, rotate: -180 },
            { 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              duration: 0.6,
              ease: "back.out(1.7)"
            }
          );
        }
      }, 800);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if(scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [isHidden]);

  const togglePopupMenu = () => {
    setShowPopupMenu(!showPopupMenu);
    
    if(!showPopupMenu) {
      // Show popup menu
      gsap.fromTo(popupMenuRef.current,
        { y: -50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    } else {
      // Hide popup menu
      gsap.to(popupMenuRef.current, {
        y: -50,
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  };

  const showMainNavbar = () => {
    setIsHidden(false);
    setShowPopupMenu(false);
    gsap.to(navRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    });
    gsap.to(triggerRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.3,
      ease: "power2.in"
    });
  };

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const switchAuthMode = (mode) => {
    setAuthMode(mode);
  };

  return (
    <>
      {/* Main Horizontal Navbar */}
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={navData.logo.url} className="flex items-center space-x-3 group">
              <div className="w-10 h-10 relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={navData.logo.image}
                  alt={navData.logo.text}
                  width={40}
                  height={40}
                  className="object-contain rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <span 
                  className="text-white font-bold text-lg absolute inset-0 flex items-center justify-center"
                  style={{ display: 'none' }}
                >
                  T
                </span>
              </div>
              <span className="text-white font-bold text-xl group-hover:text-blue-400 transition-colors duration-300">
                {navData.logo.text}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navData.navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className="text-white hover:text-blue-400 px-3 py-2 text-sm font-medium transition-all duration-300 relative group rounded-lg"
                >
                  <span className="relative z-10">{item.text}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}
            </div>

            {/* Sign In Button */}
            <div className="hidden md:flex items-center">
              <button 
                onClick={() => handleAuthClick('signin')}
                className="px-6 py-3 text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center space-x-2 hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Sign In</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-5 h-5 flex flex-col justify-center items-center">
                  <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
                    isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                  }`}></span>
                  <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm my-0.5 ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
                    isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden border-t border-white/20 mt-2 pt-4 pb-4">
              <div className="space-y-2">
                {navData.navigation.map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    className="text-white hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors duration-200 hover:bg-white/10 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.text}
                  </Link>
                ))}
                <div className="border-t border-white/20 pt-4 mt-4">
                  <button
                    onClick={() => {
                      handleAuthClick('signin');
                      setIsOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Sign In</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Popup Trigger Button */}
      {isHidden && (
        <button
          ref={triggerRef}
          onClick={togglePopupMenu}
          className="fixed top-6 right-6 z-60 w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110"
          style={{ opacity: 0, transform: 'scale(0)' }}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Popup Menu */}
      {showPopupMenu && isHidden && (
        <div 
          ref={popupMenuRef}
          className="fixed top-24 right-6 z-50 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-6 w-80"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-white font-bold text-lg">{navData.logo.text}</span>
            </div>
            <button
              onClick={() => setShowPopupMenu(false)}
              className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center text-white hover:bg-gray-700/50 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-2 mb-6">
            {navData.navigation.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className="group flex items-center text-white hover:text-blue-400 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-200"
                onClick={() => setShowPopupMenu(false)}
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">{item.text}</span>
              </Link>
            ))}
          </nav>

          <div className="space-y-3">
            <button
              onClick={() => {
                handleAuthClick('signin');
                setShowPopupMenu(false);
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Sign In</span>
            </button>
            
            <button
              onClick={showMainNavbar}
              className="w-full bg-gray-800/50 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-700/50 transition-all duration-300"
            >
              Show Full Menu
            </button>
          </div>
        </div>
      )}

      {/* Popup Menu Overlay */}
      {showPopupMenu && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setShowPopupMenu(false)}
        />
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-70 flex items-center justify-center p-4">
          {authMode === 'signin' ? (
            <SignInForm 
              onClose={() => setShowAuthModal(false)}
              onSwitchToSignUp={() => switchAuthMode('signup')}
            />
          ) : (
            <SignUpForm 
              onClose={() => setShowAuthModal(false)}
              onSwitchToSignIn={() => switchAuthMode('signin')}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
