import React from 'react'
const SeeAllButton = () => {
    return (
      <div className="bg-black text-white py-3 px-4 cursor-pointer w-40 rounded flex justify-center items-center relative top-20 left-15 hover:rotate-text">
        <span className="transition-transform duration-500 ease-in-out hover:rotate-vertical">
          See all our Cars
        </span>
      </div>
    );
  };
  
  export default SeeAllButton;
