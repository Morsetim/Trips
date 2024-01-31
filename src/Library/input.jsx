
import React, { useRef, useEffect, useState } from 'react'
import FlightUpIcon from "../assets/flight-from.svg"; 
import FlightDownIcon from "../assets/flight-to.svg"; 
import Date from "../assets/date.svg";


const icons = {
    From: FlightUpIcon,
    To: FlightDownIcon,
    Date: Date
}


const Input = ({ type,  distance, name, value, onChange, datas, onSelection }) => {
    const userRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);

    function handleClickOutside(event) {
        if (!userRef?.current?.contains(event.target)) setShowDropdown(false);
    }

    const handleShowDropDown = () => {
        setShowDropdown(true)
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [userRef]);

    
    const handleClick = (data) => {
        onSelection(data)
        setShowDropdown(false);     
    }

    return (
        <div>
           <>
            <div className='w-full px-4 flex h-12 bg-white shadow-md relative mt-8 items-center'>
                <img src={icons[distance]} alt="img" className='h-4 w-4 mr-3' />
                <p className='text-[#D3D3D3] flex-1'>{distance}</p>
                <input 
                    onClick={handleShowDropDown}
                    type={type}
                    name={name}
                    autoComplete="off"
                    value={value}
                    onChange={onChange}
                    className='w-full px-4 flex h-[100%] bg-transparent items-center appearance-none border-0 focus:outline-none focus:border-transparent focus:ring-0' 
                />
            </div>
           </>
          {showDropdown &&
          <div className='w-[87%] z-10 right-4 px-4 flex flex-col bg-white absolute shadow-md mt-1 justify-between' ref={userRef}>
            {datas?.map((data) => (
                <div className='flex justify-between py-2 cursor-pointer hover:bg-[#88a8ec]' onClick={() => handleClick(data)}>
                    <div className='flex flex-col'>
                        <p>{data?.country}</p>
                        <p className='text-xs'>{data?.airport}</p>
                    </div>
                    <p className=''>{data?.code}</p>
                </div>
            ))}
          </div>
          }
        </div>
    )
}

export default Input
