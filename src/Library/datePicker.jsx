import React, { useContext, useRef, useState } from 'react';
import { FlightContext } from '../hooks/FligtManifestProvider';

import FF from "../assets/date.svg"; 
import { format, isValid, parse } from 'date-fns';
import FocusTrap from 'focus-trap-react';
import { DayPicker, SelectSingleEventHandler } from 'react-day-picker';
import { usePopper } from 'react-popper';

export default function DatePickerDialog() {
  const [selected, setSelected] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const popperRef = useRef(null);
  const buttonRef = useRef(null);
  const [popperElement, setPopperElement] = useState(null);
  // const { user, updateUser} = useContext(FlightContext)


  const popper = usePopper(popperRef.current, popperElement, {
    placement: 'bottom-start'
  });
  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  const handleInputChange = (e) => {
    setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, 'y-MM-dd', new Date());
    if (isValid(date)) {
      setSelected(date);
    } else {
      setSelected(undefined);
    }
  };

  const handleButtonClick = () => {
    setIsPopperOpen(true);
  };

  const handleDaySelect = (date) => {
    setSelected(date);
    if (date) {
      const depDate = format(date, 'y-MM-dd')
      setInputValue(depDate);
      // handleDepauture(depDate)
      closePopper();
    } else {
      setInputValue('');
    }
  };

 

  return (
    <div className='w-full px-4 flex h-10 bg-white shadow-md relative mt-8 items-center'>
      <div ref={popperRef} className='flex'>
      <img
          ref={buttonRef}
          type="button"
          aria-label="Pick a date"
          onClick={handleButtonClick}
          src={FF}
          className='mr-0 cursor-pointer'
        />
        <input
          size={18}
          type="text"
          placeholder={"Departure"}
          value={inputValue}
          onChange={handleInputChange}
          className='w-full px-4 flex h-[100%] bg-transparent items-center appearance-none border-0 focus:outline-none focus:border-transparent focus:ring-0'
        />  
      </div>
      {isPopperOpen && (
        <FocusTrap
          active
          focusTrapOptions={{
            initialFocus: false,
            allowOutsideClick: true,
            clickOutsideDeactivates: true,
            // onDeactivate: closePopper,
            fallbackFocus: buttonRef.current || undefined
          }}
          
        >
          <div
            tabIndex={-1}
            style={popper.styles.popper}
            
            {...popper.attributes.popper}
            ref={setPopperElement}
            role="dialog"
            aria-label="DayPicker calendar"
            className="w-[40%] max-lg:w-full p-4 flex justify-start  mt-4 bg-white z-10 ml-[-20px] flex-col"
          >
            <p>Select your travel date</p>
            <DayPicker
              initialFocus={isPopperOpen}
              mode="single"
              defaultMonth={selected}
              selected={selected}
              onSelect={handleDaySelect}
            />
          </div>
        </FocusTrap>
      )}
    </div>
  );
}