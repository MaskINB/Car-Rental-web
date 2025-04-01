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
    return <p className="text-center text-lg">Loding....</p>;
  }

  return (
    <div id={`section-${data[0].id}`} className="pt-40 pb-30 px-5 flex items-center justify-between gap-10 pl-20 pr-50">
      {/* Text Section */}
      <div className="w-1/2">
        <h1 className="text-6xl font-bold mb-4">{data[0].title}</h1>
        <p className="text-1xl">{data[0].description}</p>
        <div className="flex relative -top-10 right-15">
          <Seeallbutton />
        </div>
      </div>

        <div className="absolute right-5 ">
          {/* First Image */}
        <Image
          src={data[0].image}
          alt="Premium Car"
          width={500}
          height={300}
          className="w-1xl h-auto object-contain "
        />
      </div>
      {/* Second Image */}
      <div className="flex relative top-110 right-300">
        <Image
          src={data[1].image}
          alt="Premium Car"
          width={500}
          height={300}
          className="w-100"
        />
      </div>
    </div>
  );
};

export default SecondSection;
