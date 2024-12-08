// notifications
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAddressBook, faBell, faUser, faEllipsisH } from '@fortawesome/free-solid-svg-icons'; 
import { faPhone } from '@fortawesome/free-solid-svg-icons'; // For emergency contact icon
import Navbar from './navbar'; // Import the Navbar component

export default function NotificationPage() {
  const handleNavItemClick = (page) => {
    console.log(`Navigating to ${page}`);
    // Implement navigation logic here
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 pb-20">
    <div className="flex items-center"> {/* ใช้ div เพื่อรวมทั้งสององค์ประกอบ */}
        <h1 className="text-3xl font-bold text-gray-600">NOTIFICATION</h1>
        <FontAwesomeIcon icon={faBell} className="text-[#F14D42] ml-4" size='3x'/> {/* เปลี่ยน mr-4 เป็น ml-4 เพื่อสร้างช่องว่างทางด้านซ้าย */}
    </div>

    {/* Notifications List */}
    <div className="flex-1 p-6 bg-transparent"> {/* Set background to transparent */}
        {/* Notification Item */}
        <div className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-700">
                    เจ้าหน้าที่ได้รับการแจ้งเหตุจากคุณแล้ว
                </h2>
                <span className="text-gray-400 text-sm">2m</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
                ขณะนี้เจ้าหน้าที่ได้รับการแจ้งเหตุจากคุณแล้ว หากมีข้อมูลเพิ่มเติม
                สามารถโทรแจ้งเจ้าหน้าที่ได้
            </p>
            <button className="text-gray-500 text-sm mt-2">
                <FontAwesomeIcon icon={faEllipsisH} />
            </button>
        </div>

        {/* Another Notification Item */}
        <div className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-700">แจ้งเหตุสำเร็จ</h2>
                <span className="text-gray-400 text-sm">3m</span>
            </div>
            <button className="text-gray-500 text-sm mt-2">
                <FontAwesomeIcon icon={faEllipsisH} />
            </button>
        </div>
    </div>

    {/* Navbar */}
    <Navbar onNavItemClick={handleNavItemClick} activePage="Notifications" />
</div>
  );
}
