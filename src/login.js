import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import logo from './psu-alert-logo.png';
import UsernameOverlay from './UsernameOverlay'; // Import UsernameOverlay

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [overlayOpen, setOverlayOpen] = useState(false); // State for username overlay
  const navigate = useNavigate(); // Create instance of useNavigate

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home'); // Use navigate to go to Home if token exists
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      let response;
      if (isAdmin) {
        response = await axios.post('http://localhost:3002/api/auth/login/admin', {
          username: email,
          password,
        });
      } else {
        response = await axios.post('http://localhost:3002/api/auth/login/user', {
          phoneNumber,
        });
      }

      // If login is successful
      if (response.data.msg === 'User login success') {
        localStorage.setItem('token', response.data.token);
        setOverlayOpen(true); // Open overlay for username input
      } else if (response.data.msg === 'Admin login success') {
        localStorage.setItem('token', response.data.token);
        navigate('/home'); // Redirect to Home after successful admin login
      }

      setError(''); // Clear previous errors
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg); // Display specific error message
      } else {
        setError('An unexpected error occurred.'); // Fallback error message
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin(); // Call handleLogin on Enter key press
    }
  };

  const inputClass = "w-full p-2 mb-2 border rounded";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"> {/* Centering with flexbox */}
      <div className="flex flex-col items-center justify-center bg-white p-6 shadow-md" style={{ width: '400px', height: '500px' }}>
        <img src={logo} className="App-logo w-48 h-auto mb-4" alt="PSU ALERT" />
        <h2 className="text-2xl font-bold mb-2">Log In!</h2>
        <p className="text-lg mb-4">Welcome to PSU ALERT</p>

        <div className="flex w-full max-w-xs mb-6">
          <button
            onClick={() => setIsAdmin(false)}
            className={`w-full p-2 rounded-l ${!isAdmin ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800'}`}
          >
            User
          </button>
          <button
            onClick={() => setIsAdmin(true)}
            className={`w-full p-2 rounded-r ${isAdmin ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800'}`}
          >
            Admin
          </button>
        </div>

        <div className="w-full max-w-xs">
          <div className="flex flex-col items-center mb-4">
            {isAdmin ? (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={inputClass}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={inputClass}
                />
              </>
            ) : (
              <>
                <input
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={inputClass}
                />
                <p className="text-sm text-gray-600">A verification code will be sent via SMS if not verified.</p>
              </>
            )}
          </div>

          <button
            onClick={handleLogin}
            className="w-full p-2 bg-gray-800 text-white rounded"
          >
            Continue
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error messages in red */}
        </div>

        {/* Overlay for entering username */}
        {overlayOpen && (
          <UsernameOverlay
            isOpen={overlayOpen}
            onClose={() => setOverlayOpen(false)}
            onSubmit={(username) => {
              // Save the username logic
              localStorage.setItem('username', username);
              setPhoneNumber(username); // Update phoneNumber to show in greeting if necessary
              navigate('/home'); // Redirect to Home after entering username
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
