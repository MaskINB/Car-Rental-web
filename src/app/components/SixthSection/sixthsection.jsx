import React from 'react'
import Image from 'next/image'

const SixthSection = () => {
  const stories = [
    {
      id: 1,
      date: '25',
      month: 'December',
      year: '2023',
      title: 'Electrifying of the Experience',
      description: 'Integrating high performance techno into a new design.',
      image: '/image/pcar.jpeg'
    },
    {
      id: 2,
      date: '04',
      month: 'December',
      year: '2022',
      title: 'FLEXIBLE HIRE FOR BUSINESS',
      description: 'When we develop our cars, we always focus on the details.',
      image: '/image/Rcar.jpeg'
    },
    {
      id: 3,
      date: '18',
      month: 'November',
      year: '2022',
      title: 'Single vehicles to entire fleets',
      description: 'Get in touch if you need expert advice on anything.',
      image: '/image/cars.jpeg'
    }
  ];

  const brands = [
    { name: 'Land Rover', path: '/logos/LandRover.png' },
    { name: 'Audi', path: '/logos/Audi.png' },
    { name: 'Lamborghini', path: '/logos/Lamborgini.png' },
    { name: 'Ferrari', path: '/logos/Ferrari.png' },
    { name: 'BMW', path: '/logos/BMW.png'},
    { name: 'Honda', path: '/logos/Honda.png'},
    { name: 'Nissan', path: '/logos/Nissan.png' }
  ];

  return (
    <div className='py-16 px-8 bg-white max-w-7xl mx-auto'>
      <h2 className='text-4xl font-bold text-center mb-12'>STORIES BEHIND THE WHEEL</h2>
      
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {stories.map((story) => (
          <div key={story.id} className='flex flex-col'>
            <div className='flex items-start mb-6'>
              <div className='mr-4'>
                <span className='text-3xl font-bold block'>{story.date}</span>
                <span className='text-sm text-gray-600 block'>{story.month} {story.year}</span>
              </div>
            </div>
            
            <h3 className='text-xl font-bold uppercase mb-3'>{story.title}</h3>
            <p className='text-gray-600 mb-4'>{story.description}</p>
            
            <div className='mt-auto'>
              <div className='h-64 w-full relative rounded-md overflow-hidden'>
                <Image 
                  src={story.image}
                  alt={story.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className='mt-12 flex justify-center'>
        <button className='px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition'>
          See all Reviews
        </button>
      </div>
      
      <div className='mt-16 flex flex-wrap justify-center gap-8'>
        {brands.map((brand) => (
          <div key={brand.name} className='w-20 h-20 opacity-70 hover:opacity-100 transition'>
            <Image 
              src={brand.path}
              alt={brand.name}
              width={80}
              height={80}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SixthSection
