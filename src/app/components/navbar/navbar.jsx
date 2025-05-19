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
          {navData.auth.map((item, index) => (
            <Link 
              key={index} 
              href={item.url} 
              className={`px-4 py-2 border rounded-md transition ${
                item.text === "Get Started" ? "bg-amber-300 hover:bg-amber-400" : "hover:bg-amber-200"
              }`}
            >
              {item.text}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
