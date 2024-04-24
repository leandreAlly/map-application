import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import DirectionsRendererComponent from './components/DirectionsRendererComponent';
import DriverMarkerComponent from './components/DriverMarkerComponent';

const MapContainer = ({ stops }) => {
  const [directions, setDirections] = useState(null);
  const [driverPosition, setDriverPosition] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY || '',
  });

  useEffect(() => {
    if (
      !window.google ||
      !window.google.maps ||
      !window.google.maps.DirectionsService
    ) {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: stops[0],
        destination: stops[stops.length - 1],
        waypoints: stops.slice(1, stops.length - 1).map((stop) => ({
          location: stop,
          stopover: false,
        })),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Directions request failed due to ${status}`);
        }
      }
    );
  }, [stops]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setDriverPosition({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  return (
    isLoaded && (
      <GoogleMap mapContainerStyle={mapStyles} zoom={12} center={stops[0]}>
        <DirectionsRendererComponent directions={directions} />
        <DriverMarkerComponent position={driverPosition} />
      </GoogleMap>
    )
  );
};

export default MapContainer;
