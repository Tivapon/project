import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAddressBook, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ onNavItemClick, activePage }) => {
  const getButtonStyle = (page) => {
    return activePage === page 
      ? 'text-[#F14D42]' 
      : 'text-black'; // เปลี่ยนสีไอคอนและข้อความเมื่ออยู่ในหน้า Home
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-[#DEE2E6] shadow-md flex justify-around p-4 rounded-lg w-3/4 mb-2">
      <button onClick={() => onNavItemClick('Home')} className={`flex flex-col items-center flex-grow h-full justify-center ${getButtonStyle('Home')}`}>
        <FontAwesomeIcon icon={faHome} size="lg" />
        <span className="text-xs">Home</span>
      </button>
      <button onClick={() => onNavItemClick('Contact')} className={`flex flex-col items-center flex-grow h-full justify-center ${getButtonStyle('Contact')}`}>
        <FontAwesomeIcon icon={faAddressBook} size="lg" />
        <span className="text-xs">Contact</span>
      </button>
      <button onClick={() => onNavItemClick('Notifications')} className={`flex flex-col items-center flex-grow h-full justify-center ${getButtonStyle('Notifications')}`}>
        <FontAwesomeIcon icon={faBell} size="lg" />
        <span className="text-xs">Notifications</span>
      </button>
      <button onClick={() => onNavItemClick('Profile')} className={`flex flex-col items-center flex-grow h-full justify-center ${getButtonStyle('Profile')}`}>
        <FontAwesomeIcon icon={faUser} size="lg" />
        <span className="text-xs">Profile</span>
      </button>
    </div>
  );
};

export default Navbar;
