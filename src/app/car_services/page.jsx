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
        // Generate car services with simpler structure
        const carServices = [
          {
            id: 1,
            name: "Premium Car Maintenance",
            category: "Maintenance",
            description: "Complete maintenance service for luxury and premium vehicles with certified technicians.",
            price: 199,
            duration: "2-3 hours",
            icon: FaWrench,
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
      {/* Hero Section with Background Image */}
      <div 
        className="min-h-screen relative overflow-hidden"
        style={{
          backgroundImage: `url('/image/carousel.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative">
          <Navbar />
          
          <div className="flex flex-col items-start justify-center min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
            <div ref={heroRef} className="mb-8 sm:mb-10 -mt-16 pt-15 sm:-mt-20 max-w-full sm:max-w-4xl">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-2 sm:mb-4 leading-tight">
                Professional
              </h1>
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                Car Services
              </h2>
              <p className="text-xl sm:text-2xl text-white/80 mt-6 max-w-2xl">
                Expert automotive care with certified technicians and premium service quality
              </p>
            </div>

            {/* Service Categories */}
            <div className="flex flex-wrap gap-4 mb-12">
              {['All', 'Maintenance', 'Diagnostics', 'Safety', 'Emergency'].map((category) => (
                <button
                  key={category}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/15 transition-all duration-300"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid Section */}
      <section ref={servicesRef} className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-xl text-white/70">Professional automotive services for every need</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <service.icon className="text-4xl text-blue-400 group-hover:text-blue-300 transition-colors" />
                    <span className="text-xs font-medium text-blue-300 bg-blue-500/20 px-2 py-1 rounded">
                      {service.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">{service.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70 flex items-center">
                        <FaClock className="mr-2 text-blue-400" />
                        Duration
                      </span>
                      <span className="text-white">{service.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Starting from</span>
                      <span className="text-2xl font-bold text-blue-400">{formatPrice(service.price)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-xs ${i < Math.floor(service.rating || 4) ? 'text-yellow-400' : 'text-gray-600'}`}
                          />
                        ))}
                        <span className="ml-1 text-xs text-white/70">({service.rating || '4.5'})</span>
                      </div>
                      <span className="text-xs text-white/70">{service.reviews || 0} reviews</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <h4 className="text-white font-semibold text-sm">Includes:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-xs text-white/70">
                          <FaCheckCircle className="mr-1 text-green-400 text-xs" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all">
                    Book Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Our Services?</h2>
            <p className="text-xl text-white/70">Professional expertise you can trust</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center hover:bg-white/15 transition-all duration-300">
              <FaUsers className="text-4xl text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Certified Technicians</h3>
              <p className="text-white/70 text-sm">ASE certified mechanics with years of experience</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center hover:bg-white/15 transition-all duration-300">
              <FaShieldAlt className="text-4xl text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Quality Guarantee</h3>
              <p className="text-white/70 text-sm">All services backed by our quality guarantee</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center hover:bg-white/15 transition-all duration-300">
              <FaClock className="text-4xl text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Fast Service</h3>
              <p className="text-white/70 text-sm">Quick turnaround times to get you back on the road</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center hover:bg-white/15 transition-all duration-300">
              <FaStar className="text-4xl text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Premium Parts</h3>
              <p className="text-white/70 text-sm">Only the highest quality parts and materials</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
            <p className="text-xl text-white/70">Real feedback from satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-sm" />
                      ))}
                      <span className="ml-2 text-xs text-white/70">({testimonial.rating}/5)</span>
                    </div>
                  </div>
                </div>
                <p className="text-white/70 mb-3 italic">"{testimonial.comment}"</p>
                <div className="flex justify-between items-center text-sm">
                  <p className="text-blue-400 font-medium">Service: {testimonial.service}</p>
                  {testimonial.location && (
                    <p className="text-white/70 flex items-center">
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
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Service Your Vehicle?</h2>
            <p className="text-xl text-white/70 mb-8">
              Contact us today to schedule your service appointment
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
              <div className="flex items-center text-white">
                <FaPhone className="text-blue-400 mr-3 text-xl" />
                <div>
                  <p className="text-sm text-white/70">Call us</p>
                  <p className="font-semibold">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center text-white">
                <FaEnvelope className="text-blue-400 mr-3 text-xl" />
                <div>
                  <p className="text-sm text-white/70">Email us</p>
                  <p className="font-semibold">service@trizent.com</p>
                </div>
              </div>
              
              <div className="flex items-center text-white">
                <FaMapMarkerAlt className="text-blue-400 mr-3 text-xl" />
                <div>
                  <p className="text-sm text-white/70">Visit us</p>
                  <p className="font-semibold">123 Service Center Blvd</p>
                </div>
              </div>
            </div>

            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg transition-all text-lg">
              Schedule Service Now
            </button>
          </div>
        </div>
      </section>

      {/* Service Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-md w-full">
            <div className="text-center">
              <selectedService.icon className="text-6xl text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">{selectedService.name}</h3>
              <p className="text-white/70 mb-6">{selectedService.description}</p>
              <p className="text-3xl font-bold text-blue-400 mb-6">{formatPrice(selectedService.price)}</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setSelectedService(null)}
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

export default CarServicesPage;
