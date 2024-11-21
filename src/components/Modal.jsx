import React from "react";

const Modal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-md shadow-lg w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-700 mb-4">About the App</h2>
        <p className="text-gray-600 mb-4">
          NearbyCare is a location-based app that helps you find healthcare
          facilities such as clinics, pharmacies, hospitals, doctors, and
          dentists near your current location. Simply enable location services,
          and the app will display healthcare places within a 5km radius.
        </p>
        <p className="text-gray-600">
          <strong>Developer:</strong> Amanuel Solomon
        </p>
        <div className="mt-4 text-center">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
