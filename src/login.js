import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './psu-alert-logo.png';

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // ตรวจสอบสถานะล็อกอินเมื่อแอปพลิเคชันเริ่มต้น
    const token = localStorage.getItem('token'); // ใช้ token ที่คุณบันทึกไว้
    if (token) {
      // ถ้ามี token ให้เปลี่ยนเส้นทางไปที่แอปพลิเคชัน
      window.location.href = '/application'; // เปลี่ยนเป็นเส้นทางที่ถูกต้อง
    }
  }, []);

  const handleLogin = async () => {
    try {
      let response;
      if (isAdmin) {
        response = await axios.post('http://localhost:3001/api/auth/login/admin', {
          username: email,
          password,
        });
      } else {
        response = await axios.post('http://localhost:3001/api/auth/login/user', {
          phoneNumber,
        });
      }

      // ถ้าล็อกอินสำเร็จ ให้จัดเก็บ token ลงใน localStorage
      if (response.data.msg === 'User login success' || response.data.msg === 'Admin login success') {
        localStorage.setItem('token', response.data.token); // สมมติว่า token ถูกส่งกลับจากเซิร์ฟเวอร์
        window.location.href = '/application'; // เปลี่ยนเป็นเส้นทางที่ถูกต้อง
      }

      setError(''); // ล้างข้อผิดพลาดก่อนหน้า
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg); // แสดงข้อความผิดพลาดที่เฉพาะเจาะจง
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const inputClass = "w-full p-2 mb-2 border rounded";

  return (
    <div className="flex flex-col items-center justify-center rgba(245, 244, 242, 1) p-6 shadow-md" style={{ width: '400px', height: '500px' }}>
      <img src={logo} className="App-logo w-48 h-auto mb-4" alt="PSU ALERT" />
      <h2 className="text-2xl font-bold mb-2">Log In !</h2>
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

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
