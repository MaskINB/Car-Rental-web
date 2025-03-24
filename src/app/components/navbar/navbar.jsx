import Link from 'next/link';
import React from 'react';

// JSON Navigation Data
const navData = {
  logo: {
    text: "LOGO",
    url: "/"
  },
  navigation: [
    { text: "Home", url: "/car" },
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
  return (
    <nav className="flex items-center justify-between bg-amber-100 p-5">
      {/* Logo (Left) */}
      <h1 className="font-bold text-lg">
        <Link href={navData.logo.url}>{navData.logo.text}</Link>
      </h1>

      {/* Navigation Links (Center) */}
      <ul className="flex gap-8 text-base font-semibold">
        {navData.navigation.map((item, index) => (
          <li key={index}>
            <Link href={item.url} className="hover:text-amber-600 transition">
              {item.text}
            </Link>
          </li>
        ))}
      </ul>

      {/* Auth Buttons (Right) */}
      <div className="flex gap-5">
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
    </nav>
  );
};

export default Navbar;
