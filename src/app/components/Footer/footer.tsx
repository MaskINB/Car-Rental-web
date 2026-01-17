'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Interfaces ---
interface FooterLink {
  name?: string;
  text?: string;
  href?: string;
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
  newsletter: {
    title: string;
    subtitle?: string;
    placeholder: string;
  };
  columns: FooterColumn[];
  social: {
    platforms?: SocialPlatform[];
  };
  copyright: string | {
    text: string;
    links?: FooterLink[];
  };
}

interface Stats {
  totalUsers?: number;
  totalBookings?: number;
  totalCars?: number;
  totalCities?: number;
}

const Footer: React.FC = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const footerRef = useRef<HTMLElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [footerRes, statsRes, copyRes] = await Promise.all([
          fetch('https://raw.githubusercontent.com/MaskINB/car-rental-mock-API/main/footerData.json'),
          fetch('https://raw.githubusercontent.com/MaskINB/car-rental-mock-API/main/stats.json'),
          fetch('https://raw.githubusercontent.com/MaskINB/car-rental-mock-API/main/copyright.json')
        ]);

        const footerJson = await footerRes.json();
        const statsJson = await statsRes.json();
        const copyJson = await copyRes.json();

        // Safe extraction with fallbacks
        const baseFooter = footerJson.footerData || footerJson;
        
        setFooterData({
          ...baseFooter,
          copyright: copyJson.copyright || copyJson
        });
        setStats(statsJson.stats || statsJson);
      } catch (err) {
        console.error('Footer data fetch failed', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!footerData || loading) return;

    const ctx = gsap.context(() => {
      gsap.from(newsletterRef.current, {
        y: 30, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: newsletterRef.current, start: 'top 90%' }
      });

      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          scale: 0.9, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%' }
        });
      }

      gsap.from(columnsRef.current, {
        y: 20, opacity: 0, duration: 0.7, stagger: 0.15,
        scrollTrigger: { trigger: footerRef.current, start: 'top 70%' }
      });
    }, footerRef);

    return () => ctx.revert();
  }, [footerData, loading]);

  if (loading || !footerData) return <div className="h-40 bg-black w-full" />;

  return (
    <footer ref={footerRef} className="bg-black text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Newsletter Section - Responsive Stack */}
        <div ref={newsletterRef} className="py-16 border-b border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 text-center lg:text-left">
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {footerData.newsletter?.title}
              </h3>
              <p className="text-gray-400">{footerData.newsletter?.subtitle}</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }} 
              className="flex w-full max-w-md rounded-xl overflow-hidden bg-white/5 border border-white/10 focus-within:border-blue-500 transition-all">
              <input 
                type="email" placeholder={footerData.newsletter?.placeholder}
                className="bg-transparent px-5 py-4 w-full outline-none text-sm"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-8 transition-colors font-bold min-w-[100px]">
                {subscribed ? '✔' : 'Join'}
              </button>
            </form>
          </div>
        </div>

        {/* Stats Grid - Mobile Optimized */}
        {stats && (
          <div ref={statsRef} className="py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Users', val: stats.totalUsers },
              { label: 'Bookings', val: stats.totalBookings },
              { label: 'Cars', val: stats.totalCars },
              { label: 'Cities', val: stats.totalCities }
            ].map((s, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-2xl text-center border border-white/5">
                <div className="text-2xl md:text-3xl font-black text-blue-400 mb-1">{s.val?.toLocaleString() || 0}</div>
                <div className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Links Columns - Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {(footerData.columns || []).map((col, idx) => (
            <div key={idx} ref={el => { columnsRef.current[idx] = el; }}>
              <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">{col.title}</h4>
              <ul className="space-y-4">
                {(col.links || []).map((link, i) => (
                  <li key={i}>
                    <Link href={link.url || link.href || '#'} className="text-gray-400 hover:text-blue-400 transition-colors text-sm py-2 block">
                      {link.text || link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social & Bottom Bar - Accessible Tap Targets */}
        <div className="border-t border-white/10 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-4">
              {/* FIXED: Safe access to platforms with optional chaining */}
              {footerData.social?.platforms?.map((p, i) => (
                <a key={i} href={p.url} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:-translate-y-1 transition-all">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d={p.icon}/></svg>
                </a>
              ))}
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-500 text-sm mb-4">
                {typeof footerData.copyright === 'string' ? footerData.copyright : footerData.copyright?.text}
              </p>
              <div className="flex flex-wrap gap-6 justify-center md:justify-end">
                {typeof footerData.copyright !== 'string' && footerData.copyright?.links?.map((l, i) => (
                  <Link key={i} href={l.url || l.href || '#'} className="text-gray-500 hover:text-white text-xs">
                    {l.text || l.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;