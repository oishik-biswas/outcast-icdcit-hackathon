import React, { useState } from 'react';
import Sidebarchatpage from './SidebarChatpage';
import ChatWindow from './ChatWindow';

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 bg-white shadow-md border-r">
        <Sidebarchatpage onSelectUser={handleSelectUser} />
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        {selectedUser ? (
          <ChatWindow selectedUser={selectedUser} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
