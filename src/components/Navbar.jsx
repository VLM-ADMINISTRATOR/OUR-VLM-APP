import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
    setDropdownOpen(false);
  };

  const handleSettings = () => {
    navigate('/settings');
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
    {user && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <img
              src={user.profileImage || 'https://i.pravatar.cc/40?u=' + user.username}
              alt="Profile"
              className="w-8 h-8 rounded-full border border-white"
            />
            <span className="hidden sm:block text-sm font-medium">{user.username}</span>
          </button>

          {/* Dropdown */}
          <div
            className={`absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50 transition-all duration-200 ease-out transform origin-top ${
              dropdownOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
            }`}
          >
            <button
              onClick={handleProfile}
              className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              <FiUser className="text-gray-600" /> Profile
            </button>
            <button
              onClick={handleSettings}
              className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              <FiSettings className="text-gray-600" /> Settings
            </button>
            <hr />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
            >
              <FiLogOut className="text-red-500" /> Logout
            </button>
          </div>
        </div>
      )}
      <h2 className="text-xl font-semibold">Game Center</h2>

      
    </nav>
  );
};

export default Navbar;
