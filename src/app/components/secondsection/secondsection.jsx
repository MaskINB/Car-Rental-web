'use client';
import React, { useEffect, useRef, useState } from 'react';
import Seeallbutton from '../Buttons/seeallbutton';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SecondSection = () => {
  const [data, setData] = useState([]);
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:4000/secondsectiondata`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (data.length) {
      // Kill previous triggers to prevent duplicates on hot reload
      ScrollTrigger.getAll().forEach(t => t.kill());

      // Animate Text
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -100, skewX: 10 },
        {
          opacity: 1,
          x: 0,
          skewX: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 40%',
            toggleActions: 'play reverse play reverse',
            scrub: false,
            markers: false,
          },
        }
      );

      // Animate Image
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8, x: 100 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1.2,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 40%',
            toggleActions: 'play reverse play reverse',
            scrub: false,
            markers: false,
          },
        }
      );
    }
  }, [data]);

  if (!data.length) {
    return <p className="text-center text-lg">Loading........</p>;
  }

  return (
    <div
      ref={sectionRef}
      id={`section-${data[0].id}`}
      className="pt-40 pb-20 px-5 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-16"
    >
      {/* Text Section */}
      <div ref={textRef} className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
        <h1 className="text-4xl lg:text-6xl font-bold">{data[0].title}</h1>
        <p className="text-base lg:text-xl leading-relaxed">{data[0].description}</p>
        <div className="flex justify-center lg:justify-start mb-6 lg:mb-0">
          <Seeallbutton />
        </div>
      </div>

      {/* Image Section */}
      <div ref={imageRef} className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <Image
          src={data[0].image}
          alt="Premium Car"
          width={500}
          height={300}
          className="object-contain max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default SecondSection;
