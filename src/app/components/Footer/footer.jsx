import React from 'react'
import Link from 'next/link'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gray-800 py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Stay up to date on all the latest news.</h3>
          </div>
          <div className="w-full md:w-1/3">
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full px-4 py-2 bg-gray-700 border-gray-600 text-white"
              />
              <button className="bg-amber-500 hover:bg-amber-600 px-4 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
