"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { localFont } from 'next/font/local';

const IBM = localFont({
  src: '/font/IBMPlexSans-Bold.ttf',
});

const BookingForm = () => {
  // Dynamic JSON Data
  const [bookingData, setBookingData] = useState({
    location: "Dallas, Texas",
    start: "Oct 16, 11:00 AM",
    stop: "Oct 18, 5:00 PM",
    activeTab: "Car",
  });

  const tabs = ["Car", "Vans"];

  return (
    <>
      <div className="text-center mt-[-70px] relative top-0">
        <h1 className={`text-7xl relative`}>PREMIUM CAR</h1>
        <h1 className="font-bold text-8xl pb-15">RENTAL</h1>
      </div>

      <div className="bg-white shadow-md p-4 flex flex-col sm:flex-row items-center max-w-3xl mx-auto rounded-lg">
        {/* Tabs */}
        <div className="flex w-full sm:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-semibold transition ${
                bookingData.activeTab === tab
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500 hover:text-black"
              }`}
              onClick={() => setBookingData((prev) => ({ ...prev, activeTab: tab }))}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px bg-gray-300 h-10 mx-4"></div>

        {/* Booking Details */}
        <div className="flex flex-col sm:flex-row w-full justify-between">
          {[
            { label: "Pick up & Return location", value: bookingData.location },
            { label: "Start", value: bookingData.start },
            { label: "Stop", value: bookingData.stop },
          ].map((item, index) => (
            <div key={index} className="text-left px-4 py-2">
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="text-gray-500">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Search Button */}
        <button className="bg-black text-white p-3 rounded-lg ml-4 hover:bg-gray-800 transition">
          <FaSearch size={18} />
        </button>
      </div>
    </>
  );
};

export default BookingForm;
