import './App.css';
import Trips from './Trips';
import FlightProvider from './hooks/FligtManifestProvider';

function App() {
  return (
    <FlightProvider >
      <Trips />
    </FlightProvider>
  );
}

export default App;
