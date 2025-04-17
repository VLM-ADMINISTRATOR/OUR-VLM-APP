// Home.jsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-6">
      <h1 className="text-5xl font-extrabold mb-4 text-center">🎮 Game Center</h1>
      <p className="text-lg text-gray-400 mb-10 text-center">
        Your ultimate hub for multiplayer games, fun & competition.
      </p>

      <div className="flex gap-4">
        <Link
          to="/register"
          className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 px-6 rounded-xl"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="bg-green-600 hover:bg-green-700 transition text-white font-semibold py-2 px-6 rounded-xl"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
