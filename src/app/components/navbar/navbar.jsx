'use client';
import Link from 'next/link';
import React, { useState } from 'react';

const navData = {
  logo: {
    text: "RENTAL",
    url: "/"
  },
  navigation: [
    { text: "How it's Work", url: "/car" },
    { text: "Booking", url: "/booking" },
    { text: "Services", url: "/car_services" },
    { text: "Contact Us", url: "/contact_us" }
  ],
  auth: [
    { text: "Sign in", url: "/sign_in" },
    { text: "Get Started", url: "/sign_up" }
  ]
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex flex-wrap items-center justify-between p-3 bg-gradient-to">
      {/* Logo (Left) */}
      <h1 className="font-bold text-2xl">
        <Link href={navData.logo.url}>{navData.logo.text}</Link>
      </h1>

      {/* Hamburger Menu (Mobile) */}
      <button
        className="md:hidden text-xl font-bold"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      {/* Navigation + Auth (responsive container) */}
      <div
        className={`w-full md:flex md:items-center md:justify-between md:w-auto ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {/* Navigation Links (Center) */}
        <ul className="flex flex-col md:flex-row gap-4 md:gap-25 text-base font-bold mt-4 md:mt-0">
          {navData.navigation.map((item, index) => (
            <li key={index}>
              <Link href={item.url} className="hover:text-amber-600 transition">
                {item.text}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Buttons (Right) */}
<div className="flex flex-col md:flex-row gap-3 font-bold mt-4 md:mt-0">
  {navData.auth.map((item, index) => {
    const isGetStarted = item.text === "Get Started";

    return (
      <Link
        key={index}
        href={item.url}
        className={`group inline-flex items-center gap-2 px-5 py-2 rounded-lg border transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${
          isGetStarted
            ? "bg-gradient-to-r from-amber-400 to-yellow-300 text-black hover:from-amber-500 hover:to-yellow-400"
            : "bg-white border-gray-300 text-gray-800 hover:bg-amber-100"
        }`}
      >
        {/* Inline SVG Icon */}
        <span className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12">
          {isGetStarted ? (
            // User Plus Icon (for "Get Started")
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-6 4a4 4 0 100-8 4 4 0 000 8zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" />
            </svg>
          ) : (
            // Login Icon (for "Sign in")
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H3m6-6l-6 6 6 6m6 0h3a2 2 0 002-2V6a2 2 0 00-2-2h-3" />
            </svg>
          )}
        </span>
        {item.text}
      </Link>
    );
  })}
</div>

      </div>
    </nav>
  );
};

export default Navbar;
