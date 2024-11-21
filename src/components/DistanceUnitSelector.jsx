const DistanceUnitSelector = ({ distanceUnit, setDistanceUnit }) => {
  
  return (
    <div className="absolute top-4 left-4 bg-white p-3 rounded-md shadow-md z-10">
      <label className="flex items-center space-x-2">
        <span>Distance Unit:</span>
        <select
          className="border rounded px-2 py-1"
          value={distanceUnit}
          onChange={(e) => setDistanceUnit(e.target.value)}
        >
          <option value="km">Kilometers</option>
          <option value="m">Meters</option>
        </select>
      </label>
    </div>
  );
};

export default DistanceUnitSelector;
