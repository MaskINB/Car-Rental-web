"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/Footer/footer';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaCar, 
  FaUsers, 
  FaGasPump, 
  FaCog, 
  FaStar, 
  FaShieldAlt,
  FaClock,
  FaCheckCircle
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const BookingPage = () => {
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    location: "",
    pickupDate: "",
    returnDate: "",
    selectedCar: null,
    extras: [],
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    }
  });

  const [cars, setCars] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Animation refs
  const heroRef = useRef(null);
  const stepsRef = useRef(null);
  const formRef = useRef(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch locations
        const locationsRes = await fetch('https://raw.githubusercontent.com/MaskINB/car-rental-mock-API/main/locations.json');
        
        let locationsData = [];
        if (locationsRes.ok) {
          const locationsJson = await locationsRes.json();
          locationsData = locationsJson.locations || locationsJson;
          console.log('Fetched locations:', locationsData); // Debug log
        } else {
          console.error('Failed to fetch locations:', locationsRes.status);
        }

        // Fallback cars data since the API doesn't exist
        const fallbackCars = [
          {
            id: 1,
            name: "BMW X5",
            category: "Premium SUV",
            seats: 5,
            fuelType: "Petrol",
            rating: 4.8,
            pricePerDay: 120,
            image: "/image/BMW.png"
          },
          {
            id: 2,
            name: "Audi A8",
            category: "Luxury Sedan",
            seats: 4,
            fuelType: "Hybrid",
            rating: 4.9,
            pricePerDay: 150,
            image: "/image/Audi.png"
          },
          {
            id: 3,
            name: "Ferrari 488",
            category: "Sports Car",
            seats: 2,
            fuelType: "Petrol",
            rating: 4.7,
            pricePerDay: 350,
            image: "/image/Ferrari.png"
          },
          {
            id: 4,
            name: "Porsche 911",
            category: "Sports Car",
            seats: 2,
            fuelType: "Petrol",
            rating: 4.8,
            pricePerDay: 300,
            image: "/image/porsche.png"
          },
          {
            id: 5,
            name: "Lamborghini Huracan",
            category: "Super Car",
            seats: 2,
            fuelType: "Petrol",
            rating: 4.9,
            pricePerDay: 450,
            image: "/image/Lamborgini.png"
          },
          {
            id: 6,
            name: "Land Rover Discovery",
            category: "Premium SUV",
            seats: 7,
            fuelType: "Diesel",
            rating: 4.6,
            pricePerDay: 140,
            image: "/image/LandRover.png"
          },
          {
            id: 7,
            name: "Honda Civic",
            category: "Economy",
            seats: 5,
            fuelType: "Petrol",
            rating: 4.5,
            pricePerDay: 65,
            image: "/image/Honda.png"
          },
          {
            id: 8,
            name: "Nissan Altima",
            category: "Mid-size",
            seats: 5,
            fuelType: "Petrol",
            rating: 4.4,
            pricePerDay: 75,
            image: "/image/Nissan.png"
          }
        ];

        setCars(fallbackCars);
        setLocations(locationsData);
        console.log('Set locations state:', locationsData); // Debug log
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        
        // Fallback data in case of any errors
        const fallbackLocations = [
          { id: 1, value: "Los Angeles, USA", label: "Los Angeles, USA" },
          { id: 2, value: "New York, USA", label: "New York, USA" },
          { id: 3, value: "Miami, USA", label: "Miami, USA" },
          { id: 4, value: "Chicago, USA", label: "Chicago, USA" },
          { id: 5, value: "San Francisco, USA", label: "San Francisco, USA" },
          { id: 6, value: "Las Vegas, USA", label: "Las Vegas, USA" }
        ];
        
        const fallbackCars = [
          {
            id: 1,
            name: "BMW X5",
            category: "Premium SUV",
            seats: 5,
            fuelType: "Petrol",
            rating: 4.8,
            pricePerDay: 120
          },
          {
            id: 2,
            name: "Audi A8",
            category: "Luxury Sedan",
            seats: 4,
            fuelType: "Hybrid",
            rating: 4.9,
            pricePerDay: 150
          },
          {
            id: 3,
            name: "Ferrari 488",
            category: "Sports Car",
            seats: 2,
            fuelType: "Petrol",
            rating: 4.7,
            pricePerDay: 350
          }
        ];
        
        setLocations(fallbackLocations);
        setCars(fallbackCars);
        console.log('Set fallback locations:', fallbackLocations); // Debug log
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!isLoading) {
      const tl = gsap.timeline();
      
      tl.fromTo(heroRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
      .fromTo(stepsRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
        "-=0.5"
      )
      .fromTo(formRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
        "-=0.3"
      );
    }
  }, [isLoading]);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setBookingData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBookingData(prev => ({ ...prev, [field]: value }));
    }
  };

  const nextStep = () => {
    if (bookingStep < 4) {
      setBookingStep(bookingStep + 1);
      // Animate step transition
      gsap.fromTo(formRef.current, 
        { opacity: 0, x: 50 }, 
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  };

  const prevStep = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1);
      gsap.fromTo(formRef.current, 
        { opacity: 0, x: -50 }, 
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0e1424] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e1424]">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-24 pb-12 bg-gradient-to-br from-[#0e1424] via-[#1a2332] to-[#0e1424]">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Complete Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Booking</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Reserve your perfect vehicle in just a few simple steps
            </p>
            
            {/* Progress Indicators */}
            <div ref={stepsRef} className="flex justify-center items-center space-x-4 mb-12">
              {[
                { step: 1, label: 'Details', icon: FaMapMarkerAlt },
                { step: 2, label: 'Vehicle', icon: FaCar },
                { step: 3, label: 'Extras', icon: FaCog },
                { step: 4, label: 'Confirm', icon: FaCheckCircle }
              ].map(({ step, label, icon: Icon }) => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    bookingStep >= step 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-500 text-white' 
                      : 'border-gray-600 text-gray-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    bookingStep >= step ? 'text-white' : 'text-gray-400'
                  }`}>
                    {label}
                  </span>
                  {step < 4 && (
                    <div className={`w-8 h-0.5 mx-4 transition-colors duration-300 ${
                      bookingStep > step ? 'bg-blue-500' : 'bg-gray-600'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div ref={formRef} className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl">
              
              {/* Step 1: Booking Details */}
              {bookingStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    Booking Details
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Location */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-300">
                        <FaMapMarkerAlt className="mr-2 text-blue-400" />
                        Pickup Location
                      </label>
                      <select
                        value={bookingData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Location</option>
                        {locations && locations.length > 0 ? (
                          locations.map((location, index) => (
                            <option key={location.id || index} value={location.value || location.label || location}>
                              {location.label || location.value || location}
                            </option>
                          ))
                        ) : (
                          <option value="">Loading locations...</option>
                        )}
                      </select>
                    </div>

                    {/* Pickup Date */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-300">
                        <FaCalendarAlt className="mr-2 text-blue-400" />
                        Pickup Date
                      </label>
                      <input
                        type="date"
                        value={bookingData.pickupDate}
                        min={getTodayDate()}
                        onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Return Date */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-300">
                        <FaCalendarAlt className="mr-2 text-blue-400" />
                        Return Date
                      </label>
                      <input
                        type="date"
                        value={bookingData.returnDate}
                        min={bookingData.pickupDate || getTodayDate()}
                        onChange={(e) => handleInputChange('returnDate', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      onClick={nextStep}
                      disabled={!bookingData.location || !bookingData.pickupDate || !bookingData.returnDate}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Vehicle Selection */}
              {bookingStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    Choose Your Vehicle
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.slice(0, 6).map((car) => (
                      <div
                        key={car.id}
                        onClick={() => handleInputChange('selectedCar', car)}
                        className={`cursor-pointer bg-gray-700/50 border-2 rounded-xl p-6 transition-all hover:shadow-xl ${
                          bookingData.selectedCar?.id === car.id
                            ? 'border-blue-500 shadow-blue-500/20'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                          <FaCar className="text-4xl text-gray-400" />
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2">{car.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{car.category}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
                          <span className="flex items-center">
                            <FaUsers className="mr-1" /> {car.seats || '4'} seats
                          </span>
                          <span className="flex items-center">
                            <FaGasPump className="mr-1" /> {car.fuelType || 'Petrol'}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`text-xs ${i < (car.rating || 4) ? 'text-yellow-400' : 'text-gray-600'}`}
                              />
                            ))}
                            <span className="ml-1 text-xs text-gray-400">({car.rating || '4.5'})</span>
                          </div>
                          <span className="text-lg font-bold text-blue-400">
                            {formatPrice(car.pricePerDay || 89)}/day
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={prevStep}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-all"
                    >
                      Previous
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!bookingData.selectedCar}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Extras */}
              {bookingStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    Add Extras
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { id: 'insurance', name: 'Full Insurance', price: 15, icon: FaShieldAlt, desc: 'Complete coverage for peace of mind' },
                      { id: 'gps', name: 'GPS Navigation', price: 8, icon: FaMapMarkerAlt, desc: 'Never get lost with premium GPS' },
                      { id: 'child_seat', name: 'Child Seat', price: 12, icon: FaUsers, desc: 'Safety first for your little ones' },
                      { id: 'additional_driver', name: 'Additional Driver', price: 10, icon: FaCar, desc: 'Add another authorized driver' }
                    ].map((extra) => (
                      <div
                        key={extra.id}
                        className={`cursor-pointer bg-gray-700/50 border-2 rounded-xl p-6 transition-all ${
                          bookingData.extras.includes(extra.id)
                            ? 'border-blue-500 shadow-blue-500/20'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                        onClick={() => {
                          const newExtras = bookingData.extras.includes(extra.id)
                            ? bookingData.extras.filter(e => e !== extra.id)
                            : [...bookingData.extras, extra.id];
                          handleInputChange('extras', newExtras);
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <extra.icon className="text-2xl text-blue-400 mr-4" />
                            <div>
                              <h3 className="text-lg font-bold text-white mb-1">{extra.name}</h3>
                              <p className="text-gray-400 text-sm">{extra.desc}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-blue-400">+{formatPrice(extra.price)}/day</span>
                            <div className={`w-6 h-6 rounded-full border-2 mt-2 flex items-center justify-center ${
                              bookingData.extras.includes(extra.id) 
                                ? 'bg-blue-500 border-blue-500' 
                                : 'border-gray-400'
                            }`}>
                              {bookingData.extras.includes(extra.id) && (
                                <FaCheckCircle className="text-white text-sm" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={prevStep}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-all"
                    >
                      Previous
                    </button>
                    <button
                      onClick={nextStep}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Personal Information & Confirmation */}
              {bookingStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    Confirm Your Booking
                  </h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Personal Information */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white mb-4">Personal Information</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">First Name</label>
                          <input
                            type="text"
                            value={bookingData.personalInfo.firstName}
                            onChange={(e) => handleInputChange('personalInfo.firstName', e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">Last Name</label>
                          <input
                            type="text"
                            value={bookingData.personalInfo.lastName}
                            onChange={(e) => handleInputChange('personalInfo.lastName', e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Email</label>
                        <input
                          type="email"
                          value={bookingData.personalInfo.email}
                          onChange={(e) => handleInputChange('personalInfo.email', e.target.value)}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Phone</label>
                        <input
                          type="tel"
                          value={bookingData.personalInfo.phone}
                          onChange={(e) => handleInputChange('personalInfo.phone', e.target.value)}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Booking Summary */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white mb-4">Booking Summary</h3>
                      
                      <div className="bg-gray-700/50 rounded-lg p-6 space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Location:</span>
                          <span className="text-white">{bookingData.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Pickup:</span>
                          <span className="text-white">{bookingData.pickupDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Return:</span>
                          <span className="text-white">{bookingData.returnDate}</span>
                        </div>
                        <hr className="border-gray-600" />
                        <div className="flex justify-between">
                          <span className="text-gray-300">Vehicle:</span>
                          <span className="text-white">{bookingData.selectedCar?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Daily Rate:</span>
                          <span className="text-white">{formatPrice(bookingData.selectedCar?.pricePerDay || 89)}</span>
                        </div>
                        {bookingData.extras.length > 0 && (
                          <>
                            <hr className="border-gray-600" />
                            <div className="text-gray-300 font-medium">Extras:</div>
                            {bookingData.extras.map(extra => (
                              <div key={extra} className="flex justify-between text-sm">
                                <span className="text-gray-400">{extra.replace('_', ' ')}</span>
                                <span className="text-white">+{formatPrice(15)}/day</span>
                              </div>
                            ))}
                          </>
                        )}
                        <hr className="border-gray-600" />
                        <div className="flex justify-between text-xl font-bold">
                          <span className="text-white">Total:</span>
                          <span className="text-blue-400">{formatPrice(299)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={prevStep}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-all"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => alert('Booking confirmed! Redirecting to payment...')}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-gray-800/20 to-gray-900/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Secure Booking</h3>
              <p className="text-gray-400">Your data is protected with enterprise-grade security</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">24/7 Support</h3>
              <p className="text-gray-400">Round-the-clock assistance whenever you need it</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Easy Process</h3>
              <p className="text-gray-400">Simple, fast, and hassle-free booking experience</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookingPage;
