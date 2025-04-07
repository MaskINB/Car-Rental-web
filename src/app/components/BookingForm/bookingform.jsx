"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import Image1 from "../../../../public/image/new.png";

const BookingForm = () => {
  // Dynamic Booking Data
  const [bookingData, setBookingData] = useState({
    location: "Dallas, Texas",
    start: "Oct 16, 11:00 AM",
    stop: "Oct 18, 5:00 PM",
    activeTab: "Car",
  });

  // Tabs
  const tabs = ["Car", "Vans"];

  return (
    <div className="bg-white shadow-lg p-6 max-w-4xl mx-auto rounded-lg relative">
      {/* Tabs Section */}
      <div className="flex justify-center space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 font-semibold transition border-b-2 ${
              bookingData.activeTab === tab
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
            onClick={() => setBookingData((prev) => ({ ...prev, activeTab: tab }))}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-6xl font-bold">PREMIUM CAR</h1>
        <h1 className="text-6xl font-bold">RENTAL</h1>
      </div>

      {/* Booking Details */}
      <div className="bg-gray-100 p-4 mt-6 rounded-lg flex flex-col sm:flex-row items-center">
        <div className="flex flex-col sm:flex-row w-full justify-between">
          {[
            { label: "Pick up & Return Location", value: bookingData.location },
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

      {/* Image Section */}
      <div className="mt-8 flex justify-center">
        <Image
          src={Image1}
          alt="Car"
          width={400}
          height={250}
          priority={true} // Optimizes loading
          className="rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default BookingForm;
