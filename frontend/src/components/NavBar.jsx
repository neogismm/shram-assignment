import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function NavBar() {
  const { user } = useUser();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold hover:text-green-400 transition-colors">
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
              className="hover:text-green-400 transition-colors flex items-center"
            >
              {user && user.profilePicture && (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-2 hover:opacity-70 transition-opacity"
                />
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
