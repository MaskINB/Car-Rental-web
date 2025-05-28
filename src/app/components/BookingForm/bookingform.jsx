"use client";
import { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";

const BookingForm = () => {
  const [bookingData, setBookingData] = useState({
    location: "Los Angeles, USA",
    pickupDate: "May 05",
    pickupTime: "09:30 PM",
    returnDate: "May 06", 
    returnTime: "08:00 PM",
  });

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Booking Form Card */}
      <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          
          {/* Location */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-300 text-sm font-medium">
              <FaMapMarkerAlt className="mr-2 text-blue-400" />
              Choose a location
            </label>
            <div className="relative">
              <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
                <option value="los-angeles">{bookingData.location}</option>
                <option value="new-york">New York, USA</option>
                <option value="miami">Miami, USA</option>
                <option value="chicago">Chicago, USA</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Pick-up Date */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-300 text-sm font-medium">
              <FaCalendarAlt className="mr-2 text-blue-400" />
              Pick-up date
            </label>
            <div className="relative">
              <input
                type="text"
                value={`${bookingData.pickupDate}, ${bookingData.pickupTime}`}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
              <FaClock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Return Date */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-300 text-sm font-medium">
              <FaCalendarAlt className="mr-2 text-blue-400" />
              Return date
            </label>
            <div className="relative">
              <input
                type="text"
                value={`${bookingData.returnDate}, ${bookingData.returnTime}`}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
              <FaClock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Search Button */}
          <div className="space-y-2">
            <label className="text-transparent text-sm">Search</label>
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
              <FaSearch />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">500+</div>
            <div className="text-gray-400 text-sm">Premium Cars</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-gray-400 text-sm">Support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">50+</div>
            <div className="text-gray-400 text-sm">Locations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">10K+</div>
            <div className="text-gray-400 text-sm">Happy Clients</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
