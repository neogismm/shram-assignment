import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Whack-A-Mole
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-green-400 transition-colors">
              Game
            </Link>
          </li>
          <li>
            <Link
              to="/leaderboard"
              className="hover:text-green-400 transition-colors"
            >
              Leaderboard
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="hover:text-green-400 transition-colors"
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
