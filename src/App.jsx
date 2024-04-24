import { useJsApiLoader } from '@react-google-maps/api';
import MapContainer from './MapContainer';

function App() {
  const stops = [
    { lat: -1.939826787816454, lng: 30.0445426438232 }, // Nyabugogo
    { lat: -1.9355377074007851, lng: 30.060163829002217 }, // Stop A
    { lat: -1.9358808342336546, lng: 30.08024820994666 }, // Stop B
    { lat: -1.9489196023037583, lng: 30.092607828989397 }, // Stop C
    { lat: -1.9592132952818164, lng: 30.106684061788073 }, // Stop D
    { lat: -1.9487480402200394, lng: 30.126596781356923 }, // Stop E
    { lat: -1.9365670876910166, lng: 30.13020167024439 }, // Kimironko
  ];

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });
  return (
    <div>
      <h2>Nyabugogo - Kimironko</h2>
      <p>Next stop: Kacyiru Bus Park</p>
      <p>Distance: 23Km</p>
      <p>Time: 23 minutes</p>
      {isLoaded && <MapContainer stops={stops} />}
    </div>
  );
}

export default App;
