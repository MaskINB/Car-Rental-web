"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/Footer/footer';
import { 
  FaCalendarAlt, FaMapMarkerAlt, FaCar, FaUsers, 
  FaCog, FaCheckCircle, FaShieldAlt, FaStar 
} from 'react-icons/fa';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Interfaces ---
interface Car {
  id: number;
  name: string;
  category: string;
  seats: number;
  fuelType: string;
  rating: number;
  pricePerDay: number;
}

interface LocationData {
  id?: number;
  value: string;
  label: string;
}

interface BookingState {
  location: string;
  pickupDate: string;
  returnDate: string;
  selectedCar: Car | null;
  extras: string[];
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

const BookingPage: React.FC = () => {
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  
  const [bookingData, setBookingData] = useState<BookingState>({
    location: "",
    pickupDate: "",
    returnDate: "",
    selectedCar: null,
    extras: [],
    personalInfo: { firstName: "", lastName: "", email: "", phone: "" }
  });

  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://raw.githubusercontent.com/MaskINB/car-rental-mock-API/main/locations.json');
        const json = res.ok ? await res.json() : [];
        setLocations(json.locations || json);

        const fallbackCars: Car[] = [
          { id: 1, name: "BMW X5", category: "Premium SUV", seats: 5, fuelType: "Petrol", rating: 4.8, pricePerDay: 120 },
          { id: 2, name: "Audi A8", category: "Luxury Sedan", seats: 4, fuelType: "Hybrid", rating: 4.9, pricePerDay: 150 },
          { id: 3, name: "Porsche 911", category: "Sports Car", seats: 2, fuelType: "Petrol", rating: 4.8, pricePerDay: 300 }
        ];
        setCars(fallbackCars);
      } catch (e) {
        console.error("Fetch error", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setBookingData(prev => ({
        ...prev,
        [parent]: { ...(prev[parent as keyof BookingState] as object), [child]: value }
      }));
    } else {
      setBookingData(prev => ({ ...prev, [field]: value }));
    }
  };

  const nextStep = () => {
    const isMobile = window.innerWidth < 768;
    setBookingStep(prev => Math.min(prev + 1, 4));
    gsap.fromTo(formRef.current, 
      { opacity: 0, x: isMobile ? 20 : 50 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
    );
  };

  const prevStep = () => {
    const isMobile = window.innerWidth < 768;
    setBookingStep(prev => Math.max(prev - 1, 1));
    gsap.fromTo(formRef.current, 
      { opacity: 0, x: isMobile ? -20 : -50 }, 
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
    );
  };

  if (isLoading) return <div className="min-h-screen bg-[#0e1424] flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0e1424] text-white overflow-x-hidden">
      <Navbar />

      <header ref={heroRef} className="pt-24 pb-10 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Complete Your <span className="text-blue-500">Booking</span></h1>
        
        {/* Responsive Stepper */}
        <div className="flex justify-center items-center max-w-xl mx-auto mt-8 px-4 gap-2">
          {[1, 2, 3, 4].map((step) => (
            <React.Fragment key={step}>
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                bookingStep >= step ? 'bg-blue-600 border-blue-600' : 'bg-gray-800 border-gray-700'
              }`}>
                {step === 1 && <FaMapMarkerAlt />}
                {step === 2 && <FaCar />}
                {step === 3 && <FaCog />}
                {step === 4 && <FaCheckCircle />}
              </div>
              {step < 4 && <div className={`h-0.5 flex-1 ${bookingStep > step ? 'bg-blue-600' : 'bg-gray-700'}`} />}
            </React.Fragment>
          ))}
        </div>
      </header>

      <main className="container mx-auto px-4 pb-20">
        <div ref={formRef} className="max-w-4xl mx-auto bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 p-6 md:p-10 rounded-2xl shadow-2xl">
          
          {/* STEP 1: Details */}
          {bookingStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-500 tracking-widest uppercase">Location</label>
                  <select 
                    value={bookingData.location} 
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="bg-gray-900 border border-gray-700 p-4 rounded-xl outline-none focus:border-blue-500"
                  >
                    <option value="">Select City</option>
                    {locations.map((loc, i) => <option key={i} value={loc.value}>{loc.label}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-500 tracking-widest uppercase">Date</label>
                  <input type="date" className="bg-gray-900 border border-gray-700 p-4 rounded-xl text-white outline-none" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Cars */}
          {bookingStep === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cars.map((car) => (
                <div 
                  key={car.id} 
                  onClick={() => handleInputChange('selectedCar', car)}
                  className={`p-5 border-2 rounded-2xl cursor-pointer transition-all ${
                    bookingData.selectedCar?.id === car.id ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700'
                  }`}
                >
                  <h3 className="font-bold text-lg">{car.name}</h3>
                  <p className="text-blue-400 font-black">${car.pricePerDay}/day</p>
                </div>
              ))}
            </div>
          )}

          {/* SHARED NAVIGATION BUTTONS - FIXED OVERFLOW */}
          <div className="mt-10 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
            {bookingStep > 1 ? (
              <button onClick={prevStep} className="w-full sm:w-auto text-gray-400 font-bold py-3 px-8">
                Back
              </button>
            ) : <div className="hidden sm:block" />}
            
            <button 
              onClick={bookingStep === 4 ? () => alert("Done") : nextStep}
              disabled={bookingStep === 1 && !bookingData.location}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-xl transition-all shadow-lg"
            >
              {bookingStep === 4 ? 'Confirm' : 'Continue'}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;