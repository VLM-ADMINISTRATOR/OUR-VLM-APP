// ... all your imports
import axios from 'axios';
import { useState, useEffect} from 'react';
import Navbar from '../components/Navbar'; // ✅ This stays
import BookingModal from '../components/BookingModal';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');
  const [bookings, setBookings] = useState([]);

  const handleBookSlot = (title) => {
    setSelectedGame(title);
    setModalOpen(true);
  };

  const handleConfirmBooking = async (gameTitle, slot) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const today = new Date().toISOString().split("T")[0];

      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        { game: gameTitle, time: slot, date: today },
        config
      );

      setModalOpen(false);
      setBookings((prev) => [response.data, ...prev]);
    } catch (error) {
      console.error("Error booking slot", error);
    }
  };

  const handleCancelBooking = async (id) => {
    const confirm = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error('Error canceling booking', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [bookingsRes, userRes] = await Promise.all([
          axios.get('http://localhost:5000/api/bookings', config),
          axios.get('http://localhost:5000/api/users/profile', config),
        ]);

        setBookings(bookingsRes.data);
        setUser(userRes.data);
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };

    fetchData();
  }, []);

  const games = [
    { title: 'Chess', description: 'Classic strategy board game' },
    { title: 'Tic Tac Toe', description: 'Quick 2-player challenge' },
    { title: 'Sudoku', description: 'Puzzle for sharp minds' },
  ];

  const leaderboard = [
    { name: 'Player1', score: 150 },
    { name: 'Player2', score: 130 },
    { name: 'Player3', score: 110 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* ✅ Top Navbar */}
      <Navbar user={user} />

      {/* ✅ Main Content */}
      <div className="p-6 space-y-10">
        <h1 className="text-3xl font-bold">Welcome, {user}</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* ... Stats cards remain the same */}
        </div>

        {/* Games List */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {games.map((game, i) => (
              <div key={i} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
                <h3 className="text-xl font-bold">{game.title}</h3>
                <p className="text-gray-300 mt-1">{game.description}</p>
                <button
                  onClick={() => handleBookSlot(game.title)}
                  className="mt-3 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm"
                >
                  Book Slot
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        <BookingModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          gameTitle={selectedGame}
          onConfirm={handleConfirmBooking}
        />

        {/* Bookings */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-400">You haven’t booked any games yet.</p>
          ) : (
            <div className="space-y-3">
              {bookings.map((b) => (
                <div
                  key={b._id}
                  className="bg-gray-800 px-4 py-3 rounded-lg flex justify-between items-center shadow"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{b.game}</h3>
                    <p className="text-sm text-gray-300">
                      {b.date} — Slot: {b.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-400 text-sm font-medium">Booked</span>
                    <button
                      onClick={() => handleCancelBooking(b._id)}
                      className="text-red-500 hover:text-red-600 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Leaderboard */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            {leaderboard.map((player, i) => (
              <div
                key={i}
                className="flex justify-between px-6 py-3 border-b border-gray-700 last:border-none"
              >
                <span className="font-medium">
                  {i + 1}. {player.name}
                </span>
                <span className="text-blue-400 font-bold">{player.score} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
