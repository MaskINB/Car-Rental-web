"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/Footer/footer';
import { 
  ContactFormData, 
  ContactInfo, 
  Location, 
  FAQ, 
  SocialMedia, 
  SubmitStatus,
  FormChangeHandler,
  FormSubmitHandler
} from '@/types';
import { 
  FaPhone, 
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaHeadset,
  FaQuestionCircle,
  FaComments,
  FaGlobe,
  FaCalendarAlt,
  FaUser,
  FaPaperPlane,
  FaCheckCircle
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const ContactUsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  // Animation refs
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // Initialize page
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!isLoading) {
      const tl = gsap.timeline();
      
      tl.fromTo(heroRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
      .fromTo(formRef.current, 
        { opacity: 0, x: -30 }, 
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, 
        "-=0.5"
      )
      .fromTo(contactInfoRef.current, 
        { opacity: 0, x: 30 }, 
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, 
        "-=0.6"
      )
      .fromTo(faqRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
        "-=0.3"
      );
    }
  }, [isLoading]);

  const handleInputChange: FormChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit: FormSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 2000);
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: FaPhone,
      title: "Phone Support",
      primary: "+1 (555) 123-4567",
      secondary: "+1 (555) 987-6543",
      description: "24/7 customer support available",
      action: "Call Now"
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      primary: "info@trizent.com",
      secondary: "support@trizent.com",
      description: "Get response within 2 hours",
      action: "Send Email"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Our Office",
      primary: "123 Business Center Drive",
      secondary: "New York, NY 10001",
      description: "Monday - Friday: 9AM - 6PM",
      action: "Get Directions"
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      primary: "+1 (555) 123-4567",
      secondary: "Quick replies available",
      description: "Chat with us instantly",
      action: "Start Chat"
    }
  ];

  const locations: Location[] = [
    {
      city: "New York",
      address: "123 Business Center Drive, NY 10001",
      phone: "+1 (555) 123-4567",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
    },
    {
      city: "Los Angeles",
      address: "456 Sunset Boulevard, CA 90028",
      phone: "+1 (555) 234-5678",
      hours: "Mon-Fri: 8AM-7PM, Sat: 9AM-5PM"
    },
    {
      city: "Chicago",
      address: "789 Michigan Avenue, IL 60611",
      phone: "+1 (555) 345-6789",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-3PM"
    },
    {
      city: "Miami",
      address: "321 Ocean Drive, FL 33139",
      phone: "+1 (555) 456-7890",
      hours: "Mon-Fri: 8AM-8PM, Sat-Sun: 10AM-6PM"
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "How can I make a reservation?",
      answer: "You can make a reservation through our website, mobile app, or by calling our customer service. Online bookings are available 24/7."
    },
    {
      question: "What documents do I need to rent a car?",
      answer: "You'll need a valid driver's license, credit card, and proof of insurance. International customers may need an International Driving Permit."
    },
    {
      question: "Can I modify or cancel my reservation?",
      answer: "Yes, you can modify or cancel your reservation up to 24 hours before pickup without any penalty through our website or customer service."
    },
    {
      question: "Do you offer 24/7 roadside assistance?",
      answer: "Yes, we provide 24/7 roadside assistance for all our rental vehicles. The contact number is provided with your rental agreement."
    }
  ];

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
                  Get In Touch
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Contact Us
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
              </p>
            </div>

            {/* Quick Contact Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 max-w-3xl w-full">
              <div className="text-center">
                <FaPhone className="text-2xl text-blue-400 mx-auto mb-2" />
                <div className="text-white text-sm font-medium">Call Us</div>
                <div className="text-white/60 text-xs">24/7 Available</div>
              </div>
              <div className="text-center">
                <FaEnvelope className="text-2xl text-blue-400 mx-auto mb-2" />
                <div className="text-white text-sm font-medium">Email</div>
                <div className="text-white/60 text-xs">2hr Response</div>
              </div>
              <div className="text-center">
                <FaWhatsapp className="text-2xl text-blue-400 mx-auto mb-2" />
                <div className="text-white text-sm font-medium">WhatsApp</div>
                <div className="text-white/60 text-xs">Instant Chat</div>
              </div>
              <div className="text-center">
                <FaMapMarkerAlt className="text-2xl text-blue-400 mx-auto mb-2" />
                <div className="text-white text-sm font-medium">Visit Us</div>
                <div className="text-white/60 text-xs">4 Locations</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form & Info Section */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div ref={formRef} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Send us a Message</h2>
                <p className="text-gray-400">Fill out the form below and we&apos;ll get back to you shortly.</p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6 flex items-center">
                  <FaCheckCircle className="text-green-400 mr-3" />
                  <span className="text-green-300">Message sent successfully! We&apos;ll get back to you soon.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Inquiry Type */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <FaQuestionCircle className="inline mr-2 text-blue-400" />
                    Inquiry Type
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/15 transition-all"
                    required
                  >
                    <option value="general">General Inquiry</option>
                    <option value="booking">Booking Support</option>
                    <option value="technical">Technical Issue</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      <FaUser className="inline mr-2 text-blue-400" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/15 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      <FaEnvelope className="inline mr-2 text-blue-400" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/15 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Phone & Subject */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      <FaPhone className="inline mr-2 text-blue-400" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/15 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      <FaComments className="inline mr-2 text-blue-400" />
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Enter subject"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/15 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <FaPaperPlane className="inline mr-2 text-blue-400" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/15 transition-all resize-none"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div ref={contactInfoRef} className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                      <div className="bg-blue-500/20 p-3 rounded-lg">
                        <info.icon className="text-blue-400 text-xl" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1">{info.title}</h4>
                        <p className="text-blue-300 font-medium">{info.primary}</p>
                        <p className="text-gray-400 text-sm">{info.secondary}</p>
                        <p className="text-gray-400 text-xs mt-1">{info.description}</p>
                      </div>
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                        {info.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {([
                    { icon: FaFacebook, name: 'Facebook', color: 'hover:bg-blue-600' },
                    { icon: FaTwitter, name: 'Twitter', color: 'hover:bg-sky-500' },
                    { icon: FaInstagram, name: 'Instagram', color: 'hover:bg-pink-600' },
                    { icon: FaLinkedin, name: 'LinkedIn', color: 'hover:bg-blue-700' }
                  ] as SocialMedia[]).map((social, index) => (
                    <button
                      key={index}
                      className={`w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white transition-all ${social.color}`}
                      title={social.name}
                    >
                      <social.icon className="text-xl" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  <FaClock className="inline mr-2 text-blue-400" />
                  Business Hours
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monday - Friday</span>
                    <span className="text-white">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Saturday</span>
                    <span className="text-white">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sunday</span>
                    <span className="text-white">Closed</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2 mt-3">
                    <span className="text-gray-400">Emergency Support</span>
                    <span className="text-green-400">24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Our Locations</h2>
            <p className="text-lg text-gray-400">Visit us at any of our convenient locations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {locations.map((location, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all">
                <div className="flex items-center mb-3">
                  <FaMapMarkerAlt className="text-blue-400 mr-2" />
                  <h3 className="text-white font-semibold">{location.city}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">{location.address}</p>
                  <div className="flex items-center text-gray-400">
                    <FaPhone className="mr-2 text-xs" />
                    {location.phone}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FaClock className="mr-2 text-xs" />
                    {location.hours}
                  </div>
                </div>
                <button className="w-full mt-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-2 rounded text-sm transition-all">
                  Get Directions
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-400">Quick answers to common questions</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <FaQuestionCircle className="text-blue-400 mr-3" />
                  {faq.question}
                </h3>
                <p className="text-gray-300 leading-relaxed pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400 mb-4">Still have questions?</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUsPage;
