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

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Pages Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Pages</h4>
            <ul className="space-y-2">
              <li><Link href="/rentals" className="hover:text-amber-500">Rentals</Link></li>
              <li><Link href="/locations" className="hover:text-amber-500">Locations</Link></li>
              <li><Link href="/faq" className="hover:text-amber-500">FAQ</Link></li>
              <li><Link href="/features" className="hover:text-amber-500">Features</Link></li>
              <li><Link href="/blog" className="hover:text-amber-500">Blog</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Resources Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/installation-manual" className="hover:text-amber-500">Installation Manual</Link></li>
              <li><Link href="/release-note" className="hover:text-amber-500">Release Note</Link></li>
              <li><Link href="/community-help" className="hover:text-amber-500">Community Help</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about-us" className="hover:text-amber-500">About Us</Link></li>
              <li><Link href="/career" className="hover:text-amber-500">Career</Link></li>
              <li><Link href="/press" className="hover:text-amber-500">Press</Link></li>
              <li><Link href="/support" className="hover:text-amber-500">Support</Link></li>
            </ul>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/demo" className="hover:text-amber-500">Demo</Link></li>
              <li><Link href="/security" className="hover:text-amber-500">Security</Link></li>
              <li><Link href="/faq" className="hover:text-amber-500">FAQ</Link></li>
              <li><Link href="/features" className="hover:text-amber-500">Features</Link></li>
            </ul>
          </div>



    </footer>
  )
}

export default Footer
