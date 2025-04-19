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
    <div className="flex flex-col items-center space-y-10">
      {/* Website Name */}
      <div className="text-center -mt-15">
        <h1 className="text-7xl font-bold">PREMIUM CAR</h1>
        <h1 className="text-7xl font-bold">RENTAL</h1>
      </div>

      {/* Booking Form */}
      <div className="max-w-4xl w-full mx-auto rounded-lg relative ">
        <div className="bg-gray-100 p-2 rounded-lg flex flex-col sm:flex-row items-center">
          <div className="flex flex-col sm:flex-row w-full justify-between flex-wrap">
            {/* Location Section with Tabs */}
            <div className="text-left px-4 py-2 w-full sm:w-1/3">
              <p className="text-sm font-semibold">Pick up & Return Location</p>
              <p className="text-gray-500">{bookingData.location}</p>

              {/* Car/Vans Tabs */}
              <div className="flex space-x-2 mt-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-1 text-sm font-medium rounded-md transition ${
                      bookingData.activeTab === tab
                        ? "bg-black text-white"
                        : "bg-gray-300 text-black hover:bg-black hover:text-white"
                    }`}
                    onClick={() => setBookingData((prev) => ({ ...prev, activeTab: tab }))}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Date */}
            <div className="text-left px-4 py-2 w-full sm:w-1/3">
              <p className="text-sm font-semibold">Start</p>
              <p className="text-gray-500">{bookingData.start}</p>
            </div>

            {/* Stop Date */}
            <div className="text-left px-4 py-2 w-full sm:w-1/3">
              <p className="text-sm font-semibold">Stop</p>
              <p className="text-gray-500">{bookingData.stop}</p>
            </div>
          </div>

          {/* Search Button */}
          <button className="bg-black text-white p-4 rounded-lg ml-2 mr-3 mt-4 sm:mt-0 hover:bg-gray-800 transition">
            <FaSearch size={18} />
          </button>
        </div>
      </div>

      {/* Car Image at Bottom */}
      <div className="flex justify-center">
        <Image
          src={Image1}
          alt="Car"
          width={900}
          height={300}
          priority={true}
          className="position relative -top-45"
        />
      </div>
    </div>
  );
};

export default BookingForm;
