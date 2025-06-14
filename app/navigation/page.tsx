'use client'

import React, { useState } from 'react'
import NavigationBlock from '../components/NavigationBlock';

const Page = () => {
  const brands = ["Apple", "Samsung", "OnePlus", "Oppo", "Realme", "Apple", "Samsung", "OnePlus", "Oppo", "Realme"];
  const [currentDevice, setCurrentDevice] = useState("All");
  const categories = ["All", "Mobile", "Watches", "Earbuds", "Tablets", "Speakers", "Adapters"]

  return (
    <div className='h-full w-full pt-36 max-md:pt-20 relative p-10 max-sm:p-5 max-sm:pt-28'>
      <div className="w-full flex justify-center ml-2 max-sm:ml-0 gap-10 my-7">
        {
          categories.map((item, index) => (
            <p
              key={index}
              className={`text-lg font-bold cursor-pointer font-inter transition-all ${currentDevice == item ? "border-b-2 border-[#F28627] text-[#F28627]" : ""}`}
              onClick={() => setCurrentDevice(item)}
            >
              {item}
            </p>
          ))
        }
      </div>
      <div className="w-full mb-20">
        <p className="font-bold font-poppins text-4xl my-10">Brands</p>
        <div className="w-full grid grid-cols-6 max-md:grid-cols-5 max-sm:grid-cols-2 max-md:gap-5 gap-20 my-5">
          {
            brands.map((item, index) => (
              <div key={index} className="bg-[#DCE2F2] max-sm:my-3 h-44 rounded-xl relative flex justify-center">
                <p className="absolute -bottom-8 font-semibold font-poppins">{item}</p>
              </div>
            ))
          }
        </div>
      </div>
      <div className="w-full mb-20">
        <p className="font-bold font-poppins text-4xl my-10">Top Selling Models</p>
        <div className="w-full grid grid-cols-8 max-md:grid-cols-5 max-sm:grid-cols-2 max-md:gap-5 gap-10 my-5">
          {
            categories.map((item, index) => (
              <div key={index} className="bg-[#DCE2F2] max-sm:my-3 h-44 rounded-xl relative flex justify-center">
                <p className="absolute -bottom-8 font-semibold font-poppins">{item}</p>
              </div>
            ))
          }
        </div>
      </div>
      <NavigationBlock />
    </div>
  )
}

export default Page
