"use client"
import React, { useEffect, useState } from 'react';
import Seeallbutton from '../Buttons/seeallbutton';
import Image from 'next/image';

const SecondSection = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div id={`section-${data.id}`} className="pt-40 pb-30 px-5 flex items-center justify-between gap-10 pl-45">
      {/* Text Section */}
      <div className="w-1/2">
        <h1 className="text-6xl font-bold mb-4">{data.title}</h1>
        <p className="text-lg pt-5 text-gray-700 leading-relaxed ">{data.description}</p>
        <div className="flex relative -top-10 right-15">
          <Seeallbutton />
        </div>
      </div>

      {/* Image Section */}
      <div className="w-1/2 relative overflow-x-hidden">
        <Image
          src={data.image}
          alt="Premium Car"
          width={500}
          height={300}
          className="w-full h-auto object-cover shadow-lg "
        />
      </div>
    </div>
  );
};

export default SecondSection;
