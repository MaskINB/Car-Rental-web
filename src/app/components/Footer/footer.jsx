'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function Footer() {
  const footerRef = useRef(null);
  const newsletterRef = useRef(null);
  const columnsRef = useRef([]);
  const socialRef = useRef(null);
  const copyrightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Newsletter section animation
      gsap.fromTo(newsletterRef.current, 
        { 
          y: 50, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Columns stagger animation
      gsap.fromTo(columnsRef.current,
        {
          y: 60,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: columnsRef.current[0],
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Social media animation
      gsap.fromTo(socialRef.current,
        {
          scale: 0.8,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: socialRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Copyright section slide up
      gsap.fromTo(copyrightRef.current,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: copyrightRef.current,
            start: "top 95%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Hover animations for links
      const links = footerRef.current.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          gsap.to(link, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        link.addEventListener('mouseleave', () => {
          gsap.to(link, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Social icons hover animation
      const socialIcons = socialRef.current?.querySelectorAll('a');
      socialIcons?.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.2,
            rotation: 360,
            duration: 0.4,
            ease: "back.out(1.7)"
          });
        });

        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "back.out(1.7)"
          });
        });
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Newsletter Section */}
      <div ref={newsletterRef} className="bg-gradient-to-r from-gray-800 to-gray-900 py-16 relative">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Stay up to date on all the latest news.
            </h3>
            <p className="text-gray-300">Get exclusive updates and premium offers</p>
          </div>
          <div className="w-full md:w-1/3">
            <div className="flex rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm bg-white/10 border border-white/20">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full px-6 py-4 bg-transparent border-none text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 py-4 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Pages Column */}
          <div ref={el => columnsRef.current[0] = el} className="group">
            <h4 className="text-xl font-bold mb-6 text-white relative">
              Pages
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500"></div>
            </h4>
            <ul className="space-y-3">
              {['Rentals', 'Locations', 'FAQ', 'Features', 'Blog'].map((item, index) => (
                <li key={index} className="transform transition-all duration-300 hover:translate-x-2">
                  <Link href={`/${item.toLowerCase()}`} className="text-gray-300 hover:text-blue-400 transition-colors duration-300 relative group">
                    <span className="relative z-10">{item}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div ref={el => columnsRef.current[1] = el} className="group">
            <h4 className="text-xl font-bold mb-6 text-white relative">
              Resources
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500"></div>
            </h4>
            <ul className="space-y-3">
              {['Installation Manual', 'Release Note', 'Community Help'].map((item, index) => (
                <li key={index} className="transform transition-all duration-300 hover:translate-x-2">
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-300 hover:text-blue-400 transition-colors duration-300 relative group">
                    <span className="relative z-10">{item}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div ref={el => columnsRef.current[2] = el} className="group">
            <h4 className="text-xl font-bold mb-6 text-white relative">
              Company
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500"></div>
            </h4>
            <ul className="space-y-3">
              {['About Us', 'Career', 'Press', 'Support'].map((item, index) => (
                <li key={index} className="transform transition-all duration-300 hover:translate-x-2">
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-300 hover:text-blue-400 transition-colors duration-300 relative group">
                    <span className="relative z-10">{item}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Column */}
          <div ref={el => columnsRef.current[3] = el} className="group">
            <h4 className="text-xl font-bold mb-6 text-white relative">
              Product
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500"></div>
            </h4>
            <ul className="space-y-3">
              {['Demo', 'Security', 'FAQ', 'Features'].map((item, index) => (
                <li key={index} className="transform transition-all duration-300 hover:translate-x-2">
                  <Link href={`/${item.toLowerCase()}`} className="text-gray-300 hover:text-blue-400 transition-colors duration-300 relative group">
                    <span className="relative z-10">{item}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div ref={socialRef} className="mt-16 flex flex-col md:flex-row justify-center md:justify-end items-center space-y-4 md:space-y-0">
          <h4 className="text-xl font-bold mr-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Follow Us</h4>
          <div className="flex space-x-6">
            {[
              { name: 'Facebook', icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
              { name: 'LinkedIn', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
              { name: 'Twitter', icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' }
            ].map((social, index) => (
              <a 
                key={index}
                href="#" 
                className="h-12 w-12 rounded-full border-2 border-blue-500/50 flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:border-transparent transition-all duration-300 backdrop-blur-sm bg-white/5 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <span className="sr-only">{social.name}</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d={social.icon} clipRule="evenodd" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div ref={copyrightRef} className="border-t border-gray-700/50 py-8 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            All rights reserved © <span className="text-blue-400 font-semibold">Premium Rental</span> 2025
          </p>
          <div className="flex space-x-8">
            <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300 relative group">
              Privacy Policy
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link href="/terms-condition" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300 relative group">
              Terms & Condition
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
