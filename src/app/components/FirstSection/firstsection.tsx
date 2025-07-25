'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Orange Arrow SVG
const Arrow = () => (
  <svg width="38" height="32" viewBox="0 0 38 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 16H34M34 16L28 10M34 16L28 22"
      stroke="#60a5fa"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Decorative flower/star SVG
const Flower = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path
      d="M16 0L18.09 11.09L29.39 11.09L19.64 17.82L21.73 28.91L16 22.18L10.27 28.91L12.36 17.82L2.61 11.09L13.91 11.09L16 0Z"
      fill="#a78bfa"
    />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

const SecondSection = () => {
  const [data, setData] = useState(null);

  // refs for animation
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const heroImageRef = useRef(null);
  const smallImageRef = useRef(null);
  const numbersRef = useRef(null);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/MaskINB/car-rental-mock-API/main/secondsectiondata.json'
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (json.secondsectiondata && json.secondsectiondata.length > 0) {
          setData(json.secondsectiondata[0]);
        } else {
          setData(null);
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setData(null);
      });
  }, []);

  useEffect(() => {
    if (data) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'restart none restart none',
        },
      });

      tl.from(titleRef.current, { opacity: 0, y: -30, duration: 0.6 })
        .from(descRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from(buttonRef.current, { opacity: 0, scale: 0.9, duration: 0.4 }, '-=0.3')
        .from(heroImageRef.current, { opacity: 0, x: 50, duration: 0.8 }, '-=0.5')
        .from(smallImageRef.current, { opacity: 0, x: -50, duration: 0.8 }, '-=0.5')
        .from(numbersRef.current, { opacity: 0, y: 30, duration: 0.6 }, '-=0.4');
    }
  }, [data]);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <section ref={sectionRef} className="bg-black py-20 px-4 font-sans">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 items-start">
        {/* Left: text */}
        <div className="flex flex-col justify-start">
          <h1
            ref={titleRef}
            className="text-5xl font-extrabold uppercase mb-6 leading-tight tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            {data.title}
          </h1>
          <p ref={descRef} className="text-lg text-gray-300 mb-8 max-w-lg">
            {data.description}
          </p>
          <button
            ref={buttonRef}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:from-blue-700 hover:to-purple-700 transition w-fit mb-6"
          >
            See all our Cars
          </button>
        </div>
        {/* Right: Hero Image */}
        <div className="flex flex-col items-end relative">
          <div
            ref={heroImageRef}
            className="w-full max-w-xl rounded-2xl overflow-hidden border-4 border-white/10 shadow-lg"
          >
            <Image
              src={data.imageMain}
              alt="Main Car"
              width={700}
              height={400}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <span className="absolute left-[-30px] top-1/2 -translate-y-1/2 hidden lg:block">
            <Flower />
          </span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 items-center mt-10">
        {/* Left: Supporting Image */}
        <div className="flex justify-start">
          <div
            ref={smallImageRef}
            className="w-full max-w-md rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src={data.imageSmall}
              alt="Luxury SUV"
              width={420}
              height={240}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        {/* Right: Numbers */}
        <div ref={numbersRef} className="flex flex-col items-start justify-center">
          <div className="flex items-center mb-4">
            <span className="text-lg font-extrabold uppercase tracking-widest text-blue-300 mr-3">
              Our Numbers
            </span>
            <Arrow />
          </div>
          <div className="flex flex-row gap-12 mt-2">
            {data.numbers.map((item, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl font-extrabold text-blue-400 mb-2">{item.value}</p>
                <p className="text-gray-300 text-base">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
