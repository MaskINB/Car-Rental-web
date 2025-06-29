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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCompactMenu, setShowCompactMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  
  const navRef = useRef(null);
  const compactMenuRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Initial navbar animation
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        if (!isScrolled) {
          setIsScrolled(true);
          setShowCompactMenu(true);
          
          if (navRef.current) {
            gsap.to(navRef.current, {
              y: -100,
              opacity: 0,
              duration: 0.5,
              ease: "power2.out"
            });
          }
        }
      } else if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
        // Scrolling up
        if (isScrolled) {
          setIsScrolled(false);
          setShowCompactMenu(false);
          
          if (navRef.current) {
            gsap.to(navRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out"
            });
          }
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Animate compact menu
  useEffect(() => {
    if (showCompactMenu && compactMenuRef.current) {
      gsap.fromTo(compactMenuRef.current,
        { y: -60, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.3 }
      );
    }
  }, [showCompactMenu]);

  const expandToFullNavbar = () => {
    setIsScrolled(false);
    setShowCompactMenu(false);
    
    if (compactMenuRef.current) {
      gsap.to(compactMenuRef.current, {
        y: -60,
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in"
      });
    }
    
    setTimeout(() => {
      if (navRef.current) {
        gsap.to(navRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    }, 200);
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
      {/* Main Navbar */}
      {!isScrolled && (
        <nav 
          ref={navRef}
          className="fixed top-0 left-180 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-2xl rounded-b-2xl"
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

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-5 h-5 flex flex-col justify-center items-center">
                  <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                  }`}></span>
                  <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm my-0.5 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                  }`}></span>
                </div>
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
              <div className="md:hidden border-t border-white/20 mt-2 pt-4 pb-4">
                <div className="space-y-2">
                  {navData.navigation.map((item, index) => (
                    <Link
                      key={index}
                      href={item.url}
                      className="text-white hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors duration-200 hover:bg-white/10 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.text}
                    </Link>
                  ))}
                  <div className="border-t border-white/20 pt-4 mt-4">
                    <button
                      onClick={() => {
                        handleAuthClick('signin');
                        setIsMobileMenuOpen(false);
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
      )}

      {/* Compact Menu Button */}
      {showCompactMenu && (
        <div 
          ref={compactMenuRef}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-60 cursor-pointer"
          onClick={expandToFullNavbar}
          style={{ opacity: 0 }}
        >
          <div className="backdrop-blur-xl rounded-full px-9 py-4 border border-gray-800/50 shadow-2xl hover:bg-black transition-all duration-300 group relative top-1 left-168">
            <div className="flex items-center space-x-4">
              {/* Hamburger Icon */}
              <div className="flex flex-col space-y-1.5">
                <div className="w-5 h-0.5 bg-white rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
                <div className="w-5 h-0.5 bg-white rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
                <div className="w-5 h-0.5 bg-white rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
              </div>
              
              {/* MENU Text */}
              <span className="text-white font-semibold text-base tracking-wide group-hover:text-blue-400 transition-colors duration-300">
                SPEED UP
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-90 flex items-center justify-center p-4">
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
