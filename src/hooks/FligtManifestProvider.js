import { createContext, useState, useContext } from 'react';
import { FlightInfo, FlightTo } from '../data';


export const FlightContext = createContext();

const FlightProvider = ({children}) => {
 const [flightsFrom, setFlightsFrom] = useState(FlightInfo)
 const [flightsTo, setFlightsTo] = useState(FlightTo)
 const [user, setUser] = useState(
      {
        location: '', 
        dest: '',
        departure: '',
        adults: '',
        children: '',
        infants: ''
      }
      );

    const updateUser = (newUser) => { setUser(newUser) };


  return (
    <FlightContext.Provider 
     value={{user, updateUser, flightsFrom, flightsTo}}
    >
    {children}
    </FlightContext.Provider>
  )

}
export default FlightProvider;
