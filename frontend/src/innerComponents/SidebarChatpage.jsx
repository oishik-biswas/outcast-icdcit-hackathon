import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SidebarChatPage = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get('http://localhost:4000/messages/users', {
          withCredentials: true,
        });

        console.log(response.data);

        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setError("API response is not an array.");
        }
      } catch (error) {
        console.error("Error fetching users:", error.response ? error.response.data : error.message);

        if (error.response) {
          if (error.response.status === 401) {
            setError("Unauthorized access. Please log in.");
          } else if (error.response.status === 500) {
            setError("Server error. Please try again later.");
          } else {
            setError("An unexpected error occurred.");
          }
        } else {
          setError("Network error. Please check your connection.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No users found</p>
      </div>
    );
  }

  return (
    <div className="sidebar p-4 bg-gray-50 w-80 h-full overflow-y-auto shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Users</h2>
      <div className="space-y-2">
        {users.map(user => (
          <div
            key={user._id}
            onClick={() => onSelectUser(user)}
            className="sidebar-user p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-all ease-in-out"
          >
            <p className="text-gray-700">{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarChatPage;
