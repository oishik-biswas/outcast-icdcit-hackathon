import React, { useState } from 'react';
import Sidebarchatpage from './SidebarChatpage';
import ChatWindow from './ChatWindow';

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="app">
      <Sidebarchatpage onSelectUser={handleSelectUser} />
      {selectedUser && <ChatWindow selectedUser={selectedUser} />}
    </div>
  );
};

export default ChatPage;
