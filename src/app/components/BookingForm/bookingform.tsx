"use client";
import { useState, useEffect } from "react";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { BookingFormData, FormChangeHandler } from "@/types";

interface LocationOption {
  id?: string;
  value: string;
  label: string;
}

const BookingForm: React.FC = () => {
  const [bookingData, setBookingData] = useState<BookingFormData>({
    location: "",
    pickupDate: "",
    returnDate: ""
  });
  const [locations, setLocations] = useState<LocationOption[]>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingLocations, setIsLoadingLocations] = useState<boolean>(true);

  // Fetch locations data safely
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch('https://raw.githubusercontent.com/MaskINB/car-rental-mock-API/main/locations.json');
        const data = await res.json();

        let locationsArray = [];

        if (Array.isArray(data)) {
          locationsArray = data;
        } else if (Array.isArray(data.locations)) {
          locationsArray = data.locations;
        } else {
          console.warn('Unexpected locations format:', data);
        }

        setLocations(locationsArray);

        if (locationsArray.length > 0 && !bookingData.location) {
          setBookingData(prev => ({ ...prev, location: locationsArray[0].value }));
        }

      } catch (err) {
        console.error('Failed to load locations:', err);
      } finally {
        setIsLoadingLocations(false);
      }
    };

    fetchLocations();
  }, [bookingData.location]);

  // Fetch booking data safely
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch('https://raw.githubusercontent.com/MaskINB/car-rental-mock-API/main/booking.json');
        const data = await res.json();

        setBookingData({
          location: data.location || "",
          pickupDate: data.pickupDate || "",
          returnDate: data.returnDate || ""
        });

      } catch (err) {
        console.error('Failed to load booking data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, []);

  // Input change handler + update backend (mock)
  const handleInputChange = (field, value) => {
    const updatedData = { ...bookingData, [field]: value };
    setBookingData(updatedData);

    fetch('https://raw.githubusercontent.com/MaskINB/car-rental-mock-API/main/booking.json', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value })
    }).catch(err => console.error(`Failed to update ${field}:`, err));
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (isLoading || isLoadingLocations) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
          <div className="flex items-center justify-center h-32 text-white">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Location */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-300 text-sm font-medium">
              <FaMapMarkerAlt className="mr-2 text-blue-400" />
              Choose a location
            </label>
            <div className="relative">
              <select
                value={bookingData.location}
                onChange={e => handleInputChange('location', e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none"
              >
                <option value="">Select a location</option>
                {locations.map(loc => (
                  <option key={loc.id} value={loc.value}>{loc.label}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Pickup date */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-300 text-sm font-medium">
              <FaCalendarAlt className="mr-2 text-blue-400" />
              Pick-up date
            </label>
            <div className="relative">
              <input
                type="date"
                value={bookingData.pickupDate}
                min={getTodayDate()}
                onChange={e => handleInputChange('pickupDate', e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
              />
              <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Return date */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-300 text-sm font-medium">
              <FaCalendarAlt className="mr-2 text-blue-400" />
              Return date
            </label>
            <div className="relative">
              <input
                type="date"
                value={bookingData.returnDate}
                min={bookingData.pickupDate || getTodayDate()}
                onChange={e => handleInputChange('returnDate', e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
              />
              <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Search button */}
          <div className="space-y-2">
            <label className="text-transparent text-sm">Search</label>
            <button
              onClick={() => {
                if (!bookingData.location || !bookingData.pickupDate || !bookingData.returnDate) {
                  alert('Please fill in all required fields');
                  return;
                }
                console.log('Search data:', bookingData);
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Check Availability
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-700">
          {[
            { label: 'Premium Cars', value: '500+' },
            { label: '24/7 Support', value: '24/7' },
            { label: 'Locations', value: '50+' },
            { label: 'Happy Clients', value: '10K+' }
          ].map(stat => (
            <div className="text-center" key={stat.label}>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
