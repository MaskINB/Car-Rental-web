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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Initial gentle fade in animation
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { opacity: 0, y: -100 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);
          
          // Only trigger if scroll difference is significant (reduces jitter)
          if (scrollDifference < 5) {
            ticking = false;
            return;
          }

          const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
          
          // Adjust threshold based on device type
          const threshold = isMobile ? 30 : 50;
          
          // Fast hide when scrolling down past threshold
          if (scrollDirection === 'down' && currentScrollY > threshold && !isHidden.current) {
            isHidden.current = true;
            gsap.to(navRef.current, {
              y: isMobile ? -70 : -80,
              duration: isMobile ? 0.15 : 0.2,
              ease: "power1.inOut"
            });
          }

          // Fast show when scrolling up or at top
          if ((scrollDirection === 'up' || currentScrollY <= threshold) && isHidden.current) {
            isHidden.current = false;
            gsap.to(navRef.current, {
              y: 0,
              duration: isMobile ? 0.2 : 0.25,
              ease: "power1.out"
            });
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(mobileMenuRef.current,
          { opacity: 0, height: 0 },
          { opacity: 1, height: 'auto', duration: 0.3, ease: "power2.out" }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          height: 0,
          duration: 0.2,
          ease: "power2.in"
        });
      }
    }
  }, [isMobileMenuOpen]);

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 sm:left-180 right-0 z-[9999] bg-black/90 backdrop-blur-md border-b border-white/20 shadow-2xl rounded-b-2xl"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link href={navData.logo.url} className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 relative overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={navData.logo.image}
                  alt={navData.logo.text}
                  width={32}
                  height={32}
                  className="object-contain rounded-lg sm:w-10 sm:h-10"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <span 
                  className="text-white font-bold text-sm sm:text-lg absolute inset-0 flex items-center justify-center"
                  style={{ display: 'none' }}
                >
                  T
                </span>
              </div>
              <span className="text-white font-bold text-lg sm:text-xl group-hover:text-blue-400 transition-colors duration-300">
                {navData.logo.text}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navData.navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className="text-white hover:text-blue-400 px-2 lg:px-3 py-2 text-sm font-medium transition-all duration-300 relative group rounded-lg"
                >
                  <span className="relative z-10">{item.text}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}
            </div>

            {/* Desktop Sign In Button */}
            <div className="hidden md:flex items-center">
              <button 
                onClick={() => handleAuthClick('signin')}
                className="px-4 lg:px-6 py-2 lg:py-3 text-xs lg:text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg lg:rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center space-x-1 lg:space-x-2 hover:scale-105"
              >
                <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Sign In</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 touch-manipulation"
              aria-label="Toggle mobile menu"
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 flex flex-col justify-center items-center">
                <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-4 sm:w-5 rounded-sm ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-0.5 sm:translate-y-1' : '-translate-y-0.5'
                }`}></span>
                <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-4 sm:w-5 rounded-sm my-0.5 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-4 sm:w-5 rounded-sm ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-0.5 sm:-translate-y-1' : 'translate-y-0.5'
                }`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div 
            ref={mobileMenuRef}
            className={`md:hidden overflow-hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          >
            <div className="border-t border-white/20 pt-3 pb-4 space-y-1">
              {navData.navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className="text-white hover:text-blue-400 block px-3 py-3 text-base font-medium transition-colors duration-200 hover:bg-white/10 rounded-lg active:bg-white/20 touch-manipulation"
                  onClick={closeMobileMenu}
                >
                  {item.text}
                </Link>
              ))}
              
              {/* Mobile Sign In Button */}
              <div className="border-t border-white/20 pt-3 mt-3">
                <button
                  onClick={() => {
                    handleAuthClick('signin');
                    closeMobileMenu();
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-600 active:from-blue-700 active:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 touch-manipulation"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Sign In</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
          {authMode === 'signin' ? (
            <SignInForm 
              onClose={() => setShowAuthModal(false)}
              onSwitchToSignUp={() => setAuthMode('signup')}
            />
          ) : (
            <SignUpForm 
              onClose={() => setShowAuthModal(false)}
              onSwitchToSignIn={() => setAuthMode('signin')}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
