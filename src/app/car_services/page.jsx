"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/Footer/footer';
import { 
  FaCar, 
  FaWrench, 
  FaShieldAlt, 
  FaClock, 
  FaUsers, 
  FaStar, 
  FaPhone, 
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTools,
  FaOilCan,
  FaBatteryFull,
  FaCogs
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const CarServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // Animation refs
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Generate car services with images
        const carServices = [
          {
            id: 1,
            name: "Premium Car Maintenance",
            category: "Maintenance",
            description: "Complete maintenance service for luxury and premium vehicles with certified technicians.",
            price: 199,
            duration: "2-3 hours",
            icon: FaWrench,
            image: "/image/pcar.jpeg",
            features: ["Oil Change", "Brake Inspection", "Engine Check", "Tire Rotation"],
            availability: "Available Now",
            rating: 4.8,
            reviews: 124
          },
          {
            id: 2,
            name: "Engine Diagnostics",
            category: "Diagnostics", 
            description: "Advanced computer diagnostics to identify and resolve engine performance issues.",
            price: 149,
            duration: "1-2 hours",
            icon: FaCogs,
            image: "/image/Rcar.jpeg",
            features: ["Computer Scan", "Error Code Analysis", "Performance Test", "Repair Recommendations"],
            availability: "Available Now",
            rating: 4.7,
            reviews: 89
          },
          {
            id: 3,
            name: "Brake System Service",
            category: "Safety",
            description: "Complete brake system inspection, maintenance, and repair for optimal safety.",
            price: 249,
            duration: "2-4 hours", 
            icon: FaShieldAlt,
            image: "/image/Ecar.jpeg",
            features: ["Brake Pad Replacement", "Rotor Inspection", "Fluid Change", "Safety Check"],
            availability: "Available Now",
            rating: 4.9,
            reviews: 156
          },
          {
            id: 4,
            name: "Oil Change Service",
            category: "Maintenance",
            description: "Professional oil change service with premium quality oil and filters.",
            price: 89,
            duration: "30-45 minutes",
            icon: FaOilCan,
            image: "/image/cars.jpeg",
            features: ["Premium Oil", "Filter Replacement", "Fluid Top-up", "Multi-point Inspection"],
            availability: "Available Now",
            rating: 4.6,
            reviews: 203
          },
          {
            id: 5,
            name: "Battery Service",
            category: "Electrical",
            description: "Battery testing, maintenance, and replacement service for all vehicle types.",
            price: 129,
            duration: "1 hour",
            icon: FaBatteryFull,
            image: "/image/Vans.jpeg",
            features: ["Battery Test", "Terminal Cleaning", "Installation", "Charging System Check"],
            availability: "Available Now",
            rating: 4.5,
            reviews: 178
          },
          {
            id: 6,
            name: "Emergency Roadside",
            category: "Emergency",
            description: "24/7 emergency roadside assistance for breakdowns, flat tires, and lockouts.",
            price: 99,
            duration: "30-60 minutes",
            icon: FaTools,
            image: "/image/porsche.jpeg",
            features: ["Flat Tire Change", "Jump Start", "Lockout Service", "Towing Available"],
            availability: "24/7 Available",
            rating: 4.4,
            reviews: 290
          }
        ];

        // Generate testimonials
        const serviceTestimonials = [
          {
            id: 1,
            name: "John Smith",
            rating: 5,
            comment: "Excellent service! My BMW was serviced professionally and the staff was very knowledgeable.",
            service: "Premium Car Maintenance",
            location: "Downtown"
          },
          {
            id: 2,
            name: "Sarah Johnson", 
            rating: 5,
            comment: "Quick and reliable brake service. I feel much safer driving now. Highly recommended!",
            service: "Brake System Service",
            location: "Airport"
          },
          {
            id: 3,
            name: "Mike Davis",
            rating: 4,
            comment: "Great diagnostic service that quickly identified my engine issues. Fair pricing too.",
            service: "Engine Diagnostics",
            location: "City Center"
          }
        ];

        setServices(carServices);
        setTestimonials(serviceTestimonials);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
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
      .fromTo(servicesRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
        "-=0.5"
      )
      .fromTo(featuresRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
        "-=0.3"
      )
      .fromTo(testimonialsRef.current, 
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Calm Design */}
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
                  Professional Auto Care
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Expert Car Services
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Premium automotive solutions with certified technicians and cutting-edge technology
              </p>
            </div>

            {/* Simplified Service Categories */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['All Services', 'Maintenance', 'Diagnostics', 'Safety', 'Emergency'].map((category, index) => (
                <button
                  key={category}
                  className={`px-4 py-2 text-sm backdrop-blur-sm border rounded-lg text-white transition-all duration-300 ${
                    index === 0 
                      ? 'bg-blue-500/20 border-blue-400/40 text-blue-200' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Compact Stats */}
            <div className="grid grid-cols-4 gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 max-w-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">50K+</div>
                <div className="text-white/60 text-xs">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">25K+</div>
                <div className="text-white/60 text-xs">Services</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">1000+</div>
                <div className="text-white/60 text-xs">Vehicles</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">24/7</div>
                <div className="text-white/60 text-xs">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid Section */}
      <section ref={servicesRef} className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Our Services</h2>
            <p className="text-lg text-gray-400">Professional automotive services for every need</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                {/* Compact Service Image */}
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-2 right-2 bg-blue-500/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                    {service.category}
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <service.icon className="text-xl text-white/90" />
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-1">
                    {service.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{service.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 flex items-center">
                        <FaClock className="mr-1 text-blue-400" />
                        {service.duration}
                      </span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-xs ${i < Math.floor(service.rating || 4) ? 'text-yellow-400' : 'text-gray-600'}`}
                          />
                        ))}
                        <span className="ml-1 text-xs text-gray-400">({service.rating})</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">From</span>
                      <span className="text-xl font-bold text-blue-400">{formatPrice(service.price)}</span>
                    </div>
                  </div>

                  <button className="w-full bg-blue-500/80 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded text-sm transition-all">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Why Choose Our Services?</h2>
            <p className="text-lg text-gray-400">Professional expertise you can trust</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-all duration-300">
              <FaUsers className="text-3xl text-blue-400 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-white mb-2">Certified Technicians</h3>
              <p className="text-gray-400 text-xs">ASE certified mechanics</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-all duration-300">
              <FaShieldAlt className="text-3xl text-blue-400 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-white mb-2">Quality Guarantee</h3>
              <p className="text-gray-400 text-xs">All services backed</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-all duration-300">
              <FaClock className="text-3xl text-blue-400 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-white mb-2">Fast Service</h3>
              <p className="text-gray-400 text-xs">Quick turnaround times</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-all duration-300">
              <FaStar className="text-3xl text-blue-400 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-white mb-2">Premium Parts</h3>
              <p className="text-gray-400 text-xs">Highest quality materials</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">What Our Customers Say</h2>
            <p className="text-lg text-gray-400">Real feedback from satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-xs" />
                      ))}
                      <span className="ml-1 text-xs text-gray-400">({testimonial.rating}/5)</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 mb-3 italic text-sm">"{testimonial.comment}"</p>
                <div className="flex justify-between items-center text-xs">
                  <p className="text-blue-400 font-medium">{testimonial.service}</p>
                  {testimonial.location && (
                    <p className="text-gray-400 flex items-center">
                      <FaMapMarkerAlt className="mr-1 text-xs" />
                      {testimonial.location}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Service Your Vehicle?</h2>
            <p className="text-gray-400 mb-6">
              Contact us today to schedule your service appointment
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center text-white">
                <FaPhone className="text-blue-400 mb-2 text-lg" />
                <div>
                  <p className="text-xs text-gray-400">Call us</p>
                  <p className="font-semibold text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-white">
                <FaEnvelope className="text-blue-400 mb-2 text-lg" />
                <div>
                  <p className="text-xs text-gray-400">Email us</p>
                  <p className="font-semibold text-sm">service@trizent.com</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-white">
                <FaMapMarkerAlt className="text-blue-400 mb-2 text-lg" />
                <div>
                  <p className="text-xs text-gray-400">Visit us</p>
                  <p className="font-semibold text-sm">123 Service Center Blvd</p>
                </div>
              </div>
            </div>

            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all">
              Schedule Service Now
            </button>
          </div>
        </div>
      </section>

      {/* Service Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden max-w-lg w-full">
            {/* Modal Image */}
            <div className="relative h-48">
              <img 
                src={selectedService.image} 
                alt={selectedService.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <selectedService.icon className="text-4xl text-white" />
              </div>
              <div className="absolute top-4 right-4 bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                {selectedService.category}
              </div>
            </div>
            
            <div className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedService.name}</h3>
                <p className="text-white/70 mb-4">{selectedService.description}</p>
                
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-sm ${i < Math.floor(selectedService.rating || 4) ? 'text-yellow-400' : 'text-gray-600'}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-white/70">({selectedService.rating || '4.5'}) • {selectedService.reviews || 0} reviews</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-center justify-center text-white/70">
                    <FaClock className="mr-2 text-blue-400" />
                    {selectedService.duration}
                  </div>
                  <div className="text-white/70">
                    {selectedService.availability}
                  </div>
                </div>
                
                <p className="text-3xl font-bold text-blue-400 mb-6">{formatPrice(selectedService.price)}</p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                  >
                    Close
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CarServicesPage;
