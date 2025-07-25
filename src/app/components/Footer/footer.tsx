'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FooterLink {
  name: string;
  href: string;
  text?: string;
  url?: string;
}

interface FooterColumn {
  id?: string;
  title: string;
  links: FooterLink[];
}

interface SocialPlatform {
  name: string;
  icon: string;
  url: string;
}

interface FooterData {
  company: {
    name: string;
    description: string;
    logo: string;
  };
  columns: FooterColumn[];
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    platforms?: SocialPlatform[];
  };
  newsletter: {
    title: string;
    description: string;
    subtitle?: string;
    placeholder: string;
  };
  copyright: string | {
    text: string;
    links?: FooterLink[];
  };
}

interface Stats {
  cars: number;
  customers: number;
  locations: number;
  years: number;
  totalUsers?: number;
  totalCars?: number;
  citiesServed?: number;
  yearsExperience?: number;
  totalBookings?: number;
  totalCities?: number;
}

const Footer: React.FC = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const footerRef = useRef<HTMLElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const socialRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setLoading(true);
        const [footerResponse, statsResponse, copyrightResponse] = await Promise.all([
          fetch('https://raw.githubusercontent.com/MaskINB/car-rental-mock-API/main/footerData.json'),
          fetch('https://raw.githubusercontent.com/MaskINB/car-rental-mock-API/main/stats.json'),
          fetch('https://raw.githubusercontent.com/MaskINB/car-rental-mock-API/main/copyright.json')
        ]);

        if (!footerResponse.ok || !statsResponse.ok || !copyrightResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const footerJson = await footerResponse.json();
        const statsJson = await statsResponse.json();
        const copyrightJson = await copyrightResponse.json();

        // Extract data properly maintaining structure
        const footerDataFromApi = footerJson.footerData || footerJson;
        const statsDataFromApi = statsJson.stats || statsJson;
        const copyrightDataFromApi = copyrightJson.copyright || copyrightJson;

        // Combine footer data with copyright data
        const combinedFooterData = {
          ...footerDataFromApi,
          copyright: copyrightDataFromApi
        };

        setFooterData(combinedFooterData);
        setStats(statsDataFromApi);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching footer data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    try {
      const response = await fetch('https://raw.githubusercontent.com/MaskINB/car-rental-mock-API/main/copyright.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subscribedAt: new Date().toISOString() }),
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

  useEffect(() => {
    if (!footerData || loading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(newsletterRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: newsletterRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );

      if (statsRef.current) {
        gsap.fromTo(statsRef.current.children,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: statsRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      }

      gsap.fromTo(columnsRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: columnsRef.current[0], start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      );

      gsap.fromTo(socialRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: socialRef.current, start: 'top 90%', toggleActions: 'play none none reverse' }
        }
      );

      gsap.fromTo(copyrightRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: copyrightRef.current, start: 'top 95%', toggleActions: 'play none none reverse' }
        }
      );

      const links = footerRef.current.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('mouseenter', () => gsap.to(link, { scale: 1.05, duration: 0.3 }));
        link.addEventListener('mouseleave', () => gsap.to(link, { scale: 1, duration: 0.3 }));
      });

      const socialIcons = socialRef.current?.querySelectorAll('a');
      socialIcons?.forEach(icon => {
        icon.addEventListener('mouseenter', () => gsap.to(icon, { scale: 1.2, rotation: 360, duration: 0.4 }));
        icon.addEventListener('mouseleave', () => gsap.to(icon, { scale: 1, rotation: 0, duration: 0.4 }));
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
    <footer ref={footerRef} className="bg-black text-white relative overflow-hidden py-16">
      {/* Animated background circles */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-indigo-500 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Newsletter */}
      <div ref={newsletterRef} className="bg-black py-16 relative">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {footerData?.newsletter?.title}
            </h3>
            <p className="text-gray-300">{footerData?.newsletter?.subtitle}</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm bg-white/10 border border-white/20">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={footerData?.newsletter?.placeholder}
              className="w-full px-6 py-4 bg-transparent border-none text-white placeholder-gray-300 focus:outline-none"
              required
            />
            <button type="submit" disabled={subscribed}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 py-4 transition-all duration-300 hover:shadow-lg">
              {subscribed ? '✔' : '→'}
            </button>
          </form>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div ref={statsRef} className="py-12 border-b border-gray-700/50">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-400">{stats.totalUsers}</div>
              <div className="text-gray-300">Happy Users</div>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6">
              <div className="text-3xl font-bold text-purple-400">{stats.totalBookings}</div>
              <div className="text-gray-300">Bookings</div>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6">
              <div className="text-3xl font-bold text-indigo-400">{stats.totalCars}</div>
              <div className="text-gray-300">Cars Available</div>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6">
              <div className="text-3xl font-bold text-cyan-400">{stats.totalCities}</div>
              <div className="text-gray-300">Cities</div>
            </div>
          </div>
        </div>
      )}

      {/* Columns */}
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {footerData?.columns && Array.isArray(footerData.columns) && footerData.columns.map((column, index) => (
          <div key={column.id || index} ref={el => {
            if (el) columnsRef.current[index] = el;
          }}>
            <h4 className="text-xl font-bold mb-6">{column.title}</h4>
            <ul className="space-y-3">
              {column.links && Array.isArray(column.links) && column.links.map((link, i) => (
                <li key={i}>
                  <Link href={link.url} className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Social */}
      <div ref={socialRef} className="flex justify-center space-x-6 mt-10">
        {footerData?.social?.platforms && Array.isArray(footerData.social.platforms) && footerData.social.platforms.map((platform, i) => (
          <a key={i} href={platform.url} target="_blank" rel="noopener noreferrer"
             className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-blue-500">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d={platform.icon} />
            </svg>
          </a>
        ))}
      </div>

      {/* Copyright */}
      <div ref={copyrightRef} className="border-t border-gray-700/50 py-8 text-center text-sm text-gray-400">
        <div className="mb-4">
          {typeof footerData?.copyright === 'string' 
            ? footerData.copyright 
            : footerData?.copyright?.text}
        </div>
        {typeof footerData?.copyright !== 'string' && footerData?.copyright?.links && Array.isArray(footerData.copyright.links) && (
          <div className="flex justify-center space-x-6">
            {footerData.copyright.links.map((link, i) => (
              <Link key={i} href={link.url || link.href} className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                {link.text || link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
