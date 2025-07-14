"use client";
import { useState, useEffect } from "react";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";

const BookingForm = () => {
  const [bookingData, setBookingData] = useState({
    location: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: ""
  });

  const [locations, setLocations] = useState([]); // State for locations
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);

  // Load locations from API
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/MaskINB/car-rental-mock-API/main/locations.json')
      .then(res => res.json())
      .then(data => {
        setLocations(data);
        setIsLoadingLocations(false);
        // Set default location if available
        if (data.length > 0 && !bookingData.location) {
          setBookingData(prev => ({ ...prev, location: data[0].value }));
        }
      })
      .catch(err => {
        console.error('Failed to load locations:', err);
        setIsLoadingLocations(false);
      });
  }, []);

  // Load initial booking data from backend
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/MaskINB/car-rental-mock-API/main/booking.json')
      .then(res => res.json())
      .then(data => {
        setBookingData({
          location: data.location || "",
          pickupDate: data.pickupDate || "",
          pickupTime: data.pickupTime || "",
          returnDate: data.returnDate || "",
          returnTime: data.returnTime || ""
        });
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load booking data:', err);
        setIsLoading(false);
      });
  }, []);

  // Handle all input changes
  const handleInputChange = (field, value) => {
    const updatedData = { ...bookingData, [field]: value };
    setBookingData(updatedData);
    
    // Update backend
    fetch('https://raw.githubusercontent.com/MaskINB/car-rental-mock-API/main/booking.json', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value })
    }).catch(err => console.error(`Failed to update ${field}:`, err));
  };

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (isLoading || isLoadingLocations) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
          <div className="flex items-center justify-center h-32">
            <div className="text-white">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          
          {/* Location Selector - API Driven */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-300 text-sm font-medium">
              <FaMapMarkerAlt className="mr-2 text-blue-400" />
              Choose a location
            </label>
            <div className="relative">
              <select
                value={bookingData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                <option value="">Select a location</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Pick-up Date & Time */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-300 text-sm font-medium">
              <FaCalendarAlt className="mr-2 text-blue-400" />
              Pick-up date
            </label>
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="date"
                  value={bookingData.pickupDate}
                  min={getTodayDate()}
                  onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                />
                <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Return Date & Time */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-300 text-sm font-medium">
              <FaCalendarAlt className="mr-2 text-blue-400" />
              Return date
            </label>
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="date"
                  value={bookingData.returnDate}
                  min={bookingData.pickupDate || getTodayDate()}
                  onChange={(e) => handleInputChange('returnDate', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                />
                <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="space-y-2">
            <label className="text-transparent text-sm">Search</label>
            <button 
              onClick={() => {
                console.log('Search initiated:', bookingData);
                if (!bookingData.location || !bookingData.pickupDate || !bookingData.returnDate) {
                  alert('Please fill in all required fields');
                  return;
                }
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>Check Avalability</span>
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
