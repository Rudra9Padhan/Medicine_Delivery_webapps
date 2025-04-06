import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import "./Tracker.css";

const Tracker = () => {
  const [position, setPosition] = useState([0, 0]); // Default position

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]); // Update position with user's location
        },
        (error) => {
          console.error("Error fetching location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const MapUpdater = ({ position }) => {
    const map = useMap();
    map.setView(position, 15); // Update map view to center on the new position
    return null;
  };

  return (
    <div className="tracker-container">
      <h1>Tracker</h1>
      <p>Click the button below to start tracking your location with search your nearby medicine store</p>
      <MapContainer center={position} zoom={15} minZoom={10} maxZoom={18} style={{ height: "400px", width: "100%" }}>
        <MapUpdater position={position} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Your location
          </Popup>
        </Marker>
      </MapContainer>

      <button onClick={handleClick}>Start Tracking</button>
    </div>
  );
};

export default Tracker;
