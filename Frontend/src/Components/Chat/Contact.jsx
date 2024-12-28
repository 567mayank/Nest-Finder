import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactProfile from './ContactProfile';
import Loading from '../Loading';
import Notification from '../Notification'
import { useSelector } from 'react-redux';

function Contact() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredContacts, setFilteredContacts] = useState([]); 
  const contacts = useSelector((state) => state.chat.contacts)[0];


  const handleNotification = () => {
    setNotification("");
  }

  // search function
  useEffect(() => {
    if (contacts) {
      const filtered = contacts.filter((contact) =>
        contact?.participants[0]?.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact?.participants[0]?.userName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  }, [searchQuery, contacts]);

  return (
    <div className="h-screen md:h-full bg-[#3B1C32] md:rounded-t-xl md:rounded-bl-xl">
      {/* Header */}
      {isLoading && <Loading />}
      {notification && <Notification message={notification} onClose={handleNotification} />}

      <div className="bg-[#1A1A1D] p-4 flex items-center justify-between text-white rounded-t-xl" >
        <h1 className='text-2xl font-semibold'>Inbox</h1>
      </div>

      {/* Search and Buttons */}
      <div className="p-4 bg-[#3B1C32] border-t border-b border-zinc-500 flex flex-col items-center gap-y-4">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery} // Controlled input
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          className=" w-full flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#643954] focus:border-[#643954]"
        />
      </div>

      {/* Chat/People List */}
      <div className="overflow-auto p-4 rounded-bl-xl">
        <div className="space-y-3">
          {filteredContacts && filteredContacts.length > 0 ? (
            filteredContacts.map((chat, index) => (
              <ContactProfile key={index} data={chat.participants[0]} chat={chat} unreadCount={chat?.unreadCount} />
            ))
          ) : (
            <div className="text-white text-center border p-2 rounded-md">No contacts found</div>
          )}
        </div>
      </div>

    </div>
  );
}

export default Contact;