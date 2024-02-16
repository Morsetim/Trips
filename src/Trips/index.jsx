import React, {useState, useContext, useEffect} from 'react';
import Input from '../Library/input';
import Passenger from "../assets/passenger.svg";
import airplaneLg from "../assets/airplane-lg.svg";
import compareArr from "../assets/compare-arrows.svg";
import seat from "../assets/seat.svg";
import 'react-day-picker/dist/style.css';
import DatePickerDialog from '../Library/datePicker';
import { FlightContext } from '../hooks/FligtManifestProvider';
import { countries, flights } from '../data';
import Flight from './flight';



const Trips = () => {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setinfants] = useState(0);
  const [step, setStep] = useState(1)
  const [availableFlight, setAvailableFlight] = useState([])
  const [flightInfo, setFlightInfo] = useState({})
  const [from, setFrom] = useState({country: '', code: ''});
  const [to, setTo] = useState({country: '', code: ''});


  const handleAdultsIncrement = () => { 
    if(adults >= 0) {
      setAdults(adults + 1)
    } 
  }

  const handleAdultsDecrement = () => { 
    if(adults >= 1) {
      setAdults(adults - 1)
    } 
  }

  const handleChildrenIncrement = () => { if(children >= 0) setChildren(children + 1) }

  const handleChildrenDecrement = () => { if(children >= 1) setChildren(children - 1) }

  const handleInfantsIncrement = () => { if(infants >= 0) setinfants(infants + 1) }

  const handleInfantsDecrement = () => { if(infants >= 1) setinfants(infants - 1) }


  const handleFromChange = (e) => {
    setFrom({country : e.target.value})
  }
  const handleToChange = (e) => {
    setTo({country: e.target.value})
  }
  const handleFromSelection = (value) => {
    setFrom(value)
  }

  const handleToSelection = (value) => {
    setTo(value)
  }

  const handleSearch = () => {
    const result = flights.filter(f => f.to === to.code && f.from === from.code)
    setAvailableFlight(result);
    setStep(2);
  }

 const handlePayment = (data) => {
  setFlightInfo(data)
  setStep(3);
 }

 const goBack = () => {
  setStep(step - 1)
 }

  const fromList = countries.filter(c => {
    if(c.country === to.country){ 
      return false
    }
    if(c.country?.toLowerCase().includes(from.country?.toLowerCase())){
      return true;
    }
    return false;
 })
  const toList = countries.filter(c => {
    if(c.country === from.country){
      return false
    }
  if(c.country?.toLowerCase().includes(to.country?.toLowerCase())){
    return true;
  }
  return false;
  })

  const amount = flightInfo?.amount;
  const newAmount = amount?.replace(/,/g, '');
  const total = parseInt(newAmount) + 1000

