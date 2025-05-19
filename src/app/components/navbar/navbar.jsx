'use client';
import Link from 'next/link';
import React, { useState } from 'react';

const navData = {
  logo: {
    text: 'RENTAL',
    url: '/',
  },
  navigation: [
    { text: "How it's Work", url: '/car' },
    { text: 'Booking', url: '/booking' },
    { text: 'Services', url: '/car_services' },
    { text: 'Contact Us', url: '/contact_us' },
  ],
  auth: [
    { text: 'Sign in', url: '/sign_in' },
    { text: 'Get Started', url: '/sign_up' },
  ],
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href={navData.logo.url}>{navData.logo.text}</Link>
        </div>

        {/* Hamburger Toggle (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-between w-full max-w-xl">
          <ul className="flex gap-8 text-base font-bold">
            {navData.navigation.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.url}
                  className="hover:text-amber-600 transition"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-3 font-bold">
            {navData.auth.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className={`px-4 py-2 border rounded-md transition ${
                  item.text === 'Get Started'
                    ? 'bg-amber-300 hover:bg-amber-400'
                    : 'hover:bg-amber-200'
                }`}
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-white">
          <ul className="flex flex-col gap-3 text-base font-bold">
            {navData.navigation.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.url}
                  className="block hover:text-amber-600 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-col gap-2 font-bold">
            {navData.auth.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className={`block text-center px-4 py-2 border rounded-md transition ${
                  item.text === 'Get Started'
                    ? 'bg-amber-300 hover:bg-amber-400'
                    : 'hover:bg-amber-200'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
