"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/Footer/footer';
import { 
  FaCar, 
  FaUsers, 
  FaCog, 
  FaGasPump, 
  FaStar, 
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaHeart,
  FaShare,
  FaShieldAlt,
  FaBolt,
  FaSnowflake,
  FaWifi,
  FaMusic
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const CarPage = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: 'All',
    transmission: 'All',
    fuelType: 'All'
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Animation refs
  const heroRef = useRef(null);
  const filtersRef = useRef(null);
  const carsRef = useRef(null);

  // Fetch car data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const carData = [
          {
            id: 1,
            name: "BMW M4 Competition",
            category: "Luxury",
            brand: "BMW",
            year: 2024,
            price: 299,
            originalPrice: 349,
            image: "/image/pcar.jpeg",
            rating: 4.9,
            reviews: 128,
            location: "Downtown",
            transmission: "Automatic",
            fuelType: "Petrol",
            seats: 4,
            luggage: 2,
            features: ["GPS Navigation", "Bluetooth", "AC", "Premium Sound"],
            description: "Experience luxury and performance with the BMW M4 Competition.",
            available: true,
            discount: 15
          },
          {
            id: 2,
            name: "Ferrari 488 GTB",
            category: "Sports",
            brand: "Ferrari",
            year: 2023,
            price: 899,
            originalPrice: 999,
            image: "/image/Ferrari-landon.jpg",
            rating: 4.8,
            reviews: 89,
            location: "Airport",
            transmission: "Automatic",
            fuelType: "Petrol",
            seats: 2,
            luggage: 1,
            features: ["Sport Mode", "Carbon Fiber", "Premium Interior", "GPS"],
            description: "Ultimate sports car experience with Ferrari's legendary performance.",
            available: true,
            discount: 10
          },
          {
            id: 3,
            name: "Tesla Model S",
            category: "Electric",
            brand: "Tesla",
            year: 2024,
            price: 249,
            originalPrice: 279,
            image: "/image/Ecar.jpeg",
            rating: 4.7,
            reviews: 156,
            location: "City Center",
            transmission: "Automatic",
            fuelType: "Electric",
            seats: 5,
            luggage: 3,
            features: ["Autopilot", "Supercharging", "Premium Interior", "Tech Package"],
            description: "Cutting-edge electric luxury sedan with advanced technology.",
            available: true,
            discount: 12
          },
          {
            id: 4,
            name: "Range Rover Sport",
            category: "SUV",
            brand: "Land Rover",
            year: 2024,
            price: 199,
            originalPrice: 229,
            image: "/image/Rcar.jpeg",
            rating: 4.6,
            reviews: 203,
            location: "Suburban",
            transmission: "Automatic",
            fuelType: "Hybrid",
            seats: 7,
            luggage: 5,
            features: ["4WD", "Terrain Response", "Luxury Interior", "Panoramic Roof"],
            description: "Premium SUV perfect for family adventures and luxury travel.",
            available: true,
            discount: 13
          },
          {
            id: 5,
            name: "Porsche 911 Carrera",
            category: "Sports",
            brand: "Porsche",
            year: 2023,
            price: 459,
            originalPrice: 499,
            image: "/image/porsche.jpeg",
            rating: 4.9,
            reviews: 174,
            location: "Downtown",
            transmission: "Manual",
            fuelType: "Petrol",
            seats: 4,
            luggage: 2,
            features: ["Sport Chrono", "PASM", "Premium Audio", "Sport Exhaust"],
            description: "Iconic sports car delivering pure driving pleasure and performance.",
            available: true,
            discount: 8
          },
          {
            id: 6,
            name: "Mercedes Van Sprinter",
            category: "Van",
            brand: "Mercedes",
            year: 2024,
            price: 149,
            originalPrice: 169,
            image: "/image/Vans.jpeg",
            rating: 4.4,
            reviews: 267,
            location: "Airport",
            transmission: "Automatic",
            fuelType: "Diesel",
            seats: 12,
            luggage: 8,
            features: ["High Roof", "Climate Control", "USB Charging", "Safety Package"],
            description: "Spacious van perfect for group travel and cargo transportation.",
            available: true,
            discount: 12
          },
          {
            id: 7,
            name: "Audi A8 L",
            category: "Luxury",
            brand: "Audi",
            year: 2024,
            price: 329,
            originalPrice: 379,
            image: "/image/cars.jpeg",
            rating: 4.8,
            reviews: 145,
            location: "City Center",
            transmission: "Automatic",
            fuelType: "Hybrid",
            seats: 5,
            luggage: 3,
            features: ["Massage Seats", "Bang & Olufsen", "Matrix LED", "Virtual Cockpit"],
            description: "Executive luxury sedan with cutting-edge technology and comfort.",
            available: true,
            discount: 13
          },
          {
            id: 8,
            name: "Lamborghini Huracán",
            category: "Sports",
            brand: "Lamborghini",
            year: 2023,
            price: 1299,
            originalPrice: 1499,
            image: "/image/new.png",
            rating: 4.9,
            reviews: 67,
            location: "Premium Location",
            transmission: "Automatic",
            fuelType: "Petrol",
            seats: 2,
            luggage: 1,
            features: ["Launch Control", "Dynamic Steering", "Carbon Package", "Sport Exhaust"],
            description: "Extreme performance supercar for the ultimate driving experience.",
            available: true,
            discount: 13
          }
        ];

        setCars(carData);
        setFilteredCars(carData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter cars based on selected filters and search term
  useEffect(() => {
    let filtered = cars;

    if (filters.category !== 'All') {
      filtered = filtered.filter(car => car.category === filters.category);
    }
    if (filters.transmission !== 'All') {
      filtered = filtered.filter(car => car.transmission === filters.transmission);
    }
    if (filters.fuelType !== 'All') {
      filtered = filtered.filter(car => car.fuelType === filters.fuelType);
    }
    if (filters.priceRange !== 'All') {
      switch (filters.priceRange) {
        case 'Under $200':
          filtered = filtered.filter(car => car.price < 200);
          break;
        case '$200-$500':
          filtered = filtered.filter(car => car.price >= 200 && car.price <= 500);
          break;
        case 'Over $500':
          filtered = filtered.filter(car => car.price > 500);
          break;
      }
    }
    if (searchTerm) {
      filtered = filtered.filter(car => 
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCars(filtered);
  }, [filters, searchTerm, cars]);

  // GSAP Animations
  useEffect(() => {
    if (!isLoading) {
      const tl = gsap.timeline();
      
      tl.fromTo(heroRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
      .fromTo(filtersRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
        "-=0.5"
      )
      .fromTo(carsRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
        "-=0.3"
      );
    }
  }, [isLoading]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 right-20 w-60 h-60 bg-slate-400/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/3 w-32 h-32 bg-gray-400/10 rounded-full blur-2xl"></div>
        </div>
        
        {/* Minimal dots pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, rgba(59,130,246,0.3) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="relative">
          <Navbar />
          
          <div className="flex flex-col items-center justify-center min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 text-center">
            <div ref={heroRef} className="mb-12 max-w-4xl">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium">
                  Premium Car Rentals
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Find Your Perfect Car
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Choose from our premium collection of luxury, sports, and everyday vehicles
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-2xl mb-8">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by car name, brand, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/15 transition-all"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 max-w-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">{cars.length}+</div>
                <div className="text-white/60 text-xs">Cars Available</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">5</div>
                <div className="text-white/60 text-xs">Locations</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">24/7</div>
                <div className="text-white/60 text-xs">Support</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">4.8★</div>
                <div className="text-white/60 text-xs">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <section ref={filtersRef} className="py-8 bg-black border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <FaFilter className="text-blue-400" />
              <span className="text-white font-medium">Filters:</span>
            </div>
            
            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500/50"
            >
              <option value="All">All Categories</option>
              <option value="Luxury">Luxury</option>
              <option value="Sports">Sports</option>
              <option value="Electric">Electric</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>

            {/* Price Filter */}
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500/50"
            >
              <option value="All">All Prices</option>
              <option value="Under $200">Under $200</option>
              <option value="$200-$500">$200-$500</option>
              <option value="Over $500">Over $500</option>
            </select>

            {/* Transmission Filter */}
            <select
              value={filters.transmission}
              onChange={(e) => handleFilterChange('transmission', e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500/50"
            >
              <option value="All">All Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>

            {/* Fuel Type Filter */}
            <select
              value={filters.fuelType}
              onChange={(e) => handleFilterChange('fuelType', e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500/50"
            >
              <option value="All">All Fuel Types</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Diesel">Diesel</option>
            </select>

            <div className="text-sm text-gray-400">
              {filteredCars.length} cars found
            </div>
          </div>
        </div>
      </section>

      {/* Cars Grid Section */}
      <section ref={carsRef} className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedCar(car)}
              >
                {/* Car Image */}
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Discount Badge */}
                  {car.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      -{car.discount}%
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all">
                      <FaHeart className="text-xs" />
                    </button>
                    <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all">
                      <FaShare className="text-xs" />
                    </button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-2 left-2 bg-blue-500/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                    {car.category}
                  </div>
                  
                  {/* Availability */}
                  <div className="absolute bottom-2 right-2">
                    <div className={`w-3 h-3 rounded-full ${car.available ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">
                        {car.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{car.brand} • {car.year}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-xs mb-1">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-white">{car.rating}</span>
                        <span className="text-gray-400 ml-1">({car.reviews})</span>
                      </div>
                    </div>
                  </div>

                  {/* Car Details */}
                  <div className="grid grid-cols-3 gap-2 mb-3 text-xs text-gray-400">
                    <div className="flex items-center">
                      <FaUsers className="mr-1 text-blue-400" />
                      {car.seats} seats
                    </div>
                    <div className="flex items-center">
                      <FaCog className="mr-1 text-blue-400" />
                      {car.transmission}
                    </div>
                    <div className="flex items-center">
                      <FaGasPump className="mr-1 text-blue-400" />
                      {car.fuelType}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-xs text-gray-400 mb-3">
                    <FaMapMarkerAlt className="mr-1 text-blue-400" />
                    {car.location}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      {car.originalPrice > car.price && (
                        <span className="text-gray-400 text-sm line-through mr-2">
                          {formatPrice(car.originalPrice)}
                        </span>
                      )}
                      <span className="text-xl font-bold text-blue-400">
                        {formatPrice(car.price)}
                      </span>
                      <span className="text-gray-400 text-sm">/day</span>
                    </div>
                  </div>

                  <button className="w-full bg-blue-500/80 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded text-sm transition-all mt-3">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredCars.length === 0 && (
            <div className="text-center py-16">
              <FaCar className="text-6xl text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No cars found</h3>
              <p className="text-gray-400">Try adjusting your filters or search term</p>
              <button
                onClick={() => {
                  setFilters({
                    category: 'All',
                    priceRange: 'All',
                    transmission: 'All',
                    fuelType: 'All'
                  });
                  setSearchTerm('');
                }}
                className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Car Detail Modal */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Image */}
            <div className="relative h-60">
              <img 
                src={selectedCar.image} 
                alt={selectedCar.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <button
                onClick={() => setSelectedCar(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
              >
                ✕
              </button>
              
              <div className="absolute bottom-4 left-4">
                <div className="bg-blue-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                  {selectedCar.category}
                </div>
                <h2 className="text-2xl font-bold text-white">{selectedCar.name}</h2>
                <p className="text-white/80">{selectedCar.brand} • {selectedCar.year}</p>
              </div>
            </div>
            
            <div className="p-6">
              {/* Rating and Price */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${i < Math.floor(selectedCar.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-white">
                      {selectedCar.rating} ({selectedCar.reviews} reviews)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  {selectedCar.originalPrice > selectedCar.price && (
                    <div className="text-gray-400 text-sm line-through">
                      {formatPrice(selectedCar.originalPrice)}
                    </div>
                  )}
                  <div className="text-2xl font-bold text-blue-400">
                    {formatPrice(selectedCar.price)}<span className="text-sm text-gray-400">/day</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-4">{selectedCar.description}</p>

              {/* Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <FaUsers className="text-blue-400 text-xl mx-auto mb-2" />
                  <div className="text-white font-medium">{selectedCar.seats}</div>
                  <div className="text-gray-400 text-xs">Seats</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <FaCog className="text-blue-400 text-xl mx-auto mb-2" />
                  <div className="text-white font-medium">{selectedCar.transmission}</div>
                  <div className="text-gray-400 text-xs">Transmission</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <FaGasPump className="text-blue-400 text-xl mx-auto mb-2" />
                  <div className="text-white font-medium">{selectedCar.fuelType}</div>
                  <div className="text-gray-400 text-xs">Fuel Type</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <FaCar className="text-blue-400 text-xl mx-auto mb-2" />
                  <div className="text-white font-medium">{selectedCar.luggage}</div>
                  <div className="text-gray-400 text-xs">Luggage</div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Features & Amenities</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedCar.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center text-gray-300 mb-6">
                <FaMapMarkerAlt className="text-blue-400 mr-2" />
                Available at: {selectedCar.location}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button 
                  onClick={() => setSelectedCar(null)}
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                >
                  Close
                </button>
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CarPage;