console.log(flightInfo, "flightInfo")
console.log(availableFlight, "availableFlight") 

  return (
    <>
     {step === 1 && <div className='mt-8 p-4 '>
        <p className='text-slate-700 text-center font-bold'>Search Flight</p> 
        <Input
        distance="From" 
        name="location"
        value={from.country}
        onChange={handleFromChange}
        datas={fromList}
        onSelection={handleFromSelection}
        />
        <Input 
        distance="To"
        name="dest"
        value={to.country}
        onChange={handleToChange}
        onSelection={handleToSelection}
        datas={toList}
        />
        <DatePickerDialog /> 
        <div className='w-full px-4 flex h-10 bg-transparent mt-8 items-center'>
          <img src={Passenger} alt="img" className='h-4 w-4 mr-3' />
          <p className='text-slate-900 font-semibold'>Passengers</p>
        </div>
        <div className='w-full px-4 flex h-12 bg-white shadow-md relative mt-8 items-center justify-between'>
          <p className='text-[#D3D3D3] '>Adults</p>
          <div className='w-[15%] max-lg:w-[40%] flex justify-around'>
            <span className='h-10 w-10 flex justify-center items-center font-semibold bg-[#FAFAFA] shadow-sm rounded-sm cursor-pointer' onClick={handleAdultsDecrement}>-</span>
            <span className='h-10 w-10 flex justify-center items-center font-semibold bg-[#FAFAFA] shadow-sm rounded-sm '>{adults}</span>
            <span className='h-10 w-10 flex justify-center items-center font-semibold bg-[#FAFAFA] shadow-sm rounded-sm cursor-pointer' onClick={handleAdultsIncrement}>+</span>
          </div>
        </div>
        <div className='w-full px-4 flex h-12 bg-white shadow-md relative mt-8 items-center justify-between'>
          <p className='text-[#D3D3D3] '>Children</p>
          <div className='w-[15%] max-lg:w-[40%] flex justify-around'>
            <span className='h-10 w-10 flex justify-center items-center font-semibold bg-[#FAFAFA] shadow-sm rounded-sm cursor-pointer' onClick={handleChildrenDecrement}>-</span>
            <span className='h-10 w-10 flex justify-center items-center font-semibold bg-[#FAFAFA] shadow-sm rounded-sm '>{children}</span>
            <span className='h-10 w-10 flex justify-center items-center font-semibold bg-[#FAFAFA] shadow-sm rounded-sm cursor-pointer' onClick={handleChildrenIncrement}>+</span>
          </div>
        </div>
        <div className='w-full px-4 flex h-12 bg-white shadow-md relative mt-8 items-center justify-between'>
          <p className='text-[#D3D3D3] '>Infants</p>
          <div className='w-[15%] max-lg:w-[40%] flex justify-around'>
            <span className='h-10 w-10 flex justify-center items-center font-semibold bg-[#FAFAFA] shadow-sm rounded-sm cursor-pointer' onClick={handleInfantsDecrement}>-</span>
            <span className='h-10 w-10 flex justify-center items-center font-semibold bg-[#FAFAFA] shadow-sm rounded-sm'>{infants}</span>
            <span className='h-10 w-10 flex justify-center items-center font-semibold bg-[#FAFAFA] shadow-sm rounded-sm cursor-pointer' onClick={handleInfantsIncrement}>+</span>
          </div>
        </div>
        <div className='w-full px-4 flex h-12 bg-[#223E7C] shadow-md relative mt-24 items-center justify-center rounded-sm'>
        <p className='text-white font-semibold cursor-pointer' onClick={handleSearch}>Search Flight</p>
        </div>
      </div>}
      {step === 2 && 
      <>
      <div className='p-4 w-full'>
       <div className='w-full flex'>
        <div className='h-6 w-6 rounded-md flex justify-center items-center z-10 border cursor-pointer' onClick={goBack}>&#8592;</div>
        <p className='text-md font-bold m-auto'>Flight Listings</p>
       </div>
       <div className='p-4 mt-8 border'>
        <img src={airplaneLg} className="w-full"/>
        <div className='w-full flex justify-between px-2'>
          <p className='text-lg font-semibold'>{from.code}</p>
          <p className='text-lg font-semibold'>{to.code}</p>
        </div>
        <div className='w-full flex justify-between px-2'>
          <p className='text-xs '>{from.country}</p>
          <p className='text-xs '>{to.country}</p>
        </div>
        <div className='w-full px-2 mt-3 flex justify-between'>
         <div className='flex items-center'>
          <div className='h-5 w-5 rounded-sm flex justify-center bg-[#D3D8E5] items-center z-10 border mr-2'>
            <img src={compareArr} />
          </div>
          <p className='text-xs font-semibold'>Sat, 12 Mar</p>
         </div>
         <div className='flex items-center'>
          <div className='h-5 w-5 rounded-sm flex justify-center bg-[#D3D8E5] items-center z-10 border mr-2'>
            <img src={seat} />
          </div>
          <p className='text-xs font-semibold '>3 Adults<span>.</span>2 Children<span>.</span>1 Infants</p>
         </div>
        </div>
       </div>
       <p className='my-6'>Available Flights <span className='text-xs text-[#223E7C]'>{availableFlight.length}</span></p>
       {availableFlight.map((fli) => (
        <Flight 
         startTime={fli.startTime}
         abbrF={fli.abbrF}
         distance={fli.distance}
         stops={fli.stops}
         endTime={fli.endTime}
         abbrT={fli.abbrT}
         flighType={fli.flighType}
         amount={fli.amount}
         airline={fli.airline}
         payment={() => handlePayment(fli)}
         countryFrm={fli.countryFrm}
         countryTo={fli.countryTo}
        />
       ))}
      </div>
      </>}
      {step === 3 &&
       <div className='p-4 w-full h-screen flex flex-col justify-between'>
        <div>
        <div className='w-full flex'>
        <div className='h-6 w-6 rounded-md flex justify-center items-center z-10 border cursor-pointer' onClick={goBack}>&#8592;</div>
         <p className='text-md font-bold m-auto'>Make Payment</p>
        </div>
        <div className='p-4 mt-8 border'>
        <img src={airplaneLg} className="w-full"/>
        <div className='w-full flex justify-between px-2'>
          <p className='text-lg font-semibold'>{flightInfo.abbrF}</p>
          <p className='text-lg font-semibold'>{flightInfo.abbrT}</p>
        </div>
        <div className='w-full flex justify-between px-2'>
          <p className='text-xs '>{flightInfo.countryFrm}</p>
          <p className='text-xs '>{flightInfo.countryTo}</p>
        </div>
        <div className='w-full px-2 mt-3 flex justify-between'>
         <div className='flex items-center'>
          <div className='h-5 w-5 rounded-sm flex justify-center bg-[#D3D8E5] items-center z-10 border mr-2'>
            <img src={compareArr} />
          </div>
          <p className='text-xs font-semibold'>Sat, 12 Mar</p>
         </div>
         <div className='flex items-center'>
          <div className='h-5 w-5 rounded-sm flex justify-center bg-[#D3D8E5] items-center z-10 border mr-2'>
            <img src={seat} />
          </div>
          <p className='text-xs font-semibold '>3 Adults<span>.</span>2 Children<span>.</span>1 Infants</p>
         </div>
        </div>
       </div>
        <p className='mt-5 text-xs font-medium'>Summary</p>
        <div className='rounded-sm w-full border p-3'>
          <div className='w-full flex justify-between'>
            <p className='text-[#BABABA] text-xs'>Ticket fare</p>
            <p className='text-xs font-semibold'>{flightInfo.amount}</p>
          </div>
          <div className='w-full flex justify-between mt-2'>
            <p className='text-[#BABABA] text-xs'>Service Chargese</p>
            <p className='text-xs font-semibold'>N 1,000.00</p>
          </div>
        </div>
        <div className='mt-4 w-full p-3 flex justify-between border items-center rounded-sm'>
          <p className='text-[#223E7C] text-xs font-semibold'>Total Amount</p>
          <p className='text-xs font-semibold'>N {total}</p>
        </div>
        </div>
        <div className='w-full px-4 flex h-12 bg-[#223E7C] shadow-md relative mt-24 items-center justify-center rounded-sm'>
         <p className='text-white font-semibold cursor-pointer'>Pay N{total}</p>
        </div>
       </div>
      }
    </>
  )
}

export default Trips;