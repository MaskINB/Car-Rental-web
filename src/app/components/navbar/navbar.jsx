'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const navData = {
  logo: {
    text: "Trizent",
    url: "/",
    image: "/image/car-service-logo-design.png" // Make sure this path is correct
  },
  navigation: [
    { text: "Home", url: "/" },
    { text: "Service", url: "/service" },
    { text: "Fleet", url: "/fleet" },
    { text: "FAQ", url: "/faq" },
    { text: "Contact", url: "/contact" },
  ]
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCompressed, setIsCompressed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  
  const navRef = useRef(null);
  const sidebarRef = useRef(null);
  const triggerRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Check scroll thresholds
      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Compress to sidebar after more scrolling with complete hide animation
      if (currentScrollY > 300) {
        setIsCompressed(true);
        // Completely hide main navbar with smooth animation
        gsap.to(navRef.current, {
          y: -150,
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "power2.out"
        });
        
        // Show trigger button with animation
        if (triggerRef.current) {
          gsap.fromTo(triggerRef.current, 
            { scale: 0, opacity: 0, rotate: -180 },
            { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: "back.out(1.7)", delay: 0.2 }
          );
        }
      } else {
        setIsCompressed(false);
        setShowSidebar(false);
        
        // Show main navbar with smooth animation
        gsap.to(navRef.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        });
        
        // Hide trigger button
        if (triggerRef.current) {
          gsap.to(triggerRef.current, {
            scale: 0,
            opacity: 0,
            rotate: 180,
            duration: 0.3,
            ease: "power2.in"
          });
        }
      }

      // Hide/show navbar on scroll direction (only when not compressed)
      if (!isCompressed) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          gsap.to(navRef.current, {
            y: -100,
            duration: 0.3,
            ease: "power2.out"
          });
        } else if (currentScrollY < lastScrollY.current) {
          gsap.to(navRef.current, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }

      lastScrollY.current = currentScrollY;
    };

    // Initial animation
    if (navRef.current) {
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [isCompressed]);

  // Toggle sidebar with enhanced animations
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    
    if (!showSidebar) {
      // Animate trigger button
      gsap.to(triggerRef.current, {
        rotate: 180,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Show sidebar
      gsap.fromTo(sidebarRef.current,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    } else {
      // Reset trigger button
      gsap.to(triggerRef.current, {
        rotate: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Hide sidebar
      gsap.to(sidebarRef.current, {
        x: '100%',
        opacity: 0,
        duration: 0.4,
        ease: "power3.in"
      });
    }
  };

  const handleSignIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav 
        ref={navRef}
        className={`fixed top-5 left-205 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'w-auto max-w-2xl' 
            : 'w-auto max-w-5xl'
        }`}
      >
        <div className={`${
          isScrolled 
            ? 'bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-full px-6 py-3' 
            : 'bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-4'
        } transition-all duration-300 shadow-2xl`}>
          
          <div className="flex items-center justify-between">
            {/* Fixed Logo Section */}
            <div className="flex items-center">
              <Link href={navData.logo.url} className="flex items-center space-x-3 group">
                {/* Logo Image */}
                <div className={`${
                  isScrolled ? 'w-8 h-8' : 'w-10 h-10'
                } relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg`}>
                  {/* Try to load the image, fallback to text logo */}
                  <Image
                    src={navData.logo.image}
                    alt={navData.logo.text}
                    width={isScrolled ? 32 : 40}
                    height={isScrolled ? 32 : 40}
                    className="object-contain rounded-lg"
                    onError={(e) => {
                      // Hide image and show fallback text if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback Text Logo */}
                  <span 
                    className={`text-white font-bold ${isScrolled ? 'text-sm' : 'text-lg'} absolute inset-0 flex items-center justify-center`}
                    style={{ display: 'none' }}
                  >
                    T
                  </span>
                </div>
                
                {/* Brand Text */}
                <span className={`text-white font-bold ${
                  isScrolled ? 'text-lg' : 'text-xl'
                } transition-all duration-300 group-hover:text-blue-400`}>
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
                    } font-medium transition-all duration-300 hover:scale-105 relative group`}
                  >
                    <span className="relative z-10">{item.text}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                ))}
              </div>
            </div>

            {/* User Authentication & Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search Button */}
              <button className={`${
                isScrolled ? 'w-8 h-8' : 'w-10 h-10'
              } bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group`}>
                <svg className={`${isScrolled ? 'w-4 h-4' : 'w-5 h-5'} text-white group-hover:text-blue-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* User Profile */}
              <div className="relative">
                <button 
                  onClick={handleSignIn}
                  className={`${
                    isScrolled ? 'w-8 h-8' : 'w-10 h-10'
                  } bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 group shadow-lg hover:shadow-blue-500/25`}
                >
                  {isLoggedIn ? (
                    <img 
                      src="https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=U" 
                      alt="User Avatar" 
                      className={`${isScrolled ? 'w-6 h-6' : 'w-8 h-8'} rounded-full transition-all duration-300`}
                    />
                  ) : (
                    <svg className={`${isScrolled ? 'w-4 h-4' : 'w-5 h-5'} text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </button>

                {/* User Dropdown */}
                {isLoggedIn && (
                  <div className="absolute right-0 top-12 w-48 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <div className="p-2">
                      <Link href="/profile" className="block px-4 py-2 text-white hover:bg-gray-700/50 rounded-lg transition-colors">
                        Profile
                      </Link>
                      <Link href="/settings" className="block px-4 py-2 text-white hover:bg-gray-700/50 rounded-lg transition-colors">
                        Settings
                      </Link>
                      <button 
                        onClick={handleSignIn}
                        className="w-full text-left px-4 py-2 text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
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
            <div className="md:hidden mobile-menu">
              <div className="px-2 pt-4 pb-3 space-y-1 border-t border-white/20 mt-4">
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
                    onClick={handleSignIn}
                    className="w-full text-left text-white hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors duration-200 hover:bg-white/10 rounded-lg"
                  >
                    {isLoggedIn ? 'Sign Out' : 'Sign In'}
                  </button>
                  <Link
                    href="/booking"
                    className="block w-full mt-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl text-center hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Modern Compressed Sidebar Trigger with Logo */}
      {isCompressed && (
        <div 
          ref={triggerRef}
          className="fixed top-6 right-6 z-50 opacity-0"
        >
          <button
            onClick={toggleSidebar}
            className="group relative w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border border-white/20"
          >
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
            
            {/* Logo and Menu Icon Container */}
            <div className="relative flex flex-col items-center justify-center h-full">
              {/* Mini Logo */}
              <div className="w-6 h-6 bg-white/20 rounded-md flex items-center justify-center mb-1 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                <Image
                  src={navData.logo.image}
                  alt={navData.logo.text}
                  width={20}
                  height={20}
                  className="object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <span 
                  className="text-white font-bold text-xs absolute inset-0 flex items-center justify-center"
                  style={{ display: 'none' }}
                >
                  T
                </span>
              </div>
              
              {/* Modern Three Dots */}
              <div className="flex space-x-0.5">
                <div className="w-1 h-1 bg-white rounded-full group-hover:scale-125 transition-transform duration-300 delay-75"></div>
                <div className="w-1 h-1 bg-white rounded-full group-hover:scale-125 transition-transform duration-300 delay-100"></div>
                <div className="w-1 h-1 bg-white rounded-full group-hover:scale-125 transition-transform duration-300 delay-125"></div>
              </div>
            </div>

            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-white/10 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-2xl"></div>
            </div>
          </button>
        </div>
      )}

      {/* Enhanced Sidebar Menu */}
      {isCompressed && (
        <div 
          ref={sidebarRef}
          className="fixed top-0 right-0 h-full w-80 bg-gray-900/98 backdrop-blur-2xl border-l border-gray-700/50 z-40 transform translate-x-full"
        >
          {/* Sidebar Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
          </div>
          
          <div className="relative p-6 h-full overflow-y-auto">
            {/* Enhanced Sidebar Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                  <Image
                    src={navData.logo.image}
                    alt={navData.logo.text}
                    width={32}
                    height={32}
                    className="object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <span 
                    className="text-white font-bold text-sm absolute inset-0 flex items-center justify-center"
                    style={{ display: 'none' }}
                  >
                    T
                  </span>
                </div>
                <div>
                  <span className="text-white font-bold text-xl">{navData.logo.text}</span>
                  <p className="text-gray-400 text-xs">Premium Car Rental</p>
                </div>
              </div>
              <button
                onClick={toggleSidebar}
                className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center text-white hover:bg-gray-700/50 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Enhanced Sidebar Navigation */}
            <nav className="space-y-2 mb-8">
              {navData.navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className="group flex items-center text-white hover:text-blue-400 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-200 border border-transparent hover:border-blue-500/20"
                  onClick={() => setShowSidebar(false)}
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">{item.text}</span>
                </Link>
              ))}
            </nav>

            {/* Enhanced User Section */}
            <div className="mt-auto pt-6 border-t border-gray-700/50">
              <div className="flex items-center space-x-3 mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/30">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  {isLoggedIn ? (
                    <img 
                      src="https://via.placeholder.com/48x48/4F46E5/FFFFFF?text=U" 
                      alt="User Avatar" 
                      className="w-10 h-10 rounded-lg"
                    />
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">
                    {isLoggedIn ? 'John Doe' : 'Guest User'}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {isLoggedIn ? 'john@example.com' : 'Sign in to continue'}
                  </p>
                </div>
              </div>

              {isLoggedIn ? (
                <div className="space-y-2">
                  <Link
                    href="/profile"
                    className="flex items-center text-white hover:text-blue-400 px-4 py-3 rounded-xl hover:bg-gray-800/50 transition-all duration-200"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center text-white hover:text-blue-400 px-4 py-3 rounded-xl hover:bg-gray-800/50 transition-all duration-200"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </Link>
                  <button
                    onClick={handleSignIn}
                    className="flex items-center w-full text-left text-white hover:text-red-400 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-all duration-200"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                >
                  Sign In to Continue
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Sidebar Overlay */}
      {isCompressed && showSidebar && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-all duration-300"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </>
  );
};

export default Navbar;
