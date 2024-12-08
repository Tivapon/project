import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import SOSOverlay from './SOSOverlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmbulance, faFire, faTree, faCarCrash, faFistRaised, faLifeRing } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [username, setUsername] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [location, setLocation] = useState('');
  const [showSOSOverlay, setShowSOSOverlay] = useState(false);
  const [error, setError] = useState(''); // State to store the error message

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getAddressFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation('Unable to retrieve location');
        }
      );
    } else {
      setLocation('Geolocation is not supported by this browser.');
    }
  }, []);

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          lat: latitude,
          lon: longitude,
          format: 'json',
        },
      });
      setLocation(response.data.display_name);
    } catch (error) {
      console.error("Error fetching address:", error);
      setLocation('Unable to retrieve location name');
    }
  };

  const handleEventSelection = (event) => {
    setSelectedEvent(event);
    setError(''); // Clear any previous error when selecting an event
  };

  const handleSOS = () => {
    if (!selectedEvent) {
      setError('Please select an emergency type before proceeding.');
    } else {
      setShowSOSOverlay(true);
    }
  };

  const handleNavItemClick = (item) => {
    console.log(`Navigating to: ${item}`);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 pb-20">
      <h2 className="text-2xl font-bold mb-2">
        {username ? `Hi, ${username}` : 'Hi, User'}
      </h2>
      <p className="text-sm text-gray-600">{location || 'Loading location...'}</p>

      <p className="text-lg font-semibold mt-6">What’s your emergency?</p>

      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {[
          { name: 'Medical', icon: faAmbulance },
          { name: 'Fire', icon: faFire },
          { name: 'Natural Disaster', icon: faTree },
          { name: 'Accident', icon: faCarCrash },
          { name: 'Violence', icon: faFistRaised },
          { name: 'Rescue', icon: faLifeRing },
        ].map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => handleEventSelection(name)}
            className={`p-2 text-sm rounded-full border-2 transition duration-200 ${selectedEvent === name ? 'border-red-500 bg-red-100' : 'border-gray-300 hover:bg-gray-100'} flex items-center gap-2`}
          >
            <FontAwesomeIcon icon={icon} size="lg" />
            {name}
          </button>
        ))}
      </div>

      {error && (
        <p className="text-red-500 mt-2">{error}</p>
      )}

      <p className="text-center text-sm mt-4">
        Press the SOS button; your live location will be shared with the nearest help center.
      </p>

      <button
        onClick={handleSOS}
        className="mt-8 w-60 h-60 bg-red-500 text-white text-5xl rounded-full shadow-lg hover:bg-red-600 transition duration-200">
        SOS
      </button>

      {showSOSOverlay && (
        <SOSOverlay
          isOpen={showSOSOverlay}
          onClose={() => setShowSOSOverlay(false)}
        />
      )}

      <Navbar onNavItemClick={handleNavItemClick} activePage="Home" />
    </div>
  );
};

export default Home;
