import React from 'react';
import { Marker } from '@react-google-maps/api';

const DriverMarkerComponent = ({ position }) => {
  return position && <Marker position={position} />;
};

export default DriverMarkerComponent;
