import React from "react";
import { MdAddLocation } from "react-icons/md";

const Navbar = ({ openModal }) => {
  return (
    <nav className="bg-white-600 text-dark shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-400 flex items-center">
          <MdAddLocation className="text-blue-400" />
          Nearby<span className="text-blue-400">Care</span>
        </h1>
        <div className="space-x-4">
          <a href="#" className="text-gray-500 hover:text-blue-600">
            Home
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-blue-600"
            onClick={openModal}
          >
            About
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
