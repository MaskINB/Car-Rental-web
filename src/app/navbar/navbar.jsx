import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-amber-100 p-5">
      {/* Logo (Left) */}
      <h1 className="font-bold text-lg">
        <Link href="/">LOGO</Link>
      </h1>

      {/* Navigation Links (Center) */}
      <ul className="flex gap-8 text-base font-semibold">
        <li>
          <Link href="/car" className="hover:text-amber-600 transition">
            Home
          </Link>
        </li>
        <li>
          <Link href="/booking" className="hover:text-amber-600 transition">
            Booking
          </Link>
        </li>
        <li>
          <Link href="/car_services" className="hover:text-amber-600 transition">
            Services
          </Link>
        </li>
        <li>
          <Link href="/contact_us" className="hover:text-amber-600 transition">
            Contact Us
          </Link>
        </li>
      </ul>

      {/* Auth Buttons (Right) */}
      <div className="flex gap-5">
        <Link href="/sign_in" className="px-4 py-2 border rounded-md hover:bg-amber-200 transition">
          Sign in
        </Link>
        <Link href="/sign_up" className="px-4 py-2 border rounded-md bg-amber-300 hover:bg-amber-400 transition">
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
