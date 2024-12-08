import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons'; // Import the copy icon
import Navbar from './navbar';

export default function ContactPage() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/contacts`);
                setContacts(response.data);
            } catch (error) {
                console.error("Error fetching contacts:", error.response ? error.response.data : error.message);
                setError("Failed to fetch contacts. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, []);

    const handleNavItemClick = (page) => {
        console.log(`${page} page clicked`);
        // Add your navigation logic here
    };

    const handleCopy = (phone) => {
        navigator.clipboard.writeText(phone).then(() => {
            alert("Phone number copied to clipboard!");
        }).catch((error) => {
            console.error("Copy failed:", error);
            alert("Failed to copy phone number.");
        });
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 pb-20">
            <div className="w-full max-w-md text-center bg-white p-6 shadow-md rounded-lg">
                {/* Phone Icon and Emergency Contact Heading */}
                <div className="flex items-center justify-center mb-6">
                    <FontAwesomeIcon 
                        icon={faPhoneVolume} 
                        size="3x" 
                        className="text-[#F14D42] mr-4" 
                    />
                    <div className="leading-tight">
                        <h1 className="font-bold text-3xl text-[#F14D42]">EMERGENCY</h1>
                        <h1 className="font-bold text-3xl text-[#F14D42]">CONTACT</h1>
                    </div>
                </div>

                {/* Loading and Error States */}
                {loading ? (
                    <div className="text-lg">Loading contacts...</div>
                ) : error ? (
                    <div className="text-lg text-red-600">{error}</div>
                ) : (
                    <div className="space-y-4">
                        {contacts.map((contact) => (
                            <div key={contact._id} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-sm">
                                <div className='text-left'>
                                    <div className="font-bold">{contact.name}</div>
                                    <div className="text-gray-600">{contact.phone}</div>
                                </div>
                                <button
                                    className="ml-2 text-red-600 hover:text-red-700"
                                    onClick={() => handleCopy(contact.phone)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Navbar onNavItemClick={handleNavItemClick} activePage="Contact" />
        </div>
    );
}
