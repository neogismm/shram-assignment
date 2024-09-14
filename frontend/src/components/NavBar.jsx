import { Link } from "react-router-dom"
import { useUser } from "../contexts/UserContext"
import { Home, Trophy, User } from "lucide-react"

export default function NavBar() {
  const { user } = useUser()

  return (
    <nav className="bg-gradient-to-r from-green-700  text-gray-100 shadow-2xl rounded-b-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold tracking-wider hover:text-green-400 transition-colors duration-300">
            Whack-A-Mole
          </Link>
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/" className="flex items-center hover:text-green-400 transition-colors duration-300">
                <Home className="w-5 h-5 sm:mr-1" />
                <span className="hidden sm:inline">Game</span>
              </Link>
            </li>
            <li>
              <Link to="/leaderboard" className="flex items-center hover:text-green-400 transition-colors duration-300">
                <Trophy className="w-5 h-5 sm:mr-1" />
                <span className="hidden sm:inline">Leaderboard</span>
              </Link>
            </li>
            <li>
              <Link to="/profile" className="flex items-center hover:text-green-400 transition-colors duration-300">
                {user && user.profilePicture ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover hover:opacity-70 transition-opacity"
                    />
                  </div>
                ) : (
                  <User className="w-5 h-5 sm:mr-1" />
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}