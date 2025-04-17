import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get('/api/users/profile', config);
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch profile', err);
        navigate('/'); // redirect if unauthorized
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      {user ? (
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg space-y-6 max-w-xl mx-auto">
          <div className="flex items-center gap-4">
            <img
              src={user.profileImage || `https://i.pravatar.cc/100?u=${user.username}`}
              alt="Avatar"
              className="w-16 h-16 rounded-full border"
            />
            <div>
              <p className="text-xl font-semibold">{user.username}</p>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Account Settings</h2>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Password</span>
                <button
                  onClick={() => alert('Password change coming soon!')}
                  className="text-sm text-blue-400 hover:underline"
                >
                  Change
                </button>
              </li>
              <li className="flex justify-between items-center">
                <span>Theme</span>
                <button
                  onClick={() => alert('Theme switch coming soon!')}
                  className="text-sm text-blue-400 hover:underline"
                >
                  Toggle
                </button>
              </li>
            </ul>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 py-2 rounded text-sm font-medium"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-400">Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
