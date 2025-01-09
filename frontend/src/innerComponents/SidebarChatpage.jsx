import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SidebarChatPage = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);  // Initialize as an empty array
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track error state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);  // Start loading
        setError(null);     // Reset any previous error

        // Make the API request to fetch users
        const response = await axios.get('http://localhost:4000/messages/users', {
          withCredentials: true,  // Send cookies (if any)
        });

        console.log(response.data);  // Log to check API response

        if (Array.isArray(response.data)) {
          setUsers(response.data);  // Set the users if response is an array
        } else {
          setError("API response is not an array.");
        }
      } catch (error) {
        // Handle different types of errors
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
        setLoading(false);  // Stop loading after the request is done
      }
    };

    fetchUsers();
  }, []);

  // If loading, show a loading indicator
  if (loading) {
    return <p>Loading...</p>;
  }

  // If there was an error, display it
  if (error) {
    return <p>{error}</p>;
  }

  // If users is empty, show a message
  if (users.length === 0) {
    return <p>No users found</p>;
  }

  return (
    <div className="sidebar">
      {users.map(user => (
        <div key={user._id} onClick={() => onSelectUser(user)} className="sidebar-user">
          <p>{user.username}</p>
        </div>
      ))}
    </div>
  );
};

export default SidebarChatPage;
