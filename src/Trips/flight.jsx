import React from 'react';
import Airplane from "../assets/airplane.svg";


const Flight = ({
  startTime,
  abbrF,
  distance,
  stops,
  endTime,
  abbrT,
  airline,
  flighType,
  amount,
  payment,
  countryFrm,
  countryTo
}) => {
  return (
      <div className='w-full bg-white px-3 py-2 shadow-sm z-10 flex-col mt-2 border rounded-lg'>
        <div className='mt-1 w-full h-16 justify-between flex'>
          <div className='w-[30%] mt-4'>
            <p className='text-sm font-semibold max-lg:text-[10px]'>{startTime}</p>
            <p className='text-xs max-lg:text-[10px]'>{abbrF}</p>
          </div>
          <div className='w-[25%] max-lg:w-full'>
            <p className='text-xs max-lg:text-[9px] text-center'>{distance}</p>
            <img src={Airplane} className='w-full'/>
            <p className='text-xs max-lg:text-[9px] text-center'>{stops}</p>
          </div>
          <div className='w-[30%] mt-4'>
            <p className='text-sm font-semibold text-end max-lg:text-[10px]'>{endTime}</p>
            <p className='text-xs text-end max-lg:text-[10px]'>{abbrT}</p>
          </div>
        </div>
          <div className='w-full flex mt-4 justify-between'>
            <p className='text-sm text-[#72737F] max-lg:text-[9px]'>{airline}<span className='mb-3 h-4'>.</span>
            <span className={`${flighType === 'First-class' && 'text-[#223E7C]' || flighType === 'Business' && 'text-[#5CC977]' || flighType === 'Premium' && 'text-[#CF9D61]'}`}>
              {flighType}</span>
            </p>
            <p className='text-sm font-semibold max-lg:text-[9px]'>{amount}</p>
          </div>
          <div className='mt-8 h-12 w-full bg-[#223E7C] flex justify-center items-center rounded-md'>
            <p className='text-white cursor-pointer' onClick={payment}>Make payment</p>
          </div>
      </div>
  )
}

export default Flight;
