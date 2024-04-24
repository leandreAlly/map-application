// DirectionsRendererComponent.js
import React from 'react';
import { DirectionsRenderer } from '@react-google-maps/api';

const DirectionsRendererComponent = ({ directions }) => {
  const directionsOptions = {
    polylineOptions: {
      strokeColor: '#3457D5',
      strokeOpacity: 0.8,
      strokeWeight: 6,
    },
  };
  return (
    directions && (
      <DirectionsRenderer directions={directions} options={directionsOptions} />
    )
  );
};

export default DirectionsRendererComponent;
