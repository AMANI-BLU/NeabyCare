import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import DistanceUnitSelector from "./components/DistanceUnitSelector";
import HealthCarePlacesList from "./components/HealthCarePlacesList";
import Modal from "./components/Modal";

const App = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [healthCarePlaces, setHealthCarePlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [distanceUnit, setDistanceUnit] = useState("km");
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch nearby healthcare places from Overpass API
  const fetchNearbyHealthCarePlaces = async (lat, lng) => {
    const query = `
      [out:json];
      node["amenity"~"clinic|pharmacy|hospital|doctors|dentist"](around:5000,${lat},${lng});
      out body;
    `;
    try {
      const response = await axios.post(
        "https://overpass-api.de/api/interpreter",
        query,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      setHealthCarePlaces(response.data.elements || []);
    } catch (error) {
      setError("Error fetching healthcare places. Please try again later.");
      console.error("Error fetching healthcare places:", error);
    }
  };

  // Get user location and fetch nearby healthcare places
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          await fetchNearbyHealthCarePlaces(latitude, longitude);
          setLoading(false);
        },
        (error) => {
          setError("Unable to fetch your location. Please ensure your location services are enabled.");
          console.error("Error getting location:", error);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      console.error("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  const convertDistance = (distance) => {
    if (distanceUnit === "m") {
      return distance * 1000; 
    }
    return distance; 
  };

  const openModal = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar openModal={openModal} />
      <div className="flex-1 relative">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">Loading your location...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">{error}</p>
          </div>
        ) : userLocation ? (
          <div className="h-full">
            <DistanceUnitSelector
              distanceUnit={distanceUnit}
              setDistanceUnit={setDistanceUnit}
            />
            <Map
              userLocation={userLocation}
              healthCarePlaces={healthCarePlaces}
              distanceUnit={distanceUnit}
              convertDistance={convertDistance}
            />
            <HealthCarePlacesList
              healthCarePlaces={healthCarePlaces}
              userLocation={userLocation}
              convertDistance={convertDistance}
              distanceUnit={distanceUnit}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">Unable to fetch your location.</p>
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default App;
