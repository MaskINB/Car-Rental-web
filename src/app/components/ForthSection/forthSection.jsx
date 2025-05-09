import React from 'react';
import Image from 'next/image';

const forthSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content */}
          <div className="lg:w-1/2">
            <h2 className="text-5xl font-bold mb-8 uppercase tracking-wider">
              FIND CARS IN<br />YOUR LOCATIONS
            </h2>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
              When we develop our cars, we always focus on the details. Our
              commitment to design and innovation propels us towards a smarter and
              more sustainable future. The same commitment goes for our range of
              additionals, an exclusive collection of Polestar products that celebrate
              and showcase our unique community identity. The additionals range will
              keep expanding. And who knows, we might even drop some surprises in
              limited numbers every now and then.
            </p>
            
            <button className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
              Find a Location
            </button>
          </div>
          
          {/* Right content - Mobile app mockup */}
          <div className="lg:w-1/2 relative">
            <div className="relative">
              {/* Background map image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="/image/Vans.jpeg" 
                  alt="Location Map" 
                  className="w-full h-full object-cover opacity-30"
                />
              </div>
              
              {/* Phone mockup */}
              <div className="relative z-10">
                <img 
                  src="/image/porsche.jpeg" 
                  alt="Mobile App" 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Map pins and route elements can be added as absolute positioned elements */}
              <div className="absolute top-1/4 left-1/4 z-20">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="absolute bottom-1/3 right-1/3 z-20">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default forthSection;
