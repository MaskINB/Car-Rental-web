'use client';
import React from 'react';

const COLORS = [
  { hex: '#0E3746', label: '0E3746' },
  { hex: '#EAE8DC', label: 'EAE8DC' },
  { hex: '#F4F2EC', label: 'F4F2EC' },
  { hex: '#BE2623', label: 'BE2623' }
];

const PaletteCard = () => (
  <div className="w-[320px] h-[220px] bg-white rounded-xl shadow-[1px_1px_20px_#c7c7c7] flex items-end justify-center overflow-hidden relative mx-auto">
    <div className="w-full h-[180px] flex items-end justify-center relative">
      {/* Top Circle */}
      <div className="w-[50px] h-[50px] bg-white rounded-full shadow-[1px_1px_8px_#c7c7c7] flex items-center justify-center absolute -top-[60px] left-1/2 -translate-x-1/2 z-20">
        <PaletteIcon />
      </div>

      {/* Color Swatches */}
      {COLORS.map((color, idx) => (
        <div
          key={color.hex}
          className={`group relative flex flex-col items-end justify-end cursor-pointer 
          w-[80px] h-full transition-all duration-300 
          ${idx === 0 ? 'rounded-bl-xl' : ''} ${idx === COLORS.length - 1 ? 'rounded-br-xl' : ''}`}
          style={{ background: color.hex }}
        >
          {/* Hover area (invisible, just for position) */}
          <div className="absolute bottom-0 left-0 w-[80px] h-[150px] z-10" />
          
          {/* Label */}
          <div className="w-full h-[30px] bg-white text-center text-xs font-semibold leading-[30px] absolute bottom-0 left-0 z-20">
            {color.label}
          </div>

          {/* Popup icon on hover */}
          <div
            className={`absolute top-[-60px] left-[135px] w-[50px] h-[50px] rounded-full shadow-[1px_1px_8px_#c7c7c7] hidden group-hover:flex items-center justify-center z-30
              transition-transform duration-500 transform group-hover:rotate-0 group-hover:scale-100`}
            style={{ background: color.hex, color: idx === 1 || idx === 2 ? '#0e3746' : '#fff' }}
          >
            <PaletteIcon />
          </div>

          {/* "Hover me" text on first swatch */}
          {idx === 0 && (
            <span className="absolute bottom-[40px] left-[10px] text-white text-sm font-medium transform -rotate-90 pointer-events-none z-20">
              Hover me
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
);

function PaletteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
      <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z" />
    </svg>
  );
}

export default PaletteCard;
