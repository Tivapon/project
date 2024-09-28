// SOSOverlay.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faPhone } from '@fortawesome/free-solid-svg-icons';

const SOSOverlay = ({ isOpen, onClose }) => {
  const [address, setAddress] = useState('');
  const [situationDetails, setSituationDetails] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    console.log("Address:", address);
    console.log("Situation Details:", situationDetails);
    
    // Here you can add the logic to handle the submitted data, e.g., send to an API

    // Close the overlay
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2">
        <h2 className="text-lg font-bold mb-4">Additional Details</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Address Details</label>
            <input
              type="text"
              className="border rounded w-full p-2"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Situation Details</label>
            <textarea
              className="border rounded w-full p-2"
              placeholder="Enter situation details"
              rows="4"
              value={situationDetails}
              onChange={(e) => setSituationDetails(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <button type="button" className="p-2">
                <FontAwesomeIcon icon={faCamera} size="lg" />
              </button>
              <button type="button" className="p-2">
                <FontAwesomeIcon icon={faPhone} size="lg" />
              </button>
            </div>
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Submit</button>
          </div>
        </form>
        
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">✖️</button>
      </div>
    </div>
  );
};

export default SOSOverlay;
