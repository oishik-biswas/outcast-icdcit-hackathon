import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch messages on user selection
  useEffect(() => {
    if (selectedUser) {
      const fetchMessages = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/api/messages/${selectedUser._id}`, { withCredentials: true });
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        } finally {
          setLoading(false);
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
    <div className="flex flex-col h-full bg-white shadow-lg rounded-lg p-4">
      <div className="flex items-center justify-between border-b-2 pb-2 mb-4">
        <p className="text-xl font-semibold">{selectedUser?.username}</p>
      </div>

      <div className="flex-1 overflow-y-auto mb-4">
        {loading ? (
          <div className="text-center text-gray-500">Loading messages...</div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`flex ${
                  message.senderId === selectedUser._id ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.senderId === selectedUser._id
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  <p>{message.text}</p>
                  {message.image && <img src={message.image} alt="sent" className="mt-2 w-40 h-40 object-cover rounded-lg" />}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
