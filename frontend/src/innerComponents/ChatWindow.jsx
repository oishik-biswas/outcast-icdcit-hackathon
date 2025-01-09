import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  // Fetch messages on user selection
  useEffect(() => {
    if (selectedUser) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`/api/messages/${selectedUser._id}`, { withCredentials: true });
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchMessages();
    }
  }, [selectedUser]);

  // Setup WebSocket connection for real-time updates
  useEffect(() => {
    const socket = io();
    setSocket(socket);

    // Listen for new messages and update the chat
    socket.on('newMessage', (message) => {
      if (message.receiverId === selectedUser._id || message.senderId === selectedUser._id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedUser]);

  // Send message
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const response = await axios.post(`/api/messages/send/${selectedUser._id}`, { text: newMessage }, { withCredentials: true });
        socket.emit('newMessage', response.data);  // Broadcast to other user
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setNewMessage('');
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>{selectedUser?.username}</p>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message._id} className={`message ${message.senderId === selectedUser._id ? 'received' : 'sent'}`}>
            <p>{message.text}</p>
            {message.image && <img src={message.image} alt="sent" />}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
