"use client"
import React, { useEffect, useState } from 'react';
import Seeallbutton from '../Buttons/seeallbutton';
import Image from 'next/image';

const SecondSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/secondsectiondata`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (!data.length) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div
      id={`section-${data[0].id}`}
      className="pt-20 pb-20 px-5 lg:px-20 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12"
    >
      {/* Text Section */}
      <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
        <h1 className="text-4xl lg:text-6xl font-bold">{data[0].title}</h1>
        <p className="text-base lg:text-xl leading-relaxed">{data[0].description}</p>
        <div className="flex justify-center lg:justify-start">
          <Seeallbutton />
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-auto flex justify-center lg:justify-end">
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
