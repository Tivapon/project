import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './psu-alert-logo.png';
import Login from './login';

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    // ตั้งเวลาให้ splash screen แสดงผล 3 วินาที แล้วค่อยเปลี่ยนไปหน้า login
    const timer = setTimeout(() => setShowSplashScreen(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {showSplashScreen ? (
        <div className="splash-screen flex justify-center items-center h-screen rgba(245, 244, 242, 1)">
          <img src={logo} className="App-logo w-48 h-auto" alt="PSU ALERT" />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
