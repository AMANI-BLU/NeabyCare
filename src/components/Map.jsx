import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Haversine formula for distance calculation
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

const Map = ({ userLocation, healthCarePlaces, distanceUnit, convertDistance }) => {
  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={14}
      className="w-full h-[400px]"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[userLocation.lat, userLocation.lng]}>
        <Popup>You are here!</Popup>
      </Marker>
      {healthCarePlaces.map((place, index) => {
        const distance = haversineDistance(
          userLocation.lat,
          userLocation.lng,
          place.lat,
          place.lon
        );
        const placeType = place.tags.amenity || "Unknown Type";
        return (
          <React.Fragment key={index}>
            <Marker position={[place.lat, place.lon]}>
              <Popup>
                {place.tags.name || "Unnamed Place"} - {placeType} <br />
                {convertDistance(distance).toFixed(2)} {distanceUnit}
              </Popup>
            </Marker>
            <Polyline
              positions={[
                [userLocation.lat, userLocation.lng],
                [place.lat, place.lon],
              ]}
              color="#9CA3AF"
            />
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
};

export default Map;
