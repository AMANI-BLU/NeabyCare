import { MdAddLocation } from "react-icons/md";

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};


const HealthCarePlacesList = ({ healthCarePlaces, userLocation, convertDistance, distanceUnit }) => {
  return (
    <div className="bg-white shadow-md p-4 mt-4 mx-4 rounded-md z-10">
      <h1 className="text-xl font-bold text-gray-400 flex items-center">
        <MdAddLocation className="text-blue-400" />
        Nearby <span className="text-blue-400">&nbsp;Healthcare</span> &nbsp;Places
      </h1>
      {healthCarePlaces.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {healthCarePlaces.map((place, index) => {
            const distance = haversineDistance(
              userLocation.lat,
              userLocation.lng,
              place.lat,
              place.lon
            );
            const placeType = place.tags.amenity || "Unknown Type";
            return (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-blue-50"
              >
                <div>
                  <h3 className="font-semibold text-gray-700">
                    {place.tags.name || "Unnamed Place"}
                  </h3>
                  <p className="text-gray-500">{placeType}</p>
                  {place.tags.address && (
                    <p className="text-gray-600">{place.tags.address}</p>
                  )}
                </div>
                <span className="text-gray-500">
                  {convertDistance(distance).toFixed(2)} {distanceUnit}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No healthcare places found nearby.</p>
      )}
    </div>
  );
};

export default HealthCarePlacesList;
