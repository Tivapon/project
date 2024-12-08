import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope, faEdit, faLock, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Navbar from './navbar'; // Assuming you already have a Navbar component

export default function ProfilePage() {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPhoneNumber = localStorage.getItem('phoneNumber'); // Retrieve phone number from localStorage

    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
    }
  }, []);

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
    // Implement profile edit logic here
  };

  const handleSecuritySettings = () => {
    console.log("Security settings clicked");
    // Implement security settings logic here
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Implement logout logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      {/* Profile Picture */}
      <div className="bg-white p-6 rounded-full shadow-lg mb-6">
        <FontAwesomeIcon icon={faUser} size="6x" className="text-gray-500" />
      </div>

      {/* User Info */}
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">{username || 'John Doe'}</h2>
        <div className="flex items-center justify-between mb-4">
          <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
          <p className="text-gray-700">{phoneNumber || '1234567890'}</p> {/* Fallback for phone number */}
        </div>

        {/* Buttons */}
        <button 
          onClick={handleEditProfile} 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center mb-4 hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Edit Profile
        </button>

        <button 
          onClick={handleLogout} 
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-red-600"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Logout
        </button>
      </div>

      {/* Navbar */}
      <Navbar activePage="Profile" />
    </div>
  );
}
