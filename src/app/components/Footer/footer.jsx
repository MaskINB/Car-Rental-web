'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function Footer() {
  const [footerData, setFooterData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const footerRef = useRef(null);
  const newsletterRef = useRef(null);
  const columnsRef = useRef([]);
  const socialRef = useRef(null);
  const copyrightRef = useRef(null);
  const statsRef = useRef(null);

  // Fetch footer data from API
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setLoading(true);
        const [footerResponse, statsResponse] = await Promise.all([
          fetch('http://localhost:4000/footerData'),
          fetch('http://localhost:4000/stats')
        ]);

        if (!footerResponse.ok || !statsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const footerData = await footerResponse.json();
        const statsData = await statsResponse.json();

        setFooterData(footerData);
        setStats(statsData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching footer data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // Handle newsletter subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const response = await fetch('http://localhost:3001/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          subscribedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 3000);
      }
    } catch (err) {
      console.error('Subscription error:', err);
    }
  };

  // GSAP Animations
  useEffect(() => {
    if (!footerData || loading) return;

    const ctx = gsap.context(() => {
      // Newsletter section animation
      gsap.fromTo(newsletterRef.current, 
        { y: 50, opacity: 0 },
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

      // Stats animation
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.children,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Columns stagger animation
      gsap.fromTo(columnsRef.current,
        { y: 60, opacity: 0 },
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
        { scale: 0.8, opacity: 0 },
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
        { y: 30, opacity: 0 },
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

      // Interactive hover animations
      const links = footerRef.current.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          gsap.to(link, { scale: 1.05, duration: 0.3, ease: "power2.out" });
        });
        link.addEventListener('mouseleave', () => {
          gsap.to(link, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });

      // Social icons hover animation
      const socialIcons = socialRef.current?.querySelectorAll('a');
      socialIcons?.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, { scale: 1.2, rotation: 360, duration: 0.4, ease: "back.out(1.7)" });
        });
        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.4, ease: "back.out(1.7)" });
        });
      });

    }, footerRef);

    return () => ctx.revert();
  }, [footerData, loading]);

  if (loading) {
    return (
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-4 text-lg">Loading footer...</span>
        </div>
      </footer>
    );
  }

  if (error) {
    return (
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-400">Error loading footer: {error}</p>
        </div>
      </footer>
    );
  }

  return (
    <footer ref={footerRef} className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden py-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-indigo-500 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Newsletter Section */}
      <div ref={newsletterRef} className="bg-gradient-to-r from-gray-800 to-gray-900 py-16 relative">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {footerData?.newsletter?.title}
            </h3>
            <p className="text-gray-300">{footerData?.newsletter?.subtitle}</p>
          </div>
          <div className="w-full md:w-1/3">
            <form onSubmit={handleSubscribe} className="flex rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm bg-white/10 border border-white/20">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={footerData?.newsletter?.placeholder}
                className="w-full px-6 py-4 bg-transparent border-none text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                required
              />
              <button 
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 py-4 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 group disabled:opacity-50"
                disabled={subscribed}
              >
                {subscribed ? (
                  <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </form>
            {subscribed && (
              <p className="text-green-400 text-sm mt-2 text-center">Successfully subscribed!</p>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {stats && (
        <div ref={statsRef} className="py-12 border-b border-gray-700/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-blue-400 mb-2">{stats.totalUsers}</div>
                <div className="text-gray-300">Happy Users</div>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-purple-400 mb-2">{stats.totalBookings}</div>
                <div className="text-gray-300">Bookings</div>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-indigo-400 mb-2">{stats.totalCars}</div>
                <div className="text-gray-300">Cars Available</div>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-cyan-400 mb-2">{stats.totalCities}</div>
                <div className="text-gray-300">Cities</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {footerData?.columns?.map((column, index) => (
            <div key={column.id} ref={el => columnsRef.current[index] = el} className="group">
              <h4 className="text-xl font-bold mb-6 text-white relative">
                {column.title}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500"></div>
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="transform transition-all duration-300 hover:translate-x-2">
                    <Link href={link.url} className="text-gray-300 hover:text-blue-400 transition-colors duration-300 relative group">
                      <span className="relative z-10">{link.text}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media */}
        <div ref={socialRef} className="mt-16 flex flex-col md:flex-row justify-center md:justify-end items-center space-y-4 md:space-y-0">
          <h4 className="text-xl font-bold mr-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {footerData?.social?.title}
          </h4>
          <div className="flex space-x-6">
            {footerData?.social?.platforms?.map((platform, index) => (
              <a 
                key={index}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 w-12 rounded-full border-2 border-blue-500/50 flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:border-transparent transition-all duration-300 backdrop-blur-sm bg-white/5 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <span className="sr-only">{platform.name}</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d={platform.icon} clipRule="evenodd" />
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
            {footerData?.copyright?.text}
          </p>
          <div className="flex space-x-8">
            {footerData?.copyright?.links?.map((link, index) => (
              <Link 
                key={index}
                href={link.url} 
                className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300 relative group"
              >
                {link.text}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
